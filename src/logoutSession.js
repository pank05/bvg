import { Button, Container, Modal } from "react-bootstrap";

const logoutSessionExpire =()=>{
    return(
        <Container>
        <Modal>
            <Modal.Header>
                Session Expire Warning 
            </Modal.Header>
            <Modal.Body>
                Your Session Is Expire !
            </Modal.Body>
            <Modal.Footer>
                <Button> Okay</Button>
            </Modal.Footer>
        </Modal>
        </Container>
    )
}
export default logoutSessionExpire ;

