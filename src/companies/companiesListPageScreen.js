import { Container ,Button} from "react-bootstrap";
import { useEffect, useState } from "react";
import OpalTable from "../opalTable";
import {companiesDataColoum} from "../mock/companiesData";
import CompaniesModal from "./companiesModal";
import {FaUserPlus} from "react-icons/fa" ;
import { useDispatch, useSelector } from "react-redux";
import { getCompanyDataById,deleteCompany,getAllCompaniesAPI,postAddCompaniesAPI,updateCompanyById} from "../actions/company";

const CompaniesListPage=(Para)=>{
  const companies = useSelector(state=> state?.company?.list || []);
  const currentSelection = useSelector(state=> state?.company?.currentCompany || {});
  const [companiesList,setCompaniesList]= useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [modalType, setModalType]=useState('add')
  const [defaultData,setDeafultData] = useState({})
  const dispatch = useDispatch();

  useEffect(()=>{
   dispatch(getAllCompaniesAPI('all'))
  },[])

  useEffect(()=>{
    setCompaniesList(companies)
  },[companies])

  const handleEditCompanies =(data)=>{
    setModalType('edit')
    setShow(true)
    setDeafultData(data);
    dispatch(getCompanyDataById(data.id));
  }
  const handleAddCompanies =()=>{
    setModalType('add')
    setShow(true)
    setDeafultData({})
  }
  const handleAddCompaniesSave=(data)=>{
    dispatch(postAddCompaniesAPI(data)).then(()=>{
      dispatch(getAllCompaniesAPI('all'));
    })
    setShow(false)
  }
  const handleUpdateCompanies=(data)=>{
    dispatch(updateCompanyById(data)).then(()=>{
      dispatch(getAllCompaniesAPI('all'));
    })
    setShow(false)
  }
  const handleDeleteCompanies=(id)=>{
    dispatch(deleteCompany(id))
    setShow(false)
  }
  const handleToggleActiveButton=()=>{
    console.log("toggle")
  }
    return(
      <Container>
        <div>
            <h1> Companies List &nbsp;
           <small><Button className="circle" data-bs-toggle="modal" data-bs-target="#myModal" onClick={handleAddCompanies}>
              <FaUserPlus/></Button>   </small> </h1>
              </div>
       <div className="icon-aline">  
       <OpalTable
       headers={companiesDataColoum }
       rowData={companiesList || []}
       edit={handleEditCompanies}
       toggle={handleDeleteCompanies}
       />
      </div>
      <div>
      <CompaniesModal show={show} close={handleClose} defaultData={currentSelection} type={modalType}  value='EmployeeList' 
       onSave={handleAddCompaniesSave} onUpdate={handleUpdateCompanies} />
      </div>
  {Para.children}
  </Container>
    )
}
export default CompaniesListPage; 