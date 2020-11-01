import React, { useState, useEffect } from "react";
import MainBoard from "./MainBoard";
import PostReaply from "./PostReplay";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NewPost from "./NewPost";
import Header from "./Header";
import history from "../history";
import SignUp from "./Signup";
import { connect } from "react-redux";
import ReplayTOPost from "./ReaplyToPost";
import {fetchuser} from "../actions";
class App extends React.Component  {

  render(){
  return (
    <div>
      <div className="fluid-container" style={{ padding: "10px" }}>
        <Router history={history}>
          <Header />
          <br></br>

          <div>
            <Route path="/" exact component={MainBoard} />
            <Route path="/PostReplay/:id" component={PostReaply} />
            <Route path="/NewPost" component={NewPost} />
            <Route path="/ReplayTOPost/:id" component={ReplayTOPost} />

            <Route path="/signup" component={SignUp} />
            <Route path="/MainBoard" exact component={MainBoard} />
          </div>
        </Router>
      </div>
    </div>
  );}
};
const mapStateToProps=(state)=>{
  return{fbmongodbreducer:state.fbmongodbreducer}
}
export default connect(mapStateToProps,{fetchuser})(App);
