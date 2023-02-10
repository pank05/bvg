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

    export const getByIdAuditCase = createAsyncThunk(
      'getByIdAuditCase',
      async (id) => {
      const response  =  await axios.post(`/auditcall/${id}`,
      {
        headers:{
        Authorization : `Bearer ${localStorage.getItem('_token') }`
      }
    });
         return response.data;
    })

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
      
      builder.addCase(getAllAuditCase.fulfilled, (state,action) =>{
        state.list=action.payload ;
      });
      builder.addCase(getByIdAuditCase.fulfilled, (state, action) =>{
        state.list=action.payload ;
      });

  }
  
})
export const {  } = reviewSlice.actions

export default reviewSlice.reducer