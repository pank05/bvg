import { useEffect, useState } from "react";
import { Modal,Button,Row,Col,Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { verificationModalVarData } from "../constant/verificationVar";
import { getAllFieldAPI } from "../actions/fieldexctive"; 

const EmployeeToFEAssign =(props)=>{
    const fieldExecutive = useSelector((state) => state?.field?.list || []);
    const [assignFEData, setAssignFEData] = useState(verificationModalVarData);
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(getAllFieldAPI())
    },[])

    useEffect(()=>{
        setAssignFEData({...assignFEData,...props.assignData})
    },[props.assignData])

    return (
        <Modal show={props.show} onHide={props.close}>
        <Modal.Header >
          <Modal.Title>Select Field Field Executive and TAT Date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Modal.Body>
              <div>
                <Form>
                  <Row>
                    <Col>
                      <Form.Group controlId="durationStart">
                        <Form.Control
                          type="text"
                          placeholder="TAT Start Date"
                          // value={props.assignData.durationStart}
                          // value={props?.assignData.map((v)=>v.durationStart)}

                         />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="durationEnd">
                        <Form.Control
                          type="date"
                          placeholder="TAT End Date"
                          // value={props?.assignData.map((v)=>v.durationEnd)}
                        //   onChange={(e) => {
                        //     // setAssignField();
                        //     setAssignFEData({
                        //       ...assignFEData,
                        //       ...{ durationEnd: e.target.value },
                        //     });
                        //   }}
                        //   isInvalid={!!assignErrors.durationEnd}
                        />
                        {/* <Form.Control.Feedback type="invalid">
                          {assignErrors.durationEnd}
                        </Form.Control.Feedback> */}
                      </Form.Group>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>
                      <Form.Group controlId="assignedTo">
                        <Form.Select
                          aria-label="Default select example"
                          onChange={(e) => {
                            // setAssignField();
                            setAssignFEData({
                              ...assignFEData,
                              ...{ assignedTo: e.target.value },
                            });
                          }}
                        //   isInvalid={!!assignErrors.assignedTo}
                        >
                          <option>Select fieldExecutive</option>
                          {fieldExecutive.map((FEList) => {
                            return (
                              <option value={FEList.id}>{FEList.name}</option>
                            );
                          })}
                        </Form.Select>
                        {/* <Form.Control.Feedback type="invalid">
                          {assignErrors.assignedTo}
                        </Form.Control.Feedback> */}
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={()=>{props.onSave(assignFEData)}}>
                Save Assign
          </Button>
          <Button variant="danger" onClick={props.close}>
                Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      )
}
export default EmployeeToFEAssign;