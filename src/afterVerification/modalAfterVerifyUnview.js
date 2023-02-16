import { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Accordion,
  Container,
  Table,
  Row,
  Col,
  Form,
  Card,
} from "react-bootstrap";
import { updateRadioUnviewModal } from "../constant/afterVerification";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import moment from "moment";
import { getStatusList } from "../actions/status";

const ModalAfterUnview = (props) => {
  const [unview, setUnview] = useState();
  const userDetails = useSelector((state) => state?.user?.userProfile);
  const caseAllDetails = useSelector((state) => state?.verification?.caseDetails);
  const statusOption = useSelector((state) => state?.status?.list);
  const caseHistoryDetails =useSelector((state)=> state?.verification?.caseHistory);
  const dispatch = useDispatch();

  useEffect(() => {
    setUnview({ ...unview, ...props.defaultData });
  }, [props.defaultData]);

  useEffect(() => {
    if (caseAllDetails && caseAllDetails.id) {
      setUpdateCaseByAdmin({
        ...updateCaseByAdmin,
        ...{
          verificationRemarkForm: caseAllDetails.type_id,
          birthCheckForm: caseAllDetails?.is_by_birth,
          tillCheckForm: caseAllDetails?.is_till_date,
          fromDate: caseAllDetails?.period_stay_from,
          toDate: caseAllDetails?.period_stay_to,
          contactNoRelative : caseAllDetails?.person_contact,
          verificationDate:caseAllDetails?.verification_date,
          verifyByRespondent:caseAllDetails?.verified_by_label ,
          relationWithCandidate:caseAllDetails?.responder_relation_label,
          nearLandmark:caseAllDetails?.location,
          statusVerification:caseAllDetails?.status_of_verification,
          buildingPhotoStatus:caseAllDetails?.building_photo,
          addressProofStatus:caseAllDetails?.address_proof,
          landmarkPhotoStatus:caseAllDetails?.landmark_photo,
          residenceStatus:caseAllDetails?.verification_residence_status ,
          residenceType:caseAllDetails?.verification_residence_type,
          verificationTime:caseAllDetails?.verification_time,
          buildingPhotoRemark:caseAllDetails?.building_photo_remark,
          addressProofRemark:caseAllDetails?.address_proof_remark,
          landmarkPhotoRemark:caseAllDetails?.landmark_photo_remark,
          id:caseAllDetails.id
        },
      });
    }
  }, [caseAllDetails]);

  const [updateCaseByAdmin, setUpdateCaseByAdmin] = useState(
    updateRadioUnviewModal
  );
  const [verificationRemark, setVerificationRemark] = useState([
    {
      value: "1",
      label: "Active(Pending Vedification Incomplete)",
      name: "remark",
      type: "radio",
    },
    {
      value: "0",
      label: "Completed(Close Vedification Done)",
      name: "remark",
      type: "radio",
    },
  ]);
  const [buildingPhoto, setBuildingPhoto] = useState([
    {
      value: "1",
      label: "Yes",
      name: "building_photo",
      type: "radio",
    },
    {
      value: "0",
      label: "No",
      name: "building_photo",
      type: "radio",
    },
  ]);
  const [addressProof, setAddressProof] = useState([
    {
      value: "1",
      label: "Yes",
      name: "address_proof",
      type: "radio",
    },
    {
      value: "0",
      label: "No",
      name: "address_proof",
      type: "radio",
    },
  ]);
  const [landmarkPhoto, setLandmarkPhoto] = useState([
    {
      value: "1",
      label: "Yes",
      name: "landmark_photo",
      type: "radio",
    },
    {
      value: "0",
      label: "No",
      name: "landmark_photo",
      type: "radio",
    },
  ]);

  useEffect(() => {
    setVerificationRemark(verificationRemark || []);
  }, [verificationRemark]);

  useEffect(() => {
    setBuildingPhoto(buildingPhoto || []);
  }, [buildingPhoto]);

  useEffect(() => {
    setAddressProof(addressProof || []);
  }, [addressProof]);

  useEffect(() => {
    setLandmarkPhoto(landmarkPhoto || []);
  }, [landmarkPhoto]);

  useEffect(() => {
    dispatch(
      getStatusList({
        type: ["status_of_verification", "residence_status", "residence_type"],
        reference: ["employee_address_verification"],
      })
    );
  }, []);

  const [statusVerificationList, setStatusVerificationList] = useState([]);
  const [residenceStatusList, setResidenceStatusList] = useState([]);
  const [residenceTypeList, setResidenceTypeList] = useState([]);

  useEffect(() => {
    setStatusVerificationList(
      (statusOption || []).filter(
        (v) =>
          v.type == "status_of_verification" &&
          v.reference == "employee_address_verification"
      )
    );

    setResidenceStatusList(
      (statusOption || []).filter(
        (v) =>
          v.type == "residence_status" &&
          v.reference == "employee_address_verification"
      )
    );

    setResidenceTypeList(
      (statusOption || []).filter(
        (v) =>
          v.type == "residence_type" &&
          v.reference == "employee_address_verification"
      )
    );
  }, [statusOption]);

  const [imagePreview, setImagePreview] = useState(null);

  const filePicekerRef = useRef(null);

  const handlerChangeImage = (event) => {
    const reader = new FileReader();
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
    setUnview({ ...unview, profile: selectedFile });

    reader.onload = (readerEvent) => {
      if (selectedFile.type.includes("image")) {
        setImagePreview(readerEvent.target.result);
      }
    };
  };

  return (
    <div style={{ width: "800px" }}>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={props.open}
        onHide={props.onClose}
      >
        {props.type === "editUnview" ? (
          <div>
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
                      Verification Status History
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
                            <b className="found_size_for_text"> Contact :</b>
                            {caseAllDetails.person_contact}
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <b className="found_size_for_text">
                              Tat Start Date :
                            </b>
                            {caseAllDetails.duration_start}
                          </Col>
                          <Col>
                            <b className="found_size_for_text">
                              Tat End Date :
                            </b>
                            {caseAllDetails.duration_end}
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <b className="found_size_for_text">
                              Assign Employee :
                            </b>
                            {caseAllDetails.assigned_to_name}
                          </Col>
                          <Col>
                            <b className="found_size_for_text">
                              Assign Field Executive :
                            </b>
                            {caseAllDetails?.assigned_by_name}
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <b className="found_size_for_text"> Tat Status :</b>
                            ---------
                          </Col>
                          <Col>
                            <b className="found_size_for_text"> Remark :</b>
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
                        <Table striped bordered hover responsive>
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
                          <Col>
                            Audit Call Done :
                            {caseAllDetails?.audit_call_done ? "Yes" : "No"}
                          </Col>
                          <Col>
                            Audit call status :
                            {caseAllDetails.audit_call_status
                              ? "Positive"
                              : "Negative"}
                          </Col>
                          <Col>
                            Tat Status :
                            {caseAllDetails.audit_case_status_label}
                          </Col>
                        </Row>
                        <Row>
                          <Col> {caseAllDetails.audit_call_done_remark} </Col>
                          <Col> {caseAllDetails.audit_call_status_remark}</Col>
                          <Col> {caseAllDetails.audit_case_status_remark} </Col>
                        </Row>
                        <br />
                      </Form>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </div>
        ) : null}
        {props.type === "updateUnview" ? (
          <div>
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                UPDATE VERIFICATION
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    Candidate Provided Pre Verification Detail
                  </Accordion.Header>
                  <Accordion.Body>
                    <Form>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="text"
                              placeholder="Candidate Name"
                              value={caseAllDetails?.candidate_name}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="text"
                              placeholder="CheckId"
                              value={caseAllDetails?.check_id}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="text"
                              placeholder="Father's Name"
                              value={caseAllDetails?.father_name}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="text"
                              placeholder="Client Name"
                              value={caseAllDetails?.client_name}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="text"
                              placeholder="Resume ID"
                              value={caseAllDetails?.resume_id}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="number"
                              placeholder="Telephone No"
                              value={caseAllDetails?.contact_no}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="text"
                            placeholder="Address of Candidate(Full address)"
                            value={caseAllDetails.address}
                          />
                        </Form.Group>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="text"
                              placeholder="Candidate State"
                              value={caseAllDetails.state_name}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="text"
                              placeholder="Candidate District"
                              value={caseAllDetails?.district_name}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="text"
                              placeholder="Candidate city"
                              value={caseAllDetails?.city_name}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="text"
                              placeholder="Candidate Pin Code"
                              value={caseAllDetails?.pincode}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Form>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    Employee Address Verification
                  </Accordion.Header>
                  <Accordion.Body>
                    <Container>
                      <Form>
                        <Row>
                          Status of Verification:
                          <Col>
                            <div key={`inline-radio`}>
                              {statusVerificationList
                                .map((v) => {
                                  let temp = { ...v };
                                  temp.name = "status_of_verification";
                                  temp.type = "radio";
                                  return temp;
                                })
                                .map((radios) => {
                                  return (
                                    <Form.Check
                                      inline
                                      checked={updateCaseByAdmin?.statusVerification == radios.id}
                                      label={radios.label}
                                      value={radios.id}
                                      name={radios.name}
                                      type={radios.type}
                                      onChange={(v) => {
                                        setUpdateCaseByAdmin({
                                          ...updateCaseByAdmin,
                                          ...{
                                            statusVerification: v.target.value,
                                          },
                                        });
                                      }}
                                    />
                                  );
                                })}
                              <p style={{ float: "right", color: "#20c997" }}>
                                {
                                  [...statusVerificationList].find(
                                    (d) =>
                                      updateCaseByAdmin.statusVerification ==
                                      d.id
                                  )?.label
                                }
                              </p>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          Building photo:
                          <div key={`inline-radio`}>
                            {buildingPhoto.map((radios) => (
                              <Form.Check
                                inline
                                label={radios.label}
                                checked={updateCaseByAdmin?.buildingPhotoStatus == radios.value}
                                value={radios.value}
                                type={radios.type}
                                name={radios.name}
                                onChange={(v) => {
                                  setUpdateCaseByAdmin({
                                    ...updateCaseByAdmin,
                                    ...{ buildingPhotoStatus: v.target.value },
                                  });
                                }}
                              />
                            ))}
                            <Col>
                              <Form.Control
                                type="text"
                                value={updateCaseByAdmin?.buildingPhotoRemark}
                                placeholder="If No,the Reason"
                                onChange={(e) => {
                                  setUpdateCaseByAdmin({
                                    ...updateCaseByAdmin,
                                    ...{ buildingPhotoRemark: e.target.value },
                                  });
                                }}
                              />
                            </Col>
                          </div>
                        </Row>
                        <Row>
                          Address proof:
                          <div key={`inline-radio`}>
                            {addressProof.map((radios) => (
                              <Form.Check
                                inline
                                checked={updateCaseByAdmin?.addressProofStatus == radios.value}
                                label={radios.label}
                                value={radios.value}
                                type={radios.type}
                                name={radios.name}
                                onChange={(v) => {
                                  setUpdateCaseByAdmin({
                                    ...updateCaseByAdmin,
                                    ...{ addressProofStatus: v.target.value },
                                  });
                                }}
                              />
                            ))}
                            <Col>
                              <Form.Control
                                type="text"
                                value={updateCaseByAdmin?.addressProofRemark}
                                placeholder="If No,the Reason"
                                onChange={(e) => {
                                  setUpdateCaseByAdmin({
                                    ...updateCaseByAdmin,
                                    ...{ addressProofRemark: e.target.value },
                                  });
                                }}
                              />
                            </Col>
                          </div>
                        </Row>
                        <Row>
                          Landmark photo:
                          <div key={`inline-radio`}>
                            {landmarkPhoto.map((radios) => (
                              <Form.Check
                                inline
                                checked={updateCaseByAdmin?.landmarkPhotoStatus == radios.value}
                                label={radios.label}
                                value={radios.value}
                                type={radios.type}
                                name={radios.name}
                                onChange={(v) => {
                                  setUpdateCaseByAdmin({
                                    ...updateCaseByAdmin,
                                    ...{ landmarkPhotoStatus: v.target.value },
                                  });
                                }}
                              />
                            ))}
                            <Col>
                              <Form.Control
                                type="text"
                                value={updateCaseByAdmin?.landmarkPhotoRemark}
                                placeholder="If No,the Reason"
                                onChange={(e) => {
                                  setUpdateCaseByAdmin({
                                    ...updateCaseByAdmin,
                                    ...{ landmarkPhotoRemark: e.target.value },
                                  });
                                }}
                              />
                            </Col>
                          </div>
                        </Row>
                        <Row>Period of stay:</Row>
                        <br />
                        <Row>
                          <Col>
                            <Form.Control
                              type="date"
                              value={updateCaseByAdmin.fromDate}
                              disabled={updateCaseByAdmin?.birthCheckForm}
                              onChange={(e) => {
                                setUpdateCaseByAdmin({
                                  ...updateCaseByAdmin,
                                  ...{ fromDate: e.target.value },
                                });
                              }}
                            />
                          </Col>
                          <Col>
                            <Form.Check
                              inline
                              checked={updateCaseByAdmin?.birthCheckForm}
                              label={"by_birth"}
                              type={"checkbox"}
                              name="by_birth"
                              onChange={(v) => {
                                setUpdateCaseByAdmin({
                                  ...updateCaseByAdmin,
                                  ...{ birthCheckForm: v.target.checked },
                                });
                              }}
                            />
                          </Col>
                          <Col>
              <Form.Control
                type="date"
                disabled={updateCaseByAdmin?.tillCheckForm}
                value={updateCaseByAdmin.toDate}
                onChange={(e) => {
                  setUpdateCaseByAdmin({...updateCaseByAdmin, ...{ toDate: e.target.value } });
                }}
              />
            </Col>
            <Col>
            <Form.Check
                inline
                checked={updateCaseByAdmin?.tillCheckForm}
                label={'till_date'}
                type={'checkbox'}
                name='till_date'
                onChange={(v) => {
                  setUpdateCaseByAdmin({ ...updateCaseByAdmin, ...{ tillCheckForm: v.target.checked} });
                }}
              />
            </Col>
                          <Row>
                            <p style={{ float: "right", color: "#20c997" }}>
                              From {updateCaseByAdmin.fromDate} To
                              {updateCaseByAdmin.toDate}
                            </p>
                          </Row>
                        </Row>
                        <br />
                        <Row>
                          <Form.Control
                            type="number"
                            placeholder="Contact No"
                            value={updateCaseByAdmin.contactNoRelative}
                            onChange={(e) => {
                              setUpdateCaseByAdmin({
                                ...updateCaseByAdmin,
                                ...{ contactNoRelative: e.target.value },
                              });
                            }}
                          />
                        </Row>
                        <br />
                        <Row> Verification Details: </Row>
                        <Row>
                          <Col>
                            <Form.Control
                              type="date"
                              value={updateCaseByAdmin?.verificationDate}
                              onChange={(e) => {
                                setUpdateCaseByAdmin({
                                  ...updateCaseByAdmin,
                                  ...{ verificationDate: e.target.value },
                                });
                              }}
                            />
                          </Col>
                          <Col>
                            <Form.Control
                              type="time"
                              value={updateCaseByAdmin?.verificationTime}
                              onChange={(e) => {
                                setUpdateCaseByAdmin({
                                  ...updateCaseByAdmin,
                                  ...{ verificationTime: e.target.value },
                                });
                              }}
                            />
                          </Col>
                        </Row>
                        <br />
                        <Row>Residence Status: </Row>
                        <Row>
                          <div key={`inline-radio`}>
                            {residenceStatusList
                              .map((v) => {
                                let temp = { ...v };
                                temp.name = "residence_status";
                                temp.type = "radio";
                                return temp;
                              })
                              .map((radios) => {
                                return (
                                  <Form.Check
                                    inline
                                    label={radios.label}
                                    checked={updateCaseByAdmin?.residenceStatus == radios.id}
                                    value={radios.id}
                                    name={radios.name}
                                    type={radios.type}
                                    onChange={(v) => {
                                      setUpdateCaseByAdmin({
                                        ...updateCaseByAdmin,
                                        ...{
                                          residenceStatus: v.target.value,
                                        },
                                      });
                                    }}
                                  />
                                );
                              })}
                          </div>
                          <Col></Col>
                        </Row>
                        <Row>Residence Type: </Row>
                        <Row>
                          <div key={`inline-radio`}>
                            {residenceTypeList
                              .map((v) => {
                                let temp = { ...v };
                                temp.name = "residence_type";
                                temp.type = "radio";
                                return temp;
                              })
                              .map((radios) => {
                                return (
                                  <Form.Check
                                    inline
                                    label={radios.label}
                                    checked={updateCaseByAdmin?.residenceType == radios.id}
                                    value={radios.id}
                                    name={radios.name}
                                    type={radios.type}
                                    onChange={(v) => {
                                      setUpdateCaseByAdmin({
                                        ...updateCaseByAdmin,
                                        ...{
                                          residenceType: v.target.value,
                                        },
                                      });
                                    }}
                                  />
                                );
                              })}
                          </div>
                        </Row>
                        <Row>
                          <Form.Control
                            type="text"
                            value={updateCaseByAdmin?.verifyByRespondent }
                            placeholder="Verified By (Name of Respondent) "
                            onChange={(e) => {
                              setUpdateCaseByAdmin({
                                ...updateCaseByAdmin,
                                ...{ verifyByRespondent: e.target.value },
                              });
                            }}
                          />
                        </Row>
                        <br />
                        <Row>
                          <Form.Control
                            type="text"
                            value={updateCaseByAdmin?.relationWithCandidate }
                            placeholder="Relation with the Candidate"
                            onChange={(e) => {
                              setUpdateCaseByAdmin({
                                ...updateCaseByAdmin,
                                ...{ relationWithCandidate: e.target.value },
                              });
                            }}
                          />
                        </Row>
                        <br />
                        <Row>
                          <Form.Control
                            type="text"
                            value={updateCaseByAdmin?.nearLandmark}
                            placeholder="Nearrest Landmark"
                            onChange={(e) => {
                              console.log({
                                ...updateCaseByAdmin,
                                ...{ nearLandmark: e.target.value },
                              });
                              setUpdateCaseByAdmin({
                                ...updateCaseByAdmin,
                                ...{ nearLandmark: e.target.value },
                              });
                            }}
                          />
                        </Row>
                        <br />
                      </Form>
                    </Container>
                  </Accordion.Body>
                </Accordion.Item>
                <div style={{ border: "1px solid gray" }}>
                  <h5 className="div_center,note_update">
                    <br />
                    <Row>
                      <Col>Additional Remark By Field Agent</Col>
                    </Row>
                    <br />
                  </h5>
                  <Row style={{ padding: "15px 20px 15px 20px" }}>
                    <Form.Control
                      as="textarea"
                      value={caseAllDetails?.additional_remark_json}
                      placeholder="Remark if any"
                      onChange={(e) => {
                        setUpdateCaseByAdmin({
                          ...updateCaseByAdmin,
                          ...{ additionalRemarkFA: e.target.value },
                        });
                      }}
                    />
                  </Row>
                </div>
                <div style={{ border: "1px solid gray" }}>
                  <Form style={{ padding: "10px 10px 10px 10px " }}>
                    <br />
                    <Row>
                      <label> Verification status :</label>
                    </Row>
                    <div key={`inline-radio`}>
                      {verificationRemark.map((radios) => (
                        <Form.Check
                          inline
                          checked={
                            updateCaseByAdmin?.verificationRemarkForm ==
                            radios.value
                          }
                          label={radios.label}
                          value={radios.value}
                          type={radios.type}
                          name={radios.name}
                          onChange={(v) => {
                            setUpdateCaseByAdmin({
                              ...updateCaseByAdmin,
                              ...{ verificationRemarkForm: v.target.value },
                            });
                          }}
                        />
                      ))}
                      <p style={{ float: "right", color: "#20c997" }}>
                        {
                          [...verificationRemark].find(
                            (d) =>
                              updateCaseByAdmin.verificationRemarkForm ==
                              d.value
                          )?.label
                        }
                      </p>
                    </div>
                    <br />
                  </Form>
                </div>
                <br />
                <div>
                  <Row>
                    <Col>
                      <Card style={{ width: "18rem", border: "none" }}>
                        <Card.Body>
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
                          <Card.Text>FE Signature</Card.Text>
                          {/* <input
					ref={filePicekerRef}
					accept="image/*, video/*"
					onChange={handlerChangeImage}
					type="file"
					hidden
				/>
        <Button className="btn" onClick={() => filePicekerRef.current.click()}>
        Select Images
        </Button> */}
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col>
                      <Card style={{ width: "18rem", border: "none" }}>
                        <Card.Body>
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
                          <Card.Text>Responder Signature </Card.Text>
                          {/* <input
					ref={filePicekerRef}
					accept="image/*, video/*"
					onChange={handlerChangeImage}
					type="file"
					hidden
				/>
        <Button className="btn" onClick={() => filePicekerRef.current.click()}>
        Select Images
        </Button> */}
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </Accordion>
            </Modal.Body>
            <Modal.Footer>
              <div>
                <Button
                  variant="info"
                  onClick={() => props.onSubmit(updateCaseByAdmin)}
                >
                  Update
                </Button>
                <Button variant="warning">Upload Images</Button>
              </div>
            </Modal.Footer>
          </div>
        ) : null}
      </Modal>
      {props.children}
    </div>
  );
};
export default ModalAfterUnview;
