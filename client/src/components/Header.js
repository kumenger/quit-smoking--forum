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
      <Link to="/NewPost" style={{fontSize:"12px",background:"#055C9D"}}>
        <h5 className='btn btn-secondary border'>Create Post</h5>
      </Link>
    ) : 
      
       
      ""
     
    
   
  };
  const showwhenidonreplay = () => {
    return props.facebookloginreducer.isLogIn&&props.facebookloginreducer.resp.status!="unknown" ||props.mongologinreduxer.isAuthenticated ? (
      <Link
      style={{background:"#055C9D"}}
        to={`/ReplayTOPost/${props.getIdForReplayReducer.id}`}
      >
        {" "}
        <h5 className='btn btn-secondary border'>Comment</h5>
      </Link>
    ) : ""

   
  };

  return (
    <div
     style={{background:"#145DA0"}}
     
    >
      <div
        className="row borderrounded-right rounded-left rounded-bottom rounded-top  "
       
      >
        <div className="col-md-12">
          <Navbar expand="md" >
            <Navbar.Toggle aria-controls="responsive-navbar-nav" id='toggler' />
            <Navbar.Brand>
            <Link to="/" onClick={() => getIdForReplay(null)}>
                   <h5  className='btn btn-secondary border' style={{background:"#055C9D"}}><img src="https://img.icons8.com/cotton/25/null/home--v3.png"/> Home </h5>
                  </Link>
            </Navbar.Brand>
            <Navbar.Brand>
            { props.facebookloginreducer.isLogIn&&!props.facebookloginreducer.resp.status ||props.mongologinreduxer.isAuthenticated? "":<div><h5 ><Link to="/signup" className='btn btn-secondary border 'style={{background:"#055C9D"}}><img src="https://img.icons8.com/fluency/20/null/petition.png"/> Register</Link></h5> </div>  }
            </Navbar.Brand>
            <Navbar.Brand>
            <Link to="/stories" onClick={() => getIdForReplay(null)}>
                   <h5  className='btn btn-secondary border' style={{background:"#055C9D"}}><img src="https://img.icons8.com/color/20/null/storytelling.png"/> Stories </h5>
                  </Link>
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
