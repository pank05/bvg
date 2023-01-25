import { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Accordion,
  Container,
  Row,
  Col,
  Form,
  Card,
} from "react-bootstrap";
import { updateRadioUnviewModal } from "../constant/afterVerification";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { getStatusList } from "../actions/status";

const ModalAfterUnview = (props) => {
  const [unview, setUnview] = useState();
  const userDetails = useSelector((state) => state?.user?.userProfile);
  const statusOption = useSelector((state) => state?.status?.list);

  const dispatch = useDispatch();

  useEffect(() => {
    setUnview({ ...unview, ...props.defaultData });
  }, [props.defaultData]);

  const [checkedDate, setCheckedDate] = useState(false);
  const [tillDate, setTillDate] = useState();
  const [checkedBirth, setCheckedBirth] = useState(false);
  const [birthDate, setBirthDate] = useState();
  const [employeeRadio, setEmployeeRadio] = useState(updateRadioUnviewModal);
  const [updateCaseByAdmin, setUpdateCaseByAdmin] = useState(updateRadioUnviewModal);
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
  const [buildingPhoto,setBuildingPhoto]=useState([{
    value:"1",
    label:'Yes',
    name:'building_photo',
    type:'radio'
   },{
    value:"0",
    label:'No',
    name:'building_photo',
    type:'radio'
   },])
   const [addressProof,setAddressProof]=useState([{
    value:"1",
    label:'Yes',
    name:'address_proof',
    type:'radio'
   },{
    value:"0",
    label:'No',
    name:'address_proof',
    type:'radio'
   },])
   const [landmarkPhoto,setLandmarkPhoto]=useState([{
    value:"1",
    label:'Yes',
    name:'landmark_photo',
    type:'radio'
   },{
    value:"0",
    label:'No',
    name:'landmark_photo',
    type:'radio'
   },])

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
        type: ["status_of_verification","residence_status","residence_type"],
        reference: ["employee_address_verification"],
      })
    );
  }, []);

  const [statusVerificationList, setStatusVerificationList] = useState([]);
  const [residenceStatusList, setResidenceStatusList] = useState([]);
  const [residenceTypeList, setResidenceTypeList] = useState([]);

  useEffect(() => {
    setStatusVerificationList((statusOption || []).filter((v) =>v.type == "status_of_verification" &&v.reference == "employee_address_verification"));
    setResidenceStatusList((statusOption || []).filter((v) =>v.type == "residence_status" &&v.reference == "employee_address_verification"));
    setResidenceTypeList((statusOption || []).filter((v) =>v.type == "residence_type" &&v.reference == "employee_address_verification"));

  }, [statusOption]);

  useEffect(() => {}, [employeeRadio]);
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
                {" "}
                Call and cross verify for <br />
                {props.defaultData.candidateName} &nbsp;{" "}
                {props.defaultData.checkId}{" "}
              </h5>
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
                            {" "}
                            <b className="found_size_for_text">
                              {" "}
                              Provided Candidate Contact :
                            </b>
                            {props.defaultData.contactNo}
                            <br />
                          </Col>
                          <Col>
                            {" "}
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
                            <b className="found_size_for_text"> Contact :</b>{" "}
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
                              {" "}
                              Assign Employee :
                            </b>
                            {props.defaultData.EMP}
                          </Col>
                          <Col>
                            <b className="found_size_for_text">
                              {" "}
                              Assign Employee ID :
                            </b>
                            {props.defaultData.EMP}
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            {" "}
                            <b className="found_size_for_text">
                              Assign Field Executive :
                            </b>{" "}
                            {props.defaultData.FE}
                          </Col>
                          <Col>
                            <b className="found_size_for_text">
                              {" "}
                              Assign Field Executive ID:
                            </b>
                            {props.defaultData.FE}
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <b className="found_size_for_text"> Tat Status :</b>{" "}
                            ---------
                          </Col>
                          <Col>
                            <b className="found_size_for_text"> Remark :</b>{" "}
                            --------{" "}
                          </Col>
                        </Row>
                      </Container>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      {" "}
                      Verification Status History
                    </Accordion.Header>
                    <Accordion.Body>
                      <Container>
                        <Row>
                          <Col>
                            {" "}
                            <b className="found_size_for_text">
                              ApplicationCreated :
                            </b>{" "}
                            {userDetails.username} (
                            {userDetails?.roles?.map((v) => v.label)}) <br />
                          </Col>
                          <Col>--Date-- </Col>
                        </Row>
                        <Row>
                          <Col>
                            {" "}
                            <b className="found_size_for_text">
                              ASSIGNED :
                            </b>{" "}
                            {userDetails.username} (
                            {userDetails?.roles?.map((v) => v.label)}) <br />
                          </Col>
                          <Col>--Date-- </Col>
                        </Row>
                        <Row>
                          <Col>
                            {" "}
                            <b className="found_size_for_text">
                              ACCEPTED:{" "}
                            </b>{" "}
                            {props.defaultData.EMP} <br />
                          </Col>
                          <Col>--Date-- </Col>
                        </Row>
                        <Row>
                          <Col>
                            {" "}
                            <b className="found_size_for_text">
                              {" "}
                              SENT_TO_FE:
                            </b>{" "}
                            {props.defaultData.EMP} <br />
                          </Col>
                          <Col>--Date-- </Col>
                        </Row>
                        <Row>
                          <Col>
                            {" "}
                            <b className="found_size_for_text">
                              VERIF_DONE_BY_FE:
                            </b>{" "}
                            {props.defaultData.FE} <br />
                          </Col>
                          <Col>--Date-- </Col>
                        </Row>
                        <Row>
                          <Col>
                            {" "}
                            <b className="found_size_for_text">
                              EMP_COMPL_UNRE:
                            </b>{" "}
                            {props.defaultData.EMP} <br />
                          </Col>
                          <Col>--Date-- </Col>
                        </Row>
                        <Row>
                          <Col> </Col>
                          <Col>
                            Completed OUT TAT by Employee pending for admin
                            Review
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            {" "}
                            <b className="found_size_for_text">
                              VERIFIED_BY_ADMIN:
                            </b>{" "}
                            ------ <br />
                          </Col>
                          <Col>--Date-- </Col>
                        </Row>
                        <Row>
                          <Col> </Col>
                          <Col>
                            Verification Done Success Full case completed and
                            close
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
                          <Col>
                            Audit Call Done :
                            {/* {props.auditData.audit_call_done}  */}
                          </Col>
                          <Col>Audit call status : Positive</Col>
                          <Col>Tat Status : Verified </Col>
                        </Row>
                        <Row>
                          {" "}
                          <Col> done </Col>
                          <Col> done </Col>
                          <Col> done </Col>
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
                        {" "}
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="text"
                              placeholder="Candidate Name"
                              value={props.defaultData.candidateName}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="text"
                              placeholder="CheckId"
                              value={props.defaultData.checkId}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        {" "}
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="text"
                              placeholder="Father's Name"
                              value={props.defaultData.fatherName}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="text"
                              placeholder="Client Name"
                              value={props.defaultData.clientName}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        {" "}
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="text"
                              placeholder="Resume ID"
                              value={props.defaultData.resumeId}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="number"
                              placeholder="Telephone No"
                              value={props.defaultData.contactNo}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="text"
                            placeholder="Address of Candidate(Full address)"
                            value={props.defaultData.address}
                          />
                        </Form.Group>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="text"
                              placeholder="Candidate City"
                              value={props.defaultData.city}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="text"
                              placeholder="Candidate District"
                              value={props.defaultData.district}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="text"
                              placeholder="Candidate State"
                              value={props.defaultData.state}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="text"
                              placeholder="Candidate Pin Code"
                              value={props.defaultData.pincode}
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
                          value={radios.value}
                          type={radios.type}
                          name={radios.name}
                          onChange={(v) => {
                            setUpdateCaseByAdmin({
                              ...updateCaseByAdmin,
                              ...{buildingPhotoStatus:v.target.value },
                            });
                          }}
                        /> 
                      ))}
                        <Col>
                        <Form.Control
                              type="text"
                              placeholder="If No,the Reason"
                              onChange={(e) => {
                                  setUpdateCaseByAdmin({
                                    ...updateCaseByAdmin,
                                    ...{buildingPhotoRemark:e.target.value}
                                  })
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
                          label={radios.label}
                          value={radios.value}
                          type={radios.type}
                          name={radios.name}
                          onChange={(v) => {
                            setUpdateCaseByAdmin({
                              ...updateCaseByAdmin,
                              ...{addressProofStatus:v.target.value },
                            });
                          }}
                        /> 
                      ))}
                        <Col>
                        <Form.Control
                              type="text"
                              placeholder="If No,the Reason"
                              onChange={(e) => {
                                  setUpdateCaseByAdmin({
                                    ...updateCaseByAdmin,
                                    ...{addressProofRemark:e.target.value}
                                  })
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
                          label={radios.label}
                          value={radios.value}
                          type={radios.type}
                          name={radios.name}
                          onChange={(v) => {
                            setUpdateCaseByAdmin({
                              ...updateCaseByAdmin,
                              ...{landmarkPhotoStatus:v.target.value },
                            });
                          }}
                        /> 
                      ))}
                        <Col>
                        <Form.Control
                              type="text"
                              placeholder="If No,the Reason"
                              onChange={(e) => {
                                  setUpdateCaseByAdmin({
                                    ...updateCaseByAdmin,
                                    ...{landmarkPhotoRemark:e.target.value}
                                  })
                              }}
                            />
                            </Col>
                          </div>
                        </Row>
                        <Row>Period of stay:</Row>
                        <br />
                        <Row>
                          <Col>
                            <Form.Control type="date" disabled={checkedBirth} 
                              onChange={(e) => {
                              setUpdateCaseByAdmin({ ...updateCaseByAdmin, ...{ fromDate: e.target.value } });
                              }} />
                          </Col>
                          <Col>
                            <Form.Check
                              type="checkbox"
                              label="By Birth"
                              name=""
                              checked={checkedBirth}
                              onChange={() => {
                                if (checkedBirth) {
                                  setBirthDate("");
                                }
                                setCheckedBirth(!checkedBirth);
                              }}
                            />
                          </Col>
                          <Col>
                            <Form.Control type="date" disabled={checkedDate}
                            onChange={(e)=>{
                              setUpdateCaseByAdmin({ ...updateCaseByAdmin, ...{ toDate: e.target.value } });
                            }} />
                          </Col>
                          <Col>
                            <Form.Check
                              type="checkbox"
                              label="Till Date"
                              name=""
                              checked={checkedDate}
                              onChange={() => {
                                if (checkedDate) {
                                  setTillDate("");
                                }
                                setCheckedDate(!checkedDate);
                              }}
                            />
                          </Col>
            <Row>
              <p style={{ float: "right", color: "#20c997" }}>
                From {updateCaseByAdmin.fromDate} To {updateCaseByAdmin.toDate}
              </p>
            </Row>
                        </Row>
                        <br />
                        <Row>
                          <Form.Control
                            type="number"
                            placeholder="Contact No"
                            onChange={(e)=>{
                              setUpdateCaseByAdmin({...updateCaseByAdmin,...{contactNoRelative:e.target.value}})
                            }}
                          />
                        </Row>
                        <br />
                        <Row> Verification Details: </Row>
                        <Row>
                          <Col>
                            <Form.Control type="date" 
                            onChange={(e)=>{
                              setUpdateCaseByAdmin({...updateCaseByAdmin,...{verificationDate:e.target.value}})
                            }}
                            />
                          </Col>
                          <Col>
                            <Form.Control type="time" 
                            onChange={(e)=>{
                              setUpdateCaseByAdmin({...updateCaseByAdmin,...{verificationTime:e.target.value}})
                            }} />
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
                            placeholder="Verified By (Name of Respondent) "
                            onChange={(e)=>{
                              setUpdateCaseByAdmin({...updateCaseByAdmin,...{verifyByRespondent:e.target.value}})
                            }}
                          />
                        </Row>
                        <br />
                        <Row>
                          <Form.Control
                            type="text"
                            placeholder="Relation with the Candidate"
                            onChange={(e)=>{
                              setUpdateCaseByAdmin({...updateCaseByAdmin,...{relationWithCandidate:e.target.value}})
                            }}
                          />
                        </Row>
                        <br />
                        <Row>
                          <Form.Control
                            type="text"
                            placeholder="Nearrest Landmark"
                            onChange={(e)=>{
                              setUpdateCaseByAdmin({...updateCaseByAdmin,...{nearLandmark:e.target.value}})
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
                          label={radios.label}
                          value={radios.value}
                          type={radios.type}
                          name={radios.name}
                          onChange={(v) => {
                            setUpdateCaseByAdmin({
                              ...updateCaseByAdmin,
                              ...{ verificationRemark: v.target.value },
                            });
                          }}
                        />
                      ))}
                      <p style={{ float: "right", color: "#20c997" }}>
                        {
                          [...verificationRemark].find(
                            (d) =>
                              updateCaseByAdmin.verificationRemark == d.value
                          )?.label
                        }{" "}
                      </p>
                    </div>
                    <br />
                  </Form>
                </div>
                <div style={{ border: "1px solid gray" }}>
                  <br />
                  <Row style={{ padding: "10px 10px 10px 10px" }}>
                    <Col sm="8">
                      <Form.Control
                        type="text"
                        placeholder="Field Agent Name"
                        onChange={(e) => {
                          setUpdateCaseByAdmin({
                            ...updateCaseByAdmin,
                            ...{ FE: e.target.value },
                          });
                        }}
                      />
                    </Col>
                    <Col></Col>{" "}
                  </Row>
                  <br />
                </div>
                <br />{" "}
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
                  onClick={() => props.onSubmit(employeeRadio)}
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