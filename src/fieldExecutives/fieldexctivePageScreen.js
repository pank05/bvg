import { FaUserPlus } from "react-icons/fa";
import { useState,useEffect } from "react";
import FieldExectiveModal from "./fieldModal";
import {Container,Button} from 'react-bootstrap';
import {fieldExecutiveDataColoum} from "../mock/fieldExecutiveData";
import { useDispatch, useSelector } from "react-redux";
import OpalTable from "../opalTable";
import { getAllFieldAPI,getFieldById,deleteFieldById,postFieldAPI,updateFieldById } from "../actions/fieldexctive";
const FieldExecutivePage=(Para)=>{

 const field = useSelector(state=> state?.field?.list || []);
 const [fieldData, setFieldData]=useState([])
 const dispatch = useDispatch();

 useEffect(()=>{
  dispatch(getAllFieldAPI())
 },[])

 useEffect(()=>{
  setFieldData(field)
 },[field])

   const [show , setShow] = useState(false);
   const [modalType , setModalType] = useState('edit');
  const handleClose = () => setShow(false);
  const [defaultData,setDeafultData] = useState({})

  const handleAddField = () =>{
    setModalType('add');
    setShow(true);
    setDeafultData({})
  }

const handleAddSaveme=(data)=>{
  dispatch(postFieldAPI(data)).then(()=>{
    dispatch(getAllFieldAPI({ id: "all"}))  })
  setShow()
}

const hadleEditField= (data)=>{
    setModalType('edit');
    setShow(true)
    setDeafultData(data)
    dispatch(getFieldById(data.id))
}

const handleUpdateSave=(data)=>{
    dispatch(updateFieldById(data)).then(()=>{
    dispatch(getAllFieldAPI())})
    setShow()
}

function handleRemoveField(id){
  dispatch(deleteFieldById(id)).then(()=>{
  dispatch(getAllFieldAPI({ id: "all"}))  })
  setShow(false);
}

    return(
      <Container>
        <div > 
            <h2> Field Executive
            <small> <Button className="circle" onClick={handleAddField} >
              <FaUserPlus/> </Button> </small></h2> </div>
        <div className="icon-aline">
        <OpalTable
        headers={fieldExecutiveDataColoum}
        rowData={fieldData || []} 
        edit={hadleEditField}
        />
    </div>
       <FieldExectiveModal show={show} close={handleClose} type={modalType} onUpdate={handleAddSaveme} defaultData={defaultData}
        onSave={handleUpdateSave} onDelete={handleRemoveField} value={fieldData}  /> 
      {Para.children}
      </Container>
    )
}
export default FieldExecutivePage;