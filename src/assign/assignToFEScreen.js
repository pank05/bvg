 import { Container,Button, } from "react-bootstrap";
 import {IoMdPersonAdd} from "react-icons/io";
 import OpalTable from "../opalTable";
 import { useState,useEffect } from "react";
 import {assignTATDataColoum} from "../mock/assignTATData";
 import { useDispatch, useSelector} from "react-redux";
 import {getAllCaseAPI,updateCaseById,getCaseDataById} from "../actions/verification";
import EmployeeToFEAssign from "./modalEmployeeToFEAssign";

const AssignToFEScreen =()=>{

    const assigns = useSelector(state=> state?.verification?.list || []);
    const userProfile = useSelector((state) => state?.user?.userProfile);
    const [assignTAT,setAssignTAT]=useState([]);
    const [tatData,setTatData] = useState([]);
    const [item,setItem] = useState([]);
    const [show, setShow]=useState(false);
    const handleClose=()=> setShow(false);
    const [modalType,setModalType]=useState('NotAssign')
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllCaseAPI({id:'all',status: ['under_employee','rejected_by_FE']}));
    },[])

    useEffect(()=>{
       setTatData(assigns)
    },[assigns])

    const handleAssign=(data)=>{
        setAssignTAT(data)
        setShow(true)
     }

     const handleAssignSave=(data)=>{
        let updateRecords =[...assignTAT].map((record)=>{
                     let temp = {...record};
                     temp.status= "under_FE"
                     temp.caseHistory = {
                         assigned_by:userProfile.id,
                         assigned_to:parseInt(data.assignedTo),
                         remark:"assign to  employee to FE"
                     };
                 return temp;
         });
         updateRecords.forEach((record)=>{
             dispatch(updateCaseById(record)).then(()=>{
                 dispatch(getAllCaseAPI({id:'all',status:['under_employee','rejected_by_FE']}));
                 });
         });
         setShow(false);
     }

    const onClickCheck = (item) =>{
        setItem(item);
        setAssignTAT(item);
     }
     
    return (
    <Container>
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
 <EmployeeToFEAssign show={show} close={handleClose} assignData={item}   onSave={handleAssignSave}   /> 
</div>
</Container>
    )
}
export default AssignToFEScreen;