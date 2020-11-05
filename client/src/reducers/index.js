import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import _, { concat } from "lodash";
import { persistReducer } from "redux-persist";
import isEmpty from "is-empty";
import storage from "redux-persist/lib/storage";
import { fbmongodbreducer } from "../reducers/fbmongodbreducer";

const allPostsReducer = (state = {}, action, getState) => {
  if (action.type === "ALL_Posts") {
    return { ...state, ..._.mapKeys(action.payload, "_id") };
  }
  if (action.type === "createPost") {
    return { ...state, [action.payload.id]: action.payload };
  }

  if (action.type === "LOAD_POST") {
    return { ...state, [action.payload.id]: action.payload };
  }
  if (action.type === "POST_REPLYA") {
    return { ...state, [action.payload.id]: action.payload };
  }
  if (action.type === "NUMBER_REPLIES") {
    return { ...state, [action.payload.id]: action.payload };
  }
  if (action.type === "UPDATE_LIKES") {
    return { ...state, [action.payload.id]: action.payload };
  }
  if (action.type === "EDIT_POST") {
    return { ...state, [action.payload.id]: action.payload };
  }
  if (action.type === "EDIT_POST_REPLAY") {
    return { ...state, [action.payload.id]: action.payload };
  }
  if (action.type === "UPDATE_LIKE_REPLY") {
    return { ...state, [action.payload.id]: action.payload };
  }
  if (action.type === "DELETE_POST") {
    return _.omit(state, action.payload);
  }

  if (action.type === "DELETE_REPLAY") {
    return { ...state, [action.payload.id]: action.payload };
  }

  return state;
};
const getInsideIndexforlikesreducer = (state = { index: null }, action) => {
  if (action.type === "INSIDE_INDEX") {
    return { ...state, index: action.payload };
  }
  return state;
};
const checkpagetypereducer = (state = { page: null }, action) => {
  if (action.type === "CHECK_PAGE") {
    return { ...state, page: action.payload };
  }
  return state;
};

const intialState = { isLogIn: null, resp: null };
const facebookloginreducer = (
  state = { isLogIn: null, resp: null },
  action
) => {
  if (action.type === "FB_LOGIN") {
   
    return { ...state, isLogIn: true, resp:action.payload};
  }
  if (action.type === "FB_LOG_OUT") {
    return { ...state, isLogIn: false, resp:""};
  }
  return state;
};
const getIdForReplayReducer = (state = { id: null }, action) => {
  if (action.type === "ID_FOR_REPLYA") {
    return { ...state, id: action.payload };
  }
  return state;
};
const whateditbuttonclikedreducer = (state = { nestedindex: null }, action) => {
  if (action.type === "WHAT_EDIT_CLICKED") {
    return { ...state, nestedindex: action.payload };
  }
  return state;
};
const mongoregistersignupreducer = (state = [], action) => {
  if (action.type === "USER_REJISTER") {
    const newState = [...state];
    newState.push(action.payload);
    return newState;
  }
  if (action.type === "ALL_USERS") {
    return action.payload;
  }
  return state;
};
const intialStatelogin = {
  isAuthenticated: false,
  user: {},
  loading: false,
  error: null,
  email: null,
};
const mongologinreduxer = (state = intialStatelogin, action) => {
  if (action.type === "SET_CURRENT_USER") {
    return {
      ...state,
      isAuthenticated: !isEmpty(action.payload),
      user: action.payload,
      error: "",
      email: action.payload.email,
    };
  }
  if (action.type === " USER_LOADING") {
    return { ...state, loading: true };
  }
  if (action.type === "GET_ERRORS") {
    return { ...state, error: action.payload };
  }

  return state;
};
const geterrorreducer = (state = { error: null }, action) => {
  if (action.type === '"GET_ERRORS') {
    return { ...state, error: action.payload };
  }
  return state;
};
const getlastPostReducer = (state = { lastpost: null }, action) => {
  if (action.type === "LAST_POST") {
    return { ...state, lastpost: action.payload };
  }
  return state;
};

const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: [
    "mongologinreduxer",
    "form",
    "fbmongodbreducer",
    
    "getlastPostReducer",
    "getcurrentuserreducer",
  ],
};

export default persistReducer(
  rootPersistConfig,
  combineReducers({
    form: formReducer,

    getlastPostReducer,
    geterrorreducer: geterrorreducer,
    fbmongodbreducer: fbmongodbreducer,
    mongologinreduxer: mongologinreduxer,
    allPostsReducer: allPostsReducer,
    facebookloginreducer: facebookloginreducer,
    getIdForReplayReducer: getIdForReplayReducer,
    whateditbuttonclikedreducer: whateditbuttonclikedreducer,
    getInsideIndexforlikesreducer: getInsideIndexforlikesreducer,
    checkpagetypereducer: checkpagetypereducer,
    mongoregistersignupreducer: mongoregistersignupreducer,
  })
);
