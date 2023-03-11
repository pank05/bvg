import { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import AssignModal from "./modalAssign";
import { FiRefreshCw } from "react-icons/fi";
import { IoMdPersonAdd } from "react-icons/io";
import { assignTATDataColoum } from "../mock/assignTATData";
import { useDispatch, useSelector } from "react-redux";
import OpalTable from "../opalTable";
import { getAllCaseAPI, updateCaseById } from "../actions/verification";

const AssignTAT = () => {
  const assigns = useSelector((state) => state?.verification?.list || []);
  const userProfile = useSelector((state) => state?.user?.userProfile);
  const [assignTAT, setAssignTAT] = useState([]);
  const [tatData, setTatData] = useState([]);
  const [withdrawTAT, setWithdrawTAT] = useState([]);
  const [item, setItem] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [buttonType, setButtonType] = useState("assign");
  const [modalType, setModalType] =  useState("assign");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAllCaseAPI({
        id: "all",
        status: [
          "under_admin",
          "under_employee",
          "rejected_by_admin",
          "rejected_by_employee",
        ],
      })
    );
  }, []);

  useEffect(() => {
    if (buttonType === "withdraw") {
      setTatData(
        assigns.filter(
          (val) =>
            val.status == "under_admin" || val.status == "rejected_by_employee"
        )
      );
    }
    if (buttonType === "assign") {
      setTatData(
        assigns.filter(
          (val) =>
            val.status == "under_employee" || val.status == "rejected_by_admin"
        )
      );
    }
  }, [assigns]);

  const handleViewAssign = () => {
    setButtonType("assign");
    const unassignedData = assigns.filter((val) => {
      return (
      val.status == "under_employee" || val.status == "rejected_by_admin"
      );
    });
    setTatData(unassignedData);
  };

  const handleViewNotAssign = () => {
    setButtonType("withdraw");
    const assignedData = assigns.filter((val) => {
      return (
        val.status == "under_admin" || val.status == "rejected_by_employee"
      );
    });
    setTatData(assignedData);
  };

  const handleAssign = () => {
    setShow(true);
  };

  const handleWithdraw = () => {
    setShow(true);
  };

  const handleAssignSave = (data) => {
    let updateRecords = [...assignTAT].map((record) => {
      let temp = { ...record };
      temp.duration_end = data.durationEnd;
      temp.status = "under_employee";
      temp.caseHistory = {
        assigned_by: userProfile.id,
        assigned_to: parseInt(data.assignedTo),
        remark: "assign to admin to employee",
      };
      return temp;
    });
    updateRecords.forEach((record) => {
      dispatch(updateCaseById(record)).then(() => {
        dispatch(
          getAllCaseAPI({
            id: "all",
            status: [
              "under_admin",
              "under_employee",
              "rejected_by_admin",
              "rejected_by_employee",
            ],
          })
        );
      });
    });
    setShow(false);
  };

  const handleWithdrawCase = (data) => {
    let withdrawRecord = [...withdrawTAT].map((record) => {
      let temp = { ...record };
      temp.status = "withdraw";
      temp.caseHistory = {
        assigned_by: userProfile.id,
        assigned_to: userProfile.id,
        remark: data.remark,
      };
      return temp;
    });
    withdrawRecord.forEach((record) => {
      dispatch(updateCaseById(record)).then(() => {
        dispatch(
          getAllCaseAPI({
            id: "all",
            status: [ "under_admin",
            "under_employee",
            "rejected_by_admin",
            "rejected_by_employee"],
          })
        );
      });
    });
    setShow(false);
  };

  const onClickCheck = (item) => {
    setItem(item)   ;
    setAssignTAT(
      item.filter(
        (val) =>
          val.status == "under_admin" || val.status == "rejected_by_employee"
      )
    );
    setWithdrawTAT(
      item.filter(
        (val) =>
          val.status == "under_employee" || val.status == "rejected_by_admin"
      )
    );
  };


  return (
    <Container>
      <div>
        <h2> Assign Verification List {buttonType}</h2>
        <div>
          <Button
            variant="primary"
            className="Button_assing"
            onClick={buttonType === "assign" ? handleViewNotAssign  : handleViewAssign  }
          >
            {buttonType === "assign" ? "View Not Assigned"  : "View  Assigned" }
          </Button>

          {buttonType === "assign" ? (
            <Button
              variant="info"
              className="Button_assing"
              disabled={!(withdrawTAT.length > 0)}
              onClick={() => {
                setModalType('NotAssign');
                handleWithdraw(item)
              }}
            >
              <FiRefreshCw /> Withdraw
            </Button> )
        : ( <Button
              variant="info"
              className="Button_assing"
              disabled={!(assignTAT.length > 0)}
              onClick={() => {
                setModalType('assign');
                handleAssign(item);
              }}
            >
              <IoMdPersonAdd /> Assign
            </Button> )}
          <br />
        </div>
        <br />
      </div>
      <br />
      <div className="icon-aline">
        <OpalTable
          headers={assignTATDataColoum}
          rowData={tatData || []}
          showCheckbox={true}
          checkBoxColoum={(item) => onClickCheck(item)}
        />
      </div>
      <AssignModal
        show={show}
        close={handleClose}
        assignData={item}
        type={modalType}
        onSave={handleAssignSave}
        onDelete={handleWithdrawCase}  />
    </Container>
  );
};
export default AssignTAT;