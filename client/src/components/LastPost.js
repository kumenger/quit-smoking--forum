import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import { getIdForReplay,  getlastPOst,loadAllPost } from "../actions";
import { Link } from "react-router-dom";

 const LastPost=(props)=>{
   
  
useEffect(()=>{
    props.loadAllPost()
    props.getlastPOst(props.allposts[props.allposts.length-1]._id)
},[])
    

  
  

 
     
      if(!props.getlastPostReducer.lastpost){
          return <div className='text-center text-white'>Getting Last Post...</div>
      }
     
      return(


<div className="row">

<div className="row">
<div className="col-md-12">
  <div className="row">
    <div className="col-md-12 text-center text-primary ">
    <Link
        onClick={() =>
        props.getIdForReplay(
          props.getlastPostReducer._id
          )
        }
      to={`/PostReplay/${
       props.getlastPostReducer.lastpost._id
        }`}
        style={{ fontSize: "20px" }}
        className="text-center text-white"
      >
       <u>{props.getlastPostReducer.lastpost.title}</u> 
      </Link>
    </div>

    <div className=" col-md-12">
      <div className="row">
        
        <div className="col-md-10 offset-md-1" >
          <p  style={{color:"whitesmoke",fontFamily:"monospace",fontSize:"16px"}}
          dangerouslySetInnerHTML={{__html:`${props.getlastPostReducer.lastpost.post}`}}
          
          / >
           
         
        </div>
        <br></br>
      </div>
    </div>
  </div>
</div>

<div className="col-md-12">
<br></br>
  <h6 className=" text-info text-center">
  Recent Post by {props.getlastPostReducer.lastpost.name} on{" "}
    {props.getlastPostReducer.lastpost.time}
  </h6>
</div>
</div> 
</div> 
      )
  }


const mapStateToProps=(state)=>{
    return{
        getlastPostReducer:state.getlastPostReducer,
        getIdForReplayReducer: state.getIdForReplayReducer,
        allposts: Object.values(state.allPostsReducer),

    }
}
  
 
  export default connect(mapStateToProps,{getIdForReplay,getlastPOst,loadAllPost})(LastPost)