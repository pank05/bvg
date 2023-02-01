import { useState ,useEffect} from "react";
import { Container,Button } from "react-bootstrap";
import {IoMdPersonAdd} from "react-icons/io";
import { assignTATDataColoum } from "../mock/assignTATData";
import OpalTable from "../opalTable";
import { useSelector,useDispatch } from "react-redux";
import { getAllCaseAPI } from "../actions/verification";
import AssignModal from "./modalAssign";

const AssignFEToOtherScreen =()=>{
    const assigns = useSelector(state=> state?.verification?.list || []);
    const userProfile = useSelector((state) => state?.user?.userProfile);
    const [assignData,setAssignData]=useState([])
    const [assignTATData, setAssignTATData]=useState([])
    const [item,setItem]=useState([])
    const dispatch=useDispatch()

    const [show,setShow]=useState(false)
    const handleClose =()=> setShow(false)
    const [modalType,setModalType]=useState('assign')


    useEffect(()=>{
        dispatch(getAllCaseAPI({id:'all',status:['under_FE']}));
    },[])

    useEffect(()=>{
        setAssignTATData(assigns.filter(t=>t.status == "under_FE" ))
     },[assigns])

    const handleAssignCase=(data)=>{
        setModalType('assign')
        setShow(true)
        setAssignData(data)
    }

    const onClickCheck =(item)=>{
        setItem(item)
        setAssignData(item)
    }

    return(
        <Container>
    <div> 
      <h2> Assign Verification List</h2>
        <div>
                 <Button variant="info" className='Button_assing'
                  disabled={!(assignData.length >0)}  onClick={()=>{handleAssignCase(item)}}  >
                    <IoMdPersonAdd/>Assign 
                 </Button> 
               <br/> 
         </div><br/> 
   </div><br/> 
         <div className="icon-aline" >
             <OpalTable 
                 headers={assignTATDataColoum}
                 rowData={assignTATData || []}
                 showCheckbox={true}
                 checkBoxColoum={(item)=>onClickCheck(item)}
              />
         </div>
<div>
 <AssignModal show={show} close={handleClose} assignData={item} type={modalType}   /> 
</div>
</Container>

    )
}
export default AssignFEToOtherScreen;