import { useNavigate,useLocation} from 'react-router-dom';
import {FaAngleDoubleLeft} from "react-icons/fa" ;
import { Container,Table,Button } from 'react-bootstrap';

const ViewStatistics=()=>
{
  const navigate = useNavigate();
  const {state} = useLocation();
  const para = state;
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
    {/*  first table */}
    <div className="grid-container"   > 
    <div className="Table_Priority"> 
    <Table striped>
      <thead className="table_head">
        <tr> <th  >Priority Workload </th> </tr> </thead>
      <tbody>
        <tr className="table_body1"> <td><a className="tr_href1" href="/#">Special Priority  <strong> 0</strong> </a></td> </tr>
        <tr className="table_body2"> <td><a className="tr_href2" href="/#">Today's to TAT <strong> 0</strong> </a></td> </tr>
        <tr className="table_body3"> <td><a className="tr_href3" href="/#">1 Day to TAT   <strong> 0</strong> </a></td> </tr>
        <tr className="table_body4"> <td><a className="tr_href4" href="/#">2 Day to TAT  <strong> 0</strong> </a></td> </tr>
        <tr className="table_body1"> <td><a className="tr_href1" href="/#">3 Day to TAT <strong> 0</strong> </a></td> </tr>
        <tr className="table_body2"> <td><a className="tr_href2" href="/#">Out of TAT  <strong> 0</strong> </a></td> </tr>
      </tbody>  </Table>
    </div>
    {/* second table  */}
    <div className="Table_Priority"> 
    <Table striped>
      <thead className="table_head">
        <tr> <th  >Current Workload </th> </tr> </thead>
      <tbody>
        <tr className="table_body1"> <td><a className="tr_href1" href="/#">New Load  <strong> 0</strong> </a></td> </tr>
        <tr className="table_body2"> <td><a className="tr_href2" href="/#">Insuff (Responded) <strong> 0</strong> </a></td> </tr>
        <tr className="table_body3"> <td><a className="tr_href3" href="/#">Checks Rejected  <strong> 0</strong> </a></td> </tr>
        <tr className="table_body4"> <td><a className="tr_href4" href="/#">Current Load <strong> 0</strong> </a></td> </tr>
        <tr className="table_body1"> <td><a className="tr_href1" href="/#">Assigned To FE Load <strong> 0</strong> </a></td> </tr>
        <tr className="table_body3"> <td><a className="tr_href3" href="/#">Reject By FE <strong> 0</strong> </a></td> </tr>
        <tr className="table_body3"> <td><a className="tr_href3" href="/#">Done By FE <strong> 0</strong> </a></td> </tr>
        <tr className="table_body2"> <td><a className="tr_href2" href="/#">Completed unrevieved <strong> 0</strong> </a></td> </tr>
      </tbody>
    </Table>
    </div>
    {/*  third table */}
    <div className="Table_Priority"> 
    <Table striped>
      <thead className="table_head">
        <tr> <th  >Workload Status </th> </tr> </thead>
      <tbody>
        <tr className="table_body1"> <td><a className="tr_href1" href="/#">Work Recieved this month  <strong> 0</strong> </a></td> </tr>
        <tr className="table_body2"> <td><a className="tr_href2" href="/#">Work Withdrawn this month <strong> 125</strong> </a></td> </tr>
        <tr className="table_body3"> <td><a className="tr_href3" href="/#">Completed this month in TAT  <strong> 0</strong> </a></td> </tr>
        <tr className="table_body4"> <td><a className="tr_href4" href="/#">Completed this month Out of TAT  <strong> 0</strong> </a></td> </tr>
        <tr className="table_body1"> <td><a className="tr_href1" href="/#">Completed this month in TAT% <strong> 0.00%</strong> </a></td> </tr>
        <tr className="table_body2"> <td><a className="tr_href2" href="/#">Work Completed this month  <strong> 0</strong> </a></td> </tr>
        <tr className="table_body3"> <td><a className="tr_href3" href="/#">Work Completed Last month  <strong> 0</strong> </a></td> </tr>
      </tbody>
    </Table>
    </div>
    </div>
    </Container>
)
}
export default ViewStatistics;