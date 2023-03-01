import {ImTable2} from "react-icons/im";
import {RiContactsBookLine} from "react-icons/ri";
import {MdSupport} from "react-icons/md" ;
import {AiOutlineHdd} from "react-icons/ai" ;
import {BsFillArrowRightCircleFill} from "react-icons/bs" ;
import {Container,Row,Col,Nav } from 'react-bootstrap' ;
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCompaniesAPI} from "./actions/company";
import {getAllEmployeeAPI} from "./actions/employee";
import {getAllFieldAPI} from "./actions/fieldexctive";
import {getAllCaseAPI} from "./actions/verification";

 const Dashboard=(props)=>{

  const company =useSelector((state)=>state?.company?.list || [] )
  const employee =useSelector((state)=>state?.employee?.list || [])
  const FieldExecutive =useSelector((state)=>state?.field?.list || [])
  const casesList =useSelector((state)=>state?.verification?.list || [])
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(getAllCompaniesAPI({id:'all'}))
    dispatch(getAllEmployeeAPI())
    dispatch(getAllFieldAPI())
    dispatch(getAllCaseAPI({ id: "all"}))
   },[])

 return(
      <Container>
        <div  className="vip">
          VIP <small className="vip-small">(Verification Internal Portal ) </small>
          <hr/>
        </div>
  <Row>
    <Col>
<div className="card bg-info text-white">
<Nav.Link as={Link} to="/CompaniesListPage"   className="dash-href">
<div className="d-flex bd-highlight">
    <div className="p-2 bd-highlight ,cardicon "  >
  <ImTable2 size={70}/>  </div>
   <div className="p-2 flex-grow-1 bd-highlight,com-style" > Companies!</div>  
    </div>
  <hr/>
    <div className="d-flex bd-highlight">
      <div style={{color:"white" ,paddingLeft:"20px"}}> <h6>View Company List  &nbsp; {Object.keys(company).length}</h6>  </div><br/>
      <div className="p-2 flex-grow-1 bd-highlight ,icon-aline"> <BsFillArrowRightCircleFill/> </div>
      </div>
      </Nav.Link>
  </div>
  </Col>
 
 <Col> 
 <div className="card bg-warning text-white" >
 <Nav.Link as={Link} to="/EmployeeListPage" className="dash-href">
<div className="d-flex bd-highlight">
    <div className="p-2 bd-highlight ,cardicon"  >
  <RiContactsBookLine size={70} style={{color:"white" }}/>  </div>
   <div className="p-2 flex-grow-1 bd-highlight,com-style" > Employee!</div>  
    </div>
  <hr/>
    <div className="d-flex bd-highlight">
      <div style={{color:"white" ,paddingLeft:"20px"}}><h6>View Employee List &nbsp;  {Object.keys(employee).length}</h6> </div>
      <div className="p-2 flex-grow-1 bd-highlight, icon-aline"> <BsFillArrowRightCircleFill/> </div>
      </div>
    </Nav.Link>
  </div>
  </Col> 

  <Col> 
  <div className=" card bg-success text-white" >
  <Nav.Link as={Link} to="/ViewCompanies" className="dash-href">
  <div className="d-flex bd-highlight">
    <div className="p-2 bd-highlight"  >
  <AiOutlineHdd size={70} style={{color:"white"}} /> </div>
   <div className="p-2 flex-grow-1 bd-highlight,com-style" > Address Verification</div>  
       </div>
       <hr/>
      <div className="d-flex bd-highlight">
      <div style={{color:"white" ,paddingLeft:"20px"}}> <h6>View Verification &nbsp; {Object.keys(casesList).length} </h6></div>
      <div className="p-2 flex-grow-1 bd-highlight,icon-aline"> <BsFillArrowRightCircleFill/> </div>
      </div>
    </Nav.Link>
  </div>
  </Col> 
  
  <Col>
 
  <div className="card bg-danger text-white" >
  <Nav.Link as={Link} to="/FieldExecutivePage"  className="dash-href">
<div className="d-flex bd-highlight">
    <div className="p-2 bd-highlight ,cardicon">
  <MdSupport size={70}/>  </div>
   <div className="p-2 flex-grow-1 bd-highlight,com-style" >  Field Executive!</div>  
    </div>
  <hr/>
    <div className="d-flex bd-highlight">
      <div style={{color:"white",paddingLeft:"20px"}}><h6>View  Field Executive &nbsp; {Object.keys(FieldExecutive).length} </h6> </div>
      <div className="p-2 flex-grow-1 bd-highlight,icon-aline"> <BsFillArrowRightCircleFill/> </div>
      </div>
    </Nav.Link>
  </div>
  </Col>
  </Row>
  <hr/>
  <hr/>
  </Container>
  
    )
}
export default Dashboard; 