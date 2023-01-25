import { createSlice } from '@reduxjs/toolkit'
import { appStatusData } from '../constant/caseStatus';
export const appStatusSlice = createSlice({
  name: 'appStatus',
  initialState: {
    list: [],
    count:0,
  },
  reducers: {
    getAppStatus: state => {
      console.log("getappStatus",state.list)
      state.list=(appStatusData || []);
      state.count =appStatusData.length || 0;
    },

  }
})
export const { getAppStatus } = appStatusSlice.actions

export default appStatusSlice.reducer