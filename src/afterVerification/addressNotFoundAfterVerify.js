import {Container,Row,Col,Form} from 'react-bootstrap';
import { useState , useEffect } from 'react';
import { useSelector ,useDispatch} from "react-redux";
import {getStatusList} from "../actions/status";

const AddressNotFound =(props)=>{
    const [reasonList, setReasonList]=useState([]);
    const [landMark, setLandMark]=useState([
      {
       value:'1',
       label:'Yes',
       name:'landmark',
       type:'radio'
      },
      {
        value:'0',
       label:'No',
       name:'landmark',
       type:'radio'
      },]);
    const dispatch=useDispatch()
    const statusOption= useSelector((state)=> state?.status?.list)

        useEffect(()=>{
         dispatch(getStatusList({type:['reason_not_found_radio'],reference:['address'] } ) )
       },[])

        useEffect(()=>{
         setReasonList((statusOption || []).filter((v)=>v.type=='reason_not_found_radio' && v.reference=='address'))
        },[statusOption])

        useEffect(()=>{
         setLandMark((landMark || []));
       },[landMark])

    return(
             <Container style={{border: "1px solid gray"}}>
            <div className="note_update" >
            <h6 className="div_center"><br/>Address Not found<br/><br/> </h6></div><br/>   
             <Row>
                 <Col>REASON OF ADDRESS NOT FOUND:</Col>  </Row>
             <Form>
             <div  >
         {
         reasonList.map(v=>{
          let temp  = {...v};
          temp.name='reason_not_found_radio';
          temp.type= 'radio';
          return temp;
         }).map((radios) => {
         return <Col><Form.Check
            inline
            checked={props.updateAddressVerification?.reasonNotFound == radios.id}
            label={radios.label}
            value={radios.id}
            name={radios.name}
            key={radios.id}
            type={radios.type}
            onChange={(v)=>{
              props.setUpdateAddressVerification({...props.updateAddressVerification,...{reasonNotFound:v.target.value}})
            }}/>  </Col>
         }) }
         <p style={{float:"right",color: "#20c997"}}> {[...reasonList].find((d)=>props.updateAddressVerification.relationType ==d.id)?.label} </p>
           </div> 
           </Form>
           <Form.Control type="text" placeholder="If other or Incomplete Address then given remark" 
           value={props.updateAddressVerification?.addressRemark}
           onChange={(e)=>{
            props.setUpdateAddressVerification({...props.updateAddressVerification,...{addressRemark:e.target.value}})
           }} /> <br/>
           <Row>
             <Col>Photo of Nearest Land mark up to which field executive has reached attached:</Col>
              </Row>
              <div key={`inline-radio`} >
        {
        landMark.map((radios) => (
          <Form.Check
             inline
             checked={props.updateAddressVerification?.nearLandmark == radios.value}
             label={radios.label}
             value={radios.value}
             type={radios.type}
             name={radios.name}
             onChange={(v)=>{
                props.setUpdateAddressVerification({...props.updateAddressVerification,...{nearLandmark:v.target.value}})}  }/> 
            ))}  
            <p style={{float:"right",color: "#20c997"}}> {[...landMark].find((d)=>props.updateAddressVerification.nearLandmark ==d.value)?.label} </p>
              </div>
           <Form.Control type="text" placeholder="Candidate State"
           value={props.updateAddressVerification?.candidateState}
           onChange={(e)=>{
              props.setUpdateAddressVerification({...props.updateAddressVerification,...{candidateState:e.target.value}})
           }} /><br/>
           {props.children}
           </Container>
    )
}
export default AddressNotFound;