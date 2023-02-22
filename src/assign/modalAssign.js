import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { assignModalVarData } from "../constant/assignTAT";
import { useSelector, useDispatch } from "react-redux";
import { getAllEmployeeAPI } from "../actions/employee";

const AssignModal = (props) => {
  const employee = useSelector((state) => state?.employee?.list || []);
  const dispatch = useDispatch();

  const [data, setData] = useState(assignModalVarData);

  useEffect(()=>{
       setData({...data,...props.assignData})
  },[props.assignData])
  const [isCheckOutBtn, setIscheckOutBtn] = useState(false);

  useEffect(() => {
    // called when compoment mount
    dispatch(getAllEmployeeAPI());

    return () => {
      // unmount cleanup
      resetForm();
    };
  }, []);

  const [assignErrors, setAssignErrors] = useState({});
  
  const setAssignField = (assignField, value) => {
    setData({
      ...data,
      [assignField]: value,
    });
    if (!!assignErrors[assignErrors])
      setAssignErrors({
        ...assignErrors,
        [assignErrors]: null,
      });
  };
  const validationAssignForm = () => {
    const { durationEnd, assignedTo, isCheckOutBtn } = data;
    const newErrors = {};
    //  if(!durationEnd || durationEnd === '')
    //  newErrors.durationEnd="Please Enter TAT End Date";
     if(!assignedTo || assignedTo === '' )
     newErrors.assignedTo='Please Enter Employee Name';
    //  if(!isCheckOutBtn )
    //  newErrors.isCheckOutBtn='Please Enter CheckBox ';
    return newErrors;
  };

  const handleSumbitValidation = (e) => {
    const formErrors = validationAssignForm();
    if (Object.keys(formErrors).length > 0) {
      setAssignErrors(formErrors);
      return false;
    } else {
      setAssignErrors({});
    }
    return true;
  };

  const resetForm = () => {
    setAssignErrors({});
    setIscheckOutBtn();
  };

  return (
    <div>
      <Modal
        show={props.show}
        onHide={() => {
          resetForm();
          props.close();
        }}
      >
        {props.type === "assign" ? (
          <div>
            <Modal.Header className="update,div_center">
              <h5> Select Employee and TAT Date </h5>
            </Modal.Header>
            <Modal.Body>
              <div>
                <Form>
                  <Row>
                    {/* assignedBy */}
                    <Col>
                      <Form.Group controlId="durationStart">
                        <Form.Control
                          type="text"
                          placeholder="TAT Start Date"
                          value={props?.assignData.map((v)=>v.durationStart)}
                         readOnly />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="durationEnd">
                        <Form.Control
                          type="date"
                          placeholder="TAT End Date"
                          onChange={(e) => {
                            setAssignField();
                            setData({
                              ...data,
                              ...{ durationEnd: e.target.value },
                            });
                          }}
                          isInvalid={!!assignErrors.durationEnd}
                        />
                        <Form.Control.Feedback type="invalid">
                          {assignErrors.durationEnd}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    {/* <Col>
                     <Form.Group controlId="checkPriority">
                   <Form.Check type="checkbox" label="Special Priority" checked={isCheckOutBtn} 
                   onChange={(e)=>{
                    setIscheckOutBtn(!isCheckOutBtn);   
                    setAssignField()
                    }}
                   isInvalid={!!assignErrors.checkPriority}/>
                  <Form.Control.Feedback type="invalid"> {assignErrors.checkPriority}</Form.Control.Feedback>
                   </Form.Group> 
                   </Col>   */}
                  </Row>
                  <br />
                  <Row>
                    <Col>
                      <Form.Group controlId="assignedTo">
                        <Form.Select
                          aria-label="Default select example"
                          onChange={(e) => {
                            setAssignField();
                            setData({
                              ...data,
                              ...{ assignedTo: e.target.value },
                            });
                          }}
                          isInvalid={!!assignErrors.assignedTo}
                        >
                          <option>Select Emplooyee</option>
                          {employee.map((emplist) => {
                            return (
                              <option value={emplist.id}>{emplist.name}</option>
                            );
                          })}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {assignErrors.assignedTo}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="info"
                onClick={(e) => {
                  if (handleSumbitValidation()) {
                    props.onSave(data);
                  }
                  e.preventDefault();
                }}
              >
                Save Assign
              </Button>
              <Button variant="danger" onClick={props.close}>
                Cancel
              </Button>
            </Modal.Footer>
          </div>
        ) : null}

        {props.type === "NotAssign" ? (
          <div>
            <Modal.Header className="update,div_center">
              <h2> Withdraw</h2>
            </Modal.Header>
            <Modal.Body>
              <div>
                <Form>
                  <h4>
                    Are you sure To withdraw this {props.assignData.length}{" "}
                    Verification forms
                  </h4>
                  {/* {props?.assignData.map((v) => v.checkId).join(",")} */}
                  <br/><br/>
                  <Form.Group controlId="remark">
                        <Form.Control
                          type="text"
                          placeholder="remark"
                          onChange={(e) => {
                            setAssignField();
                            setData({
                              ...data,
                              ...{ remark: e.target.value },
                            });
                          }}
                        />
                      </Form.Group>
                </Form>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="info"
                onClick={() => {
                  props.onDelete(data);
                }}  >
                Yes
              </Button>
              <Button variant="danger" onClick={props.close}>
                No
              </Button>
            </Modal.Footer>
          </div>
        ) : null}
      </Modal>
      {props.children}
    </div>
  );
};
export default AssignModal;
