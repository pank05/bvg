import { createSlice } from '@reduxjs/toolkit'
import { profileData } from '../constant/profile';

export const profileSlice =createSlice({
  name: 'profile',
  initialState: {
    list: [],
    count:0,
  },
  reducers: {
    getProfile: state => {
      state.list=(profileData || []);
      state.count =profileData.length || 0;
    },
    addProfile:(state,data) =>{
      state.list.push({id:state.list.length+1,...data.payload});
    }

  }
})
export const { getProfile,addProfile } = profileSlice.actions

export default profileSlice.reducer