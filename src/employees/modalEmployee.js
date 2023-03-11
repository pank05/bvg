import {
  Modal,
  Button,
  Row,
  Container,
  Form,
  Col,
  InputGroup,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompaniesAPI } from "../actions/company";
import { employeeModalVarData } from "../constant/employeeVar";

const EmployeeModal = (props) => {
  const [employeedata, setEmployeeData] = useState(employeeModalVarData);
  const companies = useSelector((state) => state?.company?.list || []);
  const dispatch = useDispatch();

  const [passwordShow, setPasswordShow] = useState(false);
  const [passwordShowAdd, setPasswordShowAdd] = useState(false);

  useEffect(() => {
    dispatch(getAllCompaniesAPI({ id: "all", is_active: 1 }));
    return () => {
      resetForm();
    };
  }, []);

  useEffect(() => {
    if (props.type == "add") {
      setEmployeeData({});
    } else {
      setEmployeeData({ ...employeedata, ...props.defaultData });
    }
  }, [props.defaultData]);

  const [errors, setErrors] = useState({});

  const setField = (field, value) => {
    setEmployeeData({
      ...employeedata,
      [field]: value,
    });
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const validationForm = () => {
    const {
      name,
      date_of_birth,
      contact_number,
      email,
      select_company,
    } = employeedata;
    const newErrors = {};
    if (!name || name === "") newErrors.name = "Please Enter Employee Name";
    if (!date_of_birth || date_of_birth === "")
      newErrors.date_of_birth = "Please Enter Date Of Birth";
    if (!contact_number || contact_number === "")
      newErrors.contact_number = "please Enter Contact No.";
    else if (contact_number.length < 10 || contact_number.length > 10)
      newErrors.contact_number = "At least 10 digit ";
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(email)) {
      newErrors.email = "Please enter valid email address.";
    }
    // var pattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/);
    // if (!pattern.test(password)) {
    //   newErrors.password = "Please enter valid password ";
    // }
    if (!select_company || select_company === "")
      newErrors.select_company = "Please Enter Select Company";
    return newErrors;
  };

  const handleSubmit = (e) => {
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
        {props.type === "edit" ? (
          <Container>
            <Modal.Header>
              <div>
                <h3> Update Employee Info </h3>
              </div>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                  <Col>
                    <Form.Group controlId="name">
                      <Form.Control
                        type="text"
                        value={employeedata.name}
                        onChange={(e) => {
                          setField();
                          setEmployeeData({ ...employeedata, ...{ name: e.target.value } });
                        }}
                        placeholder="Enter Employee Name"
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
                    <Form.Group controlId="date_of_birth">
                      <Form.Control
                        type="date"
                        value={employeedata.date_of_birth}
                        onChange={(e) => {
                          setField();
                          setEmployeeData({
                            ...employeedata,
                            ...{ date_of_birth: e.target.value },
                          });
                        }}
                        placeholder="Choose a date of Birth"
                        isInvalid={!!errors.date_of_birth}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.date_of_birth}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="contact_number">
                      <Form.Control
                        type="number"
                        value={employeedata.contact_number}
                        onChange={(e) => {
                          setField();
                          setEmployeeData({
                            ...employeedata,
                            ...{ contact_number: e.target.value },
                          });
                        }}
                        placeholder="Enter Contact no"
                        isInvalid={!!errors.contact_number}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.contact_number}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Control
                      type="number"
                      value={employeedata.Alternet_number}
                      onChange={(e) => {
                        setEmployeeData({
                          ...employeedata,
                          ...{ Alternet_number: e.target.value },
                        });
                      }}
                      placeholder="Alternet Contact no"
                    />
                  </Col>
                  <Col>
                    <Form.Group controlId="email">
                      <Form.Control
                        type="email"
                        value={employeedata.email}
                        onChange={(e) => {
                          setField();
                          setEmployeeData({ ...employeedata, ...{ email: e.target.value } });
                        }}
                        placeholder="Enter Employee email"
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
                  <Col>
                    <InputGroup controlId="Password">
                      <Form.Control
                        type={passwordShow ? "text" : "password"}
                        value={employeedata.password}
                        onChange={(e) => {
                          setField();
                          setEmployeeData({ ...employeedata, ...{ password: e.target.value } });
                        }}
                        isInvalid={!!errors.password}
                        placeholder="Enter Password"
                      />
                      <Button
                        variant="secondary"
                        onClick={() => setPasswordShow(!passwordShow)}
                      >
                        <AiOutlineEye />
                      </Button>
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup controlId="reset_pass">
                      <Form.Control
                        type="text"
                        value={employeedata.reset_pass}
                        onChange={(e) => {
                          setField();
                          setEmployeeData({
                            ...employeedata,
                            ...{ reset_pass: e.target.value },
                          });
                        }}
                        placeholder="Reset Password"
                        isInvalid={!!errors.reset_pass}
                      />
                      <Button variant="secondary">
                        <GrPowerReset />
                      </Button>
                      <Form.Control.Feedback type="invalid">
                        {errors.reset_pass}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Group controlId="select_company">
                      <Form.Control
                        type="text"
                        value={employeedata.select_company}
                        onChange={(e) => {
                          setField();
                          setEmployeeData({
                            ...employeedata,
                            ...{ select_company: e.target.value },
                          });
                        }}
                        placeholder="Select Company"
                        isInvalid={!!errors.select_company}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.select_company}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="select_company">
                      <Form.Control
                        type="text"
                        value={employeedata.select_company}
                        placeholder="Assigned Company"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <br />
              </Form>
            </Modal.Body>
            <br />
            <Modal.Footer>
              <Button
                className="btn btn-info"
                onClick={(e) => {
                  if (handleSubmit()) {
                    props.onUpdate(employeedata);
                  }
                  e.preventDefault();
                }}
              >
                Update
              </Button>
              <Button
                className="btn btn-danger"
                onClick={() => {
                  props.onDelete(employeedata.id);
                }}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Container>
        ) : null}
        {props.type === "add" ? (
          <Container>
            <Form>
              <Modal.Header>
                <div>
                  <h3> New Employee Registration </h3>
                </div>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col>
                    <Form.Group controlId="name">
                      <Form.Control
                        type="text"
                        onChange={(e) => {
                          setField();
                          setEmployeeData({ ...employeedata, ...{ name: e.target.value } });
                        }}
                        placeholder="Enter Employee Name"
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
                    <Form.Group controlId="date_of_birth">
                      <Form.Control
                        type="date"
                        placeholder="Choose a date of Birth"
                        onChange={(e) => {
                          setField();
                          setEmployeeData({
                            ...employeedata,
                            ...{ date_of_birth: e.target.value },
                          });
                        }}
                        isInvalid={!!errors.date_of_birth}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.date_of_birth}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="contact_number">
                      <Form.Control
                        type="number"
                        placeholder="Enter Contact no"
                        onChange={(e) => {
                          setField();
                          setEmployeeData({
                            ...employeedata,
                            ...{ contact_number: e.target.value },
                          });
                        }}
                        isInvalid={!!errors.contact_number}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.contact_number}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder="Alternet Contact no"
                      onChange={(e) => {
                        setEmployeeData({
                          ...employeedata,
                          ...{ Alternet_number: e.target.value },
                        });
                      }}
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Group controlId="email">
                      <Form.Control
                        type="email"
                        placeholder="Enter Employee email"
                        onChange={(e) => {
                          setField();
                          setEmployeeData({ ...employeedata, ...{ email: e.target.value } });
                        }}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <InputGroup controlId="password">
                      <Form.Control
                        type={passwordShowAdd ? "text" : "password"}
                        placeholder="Enter Password"
                        onChange={(e) => {
                          setField();
                          setEmployeeData({ ...employeedata, ...{ password: e.target.value } });
                        }}
                        isInvalid={!!errors.password}
                      />
                      <Button
                        variant="secondary"
                        onClick={() => setPasswordShowAdd(!passwordShowAdd)}
                      >
                        <AiOutlineEye />
                      </Button>
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Group controlId="select_company">
                      <Form.Select
                        onChange={(e) => {
                          setField();
                          setEmployeeData({
                            ...employeedata,
                            ...{ select_company: e.target.value },
                          });
                        }}
                        isInvalid={!!errors.select_company}
                      >
                        <option>-select Company-</option>
                        {companies.map((company) => {
                          return (
                            <option value={company.id}>{company.name}</option>
                          );
                        })}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.select_company}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="select_company">
                      <Form.Control
                        type="text"
                        placeholder="Assigned Company"
                        value={employeedata.select_company}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  type="button"
                  className="btn btn-info"
                  onClick={(e) => {
                    if (handleSubmit()) {
                      props.save(employeedata);
                    }
                    e.preventDefault();
                  }}
                >
                  Save Me!
                </Button>
              </Modal.Footer>
            </Form>
          </Container>
        ) : null}
      </Modal>
      {props.children}
    </div>
  );
};
export default EmployeeModal;
