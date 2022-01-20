import { useState } from "react";
import { Toast, Button} from "react-bootstrap";
/**
 * 
 * @param {*} props 
 * props.button_name
 * props.header
 * props.children
 * @returns 
 */

const MyToast = (props) =>{
    const [showToast, setShowToast] = useState(false);
    const toggleShow = () => setShowToast(!showToast);

    return(
        <div>
            <Button onClick={toggleShow} className="mb-2 btn-secondary">
                {props.button_name}
            </Button>
            <Toast show={showToast} onClick={toggleShow} animation={false}>
                <Toast.Header>
                    <strong className="me-auto">
                        {props.header}
                    </strong>
                </Toast.Header>
                <Toast.Body>
                    {props.children}
                </Toast.Body>
            </Toast>
        </div>
    );

}
export default MyToast;