import React, { useState, useEffect } from "react";
import MainBoard from "./MainBoard";
import PostReaply from "./PostReplay";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import NewPost from "./NewPost";
import Header from "./Header";
import history from "../history";
import SignUp from "./Signup";
import { connect } from "react-redux";
import ReplayTOPost from "./ReaplyToPost";
import {userVerification} from '../actions'
import UserVerify from './UserVerify'
import ResetPassword from './ResetPassword'



class App extends React.Component  {
componentDidMount(){
 //this.props.userVerification()
}
  render(){
  return (
    <div>
      <div className="container" style={{ paddingLeft: "10px",paddingRight:"10px",paddingTop:"10px" }}>
        <Router history={history}>
        
     
          
           <Header />
           <br></br>
           <div className='a  rounded-right rounded-left rounded-bottom rounded-top ' style={{padding:"1px"}}>
            <h5 className='text-center ' style={{color:"snow"}}>Quit Smoking! Get Help <i className="fas fa-hands-helping" style={{color:"lightblue"}}></i></h5>
            <h6 className='text-center' style={{color:"snow"}}>Share Your story ,relapse,how you beat <i className="fas fa-grin-tongue-wink" style={{color:"lightblue",fontSize:"20px"}}></i> the Nicodemon</h6>
           </div>
           <br/>

          <div>
            <Route path="/" exact component={MainBoard} />
            <Route path="/PostReplay/:id" component={PostReaply} />
            <Route path="/NewPost" component={NewPost} />
            <Route path="/ReplayTOPost/:id" component={ReplayTOPost} />
            <Route path='/users/confirmation/:tok' component={UserVerify}/>
            <Route path='/users/emailforget/:resendToken' component={ResetPassword}/>
            <Route path="/signup" component={SignUp} />
            <Route path="/MainBoard" exact component={MainBoard} />
          </div>
        </Router>
      </div>
    </div>
  );}
};
const mapStateToProps=(state)=>{
  return{
    fbmongodbreducer:state.fbmongodbreducer,
    emailverifyreducer:state.emailverifyreducer
  
  }
}
export default connect(mapStateToProps,{userVerification})(App);
