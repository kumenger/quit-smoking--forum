import React, { useState, useEffect } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { connect } from "react-redux";
import { facebookloginaction, facebooklogout } from "../actions";
import { Link } from "react-router-dom";

const FacebookLogInPage = (props) => {
  const [isLogIn, setIslogIn] = useState();
  useEffect(() => {
    setIslogIn(props.facebookloginreducer.isLogIn);
  }, []);

  const responseFacebook = (response) => {
  
    if (response.name) {
      setIslogIn(true);
      props.facebookloginaction(response);
    } else setIslogIn(false);
  };
  const fblougoutclicked = () => {
    props.facebooklogout();
    setIslogIn(false);
  };

  let fbContent = () => {
    if (isLogIn) {
      return (
        <div>
          <Link
            to="/"
            className="btn  btn-primary"
            onClick={() => fblougoutclicked()}
            style={{ backgroundColor: "#4267B2" }}
          >
            <i class="fab fa-facebook"></i> Facebook Log out{" "}
          </Link>
        </div>
      );
    }
    return (
      <div>
        <FacebookLogin
          appId="1082730518808869"
          disableMobileRedirect={true}
          fields="name,email,picture"
          callback={responseFacebook}
          fontFamily="sans-serif"
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              className="btn  btn btn-primary "
              style={{ backgroundColor: "#4267B2" }}
            >
              <i className="fab fa-facebook-square"></i> Facebook Log In
            </button>
          )}
        />
      </div>
    );
  };

  return <div>{fbContent()}</div>;
};
const mapStateTOProps = (state) => {
  return { facebookloginreducer: state.facebookloginreducer };
};
export default connect(mapStateTOProps, {
  facebookloginaction,
  facebooklogout,
})(FacebookLogInPage);
