import { useEffect } from "react";
import {  Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PageNOtFound =()=>{

    const isAuth = useSelector((state) => state?.user?.isAuth);
    const navigate = useNavigate();
    useEffect(()=>{
        if(!isAuth){
            navigate("/");
        }
    },[])
    return(
        <Container>
            Page Not Found
        </Container>
    )
}
export default PageNOtFound ;