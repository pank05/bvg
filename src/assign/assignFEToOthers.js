import { useState ,useEffect} from "react";
import { Container,Button } from "react-bootstrap";
import {IoMdPersonAdd} from "react-icons/io";
import { assignTATDataColoum } from "../mock/assignTATData";
import OpalTable from "../opalTable";
import { useSelector,useDispatch } from "react-redux";
import { getAllCaseAPI ,updateCaseById} from "../actions/verification";
import AssignModal from "./modalAssign";

const AssignFEToOtherScreen =()=>{
    const assigns = useSelector(state=> state?.verification?.list || []);
    const userProfile = useSelector((state) => state?.user?.userProfile);
    const employee = useSelector((state) => state?.employee?.list || []);

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

    const handleSaveAssign =(data)=>{
        let updateRecords =[...assignData].map((record)=>{
            let temp = {...record};
            temp.status= "verify_by_FE"
            temp.caseHistory = {
                assigned_by:userProfile.id,
                assigned_to:parseInt(data.assignedTo),
                remark:"assign FE to Employee"
            };
          return temp;
         });
    updateRecords.forEach((record)=>{
         dispatch(updateCaseById(record)).then(()=>{
         dispatch(getAllCaseAPI({id:'all',status: ['under_FE']}));
        });
     });
     setShow(false)
    }
    const handleWithdraw=()=>{
        setModalType('NotAssign')
        setShow(true)
     }
    const handleWithdrawCase=(data)=>{
        let withdrawRecord =[...assignData].map((record)=>{
            let temp = {...record};
            temp.status= "rejected_by_FE"
            temp.caseHistory = {
                assigned_by:userProfile.id,
                // assigned_to:,
                remark:data.remark
            };
          return temp;
        });
        withdrawRecord.forEach((record)=>{
            console.log(record)
            dispatch(updateCaseById(record)).then(()=>{
                dispatch(getAllCaseAPI({id:'all',status: ['under_FE']}));
                });
        });
        setShow(false);
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
                 </Button> &nbsp;
                 <Button variant="danger" className='Button_assing' disabled={!(assignData.length >0)} onClick={()=>{handleWithdraw(item)}}>
                 Reject
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
 <AssignModal show={show} close={handleClose} assignData={item} type={modalType}   
 onSave={handleSaveAssign}  onDelete={handleWithdrawCase} /> 
</div>
</Container>

    )
}
export default AssignFEToOtherScreen;