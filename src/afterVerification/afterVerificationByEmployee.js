import { Container,Button } from "react-bootstrap";
import { afterVerifyDataColoum } from "../mock/afterVerifyData";
import OpalTable from "../opalTable";
import { useDispatch, useSelector } from "react-redux";
import { useState ,useEffect} from "react";
import {getAllCaseAPI,getCaseHistoryById,getCaseDataById} from "../actions/verification";
import ModalAfterVerify from "./modalAfterVerify";
import ModalAfterUnview from "./modalAfterVerifyUnview";
import {updateAddrescaseDetails,updateAddressAuditCaseDetails} from "../actions/review";

const VerificationByEmployee =(props)=>{
    const caseList = useSelector((state) => state?.verification?.list || []);
    const [verifyByEMPData, setVerifyByEMPData] = useState([]);
    const dispatch=useDispatch();
    const [actionButton ,setActionButton]=useState(false)
    const [buttonType, setButtonType] = useState("View Verified By FE");
    
    useEffect(() => {
        dispatch(
          getAllCaseAPI({ id: "all", status: ["verify_by_FE","verify_by_employee","rejected_by_FE"] })
        );
      }, []);
    
      useEffect(() => {
        setVerifyByEMPData(caseList.filter((t) => (t.status == "verify_by_FE") || (t.status == "rejected_by_FE") ));
      }, [caseList]);

      const handleViewVerifyByEmp =()=>{
        setButtonType("View Verified By FE");
        const viewVerifyData = caseList.filter((val) => {
          return val.status == "verify_by_employee";
        });
        setVerifyByEMPData(viewVerifyData);
        setActionButton(!actionButton);
      }

      const handleViewVerifyByFE =()=>{
        setButtonType("View Verified By FE");
        const viewVerifyData = caseList.filter((val) => {
          return (val.status == "verify_by_FE") || (val.status == "rejected_by_FE")
        });
        setVerifyByEMPData(viewVerifyData);
        setActionButton(!actionButton);
      }

      const [modal,setModal]=useState("edit");
      const [show,setShow]=useState(false);
      const handleClose =()=> setShow(false);

      const handleCaseEditModal = (data) => {
        dispatch(getCaseHistoryById(data.id))
        setModal("edit");
        setShow(true);
        dispatch(getCaseDataById(data.id));
      };

      const handleUpdateCase = (data) => {
        setModal("update");
        setShow(true);
        dispatch(getCaseDataById(data.id));
      };

      const handleUpdateAddressSave = (data) => {
    let selectRecord = [...verifyByEMPData].filter((v) => v.id === data.id);
    if (selectRecord.length > 0) {
      let updateRecords =  selectRecord.map((record) => {
        let temp = { ...record };
          temp.state = data?.candidateState;
          temp.verifications = {
            type_id: data?.verificationRemarkByFE,
            is_landmark: data?.nearLandmark,
            verification_reason_id: data?.reasonNotFound,
            verification_reason_remark: data?.addressRemark,
            is_present: data?.address,
            is_by_birth: data?.birthCheckForm,
            is_till_date: data?.tillCheckForm,
            period_stay_from: data?.fromDate,
            period_stay_to: data?.toDate,
            address_status_id: data?.stayVerification,
            residence_status_id: data?.residenceStatus,
            residence_type_id: data?.residenceType,
            area_type_id: data?.areaType,
            is_positive: data?.additionalRemark,
            additional_remark_json: data?.additionalRemarkByFEForm,
          };
          temp.candidates = {
            verified_by_id: data?.verifyBy,
            responder_relation_id: data?.relationType,
            person_name: data?.relationTypeMeetPerson,
            person_contact: data?.meetPersonContactNo,
            is_id_proof: data?.idProof,
            signature_url: data?.image?.name,
          };
          temp.case_details = {
            verification_date: data?.verificationDoneDate,
          };
          temp.users = {
            signature_url: data?.image?.name,
          };
          return temp;
        });
        updateRecords.forEach((record) => {
          dispatch(updateAddrescaseDetails(record)).then(() => {
            dispatch(getAllCaseAPI({ id: "all", status: ["verify_by_FE"] }));
          });
        });
    }
        setShow(false);
      };

      const handleSaveVerifyByEMP = (data) => {
        let selectRecord = [...verifyByEMPData].filter((v) => v.id === data.id);
    if (selectRecord.length > 0) {
      let updateRecords =  selectRecord.map((record) => {
        let temp = { ...record };
          temp.status = data?.status;
          temp.remark = data?.remark;
          temp.caseHistory = {
            remark: data?.remark,
            status_id: data?.status,
          };
          temp.audit_call_statuses = {
            audit_call_done: data?.auditCallDone,
            audit_call_done_remark: data?.auditCallDoneRemark,
            audit_call_status: data?.auditCallStatus,
            audit_call_status_remark: data?.auditCallStatusRemark,
            audit_case_status_id: data?.auditCaseStatusId,
            audit_case_status_remark: data?.auditCaseStatusRemark,
          };
          return temp;
        });
        updateRecords.forEach((record) => {
            console.log("recird",record)
          dispatch(updateAddressAuditCaseDetails(record)).then(() => {
            dispatch(getAllCaseAPI({ id: "all", status: ["verify_by_FE"] }));
          });
        });
    }
        setShow(false);
      };

      const [modalTypes, setModalTypes] = useState("editUnview");
      const [showModal, setShowModal] = useState(false);
      const handleCloseModal = () => setShowModal(false);

  const handleReviewEditForm = (data) => {
    dispatch(getCaseHistoryById(data.id))
    dispatch(getCaseDataById(data.id));
    setModalTypes("editUnview");
    setShowModal(true);
  };

  const handleUpdateVerifyForm = (data) => {
    dispatch(getCaseDataById(data.id));
    setModalTypes("updateUnview");
    setShowModal(true);
  };

  const handleUpdateAddressDetailsByEmp =(data)=>{
    let selectRecord = [...verifyByEMPData].filter((v) => v.id === data.id);
    if (selectRecord.length > 0) {
      let updateRecords =  selectRecord.map((record) => {
        let temp = { ...record };
        temp.verifications = {
          verification_residence_type:data?.residenceType ,
          verification_residence_status:data?.residenceStatus,
        };
  
        temp.case_details = {
          status_of_verification:data?.statusVerification,
          building_photo :data?.buildingPhotoStatus,
          building_photo_remark:data?.buildingPhotoRemark, 
          address_proof:data?.addressProofStatus, 
          address_proof_remark:data?.addressProofRemark ,
          landmark_photo:data?.landmarkPhotoStatus,
          landmark_photo_remark:data?.landmarkPhotoRemark,
          verification_time:data?.verificationTime
        };
        return temp;
      });
      updateRecords.forEach((record) => {
        console.log("record",record)
        dispatch(updateAddrescaseDetails(record)).then(() => {
          dispatch(getAllCaseAPI({ id: "all", status: ["verify_by_employee"] }));
        });
      });
    }
    setShowModal(false)
  }

    return (
        <Container>
                 <div style={{ textAlign: "left", fontSize: "12px" }}>
        <small>
          Note: <br />
          <Button className="btn btn-secondary" /> View Verification Form <br />
          <Button className="btn btn-info" />
          Edit Or View Verification Status
        </small>
      </div>
      <div>
        <h2 style={{ align: "center" }}>
          Calling & Review Verification List &nbsp; &nbsp; &nbsp;
          <Button
            className="btn btn-primary"
            style={{ align: "rigth" }}
            onClick={actionButton ? handleViewVerifyByFE : handleViewVerifyByEmp}>            
            {actionButton ? "View Unreview"  :  "View Verified By Employee"}
          </Button>
        </h2>
      </div>
      <div className="icon-aline">
        <OpalTable
          headers={afterVerifyDataColoum}
          rowData={verifyByEMPData || []}
          edit={actionButton ? handleReviewEditForm :  handleCaseEditModal}
          viewButton={actionButton ? handleUpdateVerifyForm :  handleUpdateCase}
        />
      </div>

      <div>
        {/* status veriby fe  */}
        <ModalAfterVerify
          show={show}
          close={handleClose}
          type={modal}
        //   defaultData={defaultData}
          onUpdate={handleUpdateAddressSave}
          onSave={handleSaveVerifyByEMP}
        />
      </div>
      <div>
        <ModalAfterUnview
          open={showModal}
          onClose={handleCloseModal}
          type={modalTypes}
        //   defaultData={defaultData}
          onSubmit={handleUpdateAddressDetailsByEmp}
        />
      </div>
      {props.children}
        </Container>
    )
}
export default VerificationByEmployee ;