 import { Container,Button, } from "react-bootstrap";
 import {IoMdPersonAdd} from "react-icons/io";
 import OpalTable from "../opalTable";
 import { useState,useEffect } from "react";
 import {assignTATDataColoum} from "../mock/assignTATData";
 import { useDispatch, useSelector} from "react-redux";
 import {getAllCaseAPI,updateCaseById} from "../actions/verification";
import EmployeeToFEAssign from "./modalEmployeeToFEAssign";

const AssignToFEScreen =()=>{

    const assigns = useSelector(state=> state?.verification?.list || []);
    const userProfile = useSelector((state) => state?.user?.userProfile);
    const [assignTAT,setAssignTAT]=useState([]);
    const [tatData,setTatData] = useState([]);
    const [item,setItem] = useState([]);
    const [show, setShow]=useState(false);
    const handleClose=()=> setShow(false);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllCaseAPI({id:'all',status: ['under_employee']}));
    },[])

    useEffect(()=>{
       setTatData(assigns.filter(t=>t.status == "under_employee" ))
    },[assigns])

    const handleAssign=(data)=>{
        // console.log(data.duration_start)
        setShow(true)
     }

    const onClickCheck = (item) =>{
        setItem(item);
        setAssignTAT(item);
     }
    return <Container>
    <div> 
      <h2> Assign Verification List</h2>
        <div>
                 <Button variant="info" className='Button_assing'
                  disabled={!(assignTAT.length >0)}  onClick={()=>{handleAssign(item)}}  >
                    <IoMdPersonAdd/>Assign 
                 </Button> 
               <br/> 
         </div><br/> 
   </div><br/> 
         <div className="icon-aline" >
             <OpalTable 
                 headers={assignTATDataColoum}
                 rowData={tatData || []}
                 showCheckbox={true}
                 checkBoxColoum={(item)=>onClickCheck(item)}
              />
         </div>
<div>
 <EmployeeToFEAssign show={show} close={handleClose} assignData={item}    /> 
</div>
</Container>
}
export default AssignToFEScreen;