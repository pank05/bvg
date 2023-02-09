import { Container ,Form,Button,Row,Col ,InputGroup } from "react-bootstrap"
import OpalTable from "../opalTable";
import {FaFileImport} from "react-icons/fa";
import {afterVerifyDataColoum} from "../mock/afterVerifyData";
import { useState,useEffect } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { getAllCaseAPI,getCaseDataById } from "../actions/verification";
import ModalAfterVerify from "../afterVerification/modalAfterVerify";
import ModalAfterUnview from "./modalAfterVerifyUnview";
import {updateAddrescaseDetails} from "../actions/review"

const VerificationByFieldExective =(props)=>{

    const caseData = useSelector((state) => state?.verification?.list || []);
    const [verifyFEData, setVerifyFEData]=useState([])
    const dispatch =useDispatch();

    useEffect(()=>{
        dispatch(getAllCaseAPI({id:'all', status: ["under_FE", "verify_by_FE"],}))
    },[])

    useEffect(()=>{
        setVerifyFEData((caseData.filter((t) => t.status == "under_FE")))
    },[caseData])

    const [actionButton, setActionButton]=useState(true)
    const [buttonType, setButtonType] = useState("View Verified By FE");
    const [modalType,setModalType]=useState("edit");
    const [show,setShow]=useState(false);
    const handleClose=()=> setShow(false);
    const [defaultData, setDeafultData] = useState({});
    const [showModal,setShowModal]=useState(false)
    const handleCloseModal=()=>setShowModal(false)

    const handleViewVerifyCase = () => {
        setButtonType("View Verified By FE");
        const viewVerifyData = caseData.filter((val) => {
          return val.status == "verify_by_FE";
        });
        setVerifyFEData(viewVerifyData);
        setActionButton(!actionButton);
      };
    
      const handleReviewCase = () => {
        setButtonType("View Unreview");
        setActionButton(!actionButton);
        const unViewVerifyData = caseData.filter((val) => {
          return val.status == "under_FE";
        });
        setVerifyFEData(unViewVerifyData);
      };

      const handleCaseEditModal = (data) => {
        setModalType("edit");
        setShow(true);
        setDeafultData(data);
        dispatch(getCaseDataById(data.id))
      };
      
      const handleUpdateCase=(data)=>{
        setDeafultData(data);
        setModalType("update");
        setShow(true);
        dispatch(getCaseDataById(data.id))
      }

      const handleUpdateAddressSave =(data)=>{
        let updateRecords =[...verifyFEData].map((record)=>{
          let temp = {...record};
          temp.state= data?.candidateState
            temp.verifications = {
                is_landmark:data?.nearLandmark,
                verification_reason_id:data?.reasonNotFound,
                verification_reason_remark:data?.addressRemark,
                is_present:data?.address,
                period_stay_from:data?.fromDate,
                period_stay_to:data?.toDate,
                address_status_id:data?.stayVerification,
                residence_status_id:data?.residenceStatus,
                residence_type_id:data?.residenceType,
                area_type_id:data?.areaType,
                additional_remark_json:data?.additionalRemarkByFE,
                is_positive:data?.additionalRemark,
            }
            temp.candidates = {
                verified_by:data?.verifyBy,
                respondent_relation:data?.relationType,
                person_name:data?.relationTypeMeetPerson,
                person_contact:data?.meetPersonContactNo,
                is_id_proof:data?.idProof,
                signature_url:data?.candidateSignature
            }
            temp.case_details={
                verification_date:data?.verificationDoneDate,
        //         "verification_remark": "positive"
            }
            temp.users={
                signature_url:data?.FESignature
            }
      return temp;
});
updateRecords.forEach((record)=>{
  console.log("record",record)
  dispatch(updateAddrescaseDetails(record)).then(()=>{
      dispatch(getAllCaseAPI({id:'all',status: ['under_FE']}));
      });
});
setShow(false);
      }

      const [modalTypes,setModalTypes]=useState('editUnview')

      const handleReviewEditForm=(data)=>{
        setModalTypes('editUnview');
        setShowModal(true);
        console.log("hello",data)
      }

      const handleUpdateVerifyForm=(data)=>{
        setModalTypes("updateUnview")
        setShowModal(true);
        console.log("heell",data)
      }

    return(
        <Container>
               <div style={{ textAlign: "left", fontSize: "12px" }}>
        <small>
          Note: <br />
          <Button className="btn btn-secondary" /> View Verification Form <br />
          <Button className="btn btn-info" />Edit Or View Verification Status
        </small>
      </div>
      <div>
        <h2 style={{ align: "center" }}>
          Calling & Review Verification List &nbsp; &nbsp; &nbsp;
          <Button
            className="btn btn-primary"
            style={{ align: "rigth" }}
            onClick={actionButton ? handleViewVerifyCase : handleReviewCase}
          >
            {actionButton ? "View Verified By FE" : "View Unreview"}
          </Button>
        </h2>
      </div>
      <div className="icon-aline">
        {/* <Row>
          <Col></Col>
          <Col></Col>
          <Col>
            <InputGroup className="mb-3">
              <Button variant="success" id="button-addon1">
                <FaFileImport />
              </Button>
              <Form.Control
                type="file"
                // onChange={handleImport}
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              />
            </InputGroup>
          </Col>
        </Row> */}
        <OpalTable
          headers={afterVerifyDataColoum}
          rowData={verifyFEData || []}
          edit= {actionButton ? handleCaseEditModal  : handleReviewEditForm}
          viewButton={ actionButton ? handleUpdateCase : handleUpdateVerifyForm  }   />
        </div>
        <div>
        {/* status under_employee  */}
        <ModalAfterVerify
          show={show}
          close={handleClose}
          type={modalType}
          defaultData={defaultData}
          onUpdate={handleUpdateAddressSave}
        //   onSave={handleEditSave}
        />
      </div>
      <div>
      <ModalAfterUnview
          open={showModal}
          onClose={handleCloseModal}
          type={modalTypes}
        //   auditData={data}
          defaultData={defaultData}
          // onSubmit={handleUNviewUpdateSaveButton}
        />
      </div>
      {props.children}
        </Container>
    )
}
export default VerificationByFieldExective ;