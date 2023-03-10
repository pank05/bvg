import {Button,Container,Nav,Navbar,Offcanvas,NavDropdown,Card} from 'react-bootstrap';
import './App.css';
import './Opalfile.css';
import { useEffect, useState } from 'react';
import { GiHamburgerMenu} from "react-icons/gi"
import {FaAngleDoubleLeft,FaUpload,FaCheckCircle,FaChartBar,FaPowerOff} from "react-icons/fa";
import {BsFillPersonFill} from "react-icons/bs"
import {AiFillDashboard} from "react-icons/ai";
import {ImCross,ImProfile} from "react-icons/im";
import {MdOutlineGridOn} from "react-icons/md";
import {BsTrashFill} from "react-icons/bs";
import {HiDesktopComputer} from "react-icons/hi";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './actions/user';
import { checkUserHasRole } from './utility/validation';


const Opal =(props)=> {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const userProfile = useSelector((state) => state?.user?.userProfile);
  const [userDetails, setUserDetails]=useState(userProfile)

  const dispatch = useDispatch();
  
  useEffect(()=>{
    setUserDetails(userProfile)
  },[userProfile])
  
  const handleLogout = () =>{
    dispatch(logout());
    localStorage.clear();
  }
  
  const getMenus = () =>{
    if(checkUserHasRole(userProfile,['admin']) ){
      return <>
            <Nav.Link  as={Link} to="/dashboard"  className='opal-nav' onClick={handleClose}> <span><AiFillDashboard/></span> &nbsp; Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/AssignTAT"   className='opal-nav' onClick={handleClose}><span> <FaUpload/> </span> &nbsp;  AssignTAT</Nav.Link>
            <Nav.Link as={Link} to="/Withdraw" className='opal-nav' onClick={handleClose}><span>  <ImCross/> </span> &nbsp; WithdrawCase </Nav.Link>
            <Nav.Link as={Link} to="/ViewCompanies" className='opal-nav' onClick={handleClose}><span> <HiDesktopComputer/> </span> &nbsp; Companies</Nav.Link> 
            <Nav.Link as={Link} to="/Profile" className='opal-nav' onClick={handleClose}> <span> <ImProfile/> </span> &nbsp; Profile</Nav.Link>
            <Nav.Link as={Link} to="/VerificationList-Page" className='opal-nav' onClick={handleClose}> <span> <MdOutlineGridOn/> </span> &nbsp; Verification </Nav.Link>
            <Nav.Link as={Link} to="/AfterVerification" className='opal-nav' onClick={handleClose}> <span> <FaCheckCircle/> </span> &nbsp; AfterVerification</Nav.Link> 
            <Nav.Link as={Link} to="/DeleteData"  className='opal-nav' onClick={handleClose}> <span> <BsTrashFill/> </span> &nbsp; DeleteData</Nav.Link>
            <Nav.Link as={Link} to="/VerificationStatus"  className='opal-nav' onClick={handleClose}> <span> <FaChartBar/> </span> &nbsp; Verification Status</Nav.Link>
            </>
    }
    if(checkUserHasRole(userProfile,['employee'])){
        return <>
            <Nav.Link  as={Link} to="/dashboard"  className='opal-nav' onClick={handleClose}> <span><AiFillDashboard/></span> &nbsp; Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/AssignToFE"   className='opal-nav' onClick={handleClose}><span> <FaUpload/> </span> &nbsp;  AssignTAT</Nav.Link>
            <Nav.Link as={Link} to="/VerificationList-Page" className='opal-nav' onClick={handleClose}> <span> <MdOutlineGridOn/> </span> &nbsp; Verification </Nav.Link>
            <Nav.Link as={Link} to="/verificationByEmp" className='opal-nav' onClick={handleClose}> <span> <FaCheckCircle/> </span> &nbsp; AfterVerification</Nav.Link> 
            <Nav.Link as={Link} to="/VerificationStatus"  className='opal-nav' onClick={handleClose}> <span> <FaChartBar/> </span> &nbsp; Verification Status</Nav.Link>
        </>
    }
    if(checkUserHasRole(userProfile,['FieldExecutive'])){
      return <>
          <Nav.Link  as={Link} to="/dashboard"  className='opal-nav' onClick={handleClose}> <span><AiFillDashboard/></span> &nbsp; Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/VerificationList-Page" className='opal-nav' onClick={handleClose}> <span> <MdOutlineGridOn/> </span> &nbsp; Verification </Nav.Link>
          <Nav.Link as={Link} to="/VerificationByFE" className='opal-nav' onClick={handleClose}> <span> <FaCheckCircle/> </span> &nbsp; Verification By FE</Nav.Link> 
          <Nav.Link as={Link} to="/VerificationStatus"  className='opal-nav' onClick={handleClose}> <span> <FaChartBar/> </span> &nbsp; Verification Status</Nav.Link>
      </>
    }
  } 

  const handleShow = () => setShow(true);
  // const style = { color:"white", fontSize: "1.0em" ,textalign:"center"}
 
  const getImage = () =>{
    if(checkUserHasRole(userProfile,['admin']) ){
      return <BsFillPersonFill/> 
    }
    if(checkUserHasRole(userProfile,['employee']) ){
      return <BsFillPersonFill/> 
    }
    if(checkUserHasRole(userProfile,['FieldExecutive']) ){
      return <> <img src={userDetails?.image_url}
      style={{
        width: "30px",
        height: "30px",
        borderRadius:"60%"
      }} /> 
      </>
    }
  }
  return (
    <div className='nav-alignment'>
      <Navbar  key={show} bg="light" expand={show} className=" flex-grow-1 navbar navbar-dark bg-dark" >
      <Container >
            <Navbar.Brand ><h1>OPAL</h1></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${show}`}  onClick={handleShow}/>
            <Nav.Link className='logout'>
              {getImage()}
         <NavDropdown style={{width:'20%'}} title={userDetails.username}  id="navbarScrollingDropdown"> 
              <NavDropdown.Item >
           &nbsp;
                {userDetails?.roles?.map((v) => v.label ).join(",")}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item >
              <Button variant="dark" onClick={handleLogout}><FaPowerOff/>Log Out</Button>  
              </NavDropdown.Item>
          </NavDropdown>
            </Nav.Link>
            <Offcanvas  className="navbar navbar-dark bg-dark"   style={{width:"20%",  display: "list-item"}} show={show}  onHide={handleClose} >
    {getMenus()}
              </Offcanvas>
            </Container>
    </Navbar>
    {props.children}
    </div> 
  );
}
export default Opal;