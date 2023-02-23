import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios";

export const getAllCompaniesAPI = createAsyncThunk(
  'getAllCompaniesAPI',
  async ({id,is_active}) => {
    const response  =  await axios.post(`/company/${id}`,{is_active},{
          headers: {
            Authorization : `Bearer ${localStorage.getItem('_token') }`
          }
         });
         return response.data;
  } )

  export const updateCompanyById = createAsyncThunk(
    'updateCompanyById',
    async (data) => {
      let updateData= {};
      if(data.email){
        updateData = {
          name:data.name,
          contact_number:data.contact_number,
          alternate_number:data.alternate_number,
          city:data.city,
          contact_person:data.contact_person,
          email:data.email,
          address:data.address,
          short_name:data.short_name
      };
      }
      const response  =  await axios.put(`/company/${data.id}`,updateData,{
        headers:{
        Authorization : `Bearer ${localStorage.getItem('_token') }`
      }
    });
      return response.data;
    } )

    export const getCompanyDataById = createAsyncThunk(
      'getCompanyDataById',
      async (id) => {
      const response  =  await axios.post(`/company/${id}`,{},{
        headers:{
        Authorization : `Bearer ${localStorage.getItem('_token') }`
      }
    });
         return response.data;
    })

  export const postAddCompaniesAPI = createAsyncThunk(
    'postAddCompaniesAPI',
    async (data)=>{
      const response = await axios.post('/company/create',data,{
        headers:{
          Authorization : `Bearer ${localStorage.getItem('_token') }`
        }});
      return response.data;
    }
  )

  export const softDeleteCaseDataById = createAsyncThunk(
    'softDeleteCaseDataById',
    async (id) => {
    const response  =  await axios.put(`company/delete/${id}`,{},{
      headers:{
        Authorization : `Bearer ${localStorage.getItem('_token') }`
      }
    });
    return response.data;
  })


export const companySlice = createSlice({

  name: 'companies',
  initialState: {
    list: [],
    count:0,
    currentCompany:{},
    getList:[]
  },
  reducers: {
    clearCurrentCompany:(state)=>{
      state.currentCompany ={};
    },
    clearCompanyList:(state)=>{
      state.list =[];
    },
    

  },
  extraReducers:(builder) =>{
      builder.addCase(getAllCompaniesAPI.fulfilled, (state, action) =>{
        state.list=action.payload.map((item,key)=>{
          let tmpData = {
            sr_no: key+1,
            id: item.id,
            name:item.name,
            city:item.city,
            contact_number:item.contact_number,
            address:item.address,
            contact_person:item.contact_person,
            short_name:item.short_name,
            email:item.email,
            is_active:item.is_active
          };
          return tmpData;
        })
      })

      builder.addCase(postAddCompaniesAPI.fulfilled, (state, data) =>{
      state.list.push({id:state.list.length+1,...data.payload});
      })

      builder.addCase(getCompanyDataById.fulfilled, (state, data) =>{
        state.currentCompany = data.payload;
      });
      
      builder.addCase(updateCompanyById.fulfilled, (state, data) =>{
      });

      builder.addCase(softDeleteCaseDataById.fulfilled,(state,data) =>{

      })
      
  }
});

export const {clearCurrentCompany,clearCompanyList} = companySlice.actions

export default companySlice.reducer