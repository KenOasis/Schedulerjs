import { Modal } from "react-bootstrap";

const MyModal = (props) =>{
    return(
        <Modal {...props} 
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                center>
            <Modal.Header closeButton>
                <Modal.Title>
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
        </Modal>
    );

};

export default MyModal;