import { FaUserPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import ModalVerification from "./modalVerification";
import { Container, Button ,Form,InputGroup,Col,Row} from "react-bootstrap";
import OpalTable from '../opalTable';
import {FaFileImport} from 'react-icons/fa';
import {verificationDataColumn} from "../mock/verificationdata";
import { useDispatch, useSelector } from "react-redux";
import { read, utils } from 'xlsx';
import {useParams} from 'react-router-dom';
import { getCompanyDataById,clearCurrentCompany,getAllCompaniesAPI} from "../actions/company";
import {postAddCaseAPI,getAllCaseAPI,getCaseDataById ,updateCaseById,deleteCaseDataById} from "../actions/verification";
import { checkUserHasRole } from "../utility/validation";

const VerificationList_Page=(para)=>{

    const verification = useSelector(state=> state?.verification?.list || []);
    const [verificationList,setVerification] =useState([]);
    const [defaultData,setDeafultData] = useState({}) ;
    const userProfile = useSelector((state) => state?.user?.userProfile);

           const dispatch = useDispatch();
           const { id  } = useParams();
           const currentSelection = useSelector(state=> state?.company?.currentCompany || {});

           useEffect(()=>{
            if(id){
                dispatch(getAllCaseAPI({id}));
                dispatch(getCompanyDataById(id))
            }
            else{
                if(checkUserHasRole(userProfile,['admin'])){
                    dispatch(getAllCaseAPI({id:'all'}));
                }
                if(checkUserHasRole(userProfile,['employee'])){
                    dispatch(getAllCaseAPI({id:'all',status: ['under_employee','rejected_by_FE','verify_by_FE' ]}));
                }
                if(checkUserHasRole(userProfile,['FieldExecutive'])){
                    dispatch(getAllCaseAPI({id:'all',status: ['under_FE']}));
                }
               
                dispatch(clearCurrentCompany());
            }
           },[])
           
           useEffect(()=>{
            setVerification(verification)
           },[verification])

                 const [show , setShow] = useState(false);
                 const [modalType , setModalType] = useState('edit');
                 const handleClose = () => setShow(false);
 
                 const handleAddVerification =()=>{
                        setModalType('add');
                        setShow(true);
                        setDeafultData({})
                     }

                 const handleAddSave =(data)=>{
                     dispatch(postAddCaseAPI(data)).then(()=>{
                     dispatch(getAllCaseAPI({id:'all'}));
                     });
                     setShow(false);
                    }

                 const handleEditVerification=(data)=>{
                        setModalType('edit');
                        setShow(true);
                        setDeafultData(data);
                        dispatch(getCaseDataById(data.id))
                 }

                 const handleUpdateVerification=(data)=>{
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
                        dispatch(getAllCaseAPI({id:'all'}));
                        });
                     setShow(false)
                 }
                 
                 const  handleDeleteData =(id)=>{
                    dispatch(deleteCaseDataById(id)).then(()=>{
                        dispatch(getAllCaseAPI({id:'all'}));
                        });
                    setShow(false)
                   }

                  const handleImport = ($event) => {
                    const files = $event.target.files;
                    if (files.length) {
                        const file = files[0];
                        const reader = new FileReader();
                        reader.onload = (event) => {
                            const wb = read(event.target.result);
                            const sheets = wb.SheetNames;
            
                            if (sheets.length) {
                                const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                            
                                let rowData = rows.map((item)=>{
                                    
                                    let importData = {
                                        checkId:item['Asd ID'],
                                        clientName:item['Client Name'],
                                        candidateName:item['Applicant Name'],
                                        fatherName:item['Fathers Name'],
                                        contactNo:item['Contact Details'],
                                        city:item.Location,
                                        state:item.State,
                                        verificationType:item['Type of Check'],
                                        EMP:item['Whom to Allocate'],
                                        duration:item.Duration,
                                        address:item['Address - Details'],
                                    } ;
                                    return importData;
                                  });
                                  setVerification(rowData);
                            }
                        }
                        reader.readAsArrayBuffer(file);
                    }
                }
                const onClickCheck = (defaultData) =>{
                    setDeafultData(defaultData);
                 }
    return(
        <Container>
               <div style={{textAlign: "left", fontSize:"12px"}}> 
                <small> Note: <br/>
                  <Button className="btn btn-info"/>Edit Or View Verification Status<br/>
                  <Button className="btn btn-warning"/>Fill Postverification form <br/>
                  <Button className="btn btn-success"/>Verification closed completed
                </small></div>
               <div> <h1> Address Verification  &nbsp; 
                <small><Button className="circle" onClick={()=>handleAddVerification()}> <FaUserPlus/></Button> </small>  </h1>
                 </div>
                <div style={{textAlign:"-webkit-right"}}>
                {currentSelection.name}
                <br/>
            <Button>
                Verification Form
            </Button>
            </div>

                <div className="icon-aline">
                    <Row>
                        <Col></Col>
                        <Col></Col>
                        <Col>
                        <InputGroup className="mb-3">
                           <Button variant="success" id="button-addon1">
                           < FaFileImport />
                           </Button>
                         <Form.Control type="file"  onChange={handleImport}
                           aria-label="Example text with button addon" aria-describedby="basic-addon1"
                           accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                        </InputGroup>
                        </Col>
                    </Row>
                <OpalTable  
                headers={verificationDataColumn}
                showCheckbox={true}
                rowData={verificationList || []}  
                checkBoxColoum={(item)=>onClickCheck(item)} 
                edit={handleEditVerification} />
                </div>
                <br/>
             <div > 
                <ModalVerification show={show} close={handleClose} type={modalType} onUpdate={handleUpdateVerification} 
                onSave={handleAddSave}  onDelete={handleDeleteData} defaultData={defaultData} /> 
              </div>  
              {para.children}
              </Container>
           )}
export default VerificationList_Page;