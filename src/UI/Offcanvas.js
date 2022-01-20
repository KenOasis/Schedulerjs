import { Button ,Offcanvas } from "react-bootstrap";
import { useState } from "react";
import {BsArrowBarRight} from "react-icons/bs";
 
/**
 * 
 * @param {*} props
 * {
 * button_name,
 * title
 * }
 * 
 */
const OffcanvasButton = (props) =>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <div className="p-3 position-fixed ">
            <Button className="me-2 border" variant="light" onClick={handleShow} >
                {props.button_name}<BsArrowBarRight/>
            </Button>
            <Offcanvas show={show} onHide={handleClose} placement="start" name="start">
                <Offcanvas.Header closeButton >
                    <Offcanvas.Title>{props.title}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="px-0">
                    {props.children}
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );


};
export default OffcanvasButton;