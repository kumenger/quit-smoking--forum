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


class App extends React.Component  {
componentDidMount(){

}
  render(){
  return (
    <div>
      <div className="fluid-container" style={{ paddingLeft: "10px",paddingRight:"10px",paddingTop:"10px" }}>
        <Router history={history}>
     
          <Header />
         <div className='a  rounded-right rounded-left rounded-bottom rounded-top ' style={{padding:"1px"}}>
            <h5 className='text-center text-white' style={{fontFamily:"cursive"}}>Quit Smoking! Get Help <i class="fas fa-hands-helping" style={{color:"violet"}}></i></h5>
            <h6 className='text-center text-white' style={{fontFamily:"cursive"}}>Share Your experience and story ,relapse,how you beat <i class="fas fa-grin-tongue-wink" style={{color:"violet"}}></i> the Nicodemon</h6>
           </div> 
       <br/>

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
export default connect(mapStateToProps)(App);
