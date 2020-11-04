import React ,{useEffect,useState} from "react";
import FacebookLogin from './FacebookLogin'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { connect } from "react-redux";
import { getIdForReplay, loadAllPost, getnumberOfReplies ,fetchuser} from "../actions";
import { Link } from "react-router-dom";
import LogIn from "./login";

const Header = (props) => {

 

  const showwhneishome = () => {
    return props.facebookloginreducer.isLogIn&&props.facebookloginreducer.resp.status!="unknown" ||props.mongologinreduxer.isAuthenticated  ? (
      <Link to="/NewPost" className="blink btn btn-outline-primary ">
        <strong>Create New Post</strong>
      </Link>
    ) : (
      
       
      ""
     
    );
   
  };
  const showwhenidonreplay = () => {
    return props.facebookloginreducer.isLogIn&&props.facebookloginreducer.resp.status!="unknown" ||props.mongologinreduxer.isAuthenticated ? (
      <Link
        className=" blink blink btn btn-outline-primary "
        to={`/ReplayTOPost/${props.getIdForReplayReducer.id}`}
      >
        {" "}
        Repaly 
      </Link>
    ) : ""

   
  };

  return (
    <div
      className=" outset " style={{paddingTop:"px",backgroundColor:"#ebf1f1"}}
     
    >
      <div
        className="row rounded-right rounded-left rounded-bottom rounded-top  "
       
      >
        <div className="col-md-12">
          <Navbar expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Brand>
            <Link className='' to="/" onClick={() => getIdForReplay(null)}>
                   <h6 style={{fontSize:"18px"}}> Home</h6>
                  </Link>
            </Navbar.Brand>
            <Navbar.Brand>
            { props.facebookloginreducer.isLogIn&&props.facebookloginreducer.resp.status!="unknown" ||props.mongologinreduxer.isAuthenticated? "":<div><h6 style={{fontSize:"16px"}}><Link to="/signup" className='btn btn-info '>Register</Link></h6> </div>  }
            </Navbar.Brand>
           
           <Navbar.Brand style={{fontSize:"18px"}}>
           {props.checkpagetypereducer.page === true
                ? window.location.href.indexOf("PostReplay") != -1
                  ? showwhenidonreplay()
                  : showwhneishome()
                : ""}
           </Navbar.Brand>
          
   
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                

               
              </Nav>
               
              <Nav.Link>
              {props.mongologinreduxer.isAuthenticated?"":<FacebookLogin/>}
              </Nav.Link>
            
              
              <Nav.Link>
               {props.facebookloginreducer.isLogIn&&props.facebookloginreducer.resp.status!="unknown"?"":<LogIn />} 
              </Nav.Link>
            </Navbar.Collapse>
            
            <Navbar.Brand>
           { props.facebookloginreducer.isLogIn&&props.facebookloginreducer.resp.status!=="unknown"? <img  className='rounded-right rounded-left rounded-bottom rounded-top img-responsive ' src={props.facebookloginreducer.resp.picture.data.url}/>:""}
            </Navbar.Brand>
          </Navbar>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    fbmongodbreducer:state.fbmongodbreducer,
    mongologinreduxer:state.mongologinreduxer,
    allposts: state.allPostsReducer,
    facebookloginreducer: state.facebookloginreducer,
    getIdForReplayReducer: state.getIdForReplayReducer,
    checkpagetypereducer: state.checkpagetypereducer,
  };
};
export default connect(mapStateToProps, {
  getIdForReplay,
  loadAllPost,
  getnumberOfReplies,

 
 fetchuser
})(Header);
