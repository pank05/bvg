import { useState ,useEffect} from 'react';
import {Button,Container} from 'react-bootstrap';
import AssignModal from './modalAssign';
import {FiRefreshCw} from "react-icons/fi" ;
import {IoMdPersonAdd} from "react-icons/io";
import {assignTATDataColoum} from "../mock/assignTATData";
import { useDispatch, useSelector} from "react-redux";
import OpalTable from '../opalTable';
import {getAllCaseAPI,updateCaseById} from "../actions/verification";

const AssignTAT=()=>{

    const assigns = useSelector(state=> state?.verification?.list || []);
    const userProfile = useSelector((state) => state?.user?.userProfile);
    const [assignTAT,setAssignTAT]=useState([]);
    const [tatData,setTatData] = useState([]);
    const [withdrawTAT,setWithdrawTAT]=useState([]);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllCaseAPI({id:'all',status: ['under_admin','under_employee']}));
    },[])

    useEffect(()=>{
       setTatData(assigns.filter(t=>t.status == "under_employee" ))
    },[assigns])

    const [item,setItem] = useState([]);
    const [show, setShow]=useState(false);
    const handleClose=()=> setShow(false);
    const [buttonType,setButtonType]=useState('assign')
    const [buttonState, setButtonState] = useState(true)
    const [actionButtonState, setActionButtonState] = useState(true)
   
    const handleViewAssign = () => {
        setButtonState(false)
        const unassignedData = assigns.filter((val)=>{
          return val.status == "under_employee" 
          })
        setTatData(unassignedData);
        setActionButtonState(!actionButtonState);
    }
     
    const handleViewNotAssign=()=>{
        setButtonState(true)
        const assignedData = assigns.filter((val)=>{
            return val.status == "under_admin" 
            })
        setTatData(assignedData);
        setActionButtonState(!actionButtonState);
    }
    
     const handleAssign=(data)=>{
        setButtonType('assign')
        setShow(true)
     }
     
     const handleWithdraw=()=>{
        setButtonType('NotAssign')
        setShow(true)
     }

    const handleAssignSave=(data)=>{
       let updateRecords =[...assignTAT].map((record)=>{
                    let temp = {...record};
                    // temp.id=data.id ;
                    temp.duration_end = data.durationEnd;
                    temp.status= "under_employee"
                    temp.caseHistory = {
                        assigned_by:userProfile.id,
                        assigned_to:parseInt(data.assignedTo),
                        remark:"assign to admin to employee"
                    };
                return temp;
        });
        updateRecords.forEach((record)=>{
            dispatch(updateCaseById(record)).then(()=>{
                dispatch(getAllCaseAPI({id:'all',status: ['under_admin']}));
                });
        });
        setShow(false);
    }
  
    const handleWithdrawCase=(data)=>{
        let withdrawRecord =[...withdrawTAT].map((record)=>{
            let temp = {...record};
            temp.status= "withdraw"
            temp.caseHistory = {
                assigned_by:userProfile.id,
                assigned_to:userProfile.id,
                remark:data.remark
            };
          return temp;
        });
        withdrawRecord.forEach((record)=>{
            dispatch(updateCaseById(record)).then(()=>{
                dispatch(getAllCaseAPI({id:'all',status: ['under_employee']}));
                });
        });
        setShow(false);
    }

     const onClickCheck = (item) =>{
        setItem(item);
        setAssignTAT(item.filter(val=> val.status == "under_admin"));
        setWithdrawTAT(item.filter(val=> val.status == "under_employee"))
     }

    return(
        <Container>
           <div> 
             <h2> Assign Verification List</h2>
               <div>
                 <Button variant="primary" className='Button_assing'  onClick={actionButtonState ? handleViewNotAssign : handleViewAssign}>
                    {actionButtonState ? 'View Not Assigned': 'View  Assigned'}
                 </Button>
           
                    { actionButtonState ?
                        <Button variant="info" className='Button_assing' disabled={!(withdrawTAT.length >0)}
                           onClick={()=>{handleWithdraw(item)}} ><FiRefreshCw/> Withdraw 
                        </Button> :
                        <Button variant="info" className='Button_assing' disabled={!(assignTAT.length >0)}
                           onClick={()=>{handleAssign(item)}} ><IoMdPersonAdd/> Assign 
                        </Button> }
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
        <AssignModal show={show} close={handleClose} assignData={item} type={buttonType}  onSave={handleAssignSave}
         onDelete={handleWithdrawCase}   /> 
    </div>
    </Container>
    )
}
export default AssignTAT;