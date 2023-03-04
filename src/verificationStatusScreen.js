import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container';
import { useSelector,useDispatch } from 'react-redux';
import {getAllCaseAPI} from "./actions/verification";
import { useEffect, useState } from 'react';
import {getReportingTatStatus} from "./actions/status";

const VerificationStatus=()=>{
  const tatDetails= useSelector((state)=>state?.status?.tatList || [])
  const userProfile = useSelector((state) => state?.user?.userProfile);
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(getAllCaseAPI({ id: "all"}));
    dispatch(getReportingTatStatus(userProfile.roles[0].name))
   },[])

  
    return(
        <Container  >
            <div>
                <h1 className="div_left">Workload Status</h1>
                <hr/>
            </div>
            <div className="grid-container"   > 
    <div> 
    <Table striped>
      <thead className="table_head">
        <tr> <th  >Priority Workload </th> </tr> </thead>
      <tbody>
        <tr className="table_body1"> <td>Special Priority  <strong>  {tatDetails?.special_priority}</strong></td> </tr>
        <tr className="table_body2"> <td>Today's to TAT <strong>  {tatDetails?.today_to_tat} </strong> </td> </tr>
        <tr className="table_body3"> <td>1 Day to TAT   <strong> {tatDetails?.one_day_tat}</strong> </td> </tr>
        <tr className="table_body4"> <td>2 Day to TAT  <strong> {tatDetails?.two_day_tat}</strong> </td> </tr>
        <tr className="table_body1"> <td>3 Day to TAT <strong> {tatDetails?.third_day_tat}</strong> </td> </tr>
        <tr className="table_body2"> <td>4 to TAT <strong>  {tatDetails?.four_day_tat} </strong> </td> </tr>
        <tr className="table_body3"> <td>5 Day to TAT   <strong> {tatDetails?.five_day_tat}</strong> </td> </tr>
        <tr className="table_body2"> <td>Out of TAT <strong>{tatDetails?.out_of_tat} </strong> </td> </tr>
      </tbody>  
    </Table>
    </div>
    <div > 
    <Table striped>
      <thead className="table_head">
        <tr> <th  >Current Workload </th> </tr> </thead>
      <tbody>
        <tr className="table_body2"> <td>Completed unrevieved <strong>{tatDetails?.completed_count}</strong> </td> </tr>
      </tbody>
    </Table>
    </div>
    <div > 
    <Table striped>
      <thead className="table_head">
        <tr> <th  >Workload Status </th> </tr> </thead>
      <tbody>
        <tr className="table_body1"> <td>Work Recieved this month  <strong> {tatDetails?.monthly_status?.cases_received}</strong> </td> </tr>
        <tr className="table_body3"> <td>Completed this month in TAT  <strong>{tatDetails?.monthly_status?.completed_currenet_month_in_tat} </strong> </td> </tr>
        <tr className="table_body4"> <td>Completed this month Out of TAT  <strong>{tatDetails?.monthly_status?.completed_currenet_month_out_of_tat} </strong> </td> </tr>
        <tr className="table_body1"> <td>Completed this month in TAT<strong> {Number(tatDetails?.monthly_status?.tat_percentage_in_tat|| 0).toFixed(2)}</strong> </td> </tr>
        <tr className="table_body4" style={{background:"red"}}> <td>Completed this month Out of TAT <strong>{Number(tatDetails?.monthly_status?.tat_percentage_out_tat || 0).toFixed(2)}</strong> </td> </tr>
        <tr className="table_body2"> <td>Completed this month<strong>{Number(tatDetails?.monthly_status?.completed_percentage_current_month|| 0).toFixed(2)} </strong> </td> </tr>
        <tr className="table_body2"> <td>Completed Last month<strong>{Number(tatDetails?.monthly_status?.completed_percentage_last_month|| 0).toFixed(2)}</strong> </td> </tr>
        <tr className="table_body2"> <td>work Completed this month  <strong> {tatDetails?.monthly_status?.completed_cases_current_month}</strong> </td> </tr>
        <tr className="table_body3"> <td>work Completed Last month  <strong>{tatDetails?.monthly_status?.completed_cases_last_month}</strong> </td> </tr>
      </tbody>
    </Table>
    </div>
            </div>
            
            </Container  >
    )
} 
export default VerificationStatus; 