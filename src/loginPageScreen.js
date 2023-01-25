import { useState,useEffect } from "react";
import { Button ,Container,Card,Form } from "react-bootstrap";
import { MdOutlineSupervisedUserCircle } from 'react-icons/md';
import {loginData} from './constant/login' ;
import { useNavigate} from 'react-router-dom';
import {authUserData} from './actions/user';
import logoutSessionExpire from "./logoutSession";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const LoginPage=()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login ,setLogin]=useState(loginData);
    const isAuth = useSelector((state) => state?.user?.isAuth);

  useEffect(()=>{
    if(isAuth){
      navigate("/Dashboard");
    }
  },[isAuth])

    useEffect(()=>{
        return ()=>{
          resetForm(); }
       },[])

    const handleLoginForm =async ()=>{
      dispatch(authUserData({
           email:login.user_name ,
           password: login.password ,
            }));
          }
    const [errors , setErrors]=useState({})

      const setLoginField =(field , value)=>{
        setLogin({
          ...login,
          [field]:value
        })
        if(!! errors[field])
        setErrors({
          ...errors,
          [field]:null
        })
      }
      const validationForm =()=>{
        const {user_name,password}=login
        const newErrors = {}
          // var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          // if (!pattern.test(user_name)) {
          //   newErrors.user_name = "Please enter valid user Name.";
          // }
          // var pattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/);
          // if (!pattern.test(password)) {
          //   newErrors.password = "Please enter valid password ";
          // }
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
        <Container fluid style={{backgroundColor:"black",height:"100%"}}>
        <Card  className="login-css" style={{ width: '20rem' }}>
        <Card.Body>
            <h1 style={{fontSize: "calc(7.375rem + 1.5vw)"}}>   <MdOutlineSupervisedUserCircle />  </h1><br/>
            <h1  >OPAL</h1><br/>
            <h6>(Background Verification)</h6><br/>
        <Card.Text>
        <Form>
          <Form.Group className="mb-3" controlId="user_name">
            <Form.Control type="email" placeholder="Enter user ID" 
            onChange={(e)=>{setLoginField()
                setLogin({...login,...{user_name:e.target.value}})}} isInvalid={!!errors.user_name} />
            <Form.Control.Feedback type="invalid"> {errors.user_name} </Form.Control.Feedback>
          </Form.Group>
        <br/>
          <Form.Group className="mb-3" controlId="password">
            <Form.Control type="password" placeholder="Enter Password"
            onChange={(e)=>{setLoginField()
                setLogin({...login,...{password:e.target.value}})}} isInvalid={!!errors.password} />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>
        <br/>
        <Button variant="outline-light" onClick={(item)=>{
            if(handleSubmit()){
            handleLoginForm();}
            item.preventDefault()}} >login</Button>
        </Form>
          </Card.Text>
        </Card.Body>
      </Card>
      </Container>

    )
}
export default LoginPage ;