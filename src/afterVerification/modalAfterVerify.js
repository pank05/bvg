import { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Accordion,
  Container,
  Row,
  Col,
  Form,
  FloatingLabel,
  Card,
} from "react-bootstrap";
import {
  editRadioClickModal,
  updateRadioClickModal,
} from "../constant/afterVerification";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { PDFViewer } from "@react-pdf/renderer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Select from "react-select";
import AddressFound from "./addressFoundAfterVerify";
import AddressNotFound from "./addressNotFoundAfterVerify";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { getStatusList } from "../actions/status";
import {verificationModalVarData} from "../constant/verificationVar";

const ModalAfterVerify = (props) => {
  const [verifyData, setVerifyData] = useState(verificationModalVarData);
  const userDetails = useSelector((state) => state?.user?.userProfile);
  const statusOption = useSelector((state) => state?.status?.list);

  const statusList = useSelector(
    (state) => state?.verification?.list || []
  ).map((states) => {
    return {
      value: states.status,
      label: states.status,
    };
  });
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
      key:"1",
      value: "1",
      label: "Active",
      name: "remark",
      type: "radio",
    },
    {
      key:"2",
      value: "0",
      label: "Completed",
      name: "remark",
      type: "radio",
    },
  ]);
  const [auditCallDone, setAuditCallDone] = useState([
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

  const [addressList, setAddressList] = useState([]);
  const [addressChange, setAddressChange] = useState();

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
  const dispatch = useDispatch();

  const filePicekerRef = useRef(null);

  const handlerChangeImage = (event) => {
    const reader = new FileReader();
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
    setVerifyData({ ...verifyData, profile: selectedFile });

    reader.onload = (readerEvent) => {
      if (selectedFile.type.includes("image")) {
        setImagePreview(readerEvent.target.result);
      }
    };
  };

  useEffect(() => {
    dispatch(
      getStatusList({
        type: ["case_status", "verification"],
        reference: ["audit_call_status", "address"],
      })
    );
  }, []);

  useEffect(() => {
    setVerifyData({ ...verifyData, ...props.defaultData });
  }, [props.defaultData]);

  const [updateAddressVerification, setUpdateAddressVerification] = useState(updateRadioClickModal);

  const handleDownlpoadPdf = () => {
    console.log("download");
    {
      /* <PDFDownloadLink
      document={< ModalAfterVerify/> || ''}
      fileName="verification.pdf"
    /> */
    }
  };

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
                  {props.defaultData.candidateName} &nbsp;
                  {props.defaultData.checkId}
                </h5>
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
                              {props.defaultData.contactNo}
                              <br />
                            </Col>
                            <Col>
                              <b className="found_size_for_text">
                                Responder Name :
                              </b>
                              {props.defaultData.candidateName}
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <b className="found_size_for_text"> Relation :</b>
                              ------
                            </Col>
                            <Col>
                              <b className="found_size_for_text">
                                Contact :
                              </b>
                              {props.defaultData.contactNo}
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <b className="found_size_for_text">
                                Tat Start Date :
                              </b>
                              {props.defaultData.durationStart}
                            </Col>
                            <Col>
                              <b className="found_size_for_text">
                                Tat End Date :
                              </b>
                              {props.defaultData.durationEnd}
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <b className="found_size_for_text">
                                Assign Employee :
                              </b>
                              {props.defaultData.EMP}
                            </Col>
                            <Col>
                              <b className="found_size_for_text">
                                Assign Employee ID :
                              </b>
                              {props.defaultData.EMP}
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <b className="found_size_for_text">
                                Assign Field Executive :
                              </b>
                              {props.defaultData.FE}
                            </Col>
                            <Col>
                              <b className="found_size_for_text">
                                Assign Field Executive ID:
                              </b>
                              {props.defaultData.FE}
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
                              <b className="found_size_for_text">
                                Remark :
                              </b>
                              --------
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
                          <Row>
                            <Col>
                               
                              <b className="found_size_for_text">
                                ApplicationCreated :
                              </b> 
                              {userDetails.username} (
                              {userDetails?.roles?.map((v) => v.label)}) <br />
                            </Col>
                            <Col>--Date-- </Col>
                          </Row>
                          <Row>
                            <Col>
                               
                              <b className="found_size_for_text">
                                ASSIGNED :
                              </b> 
                              {userDetails.username} (
                              {userDetails?.roles?.map((v) => v.label)}) <br />
                            </Col>
                            <Col>--Date-- </Col>
                          </Row>
                          <Row>
                            <Col>
                               
                              <b className="found_size_for_text">
                                ACCEPTED: 
                              </b> 
                              {props.defaultData.EMP} <br />
                            </Col>
                            <Col>--Date-- </Col>
                          </Row>
                          <Row>
                            <Col>
                               
                              <b className="found_size_for_text">
                                 
                                SENT_TO_FE:
                              </b> 
                              {props.defaultData.EMP} <br />
                            </Col>
                            <Col>--Date-- </Col>
                          </Row>
                          <Row>
                            <Col>
                               
                              <b className="found_size_for_text">
                                VERIF_DONE_BY_FE:
                              </b> 
                              {props.defaultData.FE} <br />
                            </Col>
                            <Col>--Date-- </Col>
                          </Row>
                          <Row>
                            <Col>
                               
                              <b className="found_size_for_text">
                                EMP_COMPL_UNRE:
                              </b> 
                              {props.defaultData.EMP} <br />
                            </Col>
                            <Col>--Date-- </Col>
                          </Row>
                          <Row>
                            <Col> </Col>
                            <Col>
                              Completed IN TAT by Employee pending for admin
                              Review 
                            </Col>
                          </Row>
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
                                {auditCallDone.map((radios) => (
                                  <Form.Check
                                    inline
                                    label={radios.label}
                                    value={radios.id}
                                    type={radios.type}
                                    name={radios.name}
                                    onChange={(v) => {
                                      setVerifyData({
                                        ...verifyData,
                                        ...{ audit_call_done: v.target.value },
                                      });
                                    }}
                                  />
                                ))}
                                <Form.Control
                                  type="text"
                                  placeholder="Remark If call not done "
                                  onChange={(v) =>
                                    setVerifyData({
                                      ...verifyData,
                                      ...{
                                        audit_call_done_remark: v.target.value,
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
                                    label={radios.label}
                                    value={radios.id}
                                    type={radios.type}
                                    name={radios.name}
                                    onChange={(v) => {
                                      setVerifyData({
                                        ...verifyData,
                                        ...{
                                          audit_call_status: v.target.value,
                                        },
                                      });
                                    }}
                                  />
                                ))}
                                <Form.Control
                                  type="text"
                                  placeholder="Remark If call not done "
                                  onChange={(v) =>
                                    setVerifyData({
                                      ...verifyData,
                                      ...{
                                        audit_call_status_remark:
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
                                        label={radios.label}
                                        value={radios.id}
                                        name={radios.name}
                                        type={radios.type}
                                        onChange={(v) => {
                                          setVerifyData({
                                            ...verifyData,
                                            ...{
                                              audit_case_status_id:
                                                v.target.value,
                                            },
                                          });
                                        }}
                                      />
                                    );
                                  })}
                                <Form.Control
                                  type="text"
                                  placeholder="case status Remark"
                                  onChange={(v) =>
                                    setVerifyData({
                                      ...verifyData,
                                      ...{
                                        audit_case_status_remark:
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
                              options={statusList}
                              onChange={(v) => {
                                setVerifyData({
                                  ...verifyData,
                                  ...{ status: v.value },
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
            <>
              <Modal.Header>
                <h1 className="div_center"> UPDATE VERIFICATION </h1>
                <h6> Comp checkId:&nbsp;{props.defaultData.checkId} </h6>
                <Button onClick={handleDownlpoadPdf}> Download pdf </Button>
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
                                  value={props.defaultData.candidateName}
                                />
                              </Col>
                              <Col>
                                <Form.Control
                                  type="text"
                                  placeholder="Company Check Id"
                                  value={props.defaultData.companyId}
                                />
                              </Col>
                            </Row>
                            <br />
                            <Row>
                              <Col>
                                <Form.Control
                                  type="text"
                                  placeholder="Father's Name"
                                  value={props.defaultData.fatherName}
                                />
                              </Col>
                              <Col>
                                <Form.Control
                                  type="text"
                                  placeholder="Candidate Contact No"
                                  value={props.defaultData.contactNo}
                                />
                              </Col>
                            </Row>
                            <br />
                            <Row>
                              <Col>
                                <Form.Control
                                  type="text"
                                  placeholder="Address Give By Candidate "
                                  value={props.defaultData.address}
                                />
                              </Col>
                            </Row>
                            <br />
                            <Row>
                              <Col>
                                <Form.Control
                                  type="text"
                                  placeholder="Candidate City"
                                  value={props.defaultData.city}
                                />
                              </Col>
                              <Col>
                                <Form.Control
                                  type="text"
                                  placeholder="Candidate District"
                                  value={props.defaultData.district}
                                />
                              </Col>
                              <Col>
                                <Form.Control
                                  type="text"
                                  placeholder="Candidate State"
                                  value={props.defaultData.state}
                                />
                              </Col>
                              <Col>
                                <Form.Control
                                  type="text"
                                  placeholder="Candidate Pin Code"
                                  value={props.defaultData.pincode}
                                />
                              </Col>
                            </Row>
                            <br />
                            <Row>
                              <Col>
                                <Form.Control
                                  type="text"
                                  placeholder="Landmark"
                                  value={props.defaultData.landmark}
                                />
                              </Col>
                              <Col>
                                <Form.Control
                                  type="text"
                                  placeholder="RESUME ID(comp-checkId)"
                                  value={props.defaultData.resumeId}
                                  required
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
                                label={radios.label}
                                value={radios.id}
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
                          ? " Address found" && <AddressFound />
                          : "Address Not found" && <AddressNotFound />}
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
                            <Col>
                              <div key={`inline-radio`}>
                                {additionalRemarkByFE.map((radios) => (
                                  <Form.Check
                                    inline
                                    label={radios.label}
                                    value={radios.value}
                                    type={radios.type}
                                    name={radios.name}
                                    onChange={(v) => {
                                      console.log({
                                        ...updateAddressVerification,
                                        ...{ additionalRemark: v.target.value },
                                      });
                                      setUpdateAddressVerification({
                                        ...updateAddressVerification,
                                        ...{ additionalRemark: v.target.value },
                                      });
                                    }}
                                  />
                                ))}
                                <p style={{ float: "right", color: "#20c997" }}>
                                   
                                  {
                                    [...additionalRemarkByFE].find(
                                      (d) =>
                                        updateAddressVerification.additionalRemark ==
                                        d.value
                                    )?.label
                                  } 
                                </p>
                              </div>
                            </Col>
                          </Row>
                          <FloatingLabel
                            controlId="floatingTextarea"
                            label="positive"
                            className="mb-3"
                          >
                            <Form.Control
                              as="textarea"
                              placeholder="Remark if any"
                              onChange={(e) => {
                                setUpdateAddressVerification({
                                  ...updateAddressVerification,
                                  ...{ additionalRemarkByFE: e.target.value },
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
                          </div>
                          <FloatingLabel
                            controlId="floatingTextarea"
                            className="mb-3"
                          >
                            <Form.Control
                              type="text"
                              placeholder="FE Name"
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
                              placeholder="verification date"
                              onChange={(e) => {
                                setUpdateAddressVerification({
                                  ...updateAddressVerification,
                                  ...{ verificationDoneDate: e.target.value },
                                });
                              }}
                            />
                          </FloatingLabel>
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
                              alt=""
                              style={{
                                width: "70%",
                                height: "70%",
                                paddingLeft: "20px",
                              }}
                            />
                          )}
                        </Card>
                        <label> FE Signature</label>
                      </Col>
                      <Col>
                        <Card style={{ width: "18rem", border: "none" }}>
                          {imagePreview != null && (
                            <img
                              src={imagePreview}
                              alt=""
                              style={{
                                width: "70%",
                                height: "70%",
                                paddingLeft: "20px",
                              }}
                            />
                          )}
                        </Card>
                        <label> Responder Signature</label>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <div>
                  <Button
                    variant="info"
                    onClick={() => props.onUpdate(updateAddressVerification)}
                  >
                    Update
                  </Button>
                  <Button variant="warning">Upload Images</Button>
                </div>
              </Modal.Footer>
            </>
          ) : null}
        </Modal>
        {props.children}
      </div>
    </Container>
  );
};
export default ModalAfterVerify;