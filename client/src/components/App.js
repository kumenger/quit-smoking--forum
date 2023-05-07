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
import { userVerification } from "../actions";
import UserVerify from "./UserVerify";
import ResetPassword from "./ResetPassword";
import Home from './Home'

class App extends React.Component {
  componentDidMount() {
    //this.props.userVerification()
  }
  render() {
    return (
      <div>
        <Router history={history}>
          <Header />

          <div className=" rounded-right rounded-left rounded-bottom rounded-top ">
           
          </div>

          <div className="">
            <Route path="/" exact component={Home} />
            <Route path="/PostReplay/:id" component={PostReaply} />
            <Route path="/NewPost" component={NewPost} />
            <Route path="/ReplayTOPost/:id" component={ReplayTOPost} />
            <Route path="/users/confirmation/:tok" component={UserVerify} />
            <Route path="/stories" exact component={MainBoard} />
            <Route path="/users/emailforget/:resendToken" component={ResetPassword}
            />
            <Route path="/signup" component={SignUp} />
            <Route path="/MainBoard" exact component={MainBoard} />
          </div>
        </Router>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    fbmongodbreducer: state.fbmongodbreducer,
    emailverifyreducer: state.emailverifyreducer,
  };
};
export default connect(mapStateToProps, { userVerification })(App);
