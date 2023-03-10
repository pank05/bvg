import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const postAddCaseAPI = createAsyncThunk(
  'postAddCaseAPI',
  async (data)=>{
    const response = await axios.post('/cases/create',data,{
      headers:{
        Authorization : `Bearer ${localStorage.getItem('_token') }`
      }});
    return response.data;
  })

export const bulkAddCases= createAsyncThunk(
  'bulkAddCases',
  async (data)=>{
    const response = await axios.post('/cases/bulk-upload-cases',data,{
      headers:{
        Authorization : `Bearer ${localStorage.getItem('_token') }`
      }});
    return response.data;
  } )

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

  export const getCaseHistoryById = createAsyncThunk(
    'getCaseHistoryById',
    async (id) => {
    const response  =  await axios.get(`/verification/history/${id}`,
    {
      headers:{
      Authorization : `Bearer ${localStorage.getItem('_token') }`
    }
  });
       return response.data;
  })

  export const getCaseUserById = createAsyncThunk(
    'getCaseUserById', 
    async (id) => {
    const response  =  await axios.get(`/cases/case-user-details/${id}`,{
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
      const response  =  await axios.get(`/state/district/${id}`,{
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
      const response  =  await axios.get(`/state/city/${filter.id}${urlParam}`,{
        headers:{
        Authorization : `Bearer ${localStorage.getItem('_token') }`
      }
    });
         return  response.data;
    })

    export const getAllStates = createAsyncThunk(
      'getAllStates',
      async (id) => {
        const response  =  await axios.get(`/state/list/${id}`,{
          headers:{
            Authorization : `Bearer ${localStorage.getItem('_token') }`
          }
             });
             return response.data;
      } )

      export const getTATCases = createAsyncThunk(
        'getTATCases',
        async ({id}) => {
          const response  =  await axios.get(`/cases/tat/${id}`,{
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
    currentCase:{},
    caseDetails:{},
    caseHistory:[],
    caseUserDetails:[],
    tatCase:[]
  },
  reducers: {
    clearCurrentCase:(state)=>{
      state.currentCase ={};
    },
  },
  extraReducers: (builder) => {

    builder.addCase(getTATCases.fulfilled,(state,action)=>{
      state.tatCase = action.payload;
    })

      builder.addCase(postAddCaseAPI.fulfilled, (state, data) =>{
      })

      builder.addCase(bulkAddCases.fulfilled,(state,data)=>{
      })

      builder.addCase(deleteCaseDataById.fulfilled,(state,data,index)=>{
        const users = state.list;
        users.splice(index, 1);
        data.payload=(users);
      })

      builder.addCase(getCaseHistoryById.fulfilled,(state,action)=>{
        state.caseHistory = action.payload;
      })
      
      builder.addCase(getCaseUserById.fulfilled,(state,action)=>{
        state.caseUserDetails= action.payload[0];
      })

      builder.addCase(getCaseDataById.fulfilled, (state, action) =>{
        state.caseDetails = action.payload[0];
      });
       
      builder.addCase(updateCaseById.fulfilled,(state,action)=>{
      });

      builder.addCase(getAllCaseAPI.fulfilled, (state,action) =>{
        state.list=action.payload.map((item)=>{
          let tmpData = {
            id:item.id,
            companyId:item.company_name,
            checkId:item.check_id,
            candidateName:item.candidate_name,
            fatherName:item.father_name,
            contactNo:item.contact_no,
            alternateNo:item.alternate_no, 
            city:item.city_name,
            verificationType:item.verification_type,
            address:item.address,
            district:item.district_name,
            state:item.state_name, 
            pincode:item.pincode,
            landmark:item.location,
            resumeId:item.resume_id,
            durationEnd:item.duration_end,
            durationStart:item.duration_start,
            email:item.email,
            clientName:item.client_name ,
            status:item.label,
            tatStatus:item?.inTAT
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
export const { clearCurrentCase} = verificationSlice.actions

export default verificationSlice.reducer