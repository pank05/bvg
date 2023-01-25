import { createSlice } from '@reduxjs/toolkit';
import { DeleteVarData } from '../constant/deleteVar';
export const deleteSlice = createSlice({
  name: 'delete',
  initialState: {
    list: [],
    count:0,
  },
  reducers: {
    getDelete: state => {
      state.list=(DeleteVarData || []);
      state.count =DeleteVarData.length || 0;
    },
    deleteDispatch:(state,data)=>{
      const index=data.payload;
      const remove=state.list.filter(todo=> todo.id !== index  )
      state.list=remove;
    }
  }
})
export const { getDelete,deleteDispatch } = deleteSlice.actions

export default deleteSlice.reducer