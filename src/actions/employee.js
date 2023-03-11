import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

export const postEmployeeAPI = createAsyncThunk(
  'postEmployeeAPI',
  async (data)=>{
    let addData = {
      id:data.key,
      userType:'employee',
      username:data.name,
      dob:data.date_of_birth,
      contact_no:data.contact_number,
      alternate_no:data.Alternet_number,
      email:data.email,
      password:data.password,
      reset_password:data.reset_pass,
      company_id:data.select_company,
  };
    const response = await axios.post('/user/create',addData,{
      headers:{
        Authorization : `Bearer ${localStorage.getItem('_token') }`
      }
    });
    return response.data;
  }
)

export const getAllEmployeeAPI = createAsyncThunk(
  'getAllEmployeeAPI',
  async () => {
    const response  =  await axios.get(`/user/all?userType=employee`,{
          headers: {
            Authorization : `Bearer ${localStorage.getItem('_token') }`
          }
         });
         return response.data;
  } )

  export const getEmployeeById = createAsyncThunk(
    'getEmployeeById',
    async (id,data) => {
      const response  =  await axios.get(`/user/${id}?userType=employee`,{
            headers: {
              Authorization : `Bearer ${localStorage.getItem('_token') }`
            }
           });
           return response.data;
    } )

    export const updateEmployeeById = createAsyncThunk(
      'updateEmployeeById',
      async (data) => {
        let updateData = {
            id:data.id,
            userType:'employee',
            username:data.name,
            contact_no:data.contact_number,
            email:data.email,
            password:data.password,
            reset_password:data.reset_pass,
            user_detail:
            {
              contact_no:data.contact_number,
              dob:data.date_of_birth,
              alternate_no:data.Alternet_number,
            },
            companies:{
              id:data.select_company
            }
      };
        const response  =  await axios.put(`/user/${data.id}`,updateData,{
          headers:{
          Authorization : `Bearer ${localStorage.getItem('_token') }`
        }
      });
        return response.data;
      } )

      export const deleteEmployeeById = createAsyncThunk(
        'deleteEmployeeById',
        async (id) => {
          const response  =  await axios.delete(`/user/${id}?userType=employee`,{
                headers: {
                  Authorization : `Bearer ${localStorage.getItem('_token') }`
                }
               });
               return response.data;
        } )

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    list: [],
    count:0,
  },
  reducers: {

  },

  extraReducers:(builder) =>{

      builder.addCase(postEmployeeAPI.fulfilled, (state, data) =>{
    // state.list.push({id:state.list,...data.payload});
    })

    builder.addCase(getEmployeeById.fulfilled, (state, data) =>{
      })

      builder.addCase(updateEmployeeById.fulfilled,(state,data)=>{
      })
      
    builder.addCase(getAllEmployeeAPI.fulfilled, (state, action) =>{
      state.list=action.payload.map((item,key)=>{
        let tmpData = {
          id:item.id,
          key:item.id,
          name:item.username,
          date_of_birth:item?.user_detail?.dob,
          contact_number:item.contact_no,
          Alternet_number:item?.user_detail?.alternate_no,
          email:item.email,
          password:item.password,
          reset_pass:item.reset_password,
          select_company:item?.companies[0]?.name,
        };
        return tmpData;
      })    
    })

    builder.addCase(deleteEmployeeById.fulfilled,(state,data,index)=>{
      // const users = state.list;
      //   users.splice(index, 1);
      //   data.payload(users);
    })
  }
})
export const {} = employeeSlice.actions

export default employeeSlice.reducer