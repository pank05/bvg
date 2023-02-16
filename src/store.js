import { configureStore } from '@reduxjs/toolkit';
import companyReducer from './actions/company';
import employeeReducer from './actions/employee';
import fieldReducer from './actions/fieldexctive';
import reviewReducer from './actions/review';
import verificationReducer from './actions/verification';
import userAuthSlice from './actions/user';
import statusSlice  from './actions/status';
export const store = configureStore({
  reducer: {
    company:companyReducer,
    employee:employeeReducer,
    field:fieldReducer,
    reviews:reviewReducer,
    verification:verificationReducer,
    user:userAuthSlice,
    status:statusSlice
  }
})