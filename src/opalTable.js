import { useEffect, useState } from "react";
import {BiEdit} from "react-icons/bi";
import {HiRefresh} from 'react-icons/hi';
import {BsFillCheckCircleFill} from 'react-icons/bs';
import {AiOutlineBarChart} from "react-icons/ai" ;
import { Form, ListGroup,Container,Button,Popover ,OverlayTrigger,ButtonGroup,ButtonToolbar} from 'react-bootstrap';
import DataTable from "react-data-table-component";
import { useCallback } from "react";

const OpalTable = (props)=>{

    const [show,setShow] = useState(true);
    const [tableHeader,setTableHeader]=useState([]);
    const [tableData,setTableData] = useState([]);
    const [searchedVal,setSearchedVal] = useState("");
    const [selectedRows,setSelectedRows] = useState([]);
    
    useEffect(()=>{
        if(props.checkBoxColoum){
            props.checkBoxColoum(selectedRows);
        } 
       },[selectedRows]);

        useEffect(()=>{
        setTableHeader(props.headers)
        setTableData(props.rowData);
        },[]);

        useEffect(()=>{
            setTableData(props.rowData)
        },[props.rowData])

       const onClickCheckBox = (item) =>{
        let data = [...tableHeader];
        let selectedItem = data.find(v=>item.id ===v.id );
        if(selectedItem){
            selectedItem.isShow = !selectedItem.isShow;
        }
        setTableHeader(data)
       }
       const applyFilterfn = () =>{
        return (tableData || [])
        .filter((row) =>        
        !searchedVal.length || ( row.checkId || row.name)
          .toString()
          .toLowerCase()
          .includes(searchedVal.toString().toLowerCase()) 
            );
        }

     const handleRowSelected = useCallback(state => {
		setSelectedRows(state.selectedRows);
	 }, []);

    return(
          <Container>
            <Form.Control type="search" onChange={(e) => setSearchedVal(e.target.value)}  placeholder="Search By Candidate Name" /><br/>
            <OverlayTrigger
                trigger="click"
                placement="bottom" 
                rootClose
                onHide={() => setShow(!show)}
                overlay={
                <Popover>
                <Popover.Body>
                {(tableHeader).filter(v=>!v.actionRow).map((v)=>{
            return <ListGroup.Item key={v.id}>
            <Form.Check type="checkbox"  label={v.label} checked={v.isShow} onChange={()=>onClickCheckBox(v)} />
                </ListGroup.Item>
            })}
                </Popover.Body>
                </Popover>
                }>
               <Button variant="secondary">Columns </Button>
               </OverlayTrigger><br/>

               <DataTable
                     columns={[...tableHeader.filter(v=>v.isShow),...tableHeader.filter(v=>v.actionRow)].map((item)=>{
                        let tmp  = {
                            name:item.label,
                            selector: row => row[`${item.columnId}`],
                          }
                        if(item.actionRow){
                            tmp.button = true;
                            tmp.cell = (row) => <Button className="btn btn-info" > {item.label}</Button>;
                            switch (item.type) {
                                case 'edit':
                                    tmp.cell= (row) => <Button className="btn btn-info"  onClick={()=>props.edit(row)}  > <BiEdit style={{color:"white"}} /></Button>;
                                    break;
                                case 'action':
                                    tmp.cell= (row) =>  <ButtonToolbar >
                                        <ButtonGroup className="me-2" >
                                            <Button  className="btn btn-info" disabled={!(row.is_active)} onClick={()=>props.edit(row)}><BiEdit style={{color:"white"}}  /></Button> 
                                        </ButtonGroup>
                                        <ButtonGroup className="me-2" style={{alignItems:"center"}} >
                                           <Form.Check type="switch" checked={row.is_active} id="custom-switch" onChange={(event)=>props.toggle(event,row)}  />
                                        </ButtonGroup>
                                    </ButtonToolbar>;
                                     break;
                                case 'viewButton':
                                    tmp.cell= (row) => <Button className="btn btn-secondary" onClick={()=>props.viewButton(row)}> <BsFillCheckCircleFill style={{color:"white"}}/></Button>;
                                    break;
                                case 'status':
                                    tmp.cell= (row) => <Button className="btn btn-success" > <BsFillCheckCircleFill/></Button>;
                                    break;
                                case 'view':
                                    tmp.cell= (row) => <Button className="btn btn-secondary" > <HiRefresh style={{color:"white"}} /></Button>;
                                    break;
                                case 'statistics':
                                    tmp.cell= (row) => <Button className="btn btn-success" onClick={()=>props.statictics(row)}><AiOutlineBarChart style={{color:"white"}}/></Button>;
                                        break;
                                default:
                                    break;
                              }
                          }
                        return  tmp;
                     })}
                     data={applyFilterfn() || []}
                     selectableRows={props.checkBoxColoum}
                     onSelectedRowsChange={handleRowSelected}
                     pagination
                    />
               </Container>
  );
}
export default OpalTable;