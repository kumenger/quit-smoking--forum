import React from 'react'
import {connect} from 'react-redux'
import { getIdForReplay,loadAllPost } from "../actions";
import { Link } from "react-router-dom";
import axios from 'axios'
class LastPost extends React.Component{
    state={data:[],id:""}
  componentDidMount(){
    async function get(){
        const resp=await axios.get('http://localhost:8000/post/posts')
            this.setState({data:resp.data})
        
       } 

  
  }

  render(){
     
      if(!this.state.data){
          return <div>loding...</div>
      }
      console.log(this.state.data);
      return(


<div >
<div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12 text-center text-primary ">
              <Link
                  onClick={() =>
                    this.props.getIdForReplay(
                     this.state.id
                    )
                  }
                to={`/PostReplay/${
                  this.state.id
                  }`}
                  style={{ fontSize: "20px" }}
                  className="text-center text-primary"
                >
                  {this.state.data.title}
                </Link>
              </div>

              <div className=" col-md-12">
                <div className="row">
                  
                  <div className="col-md-10 offset-md-1" style={{maxHeight:"70vh",overflow:"scroll"}}>
                    <p  style={{color:"navy",fontFamily:"monospace",fontSize:"15px"}} >
                      {this.state.data.post}
                    </p>
                  </div>
                  <br></br>
                </div>
              </div>
            </div>
          </div>
         
          <div className="col-md-12">
          <br></br>
            <h6 className=" text-info text-center">
            Recent Post by {this.state.data.name} on{" "}
              {this.state.data.time}
            </h6>
          </div>
        </div>     



</div>
      )
  }

}
const mapStateToProps=(state)=>{
    return{
        allpost:Object.values(state.allPostsReducer),
        getIdForReplayReducer: state.getIdForReplayReducer,
    }
}
  
 
  export default connect(mapStateToProps,{getIdForReplay,loadAllPost})(LastPost)