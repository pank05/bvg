import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
 
 export const postFieldAPI = createAsyncThunk(
  'postFieldAPI',
  async (data)=>{
    let formData = new FormData();
  formData.append('profile',data.profile || '');
  formData.append('userType','FieldExecutive' || '');
  formData.append('username',data.name || '');
  formData.append('address',data.address|| '');
  formData.append('contact_no',data.contact_number || 0);
  formData.append('email',data.email || '');
  formData.append('password',data.password || '');
  formData.append('reset_password',data.reset_pass || '');
  formData.append('region',data.area || '');
  formData.append('company_id',data.company_name || '');

    const response = await axios.post('/user/create',formData,{
      headers:{
        "Content-Type": "multipart/form-data",
        Authorization : `Bearer ${localStorage.getItem('_token') }`
      }
    });
    return response.data;
  }
)

export const getAllFieldAPI = createAsyncThunk(
  'getAllFieldAPI',
  async () => {
    // admin,employee
    const response  =  await axios.get(`/user/all?userType=FieldExecutive`,{
          headers: {
            Authorization : `Bearer ${localStorage.getItem('_token') }`
          }
         });
         return response.data;
  } )

  export const getFieldById = createAsyncThunk(
    'getFieldById',
    async (id,data) => {
      const response  =  await axios.get(`/user/${id}?userType=FieldExecutive`,data,{
            headers: {
              Authorization : `Bearer ${localStorage.getItem('_token') }`
            }
           });
           return response.data;
    } )

    export const updateFieldById = createAsyncThunk(
      'updateFieldById',
      async (data) => {
        let updateData = {
          username:data.name,
          contact_no:data.contact_number,
          userType:'FieldExecutive',
          email:data.email,
          password:data.Password,
          reset_password:data.reset_pass,
          companies:
          {
            id:data.company_name
          },
          image_url:data.image_url,
          userDetail:
          {
            address:data.address,
            region:data.area,
          }
      };
        const response  =  await axios.put(`/user/${data.id}`,updateData,{
          headers:{
          Authorization : `Bearer ${localStorage.getItem('_token') }`
        }
      });
        return response.data;
      } )

    export const deleteFieldById = createAsyncThunk(
      'deleteFieldById',
      async (id) => {
        const response  =  await axios.delete(`/user/${id}?userType=FieldExecutive`,{
              headers: {
                Authorization : `Bearer ${localStorage.getItem('_token') }`
              }
             });
             return response.data;
      } )

export const fieldExecutiveSlice = createSlice({
  name: 'field',
  initialState: {
    list: [],
    count:0,
  },
  reducers: {

  },
  extraReducers:(builder) =>{

    builder.addCase(postFieldAPI.fulfilled, (state, data) =>{
     state.list.push({id:state.list,...data.payload});
  })

  builder.addCase(getFieldById.fulfilled, (state, data) =>{
    })

    builder.addCase(updateFieldById.fulfilled,(state,data)=>{
    })

  builder.addCase(getAllFieldAPI.fulfilled, (state, action) =>{
    state.list=action.payload.map((item)=>{

      let tmpData = {
        id:item.id,
        key:item.id,
        name:item.username,
        address:item?.user_detail?.address,
        contact_number:item.contact_no,
        email:item.email,
        password:item.password,
        reset_pass:item.reset_password,
        image_url:item.profile,
        company_name:item?.companies[0]?.name,
        area:item?.user_detail?.region,
      };
      return tmpData;
    })    
  })

  builder.addCase(deleteFieldById.fulfilled,(state,data,index)=>{
    const users = state.list;
      users.splice(index, 1);
      data.payload(users);
  })

}
})
export const {  } = fieldExecutiveSlice.actions

export default fieldExecutiveSlice.reducer