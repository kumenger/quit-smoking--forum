export const fbmongodbreducer=(state={data:null},action)=>{
    if(action.type==='FETCH_USER')
      return {...state,data:action.payload}
      return state
   
     
    }