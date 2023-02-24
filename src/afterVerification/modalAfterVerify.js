import { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Accordion,
  Container,
  Row,
  Col,
  Table,
  Form,
  FloatingLabel,
  Card,
} from "react-bootstrap";
import { updateRadioClickModal } from "../constant/afterVerification";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import ReactToPrint from 'react-to-print';
import Select from "react-select";
import AddressFound from "./addressFoundAfterVerify";
import AddressNotFound from "./addressNotFoundAfterVerify";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { getStatusList } from "../actions/status";
import {clearCurrentCase} from "../actions/verification"
import {editRadioClickModal} from "../constant/afterVerification"
import { checkUserHasRole } from "../utility/validation";
import {updateSignatureURL} from "../actions/fieldexctive";
import moment from "moment";

const ModalAfterVerify = (props) => {
  const [verifyData, setVerifyData] = useState(editRadioClickModal);
  const userDetails = useSelector((state) => state?.user?.userProfile);
  const caseAllDetails=useSelector((state) => state?.verification?.caseDetails);
  const statusOption = useSelector((state) => state?.status?.list);
  const caseHistoryDetails =useSelector((state)=> state?.verification?.caseHistory);

  useEffect(()=>{
    dispatch(clearCurrentCase())
  },[])


  const [additionalRemarkByFE, setAdditionalRemarkByFE] = useState([
    {
      value: "1",
      label: "Positive",
      name: "remarkByFE",
      type: "radio",
    },
    {
      value: "0",
      label: "Negative",
      name: "remarkByFE",
      type: "radio",
    },
  ]);
  const [verificationRemark, setVerificationRemark] = useState([
    {
      key: "1",
      value: "1",
      label: "Active",
      name: "remark",
      type: "radio",
    },
    {
      key: "2",
      value: "0",
      label: "Completed",
      name: "remark",
      type: "radio",
    },
  ]);
  const [auditCallDoneList, setAuditCallDoneList] = useState([
    {
      id: 1,
      label: "Yes",
      name: "aduit_call",
      type: "radio",
    },
    {
      id: 0,
      label: "No",
      name: "aduit_call",
      type: "radio",
    },
  ]);
  const [auditcallStatus, setAuditCallStatus] = useState([
    {
      id: 1,
      label: "Positive",
      name: "aduit_status",
      type: "radio",
    },
    {
      id: 0,
      label: "Negative",
      name: "aduit_status",
      type: "radio",
    },
  ]);

  const [caseStatus, setCaseStatus] = useState([]);

  useEffect(() => {
    if (checkUserHasRole(userDetails, ["admin"])) {
      dispatch(
        getStatusList({
          label: ["verify_by_admin", "rejected_by_admin"],
          type: ["case"],
        })
      );
    }
    if (checkUserHasRole(userDetails, ["employee"])) {
      dispatch(
        getStatusList({
          label: ["rejected_by_employee", "verify_by_employee"],
          type: ["case"],
        })
      );
    }
    if (checkUserHasRole(userDetails, ["FieldExecutive"])) {
      dispatch(
        getStatusList({
          label: ["rejected_by_FE", "verify_by_FE"],
          type: ["case"],
        })
      );
    }
  }, []);

// status verify && reject
  useEffect(() => {
    setCaseStatus(
      (statusOption || []).filter(
        (v) =>
          v.type == "case" &&
          ["verify_by_admin", "rejected_by_admin","rejected_by_FE", "verify_by_FE","rejected_by_employee", "verify_by_employee"].includes(v.label)
      )
    );
  }, [statusOption]);


  // set default value
  useEffect(()=>{
    if(caseAllDetails && caseAllDetails.id){
      setVerifyData({
        ...verifyData,
        ...{
              auditCallDone:caseAllDetails?.audit_call_done,
              auditCallDoneRemark:caseAllDetails?.audit_call_done_remark,
              auditCallStatus:caseAllDetails?.audit_call_status,
              auditCallStatusRemark:caseAllDetails?.audit_call_status_remark,
              auditCaseStatusId:caseAllDetails?.audit_case_status_id,
              auditCaseStatusRemark:caseAllDetails?.audit_case_status_label,
              id:caseAllDetails.id

        }})
    }
    if(caseAllDetails && caseAllDetails.id){
        setUpdateAddressVerification({
        ...updateAddressVerification,
        ...{ 
          address: caseAllDetails?.is_present,
          verifyBy:caseAllDetails?.verified_by_id,
          relationType:caseAllDetails?.responder_relation_id,
          relationTypeMeetPerson:caseAllDetails?.person_name,
          meetPersonContactNo:caseAllDetails?.person_contact,
          idProof:caseAllDetails?.is_id_proof,
          fromDate:caseAllDetails?.period_stay_from,
          toDate:caseAllDetails?.period_stay_to,
          stayVerification:caseAllDetails?.address_status_id,
        areaType:caseAllDetails?.area_type_id,
        residenceStatus:caseAllDetails?.residence_status_id,
        residenceType:caseAllDetails?.residence_type_id,
        reasonNotFound:caseAllDetails?.verification_reason_id,
        nearLandmark:caseAllDetails?.is_landmark,
        candidateState:caseAllDetails?.state_name,
        additionalRemark:caseAllDetails?.is_id_proof,
        additionalRemarkByFEForm:caseAllDetails?.additional_remark_json,
        verificationDoneDate:caseAllDetails?.verification_date,
        FE:caseAllDetails?.user_name,
        verificationRemarkByFE:caseAllDetails?.type_id,
        birthCheckForm:caseAllDetails?.is_by_birth,
        tillCheckForm:caseAllDetails?.is_till_date,
        id:caseAllDetails.id,
        signature_url:caseAllDetails?.signature_url,
        user_signature:caseAllDetails?.user_signature,
        addressRemark:caseAllDetails?.verification_reason_remark,
        reasonNotFound:caseAllDetails?.verification_reason_id,
        nearLandmark:caseAllDetails?.is_landmark
        },
      });
      if(caseAllDetails?.is_present_name === 'address_found'){
        setAddressChange(true);
      }
    }
  },[caseAllDetails])

  const [addressList, setAddressList] = useState([]);
  const [addressChange, setAddressChange] = useState();

useEffect(()=>{
  dispatch(clearCurrentCase())
},[])

  useEffect(() => {
    setAddressList(
      (statusOption || []).filter(
        (v) => v.type == "verification" && v.reference == "address"
      )
    );
  }, [statusOption]);

  useEffect(() => {
    setVerificationRemark(verificationRemark || []);
  }, [verificationRemark]);

  useEffect(() => {
    setAdditionalRemarkByFE(additionalRemarkByFE || []);
  }, [additionalRemarkByFE]);

  const [imagePreview, setImagePreview] = useState(null);
  const [candidateSignature, setCandidateSignature] = useState(null);

  const dispatch = useDispatch();

  const filePicekerRef = useRef(null);
  const filePicekerRefCandidate = useRef(null);

  const handlerChangeFESignature = (event) => {
    const reader = new FileReader();
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
    setUpdateAddressVerification({ ...updateAddressVerification,fe_signature:selectedFile});

    reader.onload = (readerEvent) => {
      if (selectedFile.type.includes("image")) {
        setImagePreview(readerEvent.target.result);
      }
    };
  };

    const handleUploadUserImage =()=>{
  let formData = new FormData();
  formData.append('image',updateAddressVerification?.fe_signature);
  formData.append('fileType','FE_Signature');
  formData.append('refernce_id',userDetails.id);
  dispatch(updateSignatureURL(formData));
  }

  const handlerChangeCandidateSignature = (event) => {
    const reader = new FileReader();
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
    setUpdateAddressVerification({ ...updateAddressVerification,candidate_image:selectedFile });

    reader.onload = (readerEvent) => {
      if (selectedFile.type.includes("image")) {
        setCandidateSignature(readerEvent.target.result);
      }
    };
  };

  const handleUploadCandidateImage =()=>{

    let formData = new FormData();
    formData.append('image',updateAddressVerification.candidate_image);
    formData.append('fileType','candidate_signature');
    formData.append('refernce_id',updateAddressVerification.id);
    dispatch(updateSignatureURL(formData));
  }

  useEffect(() => {
    dispatch(
      getStatusList({
        type: ["case_status", "verification"],
        reference: ["audit_call_status", "address"],
      })
    );
  }, []);

  const [updateAddressVerification, setUpdateAddressVerification] = useState(updateRadioClickModal);

  const componentRef = useRef();

  return (
    <Container>
      <div style={{ width: "800px" }}>
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={props.show}
          onHide={props.close}
        >
          {/* edit */}
          {props.type === "edit" ? (
            <>
              <Modal.Header className="update">
                <h5>
                  Call and cross verify for <br />
                  {caseAllDetails.candidate_name} &nbsp;
                {caseAllDetails.check_id}  
              </h5>
              <h5>{caseAllDetails.company_name}</h5>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        Verification Form Info
                      </Accordion.Header>
                      <Accordion.Body>
                        <Container>
                          <Row>
                            <Col>
                              <b className="found_size_for_text">
                                Provided Candidate Contact :
                              </b>
                              {caseAllDetails?.contact_no}
                              <br />
                            </Col>
                            <Col>
                              <b className="found_size_for_text">
                                Responder Name :
                              </b>
                              {caseAllDetails?.person_name}
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <b className="found_size_for_text"> Relation :</b>
                              {caseAllDetails?.responder_relation_label}
                            </Col>
                            <Col>
                              <b className="found_size_for_text">Contact :</b>
                              {caseAllDetails?.person_contact}
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <b className="found_size_for_text">
                                Tat Start Date :
                              </b>
                              {caseAllDetails?.duration_start}
                            </Col>
                            <Col>
                              <b className="found_size_for_text">
                                Tat End Date :
                              </b>
                              {caseAllDetails?.duration_end}
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <b className="found_size_for_text">
                                Assign Employee :
                              </b>
                              {caseAllDetails.assigned_by_name}
                            </Col>
                            <Col>
                              <b className="found_size_for_text">
                                Assign Field Executive :
                              </b>
                              {caseAllDetails?.assigned_to_name}
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <b className="found_size_for_text">
                                Tat Status :
                              </b>
                              ---------
                            </Col>
                            <Col>
                              <b className="found_size_for_text">Remark :</b>
                              {caseAllDetails.remark}
                            </Col>
                          </Row>
                        </Container>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        Verification Status History
                      </Accordion.Header>
                      <Accordion.Body>
                        <Container>
                        <Table  bordered  responsive>
                          <thead>
                            <tr>
                              <th> Label</th>
                              <th>Assigned To</th>
                              <th>Assigned By</th>
                              <th> Date</th>
                              <th>Remark</th>
                            </tr>
                          </thead>
                        {caseHistoryDetails.map((v)=>{
                          return  <tbody>
                            <tr>
                              <td>{v.name}</td>
                              <td>{v.assigned_to_name}</td>
                              <td>{v.assigned_by_name}</td>
                              <td>{moment(v.created).format("MMMM Do YYYY")}</td>
                              <td> {v.remark}</td>
                            </tr>
                           
                          </tbody>
                      })}
                       </Table>
                        </Container>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header> Audit Call Status</Accordion.Header>
                      <Accordion.Body>
                        <Form>
                          <Row>
                            <Col>Audit Call Done : </Col>
                            <Col>
                              <div key={`inline-radio`}>
                                {auditCallDoneList.map((radios) => (
                                  <Form.Check
                                    inline
                                    checked={verifyData?.auditCallDone  == radios.id}
                                    label={radios.label}
                                    value={radios.id}
                                    type={radios.type}
                                    name={radios.name}
                                    onChange={(v) => {
                                      setVerifyData({
                                        ...verifyData,
                                        ...{ auditCallDone: v.target.value },
                                      });
                                    }}
                                  />
                                ))}
                                <Form.Control
                                  type="text"
                                  placeholder="Remark If call not done "
                                  value={verifyData.auditCallDoneRemark}
                                  onChange={(v) =>
                                    setVerifyData({
                                      ...verifyData,
                                      ...{
                                        auditCallDoneRemark: v.target.value,
                                      },
                                    })
                                  }
                                />
                              </div>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>Audit call status: </Col>
                            <Col>
                              <div key={`inline-radio`}>
                                {auditcallStatus.map((radios) => (
                                  <Form.Check
                                    inline
                                    checked={verifyData?.auditCallStatus == radios.id}
                                    label={radios.label}
                                    value={radios.id}
                                    type={radios.type}
                                    name={radios.name}
                                    onChange={(v) => {
                                      setVerifyData({
                                        ...verifyData,
                                        ...{
                                          auditCallStatus: v.target.value,
                                        },
                                      });
                                    }}
                                  />
                                ))}
                                <Form.Control
                                  type="text"
                                  value={verifyData?.auditCallStatusRemark}
                                  placeholder="Remark If call not done "
                                  onChange={(v) =>
                                    setVerifyData({
                                      ...verifyData,
                                      ...{
                                        auditCallStatusRemark:
                                          v.target.value,
                                      },
                                    })
                                  }
                                />
                              </div>
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col>Case Status : </Col>
                            <Col>
                              <div key={`inline-radio`}>
                                {(statusOption || [])
                                  .filter(
                                    (v) =>
                                      v.type == "case_status" &&
                                      v.reference == "audit_call_status"
                                  )
                                  .map((v) => {
                                    let temp = { ...v };
                                    temp.name = "case_status";
                                    temp.type = "radio";
                                    return temp;
                                  })
                                  .map((radios) => {
                                    return (
                                      <Form.Check
                                        inline
                                        checked={verifyData?.auditCaseStatusId == radios.id}
                                        label={radios.label}
                                        value={radios.id}
                                        name={radios.name}
                                        type={radios.type}
                                        onChange={(v) => {
                                          setVerifyData({
                                            ...verifyData,
                                            ...{
                                              auditCaseStatusId:
                                                v.target.value,
                                            },
                                          });
                                        }}
                                      />
                                    );
                                  })}
                                <Form.Control
                                  type="text"
                                  value={verifyData?.auditCaseStatusRemark}
                                  placeholder="case status Remark"
                                  onChange={(v) =>
                                    setVerifyData({
                                      ...verifyData,
                                      ...{
                                        auditCaseStatusRemark:
                                          v.target.value,
                                      },
                                    })
                                  }
                                />
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header> Admin Review Remark</Accordion.Header>
                      <Accordion.Body>
                        <Row>
                          <Col>
                            <Select
                              options={caseStatus}
                              onChange={(v) => {
                                setVerifyData({
                                  ...verifyData,
                                  ...{status:v.label },
                                });
                              }}
                            />
                          </Col>
                          <Col>
                            <Form.Control
                              type="text"
                              placeholder="Admin Remark If Reject"
                              onChange={(v) =>
                                setVerifyData({
                                  ...verifyData,
                                  ...{ remark: v.target.value },
                                })
                              }
                            />
                          </Col>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="info" onClick={() => props.onSave(verifyData)}>
                  Save
                </Button>
              </Modal.Footer>
            </>
          ) : null}

          {/*update */}
          {props.type === "update" ? (
            <div id="target" ref={componentRef}>
              <Modal.Header>
                <h1 className="div_center"> UPDATE VERIFICATION </h1>
                <h6> Comp :{caseAllDetails?.company_name} checkId:&nbsp;{caseAllDetails?.check_id} </h6>
                {/* <Button id="cmd" onClick={()=>handleDownlpoadPdf()}> Download pdf </Button> */}
               
                <ReactToPrint
          trigger={() => {
            return <Button>PDF Download</Button>;
          }}
          content={() => componentRef.current}
          documentTitle='download'
          pageStyle="print"
        />
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Accordion defaultActiveKey="1">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        Candidate Provided Pre Verification Detail
                      </Accordion.Header>
                      <Accordion.Body>
                        <Form>
                          <Form.Group className="mb-3">
                            <Row>
                              <Col>
                                <Form.Control
                                  type="text"
                                  placeholder="Candidate Name"
                                  value={caseAllDetails?.candidate_name}
                                  readOnly
                                />
                              </Col>
                              <Col>
                                <Form.Control
                                  type="text"
                                  placeholder="Company Check Id"
                                  value={caseAllDetails?.check_id} readOnly
                                />
                              </Col>
                            </Row>
                            <br />
                            <Row>
                              <Col>
                                <Form.Control
                                  type="text"
                                  placeholder="Father's Name"
                                  value={caseAllDetails?.father_name} readOnly
                                />
                              </Col>
                              <Col>
                                <Form.Control
                                  type="text"
                                  placeholder="Candidate Contact No"
                                  value={caseAllDetails?.contact_no} readOnly
                                />
                              </Col>
                            </Row>
                            <br />
                            <Row>
                              <Col>
                                <Form.Control
                                  type="text"
                                  placeholder="Address Give By Candidate "
                                  value={caseAllDetails?.address} readOnly
                                />
                              </Col>
                            </Row>
                            <br />
                            <Row>
                              <Col>
                                <Form.Control
                                  type="text"
                                  placeholder="Candidate City"
                                  value={caseAllDetails?.city_name} readOnly
                                />
                              </Col>
                              <Col>
                                <Form.Control
                                  type="text"
                                  placeholder="Candidate District"
                                  value={caseAllDetails?.district_name} readOnly
                                />
                              </Col>
                              <Col>
                                <Form.Control
                                  type="text"
                                  placeholder="Candidate State"
                                  value={caseAllDetails?.state_name} readOnly
                                />
                              </Col>
                              <Col>
                                <Form.Control
                                  type="text"
                                  placeholder="Candidate Pin Code"
                                  value={caseAllDetails?.pincode} readOnly
                                />
                              </Col>
                            </Row>
                            <br />
                            <Row>
                              <Col>
                                <Form.Control
                                  type="text"
                                  placeholder="Landmark"
                                  value={caseAllDetails?.location} readOnly
                                />
                              </Col>
                              <Col>
                                <Form.Control
                                  type="text"
                                  placeholder="RESUME ID(comp-checkId)"
                                  value={caseAllDetails?.resume_id} readOnly
                                />
                              </Col>
                            </Row>
                          </Form.Group>
                        </Form>
                      </Accordion.Body>
                    </Accordion.Item>
                    <br />
                    <div>
                      <Row>
                        <Col> Address found:</Col>
                      </Row>
                      <div key={`inline-radio`}>
                        {addressList
                          .map((v) => {
                            let temp = { ...v };
                            temp.name = "verification";
                            temp.type = "radio";
                            return temp;
                          })
                          .map((radios) => {
                            return (
                              <Form.Check
                                inline
                                checked={updateAddressVerification?.address == radios.id}
                                label={radios.label}
                                value={radios.id}
                                key={radios.id}
                                name={radios.name}
                                type={radios.type}
                                onChange={(v) => {
                                  setUpdateAddressVerification({
                                    ...updateAddressVerification,
                                    ...{ address: v.target.value },
                                  });
                                  setAddressChange(!addressChange);
                                }}
                              />
                            );
                          })}
                        <p style={{ float: "right", color: "#20c997" }}>
                          {
                            [...addressList].find(
                              (d) => updateAddressVerification.address == d.id
                            )?.label
                          }
                        </p>
                        {addressChange
                          ? " Address found" && (
                              <AddressFound
                                updateAddressVerification={
                                  updateAddressVerification
                                }
                                setUpdateAddressVerification={
                                  setUpdateAddressVerification
                                }
                              />
                            )
                          : "Address Not found" && (
                              <AddressNotFound
                                updateAddressVerification={
                                  updateAddressVerification
                                }
                                setUpdateAddressVerification={
                                  setUpdateAddressVerification
                                }
                              />
                            )}
                      </div>
                    </div>
                    <br /> <br />
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        Additional Remark By Field Executive
                      </Accordion.Header>
                      <Accordion.Body>
                        <div>
                          <Row>
                            <Col>
                              <label> Verification status Remark:</label>
                            </Col>
                            <Row>
                                {additionalRemarkByFE.map((radios) => (
                                  <Col>
                                   <div key={radios.id}>
                                  <Form.Check
                                    inline
                                    checked={updateAddressVerification?.additionalRemark == radios.value}
                                    label={radios.label}
                                    value={radios.value}
                                    type={radios.type}
                                    name={radios.name}
                                    onChange={(v) => {
                                      setUpdateAddressVerification({
                                        ...updateAddressVerification,
                                        ...{ additionalRemark: v.target.value },
                                      });
                                    }}
                                  />
                                </div>
                                </Col>
                                ))}
                                <Col> 
                                <p style={{ float: "right", color: "#20c997" }}>
                                  {
                                    [...additionalRemarkByFE].find(
                                      (d) =>
                                        updateAddressVerification.additionalRemark ==
                                        d.value
                                    )?.label
                                  }
                                </p> 
                                </Col></Row>
                          </Row>
                          <FloatingLabel
                            controlId="floatingTextarea"
                            label="positive"
                            className="mb-3"
                          >
                          <Form.Control
                             value={updateAddressVerification?.additionalRemarkByFEForm}
                              as="textarea"
                              placeholder="Remark if any"
                              onChange={(e) => {
                                setUpdateAddressVerification({
                                  ...updateAddressVerification,
                                  ...{ additionalRemarkByFEForm: e.target.value },
                                });
                              }}
                            />
                          </FloatingLabel>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                    <br />
                    <div className="note_update">
                      <p className="div_center">
                        Note <br />
                        <FaMoneyBillAlt /> ** No Monny /allowancece is Required
                        to be paid by candidate and his/her family/referee
                        <br />
                        <FiEdit /> ** Check all the details filled are completed
                        & correct before signing the Documents
                      </p>
                    </div>
                    <br />
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        Verification status Remark
                      </Accordion.Header>
                      <Accordion.Body>
                        <div>
                          <label>Verification status Remark :</label>
                          <div key={`inline-radio`}>
                            {verificationRemark.map((radios) => (
                              <Form.Check
                                inline
                                checked={updateAddressVerification?.verificationRemarkByFE == radios.value}
                                label={radios.label}
                                value={radios.value}
                                type={radios.type}
                                name={radios.name}
                                onChange={(v) => {
                                  setUpdateAddressVerification({
                                    ...updateAddressVerification,
                                    ...{
                                      verificationRemarkByFE: v.target.value,
                                    },
                                  });
                                }}
                              />
                            ))}
                            <p style={{ float: "right", color: "#20c997" }}>
                              {
                                [...verificationRemark].find(
                                  (d) =>
                                    updateAddressVerification.verificationRemarkByFE ==
                                    d.value
                                )?.label
                              }
                            </p>
                          </div><br/>
                          <Form.Control
                              type="text"
                              placeholder="FE Name"
                              value={updateAddressVerification?.FE}
                              onChange={(e) => {
                                setUpdateAddressVerification({
                                  ...updateAddressVerification,
                                  ...{ FE: e.target.value },
                                });
                              }}
                            />
                            <br />
                            <Form.Control
                              type="date"
                              value={updateAddressVerification?.verificationDoneDate}
                              placeholder="verification date"
                              onChange={(e) => {
                                setUpdateAddressVerification({
                                  ...updateAddressVerification,
                                  ...{ verificationDoneDate: e.target.value },
                                });
                              }}
                            />
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                    <br />
                  </Accordion>
                  <div>
                    <Row>
                      <Col>
                        <Card style={{ width: "18rem", border: "none" }}>
                          {imagePreview != null && (
                            <img
                              src={imagePreview}
                              alt="..."
                              style={{
                                width: "70%",
                                height: "70%",
                                paddingLeft: "20px",
                              }}
                            />
                          )}
                          <br />
                        </Card>
                        <Card style={{ width: "18rem", border: "none" }}>
                            <img
                              src={updateAddressVerification?.user_signature}
                              alt="..."
                              style={{
                                width: "70%",
                                height: "70%",
                                paddingLeft: "20px",
                              }}
                            />
                          <br />
                        </Card>
                        <input
                          ref={filePicekerRef}
                          accept="image/*, video/*"
                          onChange={handlerChangeFESignature}
                          type="file"
                          hidden
                        />
                        <Button
                          className="btn"
                          onClick={() => filePicekerRef.current.click()}
                        >
                          Select FE Signature
                        </Button>&nbsp;
                        <Button variant="warning" onClick={()=>{ handleUploadUserImage()}}>Upload FE Signature</Button>
                      </Col>
                      <Col>
                      <Card style={{ width: "18rem", border: "none" }}>
                            <img
                              src={updateAddressVerification?.signature_url}
                              alt="..."
                              style={{
                                width: "70%",
                                height: "70%",
                                paddingLeft: "20px",
                              }}
                            />
                          <br />
                        </Card>
                        <Card style={{ width: "18rem", border: "none" }}>
                          {candidateSignature != null && (
                            <img
                              src={candidateSignature}
                              alt="..."
                              style={{
                                width: "70%",
                                height: "70%",
                                paddingLeft: "20px",
                              }}
                            />
                          )}
                          <br />
                        </Card>
                        <input
                          ref={filePicekerRefCandidate}
                          accept="image/*, video/*"
                          onChange={handlerChangeCandidateSignature}
                          type="file"
                          hidden
                        />
                        <Button
                          className="btn"
                          onClick={() => filePicekerRefCandidate.current.click()} >
                          Select candidate Signature
                        </Button> &nbsp;
                        <Button variant="warning" onClick={()=>{ handleUploadCandidateImage()}}>Upload candidate Signature</Button>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <div>
                  <Button
                    variant="info"
                    onClick={() => {
                      props.onUpdate(updateAddressVerification);
                    }}
                  >
                    Update
                  </Button>
                </div>
              </Modal.Footer>
            </div>
          ) : null}
        </Modal>
        {props.children}
      </div>
    </Container>
  );
};
export default ModalAfterVerify;
