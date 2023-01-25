import{Container ,Button}from 'react-bootstrap';
import { useState,useEffect} from 'react';
import {FaUserPlus} from 'react-icons/fa';
import { useDispatch,useSelector } from 'react-redux';
import {deleteDataColoum} from "./mock/deleteData";
import OpalTable from './opalTable';
import {useParams} from 'react-router-dom';
import {getAllCaseAPI ,deleteCaseDataById} from './actions/verification'
const DeleteData=()=>{

    const deletes = useSelector(state=> state?.verification?.list || []);
    const { id  } = useParams();

    const [deleteList,setdeleteList]=useState([]);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllCaseAPI({id:'all',status: ['verify_by_admin']}));
       },[])
     
       useEffect(()=>{
        setdeleteList(deletes)
       },[deletes])

    const handleDeleteData=(id)=>{
        console.log("data",id)
        // dispatch(deleteCaseDataById(data.id))
    }

    const onClickCheck = (deleteList) =>{
        console.log("deleteList",deleteList)
        setdeleteList(deleteList);
        // setdeleteList(deleteData);
     }
  
    return(
        <Container  >
            <div> <h2> Delete Data</h2> </div>
            <div>  
                <Button  className='Button_assing' variant="danger" disabled={!(deleteList.length >0)}
                    onClick={()=>handleDeleteData(deleteList.id)} > 
                    <span><FaUserPlus/></span> 
                    &nbsp; Delete
                </Button> 
            </div> <br/> <br/><br/>
            <div className="icon-aline" >
                 <OpalTable  
                headers={deleteDataColoum}
                rowData={deleteList || []}  
                showCheckbox={true}
                checkBoxColoum={(item)=>onClickCheck(item)}
                />
             </div>
        </Container>
    )
}
export default DeleteData; 