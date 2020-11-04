import React, { useState } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import {connect} from 'react-redux'
import {facebookloginaction,facebooklogout} from '../actions'
import { Link } from "react-router-dom";
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'

const FacebookLogInPage = (props) => {
  const [isLogIn, setIslogIn] = useState();
  const componentClicked=(response)=>{
    if(response.status!="unknown"){
   
     //props.dispatch(props.facebookloginaction)
      //props.dispatch(setCurrentUser(decode));

      setIslogIn(true)
   }
   
    props.facebookloginaction(response)
}

const responseFacebook=(response)=>{
 // console.log(response)
  if(response.status!="unknown"){
 
    setIslogIn(true)
  }
    

    
    props.facebookloginaction(response)
    
}
const fblougoutclicked=()=>{
  props.facebookloginaction({})
  //props.facebooklogout()
//props.facebooklogout()
 window.location.href='/'
 
  
  
}

  let fbContent;
  if (props.facebookloginreducer.isLogIn!=null) {
    fbContent=(<Link to='/' className='btn  btn-primary' onClick={()=>fblougoutclicked()} style={{backgroundColor:"DARKBLUE"}} ><i className="fab fa-facebook-square"></i>
  facebook Log out  </Link>)
  } else {
    fbContent = (
        <FacebookLogin
          appId="1082730518808869"
          autoLoad={true}
          fields="name,email,picture"
          onClick={componentClicked}
          callback={responseFacebook}
         
          textButton="Facebook Login"
          fontFamily="sans-serif"
         
          render={renderProps => (
            <button onClick={renderProps.onClick} className='btn  btn btn-primary ' style={{backgroundColor:"DARKBLUE"}}><i className="fab fa-facebook-square"></i> facebook  Log In</button>
          )}
        />
      );
  }
return <div>{fbContent}</div>;
};
const mapStateTOProps=(state)=>{
    return {facebookloginreducer:state.facebookloginreducer}
}
export default connect(mapStateTOProps,{facebookloginaction,facebooklogout}) (FacebookLogInPage);
