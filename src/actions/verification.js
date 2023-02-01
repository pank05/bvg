import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const postAddCaseAPI = createAsyncThunk(
  'postAddCaseAPI',
  async (data)=>{
    let addData = {
            company_id:data.companyId,
            check_id:data.checkId,
            candidate_name:data.candidateName,
            father_name:data.fatherName,
            contact_no:data.contactNo,
            alternate_no:data.alternateNo,
            city_id:data.city,
            client_name:data.clientName,
            state_id:data.state,
            verification_type:data.verificationType,
            pincode:data.pincode,
            address:data.address,
            district_id:data.district,
            // duration_end:data.duration,
            // EMP:data.latest_version,
            // FE:data.latest_version,
            location:data.landmark,
            resume_id:data.resumeId,
            duration_start:(new Date),
  };
    const response = await axios.post('/cases/create',addData,{
      headers:{
        Authorization : `Bearer ${localStorage.getItem('_token') }`
      }});
    return response.data;
  })

export const getAllCaseAPI = createAsyncThunk(
  'getAllCaseAPI',
  async ({id,status}) => {
    const response  =  await axios.post(`/cases/list/${id}`,{
      status
    },{
          headers: {
            Authorization : `Bearer ${localStorage.getItem('_token') }`
          }
         });
         return response.data;
  } )

  export const getCaseDataById = createAsyncThunk(
    'getCaseDataById',
    async (id) => {
    const response  =  await axios.get(`/cases/${id}`,
    {
      headers:{
      Authorization : `Bearer ${localStorage.getItem('_token') }`
    }
  });
       return response.data;
  })

  export const deleteCaseDataById = createAsyncThunk(
    'deleteCaseDataById',
    async (id) => {
    const response  =  await axios.delete(`/cases/${id}`,{
      headers:{
      Authorization : `Bearer ${localStorage.getItem('_token') }`
    }
  });
       return response.data;
  })

  export const updateCaseById = createAsyncThunk(
    'updateCaseById',
     async (data) => {
      const response  =  await axios.put(`/cases/${data.id}`,data,
      {
        headers:{
        Authorization : `Bearer ${localStorage.getItem('_token') }`
      }
    });
      return response.data;
    } )

    export const getDistrictById = createAsyncThunk(
      'getDistrictById',
      async (id,data) => {
      const response  =  await axios.get(`/state/district/${id}`,data,{
        headers:{
        Authorization : `Bearer ${localStorage.getItem('_token') }`
      }
    });
         return response.data;
    })

    export const getCityBySearch = createAsyncThunk(
      'getCityBySearch',
      async (filter) => {
        let urlParam = filter.name ? `?name=${filter.name}` : '';
      const response  =  await axios.get(`state/city/${filter.id}${urlParam}`,{},{
        headers:{
        Authorization : `Bearer ${localStorage.getItem('_token') }`
      }
    });
         return  response.data;
    })

export const getAllStates = createAsyncThunk(
      'getAllStates',
      async (id) => {
        const response  =  await axios.get(`state/list/${id}`,{
              headers: {
                Authorization : `Bearer ${localStorage.getItem('_token') }`
              }
             });
             return response.data;
      } )

export const verificationSlice = createSlice({
    name: 'verification',
  initialState: {
    list: [],
    count:0,
    stateList:[],
    districtList:[],
    cityList:[],
    currentCase:{}
  },
  reducers: {

  },
  extraReducers: (builder) => {
      builder.addCase(postAddCaseAPI.fulfilled, (state, data) =>{
        // state.list.push(data.payload);
        //  state.list.push({id:state.list.length+1,...data.payload});
      })

      builder.addCase(deleteCaseDataById.fulfilled,(state,data,index)=>{
        const users = state.list;
        users.splice(index, 1);
        data.payload=(users);
      })

      builder.addCase(getCaseDataById.fulfilled, (state, action) =>{
      });
       
      builder.addCase(updateCaseById.fulfilled,(state,action)=>{
      });

      builder.addCase(getAllCaseAPI.fulfilled, (state,action) =>{
        state.list=action.payload.map((item)=>{
          let tmpData = {
            id:item.id,
            companyId:item.company_id,
            checkId:item.check_id,
            candidateName:item.candidate_name,
            fatherName:item.father_name,
            contactNo:item.contact_no,
            alternateNo:item.alternate_no, 
            city:item.city_id,
            verificationType:item.verification_type,
            address:item.address,
            district:item.district_id,
            state:item.state_id, 
            pincode:item.pincode,
            EMP:item.assigned_to,
            FE:item.assigned_by, 
            landmark:item.location,
            resumeId:item.resume_id,
            durationEnd:item.duration_end,
            durationStart:item.duration_start,
            email:item.email,
            assignedTo:item?.caseHistory?.assigned_to,
            assignedBy:item.assigned_by,
            clientName:item.client_name ,
            status:item.label,
            audit_call_done:item.audit_call_done,
            audit_call_done_remark:item.audit_call_done_remark,
        audit_call_status:item.audit_call_status,
        audit_call_status_remark:item.audit_call_status_remark,
        audit_case_status_id:item.audit_case_status_id,
        audit_case_status_remark:item.audit_case_status_remark,
          };
          return tmpData;
        })    
      });

      builder.addCase(getAllStates.fulfilled, (state,action) =>{
        state.stateList=action.payload;   
      });

      builder.addCase(getDistrictById.fulfilled, (state,action) =>{
        state.districtList=action.payload;   
      });

      builder.addCase(getCityBySearch.fulfilled,(state,action)=>{
        state.cityList=action.payload;
      })
  }
  
})
export const { } = verificationSlice.actions

export default verificationSlice.reducer