import { useState, useEffect } from "react";
import { Container, Form, Modal, Col, Row, Button } from "react-bootstrap";
import { companiesModalVarData } from "../constant/companies";

const CompaniesModal = (props) => {
  const [companiesData, setCompaniesData] = useState(companiesModalVarData);

  useEffect(() => {
    return () => {
      resetForm();
    };
  }, []);

  useEffect(() => {
    if (props.type == "add") {
      setCompaniesData({});
    } else {
      setCompaniesData({ ...companiesData, ...props.defaultData });
    }
  }, [props.defaultData]);

  const [errors, setErrors] = useState({});

  const setErrorsData = (data, value) => {
    setCompaniesData({
      ...companiesData,
      [data]: value,
    });
    if (!!errors[data])
      setErrors({
        ...errors,
        [data]: null,
      });
  };

  const validationForm = () => {
    const {
      name,
      city,
      contact_number,
      contact_person,
      email,
      address,
      short_name,
    } = companiesData;
    const newErrors = {};
    if (!address || address === "") newErrors.address = "Please Enter Address";
    if (!contact_number || contact_number === "")
      newErrors.contact_number = "please Enter Contact No.";
    else if (contact_number.length < 10)
      newErrors.contact_number = "At least 10 digit ";
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(email)) {
      newErrors.email = "Please enter valid email address.";
    }
    if (!name || name === "") newErrors.name = "Please Enter name";
    if (!city || city === "") newErrors.city = "Please Enter city";
    if (!contact_person || contact_person === "")
      newErrors.contact_person = "Please Enter Contact Person";
    if (!short_name || short_name === "")
      newErrors.short_name = "Please Enter Compnay short Name";
    return newErrors;
  };

  const handleSubmitValidation = (e) => {
    const formErrors = validationForm();
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
        {props.type === "add" ? (
          <Container>
            <Modal.Header>
              <div>
                <h3> Add Companies Info </h3>
              </div>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                  <Col>
                    <Form.Group controlId="name">
                      <Form.Control
                        type="text"
                        onChange={(e) => {
                          setErrorsData();
                          setCompaniesData({
                            ...companiesData,
                            ...{ name: e.target.value },
                          });
                        }}
                        placeholder="Enter Company Name"
                        isInvalid={!!errors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Group controlId="contact_number">
                      <Form.Control
                        type="number"
                        onChange={(e) => {
                          setErrorsData();
                          setCompaniesData({
                            ...companiesData,
                            ...{ contact_number: e.target.value },
                          });
                        }}
                        placeholder="Enter Contact "
                        isInvalid={!!errors.contact_number}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.contact_number}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="alternate_number">
                      <Form.Control
                        type="number"
                        onChange={(e) => {
                          setCompaniesData({
                            ...companiesData,
                            ...{ alternate_number: e.target.value },
                          });
                        }}
                        placeholder="Enter Alternate Number"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Group controlId="city">
                      <Form.Control
                        type="text"
                        onChange={(e) => {
                          setErrorsData();
                          setCompaniesData({
                            ...companiesData,
                            ...{ city: e.target.value },
                          });
                        }}
                        placeholder="Enter city "
                        isInvalid={!!errors.city}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.city}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="contact_person">
                      <Form.Control
                        type="text"
                        onChange={(e) => {
                          setErrorsData();
                          setCompaniesData({
                            ...companiesData,
                            ...{ contact_person: e.target.value },
                          });
                        }}
                        placeholder="Enter Contact Person "
                        isInvalid={!!errors.contact_person}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.contact_person}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Group controlId="short_name">
                      <Form.Control
                        type="text"
                        onChange={(e) => {
                          setErrorsData();
                          setCompaniesData({
                            ...companiesData,
                            ...{ short_name: e.target.value },
                          });
                        }}
                        placeholder="Enter Company short Name  "
                        isInvalid={!!errors.short_name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.short_name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="email">
                      <Form.Control
                        type="email"
                        onChange={(e) => {
                          setErrorsData();
                          setCompaniesData({
                            ...companiesData,
                            ...{ email: e.target.value },
                          });
                        }}
                        isInvalid={!!errors.email}
                        placeholder="Enter Email Address "
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Form.Group controlId="address">
                    <Form.Control
                      type="text"
                      onChange={(e) => {
                        setErrorsData();
                        setCompaniesData({
                          ...companiesData,
                          ...{ address: e.target.value },
                        });
                      }}
                      placeholder="Enter Companie Address"
                      isInvalid={!!errors.address}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.address}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="button"
                className="btn btn-info"
                onClick={(e) => {
                  if (handleSubmitValidation()) {
                    props.onSave(companiesData);
                  }
                  e.preventDefault();
                }}
              >
                Save Me!
              </Button>
            </Modal.Footer>
          </Container>
        ) : null}
        {props.type === "edit" ? (
          <Container>
            <Modal.Header>
              <div>
                <h3> Edit Companies Info </h3>
              </div>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                  <Col>
                    <Form.Group controlId="name">
                      <Form.Control
                        type="text"
                        value={companiesData.name}
                        onChange={(e) => {
                          setErrorsData();
                          setCompaniesData({
                            ...companiesData,
                            ...{ name: e.target.value },
                          });
                        }}
                        placeholder="Enter Company Name"
                        isInvalid={!!errors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Group controlId="contact_number">
                      <Form.Control
                        type="number"
                        value={companiesData.contact_number}
                        onChange={(e) => {
                          setErrorsData();
                          setCompaniesData({
                            ...companiesData,
                            ...{ contact_number: e.target.value },
                          });
                        }}
                        placeholder="Enter Contact "
                        isInvalid={!!errors.contact_number}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.contact_number}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="alternate_number">
                      <Form.Control
                        type="number"
                        value={companiesData.alternate_number}
                        onChange={(e) => {
                          setCompaniesData({
                            ...companiesData,
                            ...{ alternate_number: e.target.value },
                          });
                        }}
                        placeholder="Enter Alternate Number"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Group controlId="city">
                      <Form.Control
                        type="text"
                        value={companiesData.city}
                        onChange={(e) => {
                          setErrorsData();
                          setCompaniesData({
                            ...companiesData,
                            ...{ city: e.target.value },
                          });
                        }}
                        placeholder="Enter city "
                        isInvalid={!!errors.city}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.city}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="contact_person">
                      <Form.Control
                        type="text"
                        value={companiesData.contact_person}
                        onChange={(e) => {
                          setErrorsData();
                          setCompaniesData({
                            ...companiesData,
                            ...{ contact_person: e.target.value },
                          });
                        }}
                        placeholder="Enter Contact Person "
                        isInvalid={!!errors.contact_person}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.contact_person}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Group controlId="short_name">
                      <Form.Control
                        type="text"
                        value={companiesData.short_name}
                        onChange={(e) => {
                          setErrorsData();
                          setCompaniesData({
                            ...companiesData,
                            ...{ short_name: e.target.value },
                          });
                        }}
                        placeholder="Enter Company short Name  "
                        isInvalid={!!errors.short_name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.short_name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="email">
                      <Form.Control
                        type="email"
                        value={companiesData.email}
                        onChange={(e) => {
                          setErrorsData();
                          setCompaniesData({
                            ...companiesData,
                            ...{ email: e.target.value },
                          });
                        }}
                        placeholder="Enter Contact Person "
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Form.Group controlId="address">
                    <Form.Control
                      type="text"
                      value={companiesData.address}
                      onChange={(e) => {
                        setErrorsData();
                        setCompaniesData({
                          ...companiesData,
                          ...{ address: e.target.value },
                        });
                      }}
                      placeholder="Enter Companie Address"
                      isInvalid={!!errors.address}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.address}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="btn btn-info"
                onClick={(e) => {
                  if (handleSubmitValidation()) {
                    props.onUpdate(companiesData);
                  }
                  e.preventDefault();
                }}
              >
                Update
              </Button>
              <Button
                className="btn btn-danger"
                onClick={() => {
                  props.close();
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Container>
        ) : null}
      </Modal>
      {props.children}
    </div>
  );
};
export default CompaniesModal;