import React, {useState, useEffect} from "react";

const home = () => {
    return (
        <div className="container-fluid bg-light"  >
        <div style={{ height:"80vh",paddingTop:"30px"}}
          className="row  t-.25"
          
        >
          
         
          <div className="offset-md-1 col-md-5   "  >
             
          <img className="img-fluid" src='https://i.ibb.co/RvRdq8m/img-utp-OTTjdn-EAT5-Rl-Fl3-F19r-Ix.png'/>
          
          </div>
          
          <div className="col-md-4    "  style={{letterSpacing:"1px"}} >
             
          <h2 style={
                        {
                            color: "navy",
                            textAlign: "center"
                        }
                    }>Quitting Never
                    Felt So Good.</h2>

                    <h4 style={
                        {
                            color: "brown",
                            fontFamily: "",
                         
                            textAlign: "center"
                        }
                    }>
                        <strong> 1 hour after Quit Smoking...</strong>
                    </h4>
                    <p classname="  text-left"
                        style={
                            {
                                color: "",
                                fontFamily: "",
                                
                                fontWeight: "bold"
                            }
                    }>
                        In as little as 20 minutes after the last cigarette is smoked, the
                                                              heart rate drops and returns to normal
                        <img src="https://img.icons8.com/bubbles/30/null/happy.png"/>. Blood pressure begins to
                                                              drop, and circulation may start to improve.

                    </p>
                    <h4 style={
                        {
                            color: "brown",
                            fontFamily: "",
                           
                            textAlign: "center"
                        }
                    }>
                        <strong>
                             12 hours...
                        </strong>
                    </h4>
                    <p classname=" text-left"
                        style={
                            {
                                color: "",
                                fontFamily: "",
                              
                                fontWeight: "bolder"
                            }
                    }>
                        After just 12 hours
                                                              without a cigarette, the body cleanses itself of the excess carbon
                                                              monoxide from the cigarettes.<img src="https://img.icons8.com/bubbles/30/null/happy.png"/>
                        The carbon monoxide level returns to
                                                              normal, increasing the body’s oxygen levels
                    </p>
                    <h4 style={
                        {
                            color: "brown",
                            fontFamily: "",
                         
                            textAlign: "center"
                        }
                    }>
                        <strong>one  day...</strong>
                    </h4>
                    <p classname="text-left"
                        style={
                            {
                                color: "",
                                fontFamily: "",
                               
                                fontWeight: "bolder"
                            }
                    }>
                        Just 1 day after quitting smoking, the risk of heart attack begins
                                                              to decrease
                        <img src="https://img.icons8.com/bubbles/30/null/happy.png"/>. Smoking raises the risk of developing coronary heart
                                                              disease by lowering good cholesterol, which makes heart-healthy
                                                              exercise harder to do.
                    </p>
                    <h4 style={
                        {
                            color: "brown",
                            fontFamily: "",
                        
                            textAlign: "center"
                        }
                    }>
                        <strong>two day....</strong>
                    </h4>
                    <p classname="text-left"
                        style={
                            {
                                color: "",
                               
                                fontWeight: "bolder",
                                fontFamily: ""
                            }
                    }>
                        Smoking damages the nerve endings responsible for the senses of
                                                              smell and taste. In as little as 2 days after quitting, a person
                                                              may notice a heightened sense of smell
                        <img src="https://img.icons8.com/bubbles/30/null/happy.png"/>
                        and more vivid tastes as
                                                              these nerves heal.
                    </p>

            
          </div>
          
        
        </div>
        <br></br>
        </div>
       
    )
}
export default home
