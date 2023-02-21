import { useState, useEffect } from "react";
import ModalAfterVerify from "./modalAfterVerify";
import ModalAfterUnview from "./modalAfterVerifyUnview";
import { Container, Button } from "react-bootstrap";
import OpalTable from "../opalTable";
import { afterVerifyDataColoum } from "../mock/afterVerifyData";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllCaseAPI,
  getCaseHistoryById,
  getCaseDataById,
} from "../actions/verification";

import {
  updateAddrescaseDetails,
  updateAddressAuditCaseDetails,
} from "../actions/review";

const AfterVerification = (props) => {
  const review = useSelector((state) => state?.verification?.list || []);
  const [verifyAdmin, setVerifyAdmin] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAllCaseAPI({
        id: "all",
        status: ["verify_by_employee", "verify_by_admin","rejected_by_employee" ],
      })
    );
  }, []);

  useEffect(() => {
    setVerifyAdmin(review.filter((t) => (t.status == "verify_by_employee") || (t.status == "rejected_by_employee ")));
  }, [review]);

  // useEffect(() => {
  //   setVerifyAdmin(review.filter((t) => t.status == "verify_by_admin"));
  // }, [review]);

  const [buttonType, setButtonType] = useState("View Verified By Admin");

  const handleViewVerify = () => {
    setButtonType("View Verified By Admin ");
    const viewVerifyData = review.filter((val) => {
      return val.status == "verify_by_admin";
    });
    setVerifyAdmin(viewVerifyData);
    setActionButton(!actionButton);
  };

  const handleReview = () => {
    setButtonType("View Unreview");
    setActionButton(!actionButton);
    const unViewVerifyData = review.filter((val) => {
      return (val.status == "verify_by_employee") || (val.status ==  "rejected_by_employee ");
    });
    setVerifyAdmin(unViewVerifyData);
  };

  const [actionButton, setActionButton] = useState(true);
  const [modalType, setModalType] = useState("edit");
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const [defaultData, setDeafultData] = useState({});

  const handleEditVerifyByemp = (data) => {
    setModalType("edit");
    setShowModal(true);
    dispatch(getCaseHistoryById(data.id));
    dispatch(getCaseDataById(data.id));
  };

  const handleUpdateAddressByemp = (data) => {
    dispatch(getCaseDataById(data.id));
    setModalType("update");
    setShowModal(true);
  };

  const handleVerifyByAdmin = (data) => {
    let selectRecord = [...verifyAdmin].filter((v) => v.id === data.id);
    if (selectRecord.length > 0) {
      let updateRecord =  selectRecord.map((record) => {
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
    updateRecord.forEach((record) => {
      console.log("recird", record);
      dispatch(updateAddressAuditCaseDetails(record)).then(() => {
        dispatch(getAllCaseAPI({ id: "all", status: ["verify_by_employee"] }));
      });
    });
  }
    setShowModal();
  };

  const handleUpdateAddress= (data) => {
      let selectRecord = [...verifyAdmin].filter((v) => v.id === data.id);
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
      })
    updateRecords.forEach((record) => {
      console.log("updateRecord",record)
      dispatch(updateAddrescaseDetails(record)).then(() => {
        dispatch(getAllCaseAPI({ id: "all", status: ["verify_by_employee"] }));
      });
    });
  }
    setShowModal();
  };

  const [modalUnview, setModalUnview] = useState("editUnview");
  const [showUnview, setShowUnview] = useState(false);
  const handleCloseUn = () => setShowUnview(false);

  const  handleEditVerifyByAdmin = (data) => {
    setModalUnview("editUnview");
    dispatch(getCaseHistoryById(data.id));
    dispatch(getCaseDataById(data.id));
    setShowUnview(true);
  };

  const handleUpdateAddressByAdmin = (data) => {
    setModalUnview("updateUnview");
    setShowUnview(true);
    dispatch(getCaseDataById(data.id));
  };

  const handleUpdateAddressBy= (data) => {
    let selectRecord = [...verifyAdmin].filter((v) => v.id === data.id);
    if (selectRecord.length > 0) {
      let updateRecord =  selectRecord.map((record) => {
        let temp = { ...record };
        temp.verifications = {
          verification_residence_type: data?.residenceType,
          verification_residence_status: data?.residenceStatus,
        };

        temp.case_details = {
          status_of_verification: data?.statusVerification,
          building_photo: data?.buildingPhotoStatus,
          building_photo_remark: data?.buildingPhotoRemark,
          address_proof: data?.addressProofStatus,
          address_proof_remark: data?.addressProofRemark,
          landmark_photo: data?.landmarkPhotoStatus,
          landmark_photo_remark: data?.landmarkPhotoRemark,
          verification_time: data?.verificationTime,
        };
        return temp;
      });
      updateRecord.forEach((record) => {
        console.log("record",record)
        dispatch(updateAddrescaseDetails(record)).then(() => {
        dispatch(getAllCaseAPI({ id: "all", status: ["verify_by_admin"] }));
        });
      });
    }
    setShowUnview(false)
  };

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
            onClick={actionButton ? handleViewVerify : handleReview}
          >
            {actionButton ? "View Verified By Admin" : "View Unreview"}
          </Button>
        </h2>
      </div>
      <div className="icon-aline">
        <OpalTable
          headers={afterVerifyDataColoum}
          rowData={verifyAdmin || []}
          edit={actionButton ? handleEditVerifyByemp : handleEditVerifyByAdmin}
          viewButton={ actionButton ? handleUpdateAddressByemp : handleUpdateAddressByAdmin }
        />
      </div>
      <div>
        {/* status under_employee  */}
        <ModalAfterVerify
          show={showModal}
          close={handleClose}
          type={modalType}
          defaultData={defaultData}
          onUpdate={handleUpdateAddress}
          onSave={handleVerifyByAdmin}
        />
      </div>
      <div>
        {/* verify admin  */}
        <ModalAfterUnview
          open={showUnview}
          onClose={handleCloseUn}
          type={modalUnview}
          defaultData={defaultData}
          onSubmit={handleUpdateAddressBy}
        />
      </div>

      {props.children}
    </Container>
  );
};
export default AfterVerification;
