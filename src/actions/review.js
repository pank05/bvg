import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateAuditCaseDetails = createAsyncThunk(
  'updateAuditCaseDetails',
   async (data) => {
    const response  =  await axios.put(`/auditcall/${data.id}`,data,
    {
      headers:{
      Authorization : `Bearer ${localStorage.getItem('_token') }`
    }
  });
    return response.data;
  } )

  export const getAllAuditCase = createAsyncThunk(
    'getAllAuditCase',
    async ({id,status}) => {
      const response  =  await axios.post(`/auditcall/${id}`,{
        status
      },{
            headers: {
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
    getReview: state => {
      // state.list=(afterVerificationData || []);
      // state.count =afterVerificationData.length || 0;
    },
    saveReview:(state,data)=>{
      const record=data.payload;
      const saveRecord=state.list.find((val)=> val.id ===record);
      if(saveRecord){
      }
    }
  },

 extraReducers: (builder) => {

      builder.addCase(updateAuditCaseDetails.fulfilled,(state,action)=>{
      });
      builder.addCase(getAllAuditCase.fulfilled, (state,action) =>{
        state.list=action.payload ;
      });

  }
  
})
export const { getReview } = reviewSlice.actions

export default reviewSlice.reducer