import axios from "axios";
import _, { get, method } from "lodash";
import setAuthToken from "../utils/setAuthToken";
import Jwt_decode from "jwt-decode";
import { configure } from "@testing-library/react";

let a = new Date();
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let d = new Date();
let time =
  d.getHours() > 12
    ? (d.getHours() % 12) + ":" + d.getMinutes() + "PM"
    : d.getHours() + ":" + d.getMinutes() + " " + "AM";
const basicobj = {
  time:
    ` ${months[a.getMonth()]} ${a.getDate()} ${a.getFullYear()}` + " " + time,
  numberofreplires: 0,
  likes: 0,
  postReplay: {
    replay: [
      { like: 0, replayername: "me", replayerPost: "me", replyertime: "now" },
    ],
  },
};
export const fetchuser = () => async (dispatch) => {
  const response = await axios.get("/auth/getCurrentUser");
  dispatch({ type: "FETCH_USER", payload: response });
};
export const loadAllPost = () => async (dispatch) => {
  const response = await axios.get("/post/posts");
  dispatch({ type: "ALL_Posts", payload: response.data });
};
export const loadPost = (id) => async (dispatch) => {
  const response = await axios.get(`/post/${id}`);
  dispatch({ type: "LOAD_POST", payload: response.data });
};

export const createPost = (formValues) => async (dispatch, getState) => {
  const response = await axios.post("/post/createPost", {
    ..._.merge(formValues, basicobj),
  });
  dispatch({ type: "CREATE_POST", payload: response.data });
};
export const facebookloginaction = (repo) => (dispatch) => {
  dispatch({ type: "FB_LOGIN", payload: repo });
};
export const facebooklogout = () => (dispatch) => {
  dispatch({ type: "FB_LOG_OUT" });
};
export const checkPageCreateOrReplay = (status) => {
  return { type: "CHECK_PAGE", payload: status };
};

export const CreatePostReplay = (formValues, id) => async (
  dispatch,
  getState
) => {
  const obj = { userID: null, likes: null };
  if (getState().facebookloginreducer.isLogIn) {
    const userID = getState().facebookloginreducer.resp.id;
    const response = await axios.put(`/post/insertReplay/${id}`, {
      ...formValues,
      ...{ ...obj, userID: userID, likes: 0 },
    });
    dispatch({ type: "POST_REPLYA", payload: response.data });
  }
  if (getState().mongologinreduxer.isAuthenticated) {
    const userID = getState().mongologinreduxer.user.id;
    const response = await axios.put(`/post/insertReplay/${id}`, {
      ...formValues,
      ...{ ...obj, userID: userID, likes: 0 },
    });
    dispatch({ type: "POST_REPLYA", payload: response.data });
  }
};
export const getnumberOfReplies = () => async (dispatch, getState) => {
  let getarry = Object.values(getState().allPostsReducer);

  for (let i = 0; i < getarry.length; i++) {
    try {
      const response = await axios.patch(`http://localhost:3002/posts/${i}`, {
        numberofreplires: getarry[i].postReplay.replay.length,
      });
      dispatch({ type: "NUMBER_REPLIES", payload: response.data });
    } catch {}
  }
};

export const getIdForReplay = (id) => {
  return { type: "ID_FOR_REPLYA", payload: id };
};
export const UpdateLikes = (id) => async (dispatch) => {
  const response = await axios.put(`/post/updatelikes/${id}`);
  dispatch({ type: "UPDATE_LIKES", payload: response.data });
};
export const updateReplylikes = (idmain, idnested) => async (dispatch) => {
  let obj = { id: null };
  try {
    const response = await axios.patch(`/post/updateReplylikes/${idmain}`, {
      ...obj,
      id: idnested,
    });
    dispatch({ type: "UPDATE_REPLAY_LIKES", payload: response });
  } catch {}
};

export const editPost = (id, obj) => async (dispatch) => {
  try {
    const response = await axios.patch(`/post/updatepost/${id}`, obj);
    dispatch({ type: "EDIT_POST", payload: response });
  } catch {}
};
export const getInsideIndexforlikes = (index) => {
  return { type: "INSIDE_INDEX", payload: index };
};
export const editPostReplay = (id, formvalues) => async (
  dispatch,
  getState
) => {
  try {
    const response = await axios.patch(`/post/updatereply/${id}`, formvalues);
    dispatch({ type: "EDIT_POST_REPLAY", payload: response });
  } catch {}
};

export const whatEditClicked = (nestedindex) => {
  return { type: "WHAT_EDIT_CLICKED", payload: nestedindex };
};
export const updateLikesforReplies = (currentlikes, mind, iind) => async (
  dispatch,
  getState
) => {
  const getinnerlikes = getState().allPostsReducer[mind].postReplay.replay;
  getinnerlikes[iind].likes = currentlikes + 1;
  let a = { postReplay: { replay: getinnerlikes } };
  const response = await axios
    .patch(`http://localhost:3002/posts/${mind}`, a)
    .then(axios.get("http://localhost:3002/posts"));
  dispatch({ type: "UPDATE_LIKE_REPLY", payload: response });
};
export const deletepost = (id) => async (dispatch) => {
  const response = await axios.delete(`/post/delete/${id}`);
  dispatch({ type: "DELETE_POST", payload: id });
};

export const deleteReplay = (mainindex, rep) => async (dispatch) => {
  axios.request({
    ...configure,
    method: "delete",
    url: `http://localhost:8000/post/deleteReplay/${mainindex}`,
    data: rep,
  });
};
export const createpostformongo = (fromValues) => async (getState) => {
  const { userID } = getState().facebookloginreducer.resp;
  await axios.post("/post/createPost", {
    ..._.merge(fromValues, basicobj),
    userID,
  });
};
export const userRejister = (formValues) => (dispatch) => {
  axios
    .post("/users/register", formValues)
    .then((response) => {
      dispatch({ type: "USER_REJISTER", payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: "GET_ERRORS_REGISTER", payload: err.response.data.msg });
    });
};
export const userVerification = (urltoken) => (dispatch) => {
  /// const response=await axios.post(`/users/confirmation/${urltoken}`)
  // dispatch({type:"USER_VERIFICATION",payload:response.data}).
  axios
    .post(`/users/confirmation/${urltoken}`)
    .then((resp) => {
      dispatch({ type: "USER_VERIFICATION", payload: resp.data });
    })
    .catch((err) => {
      dispatch({ type: "GET_ERROR_VERIFY", payload: err.resp.data });
    });
};
export const changePassword = (urltoken,formvalues) => (dispatch) => {
  /// const response=await axios.post(`/users/confirmation/${urltoken}`)
  // dispatch({type:"USER_VERIFICATION",payload:response.data}).
  axios
    .patch(`/users/emailforget/${urltoken}`,{Password:formvalues})
    .then((resp) => {
      dispatch({ type: "CHANGE_PASSWORD", payload: resp.data });
    })
    .catch((err) => {
      dispatch({ type: "GET_ERROR_CHANGE_PASSWORD", payload: err.resp.data });
    });
};
export const resendVerification=(email)=>dispatch=>{
  let obj={Email:null}
  axios.post('/users/resendverify',{...obj,Email:email}).then((resp)=>{dispatch({type:"RESEND_VERIFY",payload:resp.data})})
}
export const forgetPassword=(email)=>dispatch=>{
  axios.post('/users/emailforget',{Email:email}).then((res)=>{dispatch({type:"FORGET_PASSWORD",payload:res.data})}).catch((err)=>{dispatch({type:"FORGET_PASSWORD_ERROR",payload:err.res.data})})
}
export const getalluser = () => async (dispatch) => {
  const response = await axios.get("/users/allusers");
  dispatch({ type: "ALL_USERS", payload: response.data });
};
export const loginUser = (formValues) => async (dispatch) => {
  await axios
    .post("/users/login", formValues)
    .then((response) => {
      const { token } = response.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decode = Jwt_decode(token);
      dispatch(setCurrentUser(decode));
    })
    .catch((err) => {
      dispatch({ type: "GET_ERRORS", payload: err.response.data });
    });
};
export const setCurrentUser = (decode) => {
  return {
    type: "SET_CURRENT_USER",
    payload: decode,
  };
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
export const setUserLoading = () => {
  return {
    type: " USER_LOADING",
  };
};

export const getlastPOst = (id) => async (dispatch) => {
  const response = await axios.get(`/post/${id}`);
  dispatch({ type: "LAST_POST", payload: response.data });
};
