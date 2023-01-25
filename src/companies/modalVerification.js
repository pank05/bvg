import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { verificationModalVarData } from "../constant/verificationVar";
import { useDispatch, useSelector } from "react-redux";
import AsyncSelect from 'react-select/async';
import { getAllCompaniesAPI } from "../actions/company";
import {
  getAllStates,
  getDistrictById,
  getCityBySearch
} from "../actions/verification";
import Select from "react-select";

const ModalVerification = (props) => {
  const [verifyData, setVerifyData] = useState(...verificationModalVarData);
  const companies = useSelector((state) => (state?.company?.list || []).map((v)=>{
   return {
      value:v.id,
      label:v.name
   }
  }));
  const allState = useSelector((state) => state?.verification?.stateList || []).map((stateRecord)=>{
   return{
      value:stateRecord.id,
      label:stateRecord.name
   }
  });
  const districtList = useSelector((state) => state?.verification?.districtList || []).map((disList)=>{
   return{
      value:disList.id,
      label:disList.name
   }
  });
  const cities = useSelector((state) => state?.verification?.cityList || []).map((cityName)=>{
   return {
      value:cityName.id,
      label:cityName.name
   }
  });
  const [selectedCityText, setSelectedCityText] = useState("");

  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(getAllStates('all'));
   //  dispatch(getCityBySearch());
    dispatch(getAllCompaniesAPI('all'));
    return () => {
      // unmount event
      resetForm();
    };
  }, []);

  useEffect(() => {
    if (props.type == "add") {
      setVerifyData({});
    } else {
      setVerifyData({ ...verifyData, ...props.defaultData });
    }
  }, [props.defaultData]);

  const [errors, setErrors] = useState({});

  const setVerificationField = (field, value) => {
    setVerifyData({
      ...verifyData,
      ...{ [field]: value },
    });
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };
  const handleValidationForm = () => {
    const {
      checkId,
      companyId,
      candidateName,
      fatherName,
      contactNo,
      address,
      city,
      pincode,
      clientName,
      resumeId,
      landmark,
      district,
      state,
      verificationType,
    } = verifyData;
    const newErrors = {};
    if (!candidateName || candidateName === "")
      newErrors.candidateName = "Please Enter candidate Name";
    if (props.type === "edit") {
      if (!checkId || checkId === "")
        newErrors.checkId = "Please Enter Company Check ID";
    }
    if (!companyId || companyId === "")
      newErrors.companyId = "Please Enter Assing_Company ";
    if (!fatherName || fatherName === "")
      newErrors.fatherName = "Please Enter Candidate Father ";
    if (!contactNo || contactNo === "")
      newErrors.contactNo = "please Enter Contact No.";
    else if (contactNo.length < 10 || contactNo.length > 10)
      newErrors.contactNo = "At least 10 digit ";
    if (!address || address === "")
     newErrors.address = "Please Enter Address ";
    if (!city || city === "")
    newErrors.city = "Please Enter city ";
    if (!pincode || pincode === "")
      newErrors.pincode = "Please Enter Pin Code ";
    if (!clientName || clientName === "")
      newErrors.clientName = "Please Enter Client Name ";
    if (!resumeId || resumeId === "")
      newErrors.resumeId = "Please Enter Resume Id ";
    if (!landmark || landmark === "")
      newErrors.landmark = "Please Enter Landmark ";
    if (!district || district === "")
      newErrors.district = "Please Enter District ";
    if (!state || state === "") 
    newErrors.state = "Please Enter state ";
    if (!verificationType || verificationType === "")
      newErrors.verificationType = "Please Enter Type of Ckeck ";
    return newErrors;
  };
  const handleSubmit = () => {
    const formErrors = handleValidationForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return false;
    } else {
      setErrors({});
    }
    return true;
  };
  const resetForm = () => {
    setErrors({});
  };

  const loadOptions = (
   inputValue,
   callback
    ) => {

   dispatch(getCityBySearch({name:inputValue,id:"all"}));
   console.log("cities",cities)
   callback(cities);
   };

  return (
    <div style={{ width: "800px" }}>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={props.show}
        onHide={() => {
          resetForm();
          props.close();
        }}
      >
        {/* edit verification */}
        {props.type === "edit" ? (
          <div>
            <Modal.Header>
              <h3>Update Verification Entry </h3>
              <h6> AuthBridge</h6>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                  <Col>
                    <Form.Group controlId="candidateName">
                      <Form.Control
                        type="text"
                        placeholder="Enter Candidate Name"
                        value={verifyData.candidateName}
                        onChange={(e) => {
                          setVerificationField();
                          setVerifyData({
                            ...verifyData,
                            ...{ candidateName: e.target.value },
                          });
                        }}
                        isInvalid={!!errors.candidateName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.candidateName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="companyId">
                      <Form.Control
                        onChange={(e) => {
                          setVerificationField();
                          setVerifyData({
                            ...verifyData,
                            ...{ companyId: e.target.value },
                          });
                        }}
                        isInvalid={!!errors.companyId}
                        value={verifyData.companyId}
                      ></Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.companyId}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Group controlId="fatherName">
                      <Form.Control
                        type="text"
                        value={verifyData.fatherName}
                        placeholder="Enter Candidate Father Name"
                        onChange={(e) => {
                          setVerificationField();
                          setVerifyData({
                            ...verifyData,
                            ...{ fatherName: e.target.value },
                          });
                        }}
                        isInvalid={!!errors.fatherName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.fatherName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="contactNo">
                      <Form.Control
                        type="number"
                        value={verifyData.contactNo}
                        placeholder="Enter Candidate Contact No."
                        onChange={(e) => {
                          setVerificationField();
                          setVerifyData({
                            ...verifyData,
                            ...{ contactNo: e.target.value },
                          });
                        }}
                        isInvalid={!!errors.contactNo}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.contactNo}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Control
                      type="number"
                      value={verifyData.alternateNo}
                      placeholder="Alternate Contact No.1"
                      onChange={(e) => {
                        setVerifyData({
                          ...verifyData,
                          ...{ alternateNo: e.target.value },
                        });
                      }}
                    />
                  </Col>
                  <Col>
                    <Form.Group controlId="address">
                      <Form.Control
                        type="text"
                        placeholder="Address given by Candidate"
                        value={verifyData.address}
                        onChange={(e) => {
                          setVerificationField();
                          setVerifyData({
                            ...verifyData,
                            ...{ address: e.target.value },
                          });
                        }}
                        isInvalid={!!errors.address}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.address}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Group controlId="state">
                      <Form.Control
                        type="text"
                        value={verifyData.state}
                        placeholder="please enter State"
                        onChange={(e) => {
                          setVerificationField();
                          setVerifyData({
                            ...verifyData,
                            ...{ state: e.target.value },
                          });
                        }}
                        isInvalid={!!errors.state}
                      ></Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.state}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="district">
                      <Form.Control
                        type="text"
                        value={verifyData.district}
                        placeholder="please enter district"
                        onChange={(e) => {
                          setVerificationField();
                          setVerifyData({
                            ...verifyData,
                            ...{ district: e.target.value },
                          });
                        }}
                        isInvalid={!!errors.district}
                      ></Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.district}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="city">
                     <AsyncSelect cacheOptions  defaultOptions isInvalid={!!errors.city} onChange={(val)=>{
                      setVerificationField();
                      setVerifyData({
                        ...verifyData,
                        ...{ city: val.value },
                      });
                    }} />
                      <Form.Control.Feedback type="invalid">
                        {errors.city}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Group controlId="pincode">
                      <Form.Control
                        type="number"
                        placeholder="Candidate Pincode"
                        value={verifyData.pincode}
                        onChange={(e) => {
                          setVerificationField();
                          setVerifyData({
                            ...verifyData,
                            ...{ pincode: e.target.value },
                          });
                        }}
                        isInvalid={!!errors.pincode}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.pincode}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="verificationType">
                      <Form.Control
                        type="text"
                        onChange={(e) => {
                          setVerificationField();
                          setVerifyData({
                            ...verifyData,
                            ...{ verificationType: e.target.value },
                          });
                        }}
                        isInvalid={!!errors.verificationType}
                        value={verifyData.verificationType}
                      ></Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.verificationType}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Group controlId="clientName">
                      <Form.Control
                        type="text"
                        placeholder="Client Name"
                        value={verifyData.clientName}
                        onChange={(e) => {
                          setVerificationField();
                          setVerifyData({
                            ...verifyData,
                            ...{ clientName: e.target.value },
                          });
                        }}
                        isInvalid={!!errors.clientName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.clientName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="resumeId">
                      <Form.Control
                        type="text"
                        placeholder="Resume ID"
                        value={verifyData.resumeId}
                        onChange={(e) => {
                          setVerifyData({
                            ...verifyData,
                            ...{ resumeId: e.target.value },
                          });
                        }}
                        isInvalid={!!errors.resumeId}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.resumeId}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Group controlId="landmark">
                      <Form.Control
                        type="text"
                        placeholder="Nearest Landmark"
                        value={verifyData.landmark}
                        onChange={(e) => {
                          setVerifyData({
                            ...verifyData,
                            ...{ landmark: e.target.value },
                          });
                        }}
                        isInvalid={!!errors.landmark}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.landmark}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="btn btn-info"
                onClick={(e) => {
                  if (handleSubmit()) {
                    props.onUpdate(verifyData);
                  }
                  e.preventDefault();
                }}
              >
                Update
              </Button>
              <Button
                className="btn btn-danger"
                onClick={() => props.onDelete(verifyData.id)} >
              Delete
              </Button>
            </Modal.Footer>
          </div>
        ) : null}

        {/* add verification  */}
        {props.type === "add" ? (
          <div>
            <Modal.Header>
              <div>
                <h3> New Verification Entry</h3>
              </div>
            </Modal.Header>
            <br />
            <Modal.Body>
              <Form>
                <Row>
                  <Col>
                    <Form.Group controlId="candidateName">
                      <Form.Control
                        type="text"
                        placeholder="Enter Candidate Name"
                        onChange={(e) => {
                          setVerificationField();
                          setVerifyData({
                            ...verifyData,
                            ...{ candidateName: e.target.value },
                          });
                        }}
                        isInvalid={!!errors.candidateName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.candidateName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="checkId">
                      <Form.Control
                        type="text"
                        placeholder="Company check Id"
                        onChange={(e) => {
                          setVerificationField();
                          setVerifyData({
                            ...verifyData,
                            ...{ checkId: e.target.value },
                          });
                        }}
                        isInvalid={!!errors.checkId}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.checkId}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                  {/* add company options */}
                    <Form.Group controlId="companyId">
                    <Select options={companies}  onChange={(val)=>{
                      setVerificationField();
                      setVerifyData({
                        ...verifyData,
                        ...{ companyId: val.value },
                      });
                    }}/>
                      <Form.Control.Feedback type="invalid">
                        {errors.companyId}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Group controlId="fatherName">
                      <Form.Control
                        type="text"
                        placeholder="Enter Candidate Father Name"
                        onChange={(e) => {
                          setVerificationField();
                          setVerifyData({
                            ...verifyData,
                            ...{ fatherName: e.target.value },
                          });
                        }}
                        isInvalid={!!errors.fatherName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.fatherName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="contactNo">
                      <Form.Control
                        type="number"
                        placeholder="Enter Candidate Contact No."
                        onChange={(e) => {
                          setVerificationField();
                          setVerifyData({
                            ...verifyData,
                            ...{ contactNo: e.target.value },
                          });
                        }}
                        isInvalid={!!errors.contactNo}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.contactNo}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder="Alternate Contact No.1"
                      onChange={(e) => {
                        setVerifyData({
                          ...verifyData,
                          ...{ alternateNo: e.target.value },
                        });
                      }}
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Group controlId="address">
                      <Form.Control
                        type="text"
                        placeholder="Address given by Candidate"
                        onChange={(e) => {
                          setVerificationField();
                          setVerifyData({
                            ...verifyData,
                            ...{ address: e.target.value },
                          });
                        }}
                        isInvalid={!!errors.address}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.address}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Group controlId="state">
                    <Select options={allState}  onChange={(e) => {
                          setVerificationField();
                          if (e.value) {
                            dispatch(getDistrictById(e.value));
                          }
                          setVerifyData({
                            ...verifyData,
                            ...{  state: e.value },
                          });
                        }}
                        isInvalid={!!errors.state}
                    />
                      <Form.Control.Feedback type="invalid">
                        {errors.state}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="district">
                    <Select options={districtList}  onChange={(e) => {
                      setVerificationField();
                      setVerifyData({
                        ...verifyData,
                        ...{ district: e.value },
                      }); 
                     }} isInvalid={!!errors.district}
                    />
                      <Form.Control.Feedback type="invalid">
                        {errors.district}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="city">
                    <AsyncSelect cacheOptions loadOptions={loadOptions} defaultOptions isInvalid={!!errors.city} onChange={(val)=>{
                      setVerificationField();
                      setVerifyData({
                        ...verifyData,
                        ...{ city: val.value },
                      });
                    }} />
                     <Form.Control.Feedback type="invalid">
                        {errors.city}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Group controlId="pincode">
                      <Form.Control
                        type="number"
                        placeholder="Candidate Pincode"
                        onChange={(e) => {
                          setVerificationField();
                          setVerifyData({
                            ...verifyData,
                            ...{ pincode: e.target.value },
                          });
                        }}
                        isInvalid={!!errors.pincode}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.pincode}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="verificationType">
                      <Form.Select
                        onChange={(e) => {
                          setVerificationField();
                          setVerifyData({
                            ...verifyData,
                            ...{ verificationType: e.target.value },
                          });
                        }}
                        isInvalid={!!errors.verificationType}
                      >
                        <option>Type of Check </option>
                        <option value="Address Verification">
                          Address Verification
                        </option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.verificationType}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Group controlId="clientName">
                      <Form.Control
                        type="text"
                        placeholder="Client Name"
                        onChange={(e) => {
                          setVerificationField();
                          setVerifyData({
                            ...verifyData,
                            ...{ clientName: e.target.value },
                          });
                        }}
                        isInvalid={!!errors.clientName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.clientName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="resumeId">
                      <Form.Control
                        type="text"
                        placeholder="Resume ID"
                        onChange={(e) => {
                          setVerificationField();
                          setVerifyData({
                            ...verifyData,
                            ...{ resumeId: e.target.value },
                          });
                        }}
                        isInvalid={!!errors.resumeId}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.resumeId}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Group controlId="landmark">
                      <Form.Control
                        type="text"
                        placeholder="Nearest Landmark"
                        onChange={(e) => {
                          setVerificationField();
                          setVerifyData({
                            ...verifyData,
                            ...{ landmark: e.target.value },
                          });
                        }}
                        isInvalid={!!errors.landmark}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.landmark}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="btn btn-info"
                onClick={(event) => {
                  if (handleSubmit()) {
                    props.onSave(verifyData);
                  }
                  event.preventDefault();
                }} >
                Save Me!
              </Button>
            </Modal.Footer>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};
export default ModalVerification;
