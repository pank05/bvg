import { Container, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import OpalTable from "../opalTable";
import { FaFileImport } from "react-icons/fa";
import { afterVerifyDataColoum } from "../mock/afterVerifyData";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCaseAPI, getCaseDataById } from "../actions/verification";
import ModalAfterVerify from "../afterVerification/modalAfterVerify";
import ModalAfterUnview from "./modalAfterVerifyUnview";
import {
  updateAddrescaseDetails,
  updateAddressAuditCaseDetails,
} from "../actions/review";

const VerificationByFieldExective = (props) => {
  const caseData = useSelector((state) => state?.verification?.list || []);
  const [verifyFEData, setVerifyFEData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAllCaseAPI({ id: "all", status: ["under_FE", "verify_by_FE"] })
    );
  }, []);

  useEffect(() => {
    setVerifyFEData(caseData.filter((t) => t.status == "under_FE"));
  }, [caseData]);

  const [actionButton, setActionButton] = useState(true);
  const [buttonType, setButtonType] = useState("View Verified By FE");
  const [modalType, setModalType] = useState("edit");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [defaultData, setDeafultData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);

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
    dispatch(getCaseDataById(data.id));
  };

  const handleUpdateCase = (data) => {
    setDeafultData(data);
    setModalType("update");
    setShow(true);
    dispatch(getCaseDataById(data.id));
  };

  const handleUpdateAddressSave = (data) => {
    let updateRecords = [...verifyFEData].map((record) => {
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
        //         "verification_remark": "positive"
      };
      temp.users = {
        signature_url: data?.image?.name,
      };
      return temp;
    });
    updateRecords.forEach((record) => {
      dispatch(updateAddrescaseDetails(record)).then(() => {
        dispatch(getAllCaseAPI({ id: "all", status: ["under_FE"] }));
      });
    });
    setShow(false);
  };

  const handleSaveVerifyByFE = (data) => {
    let updateRecords = [...verifyFEData].map((record) => {
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
      dispatch(updateAddressAuditCaseDetails(record)).then(() => {
        dispatch(getAllCaseAPI({ id: "all", status: ["under_FE"] }));
      });
    });
    setShow(false);
  };

  const [modalTypes, setModalTypes] = useState("editUnview");

  const handleReviewEditForm = (data) => {
    dispatch(getCaseDataById(data.id));
    setModalTypes("editUnview");
    setShowModal(true);
  };

  const handleUpdateVerifyForm = (data) => {
    dispatch(getCaseDataById(data.id));
    setModalTypes("updateUnview");
    setShowModal(true);
  };

  const handleUpdateVerifyByFE = (data) => {
    let updateRecords = [...verifyFEData].map((record) => {
      let temp = { ...record };
      temp.verifications = {
        type_id: data?.verificationRemarkByFE,
        // is_landmark: data?.nearLandmark,
        // verification_reason_id: data?.reasonNotFound,
        // verification_reason_remark: data?.addressRemark,
        // is_present: data?.address,
        // is_by_birth: data?.birthCheckForm,
        // is_till_date: data?.tillCheckForm,
        // period_stay_from: data?.fromDate,
        // period_stay_to: data?.toDate,
        // address_status_id: data?.stayVerification,
        // residence_status_id: data?.residenceStatus,
        // residence_type_id: data?.residenceType,
        // area_type_id: data?.areaType,
        // is_positive: data?.additionalRemark,
        // additional_remark_json: data?.additionalRemarkByFEForm,
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
        status_of_verification:data?.statusVerification,
        // verification_date: data?.verificationDoneDate,
      };
      return temp;
    });
    updateRecords.forEach((record) => {
      // dispatch(updateAddrescaseDetails(record)).then(() => {
      //   dispatch(getAllCaseAPI({ id: "all", status: ["under_FE"] }));
      // });
    });
    setShowModal(false);
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
          edit={actionButton ? handleCaseEditModal : handleReviewEditForm}
          viewButton={actionButton ? handleUpdateCase : handleUpdateVerifyForm}
        />
      </div>
      <div>
        {/* status under_employee  */}
        <ModalAfterVerify
          show={show}
          close={handleClose}
          type={modalType}
          defaultData={defaultData}
          onUpdate={handleUpdateAddressSave}
          onSave={handleSaveVerifyByFE}
        />
      </div>
      <div>
        <ModalAfterUnview
          open={showModal}
          onClose={handleCloseModal}
          type={modalTypes}
          defaultData={defaultData}
          onSubmit={handleUpdateVerifyByFE}
        />
      </div>
      {props.children}
    </Container>
  );
};
export default VerificationByFieldExective;
