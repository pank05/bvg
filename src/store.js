import { configureStore } from '@reduxjs/toolkit';
import companyReducer from './actions/company';
import employeeReducer from './actions/employee';
import fieldReducer from './actions/fieldexctive';
import deleteReducer from './actions/delete';
import reviewReducer from './actions/review';
import verificationReducer from './actions/verification';
import tokenReducer from './actions/auth';
import appStatusSlice from './actions/appStatus';
import profileReducer from './actions/profile';
import userAuthSlice from './actions/user';
import statusSlice  from './actions/status';
export const store = configureStore({
  reducer: {
    company:companyReducer,
    employee:employeeReducer,
    field:fieldReducer,
    delete:deleteReducer,
    reviews:reviewReducer,
    verification:verificationReducer,
    token:tokenReducer,
    status:appStatusSlice,
    profile:profileReducer,
    user:userAuthSlice,
    status:statusSlice
  }
})