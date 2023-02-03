import { useState, useEffect } from "react";
import ModalAfterVerify from "./modalAfterVerify";
import ModalAfterUnview from "./modalAfterVerifyUnview";
import { Container, Button, InputGroup, Col, Row, Form } from "react-bootstrap";
import OpalTable from "../opalTable";
import { afterVerifyDataColoum } from "../mock/afterVerifyData";
import { useSelector, useDispatch } from "react-redux";
import { read, utils } from "xlsx";
import { FaFileImport } from "react-icons/fa";
import { getAllCaseAPI, updateCaseById } from "../actions/verification";
import {
  updateAuditCaseDetails,
  getAllAuditCase,
  getByIdAuditCase,
} from "../actions/review";

const AfterVerification = (props) => {
  const review = useSelector((state) => state?.verification?.list || []);
  const [verifyAdmin, setVerifyAdmin] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAllCaseAPI({
        id: "all",
        status: ["under_employee", "verify_by_admin"],
      })
    );
  }, []);

  useEffect(() => {
    setVerifyAdmin(review.filter((t) => t.status == "under_employee"));
  }, [review]);

  const [buttonType, setButtonType] = useState("View Verified By Admin");
  const [actionButton, setActionButton] = useState(true);
  const [modalType, setModalType] = useState("edit");
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const [defaultData, setDeafultData] = useState({});

  const handleEditModal = (data) => {
    setModalType("edit");
    setShowModal(true);
    setDeafultData(data);
  };
  
  const handleUpdateForm = (data) => {
    setModalType("update");
    setShowModal(true);
    setDeafultData(data);
  };

  const handleEditSave = (data) => {
    let updateRecords = [...verifyAdmin].map((record) => {
      let temp = { ...record };
      temp.audit_call_done = data.audit_call_done;
      temp.audit_call_done_remark = data.audit_call_done_remark;
      temp.audit_call_status = data.audit_call_status;
      temp.audit_call_status_remark = data.audit_call_status_remark;
      temp.audit_case_status_id = data.audit_case_status_id;
      temp.audit_case_status_remark = data.audit_case_status_remark;
      temp.status = data.status;
      temp.remark = data.remark;
      return temp;
    });
    updateRecords.forEach((record) => {
      console.log("data", record);
      dispatch(updateAuditCaseDetails(record)).then(() => {
        dispatch(getAllCaseAPI({ id: "all", status: ["under_admin"] }));
      });
    });
    setShowModal();
  };

  const handleUpdateSaveButton = (data) => {
    console.log("updateDAta",data)
    // let update = verifyAdmin.find((ele) => ele.id === updateRadio.id);
    setShowModal();
  };
  const [modalUnview, setModalUnview] = useState("editUnview");
  const [showUnview, setShowUnview] = useState(false);
  const handleCloseUn = () => setShowUnview(false);

  const handleUnreviewEditForm = (data) => {
    setModalUnview("editUnview");
    setShowUnview(true);
    console.log(data)
    setDeafultData(data)
    dispatch(getByIdAuditCase(data.id));
  }

  const handleUnreviewUpdateForm = (unview) => {
    setModalUnview("updateUnview");
    setShowUnview(true);
    setDeafultData(unview);
  };

  const handleUNviewUpdateSaveButton = (employeeRadio) => {
    let change = verifyAdmin.find((ele) => ele.id === employeeRadio.id);
  };

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
      return val.status == "under_employee";
    });
    setVerifyAdmin(unViewVerifyData);
  };

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

          let rowData = rows.map((item) => {
            let importData = {
              CheckId: item["Asd ID"],
              CheckName: item["Client Name"],
              Candidate_Name: item["Applicant Name"],
              ContactNo: item["Contact Details"],
              TAT_Status: item.Location,
              Closer_Date: item.State,
              Pin_Code: item["Type of Check"],
              EMP: item["Whom to Allocate"],
              FE: item["Duration"],
              Father_Name: item["Fathers Name"],
              Address: item["Address - Details"],
              APP_STATUS: item["Type of Check"],
            };
            console.log("data ", importData);
            return importData;
          });
          setVerifyAdmin(rowData);
        }
      };
      reader.readAsArrayBuffer(file);
    }
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
        <Row>
          <Col></Col>
          <Col></Col>
          <Col>
            <InputGroup className="mb-3">
              <Button variant="success" id="button-addon1">
                <FaFileImport />
              </Button>
              <Form.Control
                type="file"
                onChange={handleImport}
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              />
            </InputGroup>
          </Col>
        </Row>
        <OpalTable
          headers={afterVerifyDataColoum}
          rowData={verifyAdmin || []}
          edit={actionButton ? handleEditModal : handleUnreviewEditForm}
          viewButton={
            actionButton ? handleUpdateForm : handleUnreviewUpdateForm
          }
        />
      </div>
      <div>
        {/* status under_employee  */}
        <ModalAfterVerify
          show={showModal}
          close={handleClose}
          type={modalType}
          defaultData={defaultData}
          onUpdate={handleUpdateSaveButton}
          onSave={handleEditSave}
        />
      </div>
      <div>
        {/* under_admin */}
        <ModalAfterUnview
          open={showUnview}
          onClose={handleCloseUn}
          type={modalUnview}
        //   auditData={data}
          defaultData={defaultData}
          onSubmit={handleUNviewUpdateSaveButton}
        />
      </div>

      {props.children}
    </Container>
  );
};
export default AfterVerification;
