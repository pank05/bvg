import { Container, Row, Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addressFoundVari } from "../constant/afterVerification";
import { getStatusList } from "../actions/status";

const AddressFound = (props) => {
  const [address, setAddress] = useState(addressFoundVari);
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
  const [formChecked, setFormChecked] = useState(false);
  const [fotmDate, setFormDate] = useState();
  const [toChecked, setToChecked] = useState(false);
  const [toDate, setToDate] = useState();

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
          <br />{" "}
        </h6>
      </div>
      <br />
      <Form>
        <Row>
          <Col> VERIFIED BY:</Col>
        </Row>
        <Row>
          <Col>
            <div key={`inline-radio`}>
              {verifiedByList
                .map((v) => {
                  let temp = { ...v };
                  temp.name = "verified_by";
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
                        setAddress({
                          ...address,
                          ...{ verifyBy: v.target.value },
                        });
                      }}
                    />
                  );
                })}
              <p style={{ float: "right", color: "#20c997" }}>
                {" "}
                {
                  [...verifiedByList].find((d) => address.verifyBy == d.id)
                    ?.label
                }{" "}
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>RESPONDER RELATION:</Col>
        </Row>
        <Row>
          <Col>
            <div key={`inline-radio`}>
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
                      label={radios.label}
                      value={radios.id}
                      name={radios.name}
                      type={radios.type}
                      onChange={(v) => {
                        setAddress({
                          ...address,
                          ...{ relationType: v.target.value },
                        });
                      }}
                    />
                  );
                })}
              <p style={{ float: "right", color: "#20c997" }}>
                {" "}
                {
                  [...relationList].find((d) => address.relationType == d.id)
                    ?.label
                }{" "}
              </p>
            </div>
          </Col>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Name of Person meet"
                  onChange={(v) => {
                    setAddress({
                      ...address,
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
                  placeholder="Contact No"
                  onChange={(v) => {
                    setAddress({
                      ...address,
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
                label={radios.label}
                value={radios.value}
                type={radios.type}
                name={radios.name}
                onChange={(v) => {
                  setAddress({ ...address, ...{ idProof: v.target.value } });
                }}
              />
            ))}
            <p style={{ float: "right", color: "#20c997" }}>
              {" "}
              {
                [...idProofByList].find((d) => address.idProof == d.value)
                  ?.label
              }{" "}
            </p>
          </div>
          <Row>
            <Col>Period of stay of the candidate:</Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                type="date"
                disabled={formChecked}
                onChange={(e) => {
                  setAddress({ ...address, ...{ fromDate: e.target.value } });
                }}
              />
            </Col>
            <Col>
              <Form.Check
                type="checkbox"
                label="By Birth"
                checked={formChecked}
                onChange={() => {
                  if (formChecked) {
                    setFormDate("");
                  }
                  setFormChecked(!formChecked);
                }}
              />
            </Col>
            <Col>
              <Form.Control
                type="date"
                disabled={toChecked}
                onChange={(e) => {
                  setAddress({ ...address, ...{ toDate: e.target.value } });
                }}
              />
            </Col>
            <Col>
              <Form.Check
                type="checkbox"
                label="Till Date"
                name=""
                checked={toChecked}
                onChange={() => {
                  if (toChecked) {
                    setToDate("");
                  }
                  setToChecked(!toChecked);
                }}
              />
            </Col>
            <Col>
              <p style={{ float: "right", color: "#20c997" }}>
                From {address.fromDate} To {address.toDate}
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
                      value={radios.id}
                      name={radios.name}
                      type={radios.type}
                      onChange={(v) => {
                        setAddress({
                          ...address,
                          ...{ stayVerification: v.target.value },
                        });
                      }}
                    />
                  );
                })}
              <p style={{ float: "right", color: "#20c997" }}>
                {" "}
                {
                  [...stayVerificationList].find(
                    (d) => address.stayVerification == d.id
                  )?.label
                }{" "}
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
                      value={radios.id}
                      name={radios.name}
                      type={radios.type}
                      onChange={(v) => {
                        console.log({
                          ...address,
                          ...{ residenceStatus: v.target.value },
                        });
                        setAddress({
                          ...address,
                          ...{ residenceStatus: v.target.value },
                        });
                      }}
                    />
                  );
                })}
              <p style={{ float: "right", color: "#20c997" }}>
                {" "}
                {
                  [...residenceStatusList].find(
                    (d) => address.residenceStatus == d.id
                  )?.label
                }{" "}
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
                    label={radios.label}
                    value={radios.id}
                    name={radios.name}
                    type={radios.type}
                    onChange={(v) => {
                      console.log({
                        ...address,
                        ...{ residenceType: v.target.value },
                      });
                      setAddress({
                        ...address,
                        ...{ residenceType: v.target.value },
                      });
                    }}
                  />
                );
              })}
            <p style={{ float: "right", color: "#20c997" }}>
              {" "}
              {
                [...residenceTypeList].find(
                  (d) => address.residenceType == d.id
                )?.label
              }{" "}
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
                    label={radios.label}
                    value={radios.id}
                    name={radios.name}
                    type={radios.type}
                    onChange={(v) => {
                      setAddress({
                        ...address,
                        ...{ areaType: v.target.value },
                      });
                    }}
                  />
                );
              })}
            <p style={{ float: "right", color: "#20c997" }}>
              {" "}
              {
                [...areaTypeList].find((d) => address.areaType == d.id)?.label
              }{" "}
            </p>
          </div>
        </Row>
      </Form>
      {props.children}
    </Container>
  );
};
export default AddressFound;
