import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {uniqBy} from 'lodash'

export const getStatusList = createAsyncThunk(
    'getStatusList',
    async ({reference,type,label=[]}) => { 
      const response  =  await axios.post(`/status/list`,{reference,type,label},{
            headers: {
              Authorization : `Bearer ${localStorage.getItem('_token') }`
            }
           });
           return response.data;
    } )

export const getReportingTatStatus = createAsyncThunk(
      'getReportingTatStatus',
      async (emplyementType) => { 
        const response  =  await axios.get(`/report/tat-report?emplyementType=${emplyementType}`,{
              headers: {
                Authorization : `Bearer ${localStorage.getItem('_token') }`
              }
             });
             return response.data;
      } )
      
export const getReportingTatStatusForEmployee =createAsyncThunk(
        'getReportingTatStatusForEmployee',
        async () => { 
          const response  =  await axios.get(`/report/tat-report-emp`,{
                headers: {
                  Authorization : `Bearer ${localStorage.getItem('_token') }`
                }
               });
          return response.data;
        } )

    export const statusSlice = createSlice({
        name: 'status',
      initialState: {
        list: [],
        tatList:{},
        tatListEmp:{},
        count:0,

      },
      reducers: {
    
      },
    extraReducers: (builder) => {
        builder.addCase(getStatusList.fulfilled, (state, action) =>{
            let list = [...state.list,...action.payload];
            state.list= uniqBy(list,'id');
        })


        builder.addCase(getReportingTatStatus.fulfilled,(state,action)=>{
          state.tatList=action.payload;   
        })

        builder.addCase(getReportingTatStatusForEmployee.fulfilled,(state,action)=>{
          state.tatListEmp=action.payload;   
        })

    }


})
export const { } = statusSlice.actions

export default statusSlice.reducer