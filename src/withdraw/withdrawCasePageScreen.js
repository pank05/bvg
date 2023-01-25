import { useState ,useEffect } from 'react';
import {Button, Container} from 'react-bootstrap';
import {withdrawDataColoum} from "../mock/withdrawData";
import { useDispatch, useSelector } from "react-redux";
import OpalTable from '../opalTable';
import {getAllCaseAPI,updateCaseById ,deleteCaseDataById} from "../actions/verification";
import ModalVerification from "../companies/modalVerification";
import AssignModal from '../assign/modalAssign';

const Withdraw=()=>{
    
    const withdraws = useSelector(state=> state?.verification?.list || []);
    const userProfile = useSelector((state) => state?.user?.userProfile);
    const [withdrawList,setWithdraw]=useState([]);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllCaseAPI({id:'all',status: ['withdraw']}));
    },[])

    useEffect(()=>{
       setWithdraw(withdraws)
    },[withdraws])

    const[withdrawData,setWithdrawData] = useState({});
    const [modalType,setModalType]=useState('assign')
    const [show, setShow]=useState(false);
    const handleClose=()=> setShow(false);
    const [ isOpenModal,setIsOpenModal]=useState(false);
    const handleCloseModel=()=>setIsOpenModal();

    const handleSaveAssign=(data)=>{
         let updateRecords =[...withdrawList].map((record)=>{
            let temp = {...record};
            temp.duration_end = data.durationEnd;
            temp.status= "under_employee"
            temp.caseHistory = {
                assigned_by:userProfile.id,
                assigned_to:parseInt(data.assignedTo),
                remark:"withdraw case again assign to admin to employee"
            };
          return temp;
         });
    updateRecords.forEach((record)=>{
         dispatch(updateCaseById(record)).then(()=>{
         dispatch(getAllCaseAPI({id:'all',status: ['withdraw']}));
        });
     });
        setIsOpenModal(false)
    }

    const handleAssignEmployee=()=>{
        setModalType('assign')
        setIsOpenModal(true);
    }
    const handleEditButton=(editData)=>{
        setModalType('edit')
        setShow(true);
        setWithdrawData(editData)
    }

    const handleUpdateDataSave=(data)=>{
        dispatch(updateCaseById({
            id:data.id,
            company_id:data.companyId,
            candidate_name:data.candidateName,
            father_name:data.fatherName,
            contact_no:data.contactNo,
            alternate_no:data.alternateNo,
            city_id:data.city,
            client_name:data.clientName,
            state_id:data.state,
            verification_type:data.verificationType,
            pincode:data.pincode,
            address:data.address,
            district_id:data.district,
            location:data.landmark,
            resume_id:data.resumeId,
            duration_start:data.durationStart
            })).then(()=>{ 
            dispatch(getAllCaseAPI({id:'all',status: ['withdraw']}));
        });
        setShow(false)
    }

    const handlewithdrawcaseDelete=(id)=>{
            dispatch(deleteCaseDataById(id)).then(()=>{
            dispatch(getAllCaseAPI({id:'all',status: ['withdraw']}));
            });
        setShow(!show)
    }

    const onClickCheck = (withdrawData) =>{
        console.log(withdrawData)
        setWithdrawData(withdrawData);
     }
    return(
        <Container>
            <div>  <h1>Withdraw Verification List</h1>
            <Button variant="info" className='Button_assing' disabled={!(withdrawData.length >0)}
                     onClick={()=>handleAssignEmployee()}  >
                  Assign </Button>
                  </div><br/> 
                <div  className="icon-aline"  >
                <OpalTable  
                headers={withdrawDataColoum}
                rowData={withdrawList || []}  
                showCheckbox={true}
                checkBoxColoum={(item)=>onClickCheck(item)} 
                edit={handleEditButton} />
                </div>
         <div>
            <ModalVerification show={show} type={modalType} close={handleClose} onUpdate={handleUpdateDataSave} 
               onDelete={handlewithdrawcaseDelete}  defaultData={withdrawData}/> 

            <AssignModal show={isOpenModal} close={handleCloseModel} assignData={withdrawData} type={modalType} 
             onSave={handleSaveAssign}  /> 
         </div>
         </Container>
    )
}
export default Withdraw; 