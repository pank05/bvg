import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios";

export const authUserData = createAsyncThunk(
    'authUserData',
    async (data) => {
    const response = await axios.post('accounts/authenticate',data);
           if(response.status === 200){
            if (response.data.jwtToken) {
                localStorage.setItem("_token", response.data.jwtToken);
              }
           }else {
            response.data ={};
           }
       return response.data;
  });


  export const getDetails = createAsyncThunk(
    'getDetails',
    async () => {
      const response  =  await axios.get(`/user/details`,{
            headers: {
              Authorization : `Bearer ${localStorage.getItem('_token') }`
            }
           });
           return response.data;
    } )

const userAuthSlice = createSlice({
  name: 'user',
  initialState: {
    isAuth:false,
    userProfile:{}
  },
  reducers: {
    logout(state){
      state.isAuth = false;
    }
  },
  extraReducers:(builder) =>{
    builder.addCase(authUserData.fulfilled, (state, action) =>{
       state.isAuth = true;
       state.userProfile =action.payload;
    })
    builder.addCase(authUserData.rejected, (state, action) =>{  
        state.isAuth = false;
    });
    builder.addCase(getDetails.fulfilled, (state, action) =>{
      state.isAuth = true;
      state.userProfile =action.payload;
   });
   builder.addCase(getDetails.rejected, (state, action) =>{
    state.isAuth = false;
 })

  },
})

export const { logout} = userAuthSlice.actions
export default userAuthSlice.reducer