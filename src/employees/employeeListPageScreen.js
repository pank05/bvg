import { useState ,useEffect} from "react";
import {FaUserPlus} from "react-icons/fa" ;
import EmployeeModal from "../employees/modalEmployee"
import { Button,Container } from "react-bootstrap";
import { useNavigate} from 'react-router-dom';
import {employeeDataColoum} from "../mock/employeeData";
import { useDispatch, useSelector } from "react-redux";
import {deleteEmployeeById,postEmployeeAPI,getAllEmployeeAPI,getEmployeeById,updateEmployeeById} from "../actions/employee";
import OpalTable from "../opalTable";
import AssignModal from "../assign/modalAssign";

const EmployeeListPage=(Para)=>{

  const navigate = useNavigate();
  const employee = useSelector(state=> state?.employee?.list || []);
  const [EmployeeList, setEmployeeList]=useState([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [modalType, setModalType]=useState('add')
  const [defaultData,setDeafultData] = useState([])
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getAllEmployeeAPI())
   },[])
 
   useEffect(()=>{
    setEmployeeList(employee)
   },[employee]);

  const handleAddEmployee=()=>{
    setModalType('add')
    setShow(true)
    setDeafultData({})
  }

  const handleSaveMe=(data)=>{
    dispatch(postEmployeeAPI(data)).then(()=>{
      dispatch(getAllEmployeeAPI({ id: "all"}))
    }) 
    setShow(false)
  }
  
  const hadleEditEmployee= (data)=>{ 
    setDeafultData(data)
    setModalType('edit')
    setShow(true)
    dispatch(getEmployeeById(data.id))
  }

  const handleUpdateEmployee= (data)=>{
    dispatch(updateEmployeeById(data)).then(()=>{
      dispatch(getAllEmployeeAPI())  })
    setShow(false)
  }
   
const  handleToggleModal= (id,data)=>{
  dispatch(deleteEmployeeById(id)).then(()=>{
  dispatch(getAllEmployeeAPI({ id: "all"}))  })
  setShow(false)
}

    return(
       <Container>
           <div>
            <h1>Employees
              <small>
                <Button className="circle" onClick={handleAddEmployee} >
                  <FaUserPlus/>
                </Button>   
              </small> 
            </h1> 
           </div>
                <div className="icon-aline"> 
                  <OpalTable 
                    headers={employeeDataColoum}
                    rowData={EmployeeList || []}
                    edit={hadleEditEmployee} 
                    statictics={(state)=>{ navigate('/ViewStatistics',{state}); }}  
                  />
                </div>
            <EmployeeModal show={show} close={handleClose}  defaultData={defaultData} type={modalType}  value='EmployeeList'   save={handleSaveMe}
              onUpdate={handleUpdateEmployee} onDelete={handleToggleModal} />
            <AssignModal defaultData={defaultData}/>
        {Para.children}
    </Container>
    )
}
export default EmployeeListPage;