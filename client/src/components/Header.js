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
        Create Post
      </Link>
    ) : 
      
       
      ""
     
    
   
  };
  const showwhenidonreplay = () => {
    return props.facebookloginreducer.isLogIn&&props.facebookloginreducer.resp.status!="unknown" ||props.mongologinreduxer.isAuthenticated ? (
      <Link
        className=" blink blink btn btn-primary "
        to={`/ReplayTOPost/${props.getIdForReplayReducer.id}`}
      >
        {" "}
        Comment 
      </Link>
    ) : ""

   
  };

  return (
    <div
      className="" 
     
    >
      <div
        className="row borderrounded-right rounded-left rounded-bottom rounded-top  "
       
      >
        <div className="col-md-12">
          <Navbar expand="md" >
            <Navbar.Toggle aria-controls="responsive-navbar-nav" id='toggler' />
            <Navbar.Brand>
            <Link to="/" onClick={() => getIdForReplay(null)}>
                   <h5  className='btn btn-secondary' style={{fontSize:"12px",background:"brown"}}><strong><img src="https://img.icons8.com/material-outlined/24/null/home-page.png"/> Home</strong> </h5>
                  </Link>
            </Navbar.Brand>
            <Navbar.Brand>
            { props.facebookloginreducer.isLogIn&&!props.facebookloginreducer.resp.status ||props.mongologinreduxer.isAuthenticated? "":<div><h5 ><Link to="/signup" className='btn btn-secondary 'style={{fontSize:"12px",background:"brown"}}><strong><img src="https://img.icons8.com/external-bearicons-detailed-outline-bearicons/30/null/external-signup-call-to-action-bearicons-detailed-outline-bearicons.png"/> Register</strong></Link></h5> </div>  }
            </Navbar.Brand>
           
           
           <Navbar.Brand style={{fontSize:"12px"}}>
           {props.checkpagetypereducer.page === true
                ? window.location.href.indexOf("PostReplay") != -1
                  ? showwhenidonreplay()
                  : showwhneishome()
                : ""}
           </Navbar.Brand>
          
   
            <Navbar.Collapse id="basic-navbar-nav" >
              <Nav className='mr-auto'>

              </Nav>
              <Nav>
              <Nav.Link>
              {props.mongologinreduxer.isAuthenticated?"":<FacebookLogin/>}
              </Nav.Link>
            
              
              <Nav.Link>
               {props.facebookloginreducer.isLogIn&&props.facebookloginreducer.resp.status!="unknown"?"":<LogIn />} 
               
              </Nav.Link> 

               
              </Nav>
               
              
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
