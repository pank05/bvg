import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";

const Httpcall=(datalink,res)=>{
    const [array, Setarray]=useState();
    const [fname, Setfname]=useState();
    const [lname,Setlname]=useState();
  
    axios.get(`https://reqres.in/api/users?page=2`)
    .then((datalink)=>{
        console.log("our data",datalink)
    }) 

 function Submit(){
axios.post('https://reqres.in/api/users', {
  method: 'POST',
  body: JSON.stringify({
    name: fname ,
    job: lname ,
  }),
})
  .then((res) => console.log('our title data', res)
  

  )} 
    return(
        <> 
     
     welcome 

      <input type="text"  onChange={(e)=>{Setfname(e.target.value)}}/> <br/>
      <input type="text" onChange={(e)=>{Setlname(e.target.value)}}/>    
      <button onClick={()=>Submit()}> submit </button>
      
        </>
    )

}
export default Httpcall;