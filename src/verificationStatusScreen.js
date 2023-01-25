import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container';
const VerificationStatus=()=>{
    return(
        <Container  >
            <div>
                <h1 className="div_left">Workload Status</h1>
                <hr/>
            </div>
            <div className="grid-container"   > 
    <div> 
   
    <Table striped>
      <thead className="table_head">
        <tr> <th  >Priority Workload </th> </tr> </thead>
<tbody>
        <tr className="table_body1"> <td><a className="tr_href1" href="/#">Special Priority  <strong> 0</strong> </a></td> </tr>
        <tr className="table_body2"> <td><a className="tr_href2" href="/#">Today's to TAT </a></td> </tr>
        <tr className="table_body3"> <td><a className="tr_href3" href="/#">1 Day to TAT   <strong> 0</strong> </a></td> </tr>
        <tr className="table_body4"> <td><a className="tr_href4" href="/#">2 Day to TAT  <strong> 0</strong> </a></td> </tr>
        <tr className="table_body1"> <td><a className="tr_href1" href="/#">3 Day to TAT <strong> 0</strong> </a></td> </tr>
        <tr className="table_body2"> <td><a className="tr_href2" href="/#">Out of TAT </a></td> </tr>
      </tbody>  </Table>
    </div>
    <div > 
    <Table striped>
      <thead className="table_head">
        <tr> <th  >Current Workload </th> </tr> </thead>
      <tbody>
        <tr className="table_body2"> <td><a className="tr_href2" href="/#">Completed unrevieved <strong> 3</strong> </a></td> </tr>
      </tbody>
    </Table>
    </div>
    <div > 
    <Table striped>
      <thead className="table_head">
        <tr> <th  >Workload Status </th> </tr> </thead>
      <tbody>
        <tr className="table_body1"> <td><a className="tr_href1" href="/#">Work Recieved this month  <strong> 0</strong> </a></td> </tr>
        
        <tr className="table_body3"> <td><a className="tr_href3" href="/#">Completed this month in TAT  <strong> 0</strong> </a></td> </tr>
        <tr className="table_body4"> <td><a className="tr_href4" href="/#">Completed this month Out of TAT  <strong> 0</strong> </a></td> </tr>
        <tr className="table_body1"> <td><a className="tr_href1" href="/#">Completed this month in TAT% <strong> 0.00%</strong> </a></td> </tr>
        <tr className="table_body4" style={{background:"red"}}> <td><a className="tr_href4" href="/#">Completed this month Out of TAT% <strong>0.00%</strong> </a></td> </tr>
        <tr className="table_body2"> <td><a className="tr_href2" href="/#">Completed this month%<strong> 0.00%</strong> </a></td> </tr>
        <tr className="table_body2"> <td><a className="tr_href2" href="/#">Completed Last month% <strong>0.00%</strong> </a></td> </tr>
        <tr className="table_body2"> <td><a className="tr_href2" href="/#">work Completed this month  <strong> 0</strong> </a></td> </tr>
        <tr className="table_body3"> <td><a className="tr_href3" href="/#">work Completed Last month  <strong> 0</strong> </a></td> </tr>
      </tbody>
    </Table>
    </div>
            </div>
            
            </Container  >
    )
} 
export default VerificationStatus; 