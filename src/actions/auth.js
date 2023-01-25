
import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";

export const userTokenSlice = createSlice({
    name:'token',
  initialState: 
    {
        jwtToken: [],
        count:0,
    },
    reducers: {
         handleToken:(response)=>{
            // localStorage.setItem('jwt_token',response.headers.authenticate);
          //   axios.post('/accounts/authenticate',{
               
          //       jwtToken:response
            
          //    }).then((res) => console.log('login data', res)
          //      )
           }
      }
})
export const {  handleToken } = userTokenSlice.actions
export default userTokenSlice.reducer