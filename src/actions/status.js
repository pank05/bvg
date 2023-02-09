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

    export const statusSlice = createSlice({
        name: 'status',
      initialState: {
        list: [],
        count:0,

      },
      reducers: {
    
      },
    extraReducers: (builder) => {
        builder.addCase(getStatusList.fulfilled, (state, action) =>{
            let list = [...state.list,...action.payload];
            state.list= uniqBy(list,'id');
        })
    }
})
export const { } = statusSlice.actions

export default statusSlice.reducer