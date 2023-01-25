import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios";

export const getAllCompaniesAPI = createAsyncThunk(
  'getAllCompaniesAPI',
  async (id) => {
    const response  =  await axios.get(`/company/${id}`,{
          headers: {
            Authorization : `Bearer ${localStorage.getItem('_token') }`
          }
         });
         return response.data;
  } )

  export const updateCompanyById = createAsyncThunk(
    'updateCompanyById',
    async (data) => {
      let updateData = {
        name:data.name,
        contact_number:data.contact_number,
        alternate_number:data.alternate_number,
        city:data.city,
        contact_person:data.contact_person,
        email:data.email,
        address:data.address,
        short_name:data.short_name
    };
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
      const response  =  await axios.get(`/company/${id}`,{
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
  
export const companySlice = createSlice({

  name: 'companies',
  initialState: {
    list: [],
    count:0,
    currentCompany:{}
  },
  reducers: {
    clearCurrentCompany:(state)=>{
      state.currentCompany ={};
    },
   
    // addCompany:(state,data) =>{
    //   state.list.push({id:state.list.length+1,...data.payload});
    // },

    // updateCompany:(state,data) =>{
    //   let updateRecord = data.payload;
    //   let record =  state.list.find((val)=>val.id===updateRecord.id);
    //   if(record){
    //     record.city = updateRecord.city;
    //     record.name = updateRecord.name;
    //     record.contact_number = updateRecord.contact_number;
    //     record.contact_person = updateRecord.contact_person;
    //     record.email = updateRecord.email;
    //     record.address = updateRecord.address;
    //     record.short_name = updateRecord.short_name;
    //   }
    // },
    
    deleteCompany:(state,data) =>{
      const index = data.payload;
      const newTodos = state.list.filter(todo => todo.id !== index)
      state.list = newTodos
    }
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
            email:item.email
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
      
  }
});

export const {deleteCompany,clearCurrentCompany} = companySlice.actions

export default companySlice.reducer