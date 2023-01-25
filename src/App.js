import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter ,Routes,  Route } from "react-router-dom";
import Dashboard from './dashboardScreenPage';
import AssignTAT from './assign/assignTATPageScreen';
import Withdraw from './withdraw/withdrawCasePageScreen';
import Profile from './profileScreenPage';
import AfterVerification from './afterVerification/afterverificationPageScreen';
import DeleteData from './deleteScreenPage';
import VerificationStatus from './verificationStatusScreen';
import Opal from './opalMainPageScreen';
import './Opalfile.css';
import PageNOtFound from './pageNotFound';
import LoginPage from './loginPageScreen';
import CompaniesListPage from './companies/companiesListPageScreen';
import EmployeeListPage from './employees/employeeListPageScreen';
import ViewStatistics from './employees/viewStatistics';
import ViewCompanies from './companies/viewCompanies';
import VerificationList_Page from './companies/verificationList_Page';
import FieldExecutivePage from './fieldExecutives/fieldexctivePageScreen';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="*" element={<PageNOtFound />} />
     
      {localStorage.getItem('_token') &&<>
        <Route path="Dashboard" element={withHeader(<Dashboard />)}/>  
        <Route path="CompaniesListPage" element={withHeader(<CompaniesListPage />)}/>
        <Route path="EmployeeListPage" element={withHeader(<EmployeeListPage />)}/>
        <Route path="ViewStatistics" element={withHeader(<ViewStatistics />)}/>
        <Route path="ViewCompanies" element={withHeader(<ViewCompanies />)}/>
        <Route path="VerificationList-Page" element={withHeader(<VerificationList_Page />)}/>
        <Route path="VerificationList-Page/:id" element={withHeader(<VerificationList_Page />)}/>
        <Route path="FieldExecutivePage" element={withHeader(<FieldExecutivePage />)}/>
        <Route path="AssignTAT" element={withHeader(<AssignTAT />)}/>
        <Route path="Withdraw" element={withHeader(<Withdraw />)}/>
        <Route path="Profile" element={withHeader(<Profile />)}/>
        <Route path="AfterVerification" element={withHeader(<AfterVerification />)}/>
        <Route path="DeleteData" element={withHeader(<DeleteData />)}/>
        <Route path="VerificationStatus" element={withHeader(<VerificationStatus />)}/></>
     }
      </Routes>   
    </BrowserRouter>
    </div>
  );
}

const withHeader =(element)=>{
  return <Opal>{element}</Opal>
}

export default App;