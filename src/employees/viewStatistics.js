import { useNavigate,useLocation} from 'react-router-dom';
import {FaAngleDoubleLeft} from "react-icons/fa" ;
import { Container,Table,Button } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import {getAllCaseAPI} from "../actions/verification";
import { useEffect, useState } from 'react';
import {getReportingTatStatus,getReportingTatStatusForEmployee} from "../actions/status";

const ViewStatistics=()=>{
  const navigate = useNavigate();
  const {state} = useLocation();
  const para = state;

  const tatDetails= useSelector((state)=>state?.status?.tatList || [])
  const tatDetailsEmp= useSelector((state)=>state?.status?.tatListEmp || [])
  const userProfile = useSelector((state) => state?.user?.userProfile);
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(getAllCaseAPI({ id: "all"}));
    dispatch(getReportingTatStatusForEmployee());
    dispatch(getReportingTatStatus(userProfile.roles[0].name))
   },[])

return(
    <Container>
      <br/>
    <div className="div_left" > <Button className="btn btn-info" onClick={() => navigate(-1)} > <FaAngleDoubleLeft /> Go back</Button>  </div>
    <h1> Employee Verification Report</h1>
    
    <div className="div_left"> 
      
    Employee Name :{para.name} <br/> 
     Employee ID : {para.key} <br/>
    Employee Gmail : {para.email}<br/>
    Contact No : {para.contact_number}<br/>
    Alternate Contact No :{para.Alternet_number} <br/>
    </div>
    <div className="grid-container"   > 
    <div className="Table_Priority"> 
    <Table striped>
      <thead className="table_head">
        <tr> <th  >Priority Workload </th> </tr> </thead>
      <tbody>
        <tr className="table_body1"> <td>Special Priority  <strong>  {tatDetails?.special_priority}</strong></td> </tr>
        <tr className="table_body2"> <td>Today's to TAT <strong>  {tatDetails?.today_to_tat} </strong> </td> </tr>
        <tr className="table_body3"> <td>1 Day to TAT   <strong> {tatDetails?.one_day_tat}</strong> </td> </tr>
        <tr className="table_body4"> <td>2 Day to TAT  <strong> {tatDetails?.two_day_tat}</strong> </td> </tr>
        <tr className="table_body1"> <td>3 Day to TAT <strong> {tatDetails?.third_day_tat}</strong> </td> </tr>
        <tr className="table_body2"> <td>4 Day to TAT <strong>  {tatDetails?.four_day_tat} </strong> </td> </tr>
        <tr className="table_body3"> <td>5 Day to TAT   <strong> {tatDetails?.five_day_tat}</strong> </td> </tr>
        <tr className="table_body2"> <td>Out of TAT <strong>{tatDetails?.out_of_tat} </strong> </td> </tr>
      </tbody>  </Table>
    </div>
    <div className="Table_Priority"> 
    <Table striped>
      <thead className="table_head">
        <tr> <th  >Current Workload </th> </tr> </thead>
      <tbody>
        <tr className="table_body1"> <td>New Load  <strong> {tatDetailsEmp?.new_load}</strong> </td> </tr>
        <tr className="table_body3"> <td>Checks Rejected  <strong>{tatDetailsEmp?.check_rejected} </strong> </td> </tr>
        <tr className="table_body4"> <td>Current Load <strong> {tatDetailsEmp?.current_load}</strong> </td> </tr>
        <tr className="table_body1"> <td>Assigned To FE Load <strong> {tatDetailsEmp?.assigned_to_fe_load}</strong> </td> </tr>
        <tr className="table_body3"> <td>Reject By FE <strong> {tatDetailsEmp?.reject_by_fe}</strong> </td> </tr>
        <tr className="table_body3"> <td>Done By FE <strong> {tatDetailsEmp?.done_by_fe}</strong> </td> </tr>
        <tr className="table_body2"> <td>Completed unrevieved <strong>{tatDetailsEmp?.completed_count}</strong> </td> </tr>
      </tbody>
    </Table>
    </div>
    <div className="Table_Priority"> 
    <Table striped>
      <thead className="table_head">
        <tr> <th  >Workload Status </th> </tr> </thead>
      <tbody>
      <tr className="table_body1"> <td>Work Recieved this month  <strong> {tatDetailsEmp?.current_load}</strong> </td> </tr>
        <tr className="table_body3"> <td>Completed this month in TAT  <strong>{tatDetails?.monthly_status?.completed_currenet_month_in_tat} </strong> </td> </tr>
        <tr className="table_body4"> <td>Completed this month Out of TAT  <strong>{tatDetails?.monthly_status?.completed_currenet_month_out_of_tat} </strong> </td> </tr>
        <tr className="table_body1"> <td>Completed this month in TAT<strong> {Number(tatDetails?.monthly_status?.tat_percentage_in_tat|| 0).toFixed(2)}</strong> </td> </tr>
        <tr className="table_body2"> <td>work Completed this month  <strong> {tatDetails?.monthly_status?.completed_cases_current_month}</strong> </td> </tr>
        <tr className="table_body3"> <td>work Completed Last month  <strong>{tatDetails?.monthly_status?.completed_cases_last_month}</strong> </td> </tr>
      </tbody>
    </Table>
    </div>
    </div> 
    <br/>  
    </Container>
)
}
export default ViewStatistics;