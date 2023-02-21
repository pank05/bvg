import { useEffect } from "react";
import { Container,Button,Col,Row,Nav } from "react-bootstrap";
import { useSelector ,useDispatch} from "react-redux";
import { Link } from 'react-router-dom';
import {getAllCompaniesAPI,clearCompanyList} from '../actions/company';

const ViewCompanies=()=>{
  const companies = useSelector(state=> state?.company?.list || []);
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getAllCompaniesAPI({id:'all',is_active:1}));
    return ()=>{
      dispatch(clearCompanyList());
    }
  },[])

    return(
    <Container>
    <div>
        <h1> BACKGROUND VERIFICATION</h1>
    </div>
    <div className="div_left">
        <h3> Companies </h3>
    </div>
    <div style={{ textAlign: "right" }}> 
    
    <Button className="btn btn-info"> 
    <Nav.Link as={Link} to="/VerificationList-Page"  className="dash-href" style={{color:"white"}}>
      View All Verifiction
    </Nav.Link>
     </Button>
     </div> 
        <hr/> 
     <Row>
      {companies.map((company)=>{
        return <Col className="dash-href">
          <Nav.Link as={Link} to={`/VerificationList-Page/${company.id}`} >
             <div className="card bg-info, compaines_card,div_left" style={{ textAlign: "left" }} >
                <div className="btn btn-info" style={{padding:"0",color:"white",textAlign:"start"}}>
                  <div> {company.name}</div>
                     <hr/> 
                  <div> 
                    <h1>{company.short_name}</h1>
                    <p> 
                       Email :{ company.email} <br/> 
                       Contact Person: {company.contact_person }<br/> 
                       Contact No.:  {company.contact_number }
                    </p>
                  </div>
               </div>
             </div>
         </Nav.Link>
      </Col>
      })}
     </Row>
    </Container> 
    )
}
export default ViewCompanies;