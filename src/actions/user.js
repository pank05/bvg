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

const userAuthSlice = createSlice({
  name: 'user',
  initialState: {
    isAuth:false,
    userProfile:{}
  },
  reducers: {

  },
  extraReducers:(builder) =>{
    builder.addCase(authUserData.fulfilled, (state, action) =>{
       state.isAuth = true;
       state.userProfile =action.payload;
    })
    builder.addCase(authUserData.rejected, (state, action) =>{  
        state.isAuth = false;
    });

  },
})

export const { } = userAuthSlice.actions
export default userAuthSlice.reducer