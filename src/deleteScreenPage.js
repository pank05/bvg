import{Container ,Button}from 'react-bootstrap';
import { useState,useEffect} from 'react';
import {FaUserPlus} from 'react-icons/fa';
import { useDispatch,useSelector } from 'react-redux';
import {deleteDataColoum} from "./mock/deleteData";
import OpalTable from './opalTable';
import {useParams} from 'react-router-dom';
import {getAllCaseAPI ,deleteCaseDataById,getCaseDataById} from './actions/verification'
const DeleteData=()=>{

    const deletes = useSelector(state=> state?.verification?.list || []);
    const { id  } = useParams();

    const [selectedCase,setSelectedCase] = useState({});
    const [tatData,setTatData] = useState([]);
    const [deleteTAT,setDeleteTAT]=useState([]);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllCaseAPI({id:'all',status: ['verify_by_admin','withdraw','rejected_by_admin']}));
       },[])
     
       useEffect(()=>{
        setTatData(deletes)
       },[deletes])


       const [show,setShow]=useState(false);
       const handleClose=()=> setShow(false);
    const handleDeleteData=(data)=>{
        dispatch(deleteCaseDataById(data.id)).then(()=>{
        dispatch(getAllCaseAPI({id:'all'}));
            });
        console.log("data",data.id)
    }

    const handleDeleteCaseModal =(data)=>{
        // dispatch(getCaseDataById(data.id))
        console.log(data.id)
        setShow(true)
    }

    const onClickCheck = (selectedCase) =>{
        console.log("selectedCase.id",selectedCase)
        setSelectedCase(selectedCase)
        setDeleteTAT(selectedCase);
     }
  
    return(
        <Container  >
            <div> <h2> Delete Data</h2> </div>
            <div>  
                <Button  className='Button_assing' variant="danger" disabled={!(deleteTAT.length >0)}
                    onClick={()=>handleDeleteData(selectedCase[0])} > 
                    <span><FaUserPlus/></span> 
                    &nbsp; Delete
                </Button> 
            </div> <br/> <br/><br/>
            <div className="icon-aline" >
                 <OpalTable  
                headers={deleteDataColoum}
                rowData={tatData || []}  
                showCheckbox={true}
                checkBoxColoum={(item)=>onClickCheck(item)}
                />
             </div>


        </Container>
    )
}
export default DeleteData; 