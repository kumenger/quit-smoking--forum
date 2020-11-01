import React from 'react'
import {connect} from 'react-redux'
import { getIdForReplay,loadAllPost } from "../actions";
import { Link } from "react-router-dom";
class LastPost extends React.Component{
  componentDidMount(){
this.props.loadAllPost()
  }
  render(){
      console.log(this.props.allpost)
      if(!this.props.allpost){
          return <div>loding...</div>
      }
      return(

<div>


<div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12 text-center text-primary ">
              <Link
                  onClick={() =>
                    this.props.getIdForReplay(
                     this.props.allpost[this.props.allpost.length - 1]._id
                    )
                  }
                  to={`/PostReplay/${
                   this.props.allpost[this.props.allpost.length - 1]._id
                  }`}
                  style={{ fontSize: "20px" }}
                  className="text-center text-primary"
                >
                  {this.props.allpost[this.props.allpost.length - 1].title}
                </Link>
              </div>

              <div className=" col-md-12">
                <div className="row">
                  
                  <div className="col-md-10 offset-md-1" style={{maxHeight:"70vh",overflow:"scroll"}}>
                    <p  style={{color:"navy",fontFamily:"monospace",fontSize:"15px"}} >
                      {this.props.allpost[this.props.allpost.length - 1].post}
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
            Recent Post by {this.props.allpost[this.props.allpost.length - 1].name} on{" "}
              {this.props.allpost[this.props.allpost.length - 1].time}
            </h6>
          </div>
        </div>

</div>
      )
  }

}
const mapStateToProps=(state)=>{
    return{allpost:Object.values(state.allPostsReducer),
        getIdForReplayReducer: state.getIdForReplayReducer,
    }
}
  
 
  export default connect(mapStateToProps,{getIdForReplay,loadAllPost})(LastPost)