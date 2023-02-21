import { useEffect, useState } from "react";
import { useRef } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import {
  Container,
  Card,
  Form,
  Button,
  Modal,
  Col,
  Row,
  InputGroup,
} from "react-bootstrap";
import { fieldExecutiveModalData } from "../constant/fieldExecutiveVar";
import { getAllCompaniesAPI } from "../actions/company";
import { useDispatch, useSelector } from "react-redux";

const FieldExectiveModal = (props) => {
  const [fieldVar, setFieldVar] = useState(...fieldExecutiveModalData);
  const companies = useSelector((state) => state?.company?.list || []);
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAdd, setShowPasswordAdd] = useState(false);

  useEffect(() => {
    dispatch(getAllCompaniesAPI({ id: "all", is_active: 1 }));
    return () => {
      resetForm();
    };
  }, []);

  useEffect(() => {
    if (props.type == "add") {
      setFieldVar({});
    } else {
      setFieldVar({ ...fieldVar, ...props.defaultData });
    }
  }, [props.defaultData]);

  const [imagePreview, setImagePreview] = useState(null);

  const filePicekerRef = useRef(null);

  const handlerChangeImage = (event) => {
    const reader = new FileReader();
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
    setFieldVar({ ...fieldVar, profile: selectedFile });

    reader.onload = (readerEvent) => {
      if (selectedFile.type.includes("image")) {
        setImagePreview(readerEvent.target.result);
      }
    };
  };

  const [fieldErrors, setFiledErrors] = useState({});

  const setFieldData = (fieldData, value) => {
    setFieldVar({
      ...fieldVar,
      [fieldData]: value,
    });
    if (!!fieldErrors[fieldData])
      setFiledErrors({
        ...fieldErrors,
        [fieldData]: null,
      });
  };
  
  const validationForm = () => {
    const {
      name,
      address,
      contact_number,
      email,
      password,
      area,
      company_name,
    } = fieldVar;
    const newFieldErrors = {};
    if (!name || name === "")
      newFieldErrors.name = "Please Enter Employee Name";
    if (!contact_number || contact_number === "")
      newFieldErrors.contact_number = "please Enter Contact No.";
    else if (contact_number.length < 10)
      newFieldErrors.contact_number = "At least 10 digit ";
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(email)) {
      newFieldErrors.email = "Please enter valid email address.";
    }
    // var pattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/);
    // if (!pattern.test(password)) {
    //   newFieldErrors.password = "Please enter valid password ";
    // }
    if (!company_name || company_name === "")
      newFieldErrors.company_name = "Please Enter Company Name";
    if (!area || area === "") newFieldErrors.area = "Please Enter Area";
    if (props.type === "add") {
      if (!address || address === "")
        newFieldErrors.address = "Please Enter Address";
    }
    return newFieldErrors;
  };

  const handleSubmitValidation = (e) => {
    const formErrors = validationForm();
    if (Object.keys(formErrors).length > 0) {
      setFiledErrors(formErrors);
      return false;
    } else {
      setFiledErrors({});
    }
    return true;
  };
  
  const resetForm = () => {
    setFiledErrors({});
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
                <h3> Update Field Executive Info </h3>
              </div>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                  <Col>
                    <Form.Group controlId="name">
                      <Form.Control
                        type="text"
                        value={fieldVar.name}
                        onChange={(e) => {
                          setFieldData();
                          setFieldVar({
                            ...fieldVar,
                            ...{ name: e.target.value },
                          });
                        }}
                        placeholder="Enter  Field Executive  Name"
                        isInvalid={!!fieldErrors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {fieldErrors.name}
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
                        value={fieldVar.contact_number}
                        placeholder="Enter Contact No"
                        onChange={(e) => {
                          setFieldData();
                          setFieldVar({
                            ...fieldVar,
                            ...{ contact_number: e.target.value },
                          });
                        }}
                        isInvalid={!!fieldErrors.contact_number}
                      />
                      <Form.Control.Feedback type="invalid">
                        {fieldErrors.contact_number}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="email">
                      <Form.Control
                        type="email"
                        value={fieldVar.email}
                        placeholder="Enter  Field Executive  Email"
                        onChange={(e) => {
                          setFieldData();
                          setFieldVar({
                            ...fieldVar,
                            ...{ email: e.target.value },
                          });
                        }}
                        isInvalid={!!fieldErrors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {fieldErrors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <InputGroup controlId="password">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        value={fieldVar.password}
                        placeholder="Enter  Field Executive  password"
                        onChange={(e) => {
                          setFieldData();
                          setFieldVar({
                            ...fieldVar,
                            ...{ password: e.target.value },
                          });
                        }}
                        isInvalid={!!fieldErrors.password}
                      />
                      <Button
                        variant="secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <AiOutlineEye />
                      </Button>
                      <Form.Control.Feedback type="invalid">
                        {fieldErrors.password}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <InputGroup controlId="reset_pass">
                      <Form.Control
                        type="text"
                        value={fieldVar.reset_pass}
                        placeholder="Reset Password"
                        onChange={(e) => {
                          setFieldData();
                          setFieldVar({
                            ...fieldVar,
                            ...{ reset_pass: e.target.value },
                          });
                        }}
                        isInvalid={!!fieldErrors.reset_pass}
                      />
                      <Button variant="secondary">
                        <BiEdit />
                      </Button>
                      <Form.Control.Feedback type="invalid">
                        {fieldErrors.reset_pass}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Col>
                  <Col>
                    <Form.Group controlId="area">
                      <Form.Control
                        type="text"
                        value={fieldVar.area}
                        placeholder="Executive Field Area"
                        onChange={(e) => {
                          setFieldData();
                          setFieldVar({
                            ...fieldVar,
                            ...{ area: e.target.value },
                          });
                        }}
                        isInvalid={!!fieldErrors.area}
                      />
                      <Form.Control.Feedback type="invalid">
                        {fieldErrors.area}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Group controlId="company_name">
                      <Form.Control
                        type="text"
                        value={fieldVar.company_name}
                        placeholder="Company Name"
                        onChange={(e) => {
                          setFieldData();
                          setFieldVar({
                            ...fieldVar,
                            ...{ company_name: e.target.value },
                          });
                        }}
                        isInvalid={!!fieldErrors.company_name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {fieldErrors.company_name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Text>FE PHOTO</Card.Text>
                      <img
                        src={fieldVar.image_url}
                        className="img-fluid rounded-start"
                        alt="..."
                        style={{
                          height: "130px",
                          height: "140",
                          paddingLeft: "20px",
                        }}
                      />
                    </Card.Body>
                  </Card>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="btn btn-info"
                onClick={(e) => {
                  if (true && handleSubmitValidation()) {
                    props.onSave(fieldVar);
                  }
                  e.preventDefault();
                }}
              >
                Update
              </Button>
              <Button
                className="btn btn-danger"
                onClick={() => props.onDelete(fieldVar.id)}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Container>
        ) : null}
        {/* add FE  */}
        {props.type === "add" ? (
          <Container>
            <Modal.Header>
              <div>
                <h3> New Field Executive Registration</h3>
              </div>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                  <Col>
                    <Form.Group controlId="name">
                      <Form.Control
                        type="text"
                        placeholder="Enter Field Executive Name"
                        onChange={(e) => {
                          setFieldData();
                          setFieldVar({
                            ...fieldVar,
                            ...{ name: e.target.value },
                          });
                        }}
                        isInvalid={!!fieldErrors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {fieldErrors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Group controlId="address">
                      <Form.Control
                        type="text"
                        placeholder="Enter Field Executive Address"
                        onChange={(e) => {
                          setFieldData();
                          setFieldVar({
                            ...fieldVar,
                            ...{ address: e.target.value },
                          });
                        }}
                        isInvalid={!!fieldErrors.address}
                      />
                      <Form.Control.Feedback type="invalid">
                        {fieldErrors.address}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="contact_number">
                      <Form.Control
                        type="number"
                        placeholder="Enter contact No"
                        onChange={(e) => {
                          setFieldData();
                          setFieldVar({
                            ...fieldVar,
                            ...{ contact_number: e.target.value },
                          });
                        }}
                        isInvalid={!!fieldErrors.contact_number}
                      />
                      <Form.Control.Feedback type="invalid">
                        {fieldErrors.contact_number}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Group controlId="email">
                      <Form.Control
                        type="email"
                        placeholder="Enter  Field Executive  email"
                        onChange={(e) => {
                          setFieldVar({
                            ...fieldVar,
                            ...{ email: e.target.value },
                          });
                        }}
                        isInvalid={!!fieldErrors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {fieldErrors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <InputGroup controlId="password">
                      <Form.Control
                        type={showPasswordAdd ? "text" : "password"}
                        placeholder="Enter Password"
                        onChange={(e) => {
                          setFieldData();
                          setFieldVar({
                            ...fieldVar,
                            ...{ password: e.target.value },
                          });
                        }}
                        isInvalid={!!fieldErrors.password}
                      />
                      <Button
                        variant="secondary"
                        onClick={() => setShowPasswordAdd(!showPasswordAdd)}
                      >
                        <AiOutlineEye />
                      </Button>
                      <Form.Control.Feedback type="invalid">
                        {fieldErrors.password}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Group controlId="area">
                      <Form.Control
                        type="text"
                        placeholder="Executive field Area"
                        onChange={(e) => {
                          setFieldData();
                          setFieldVar({
                            ...fieldVar,
                            ...{ area: e.target.value },
                          });
                        }}
                        isInvalid={!!fieldErrors.area}
                      />
                      <Form.Control.Feedback type="invalid">
                        {fieldErrors.area}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="company_name">
                      <Form.Select
                        onChange={(e) => {
                          setFieldData();
                          setFieldVar({
                            ...fieldVar,
                            ...{ company_name: e.target.value },
                          });
                        }}
                        isInvalid={!!fieldErrors.company_name}
                      >
                        <option>-select Company-</option>
                        {companies.map((company) => {
                          return (
                            <option value={company.id}>{company.name}</option>
                          );
                        })}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {fieldErrors.company_name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Card style={{ width: "18rem" }}>
                      <Card.Body>
                        <Card.Text>FE PHOTO</Card.Text>

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
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card style={{ width: "18rem" }}>
                      <Card.Body>
                        <Card.Text>
                          Select and upload new file for FE Id card . Don't
                          forgot to click update or save button
                        </Card.Text>
                        <input
                          ref={filePicekerRef}
                          accept="image/*, video/*"
                          onChange={handlerChangeImage}
                          type="file"
                          hidden
                        />
                        <Button
                          className="btn"
                          onClick={() => filePicekerRef.current.click()}
                        >
                          Select Images
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="btn btn-info"
                onClick={(e) => {
                  if (true && handleSubmitValidation()) {
                    props.onUpdate(fieldVar);
                  }
                  e.preventDefault();
                }}
              >
                Save Me!
              </Button>
            </Modal.Footer>
          </Container>
        ) : null}
        {props.children}
      </Modal>
    </div>
  );
};
export default FieldExectiveModal;