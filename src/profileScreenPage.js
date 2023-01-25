import { useState,useEffect } from "react";
import { Button,Container,Form,Row,Col,Nav } from "react-bootstrap";
import {AiFillDashboard} from "react-icons/ai";
import {BiEdit} from "react-icons/bi";
import { Link } from 'react-router-dom';
import {profileData} from './constant/profile';

const Profile=()=>{
    const [profileList,setProfileList]=useState(profileData)
    useEffect(()=>{
      return ()=>{
        resetForm(); }
     },[])

    const handleSaveProfile=()=>{
        console.log("save ",profileList)  
      
    }
    const [errors , setErrors]=useState({})

      const setProfileField =(field , value)=>{
        setProfileList({
          ...profileList,
          [field]:value
        })
        if(!! errors[field])
        setErrors({
          ...errors,
          [field]:null
        })
      }

      const validationForm =()=>{
        const {Name, Slogon,Owner_Name,ContactNo01,Email,GST_No,PAN_No, City,Address , Currency,Date}=profileList
        const newErrors = {}
        if(!Name || Name === '' )
        newErrors.Name='Please Enter Business Name';
        if(!Slogon || Slogon === '' )
        newErrors.Slogon='Please Enter Business Slogon';
        if(!Owner_Name || Owner_Name === '' )
        newErrors.Owner_Name='Please Enter Owner Name';
        if(!GST_No || GST_No === '')
        newErrors.GST_No='Please Enter GST No';
        if(!ContactNo01 || ContactNo01 === '')
        newErrors.ContactNo01='please Enter Contact No.';
        else if(ContactNo01.length < 10 || ContactNo01.length > 10 )
        newErrors.ContactNo01='At least 10 digit '
          var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          if (!pattern.test(Email)) {
            newErrors.Email = "Please enter valid email address.";
          }
        if(!PAN_No || PAN_No === '')
        newErrors.PAN_No='Please Enter PAN No';
        if(!City || City === '')
        newErrors.City='Please Enter City';
        if(!Address || Address === '')
        newErrors.Address='Please Enter Address';
        if(!Currency || Currency === '')
        newErrors.Currency='Please Enter Currency ';
        // if(!Date || Date === '')
        // newErrors.Date='Please Enter Date ';
        return newErrors
      }
    const handleSubmit =(e)=>{
      const formErrors=validationForm()
      if(Object.keys(formErrors).length > 0){
        setErrors(formErrors);
        console.log("form sbadi")
        return false;
      }else{
        setErrors({});
        console.log('form submitted'); 
      }
      return true;
    }
    
    const resetForm = ()=>{
      setErrors({});
    }
   
    return(
      <Container style={{ background:"#f8f9fa"}} >
       
            <h1 className="div_left"> Profile  </h1>
            <div className="profile_Page">
            <h5> <Nav.Link  as={Link} to="/">  <AiFillDashboard/> Dashboard /<BiEdit/> Profile </Nav.Link>   </h5>
            </div>
             <Form className="Label_profile" >  
              <Row>
              <Col> 
              <Form.Group controlId="Name">
              <Form.Label>Organization Name:</Form.Label>
                <Form.Control type="text" placeholder="Enter Business Name" 
                onChange={(e)=>{setProfileField()
                  setProfileList({...profileList,...{Name:e.target.value}})}} isInvalid={!!errors.Name} />
                <Form.Control.Feedback type="invalid"> {errors.Name}  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
              <Form.Group controlId="Slogon">
               <Form.Label>Organization Slogon:</Form.Label>
                <Form.Control type="text" placeholder="Enter Business Slogon"
                   onChange={(e)=>{setProfileField()
                   setProfileList({...profileList,...{Slogon:e.target.value}})}}  isInvalid={!!errors.Slogon} />
              <Form.Control.Feedback type="invalid"> {errors.Slogon}  </Form.Control.Feedback>
              </Form.Group>
              </Col>
              </Row>
              <Row>
              <Col> <Form.Group controlId="Owner_Name">
              <Form.Label>Organization Owner Name:</Form.Label>
                <Form.Control type="text"placeholder="Enter Owner Name" 
                  onChange={(e)=>{setProfileField()
                  setProfileList({...profileList,...{Owner_Name:e.target.value}})}} isInvalid={!!errors.Owner_Name} />
                <Form.Control.Feedback type="invalid"> {errors.Owner_Name}  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
              <Form.Group controlId="ContactNo01"> 
              <Form.Label>Contact No 1</Form.Label>
                <Form.Control type="number" placeholder="Enter Contact 1"  
                onChange={(e)=>{setProfileField()
                setProfileList({...profileList,...{ContactNo01:e.target.value}})}} isInvalid={!!errors.ContactNo01} />
                <Form.Control.Feedback type="invalid"> {errors.ContactNo01}  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              </Row>
              <Row>
              <Col> <Form.Label>Contact No 2</Form.Label>
                <Form.Control type="number" placeholder="Enter Contact 2" 
                  onChange={(e)=>{setProfileList({...profileList,...{ContactNo2:e.target.value}})}} />
              </Col>
              <Col>
              <Form.Group controlId="Email">  
              <Form.Label>Email Id</Form.Label>
                <Form.Control type="email" placeholder="Enter Email Id" 
                  onChange={(e)=>{setProfileField()
                  setProfileList({...profileList,...{Email:e.target.value}})}} isInvalid={!!errors.Email} />
                <Form.Control.Feedback type="invalid"> {errors.Email}  </Form.Control.Feedback>
               </Form.Group>
              </Col>
              </Row>
              <Row>
              <Col>
              <Form.Group controlId="GST_No">  
               <Form.Label> GST NO </Form.Label>
                <Form.Control type="number" placeholder="Enter GST No" 
                onChange={(e)=>{setProfileField()
                setProfileList({...profileList,...{GST_No:e.target.value}})}} isInvalid={!!errors.GST_No} />
                <Form.Control.Feedback type="invalid"> {errors.GST_No}  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
              <Form.Group controlId="PAN_No">
               <Form.Label>PAN NO</Form.Label>
                <Form.Control type="text" placeholder="Enter PAN Number" 
                  onChange={(e)=>{setProfileField()
                  setProfileList({...profileList,...{PAN_No:e.target.value}})}} isInvalid={!!errors.PAN_No} />
               <Form.Control.Feedback type="invalid"> {errors.PAN_No}  </Form.Control.Feedback>
               </Form.Group>
              </Col>
              </Row>
              <Row>
              <Col>
              <Form.Group controlId="City">
               <Form.Label> CITY  </Form.Label>
                <Form.Control type="text"  placeholder="Enter City " 
                 onChange={(e)=>{setProfileField()
                  setProfileList({...profileList,...{City:e.target.value}})}} isInvalid={!!errors.City} />
                <Form.Control.Feedback type="invalid"> {errors.City}  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
              <Form.Group controlId="Address">
              <Form.Label> Address 2 </Form.Label>
                <Form.Control type="text" placeholder="Enter Address"
                  onChange={(e)=>{setProfileField()
                    setProfileList({...profileList,...{Address:e.target.value}})}}
                  style={{ height: '70px' }}
                 isInvalid={!!errors.Address} />
                 <Form.Control.Feedback type="invalid"> {errors.Address}  </Form.Control.Feedback>
                 
                 </Form.Group>
              </Col>
              </Row>
              <Row> 
              <Col>
              <Form.Group controlId="Currency">
               <Form.Label> Currency  </Form.Label>
                <Form.Control type="number"   placeholder="Enter Currency"  
                onChange={(e)=>{setProfileField()
                  setProfileList({...profileList,...{Currency:e.target.value}})}} isInvalid={!!errors.Currency} />
              <Form.Control.Feedback type="invalid"> {errors.Currency}  </Form.Control.Feedback>
              </Form.Group>
              </Col>
              <Col> 
              Upload Images<br/>
              Created On<br/>
              </Col>
              </Row>
             </Form> 
             <br/>
             <div className="div_center">
              <Button onClick={(e)=>{
                if(handleSubmit()){
                  handleSaveProfile(); }
                 e.preventDefault()} }> save </Button> 
             </div>
        </Container>
      )
   }
 export default Profile; 
  