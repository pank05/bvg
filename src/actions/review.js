import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateAddrescaseDetails= createAsyncThunk(
  'updateAddrescaseDetails',
   async (data) => {
    const response  =  await axios.put(`/verification/${data.id}`,data,
    {
      headers:{
      Authorization : `Bearer ${localStorage.getItem('_token') }`
    }
  });
    return response.data;
  } )

  export const updateAddressAuditCaseDetails = createAsyncThunk(
  'updateAddressAuditCaseDetails',
   async (data) => {
    const response  =  await axios.put(`/verification/audit/${data.id}`,data,
    {
      headers:{
      Authorization : `Bearer ${localStorage.getItem('_token') }`
    }
  });
    return response.data;
  } )


const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    list: [],
    count:0,
  },
  reducers: {

    saveReview:(state,data)=>{
      const record=data.payload;
      const saveRecord=state.list.find((val)=> val.id ===record);
      if(saveRecord){
      }
    }
  },

 extraReducers: (builder) => {

      builder.addCase(updateAddrescaseDetails.fulfilled,(state,payload)=>{

      });

      builder.addCase(updateAddressAuditCaseDetails.fulfilled,(state,action)=>{
      });


  }
  
})
export const {  } = reviewSlice.actions

export default reviewSlice.reducer