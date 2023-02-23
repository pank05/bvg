import { Container, Row, Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStatusList } from "../actions/status";

const AddressFound = (props) => {  
  const statusOption = useSelector((state) => state?.status?.list);
  const dispatch = useDispatch();
  const [verifiedByList, setVerifiedByList] = useState([]);
  const [relationList, setRelationList] = useState([]);
  const [stayVerificationList, setStayVerificationList] = useState([]);
  const [residenceStatusList, setResidencestatusList] = useState([]);
  const [residenceTypeList, setResidenceTypeList] = useState([]);
  const [areaTypeList, setAreaTypeList] = useState([]);
  const [idProofByList, setIdProofByList] = useState([
    {
      value: "1",
      label: "Yes",
      name: "IdProof",
      type: "radio",
    },
    {
      value: "0",
      label: "No",
      name: "IdProof",
      type: "radio",
    },
  ]);

  useEffect(() => {
    setVerifiedByList(
      (statusOption || []).filter(
        (v) => v.type == "verified_by" && v.reference == "address"
      )
    );
    setRelationList(
      (statusOption || []).filter(
        (v) => v.type == "responder_relation" && v.reference == "address"
      )
    );
    setStayVerificationList(
      (statusOption || []).filter(
        (v) => v.type == "verification_status" && v.reference == "address"
      )
    );
    setResidencestatusList(
      (statusOption || []).filter(
        (v) => v.type == "residence_status" && v.reference == "address"
      )
    );
    setResidenceTypeList(
      (statusOption || []).filter(
        (v) => v.type == "type_of_residence" && v.reference == "address"
      )
    );
    setAreaTypeList(
      (statusOption || []).filter(
        (v) => v.type == "type_of_area" && v.reference == "address"
      )
    );
  }, [statusOption]);

  useEffect(() => {
    setIdProofByList(idProofByList || []);
  }, [idProofByList]);

  useEffect(() => {
    dispatch(
      getStatusList({
        type: [
          "verified_by",
          "responder_relation",
          "verification_status",
          "residence_status",
          "type_of_residence",
          "type_of_area",
        ],
        reference: ["address"],
      })
    );
  }, []);

  return (
    <Container style={{ border: "1px solid gray" }}>
      <div className="note_update">
        <h6 className="div_center">
          <br />
          Address found
          <br />
          <br />
        </h6>
      </div>
      <br />
      <Form>
        <Row>
          <Col> VERIFIED BY:</Col>
        </Row>
        <Row>
          <Col>
              {verifiedByList
                .map((v) => {
                  let temp = { ...v };
                  temp.name = "verified_by";
                  temp.type = "radio";
                  return temp;
                })
                .map((radios) => {
                  return (
                  <div>
                    <Form.Check
                      inline
                      checked={props.updateAddressVerification?.verifyBy == radios.id}
                      label={radios.label}
                      key={radios.id}
                      value={radios.id}
                      name={radios.name}
                      type={radios.type}
                      onChange={(v) => {
                        props.setUpdateAddressVerification({
                          ...props.updateAddressVerification,
                          ...{ verifyBy: v.target.value },
                        });
                      }}
                    />
                  </div>
                  );
                })}
              <p style={{ float: "right", color: "#20c997" }}>
                {
                  [...verifiedByList].find((d) => props.updateAddressVerification.verifyBy == d.id)
                    ?.label
                }
              </p>
          </Col>
        </Row>
        <Row>
          <Col>RESPONDER RELATION:</Col>
        </Row>
        <Row>
          <Col>
            <div>
              {relationList
                .map((v) => {
                  let temp = { ...v };
                  temp.name = "responder_relation";
                  temp.type = "radio";
                  return temp;
                })
                .map((radios) => {
                  return (
                    <Form.Check
                      inline
                      checked={props.updateAddressVerification?.relationType == radios.id}
                      label={radios.label}
                      value={radios.id}
                      key={radios.id}
                      name={radios.name}
                      type={radios.type}
                      onChange={(v) => {
                        props.setUpdateAddressVerification({
                          ...props.updateAddressVerification,
                          ...{ relationType: v.target.value },
                        });
                      }}
                    />
                  );
                })}
              <p style={{ float: "right", color: "#20c997" }}>
                
                {
                  [...relationList].find((d) => props.updateAddressVerification.relationType == d.id)
                    ?.label
                }
              </p>
            </div>
          </Col>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  value={props.updateAddressVerification?.relationTypeMeetPerson}
                  placeholder="Name of Person meet"
                  onChange={(v) => {
                    props.setUpdateAddressVerification({
                      ...props.updateAddressVerification,
                      ...{ relationTypeMeetPerson: v.target.value },
                    });
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  value={props.updateAddressVerification?.meetPersonContactNo}
                  placeholder="Contact No"
                  onChange={(v) => {
                    props.setUpdateAddressVerification({
                      ...props.updateAddressVerification,
                      ...{ meetPersonContactNo: v.target.value },
                    });
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              Collected ID proof/Residence proof containing stated address:
            </Col>
          </Row>
          <br />
          <div key={`inline-radio`}>
            {idProofByList.map((radios) => (
              <Form.Check
                inline
                checked={props.updateAddressVerification?.idProof == radios.value}
                label={radios.label}
                value={radios.value}
                type={radios.type}
                name={radios.name}
                onChange={(v) => {
                  props.setUpdateAddressVerification({ ...props.updateAddressVerification, ...{ idProof: v.target.value } });
                }}
              />
            ))}
            <p style={{ float: "right", color: "#20c997" }}>
              {
                [...idProofByList].find((d) => props.updateAddressVerification.idProof == d.value)
                  ?.label
              }
            </p>
          </div>
          <Row>
            <Col>Period of stay of the candidate:</Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                type="date"
                value={props.updateAddressVerification.fromDate}
                disabled={props.updateAddressVerification?.birthCheckForm}
                onChange={(e) => {
                  props.setUpdateAddressVerification({ ...props.updateAddressVerification, ...{ fromDate: e.target.value } });
                }}
              />
            </Col>
            <Col>
              <Form.Check
                inline
                checked={props.updateAddressVerification?.birthCheckForm}
                label={'by_birth'}
                type={'checkbox'}
                name='by_birth'
                onChange={(v) => {
                  props.setUpdateAddressVerification({ ...props.updateAddressVerification, ...{ birthCheckForm: v.target.checked} });
                }}
              />
            </Col>
            <Col>
              <Form.Control
                type="date"
                disabled={props.updateAddressVerification?.tillCheckForm}
                value={props.updateAddressVerification.toDate}
                onChange={(e) => {
                  props.setUpdateAddressVerification({ ...props.updateAddressVerification, ...{ toDate: e.target.value } });
                }}
              />
            </Col>
            <Col>
            <Form.Check
                inline
                checked={props.updateAddressVerification?.tillCheckForm}
                label={'till_date'}
                type={'checkbox'}
                name='till_date'
                onChange={(v) => {
                  props.setUpdateAddressVerification({ ...props.updateAddressVerification, ...{ tillCheckForm: v.target.checked} });
                }}
              />
            </Col>
            <Col>
              <p style={{ float: "right", color: "#20c997" }}>
                From {props.updateAddressVerification.fromDate}
                          &nbsp;    To  &nbsp;
                {props.updateAddressVerification.toDate}
              </p>
            </Col>
          </Row>
          <br />
          <Row>
            <Col> Verification Status:</Col>
          </Row>
          <Col>
            <div key={`inline-radio`}>
              {stayVerificationList
                .map((v) => {
                  let temp = { ...v };
                  temp.name = "verification_status";
                  temp.type = "radio";
                  return temp;
                })
                .map((radios) => {
                  return (
                    <Form.Check
                      inline
                      label={radios.label}
                      checked={props.updateAddressVerification?.stayVerification == radios.id}
                      value={radios.id}
                      name={radios.name}
                      type={radios.type}
                      onChange={(v) => {
                        props.setUpdateAddressVerification({
                          ...props.updateAddressVerification,
                          ...{ stayVerification: v.target.value },
                        });
                      }}
                    />
                  );
                })}
              <p style={{ float: "right", color: "#20c997" }}>
                
                {
                  [...stayVerificationList].find(
                    (d) => props.updateAddressVerification.stayVerification == d.id
                  )?.label
                }
              </p>
            </div>
          </Col>
          <Row>
            <Col>Residence status:</Col>
          </Row>
          <Col>
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
                      checked={props.updateAddressVerification?.residenceStatus == radios.id}
                      value={radios.id}
                      name={radios.name}
                      type={radios.type}
                      onChange={(v) => {
                        props.setUpdateAddressVerification({
                          ...props.updateAddressVerification,
                          ...{ residenceStatus: v.target.value },
                        });
                      }}
                    />
                  );
                })}
              <p style={{ float: "right", color: "#20c997" }}>
                
                {
                  [...residenceStatusList].find(
                    (d) => props.updateAddressVerification.residenceStatus == d.id
                  )?.label
                }
              </p>
            </div>
          </Col>
          <Row>
            <Col>Type of Residence:</Col>
          </Row>
          <div key={`inline-radio`}>
            {residenceTypeList
              .map((v) => {
                let temp = { ...v };
                temp.name = "type_of_residence";
                temp.type = "radio";
                return temp;
              })
              .map((radios) => {
                return (
                  <Form.Check
                    inline
                    checked={props.updateAddressVerification?.residenceType == radios.id}
                    label={radios.label}
                    value={radios.id}
                    name={radios.name}
                    type={radios.type}
                    onChange={(v) => {
                      props.setUpdateAddressVerification({
                        ...props.updateAddressVerification,
                        ...{ residenceType: v.target.value },
                      });
                    }}
                  />
                );
              })}
            <p style={{ float: "right", color: "#20c997" }}>
              
              {
                [...residenceTypeList].find(
                  (d) => props.updateAddressVerification.residenceType == d.id
                )?.label
              }
            </p>
          </div>
          <Row>
            <Col>TYPE OF AREA:</Col>
          </Row>
          <div key={`inline-radio`}>
            {areaTypeList
              .map((v) => {
                let temp = { ...v };
                temp.name = "type_of_area";
                temp.type = "radio";
                return temp;
              })
              .map((radios) => {
                return (
                  <Form.Check
                    inline
                    checked={props.updateAddressVerification?.areaType == radios.id}
                    label={radios.label}
                    value={radios.id}
                    name={radios.name}
                    type={radios.type}
                    onChange={(v) => {
                      props.setUpdateAddressVerification({
                        ...props.updateAddressVerification,
                        ...{ areaType: v.target.value },
                      });
                    }}
                  />
                );
              })}
            <p style={{ float: "right", color: "#20c997" }}>
              
              {
                [...areaTypeList].find((d) => props.updateAddressVerification.areaType == d.id)?.label
              }
            </p>
          </div>
        </Row>
      </Form>
      {props.children}
    </Container>
  );
};
export default AddressFound;
