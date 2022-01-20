import { Toast } from "react-bootstrap";
import MyToast from "../../../UI/MyToast";

const OffTypeList = () =>{

    return(
        <>
        <h3 className="text-muted">Off Type</h3>
        <hr></hr>
            <div className="d-flex flex-wrap">
                <MyToast button_name="Vacation" header="Description">
                    <Toast.Body>
                        <div className=" p-3">
                            OffType Description
                        </div>
                        <div className="text-center">
                            <a className="text-muted px-5" href="/">Edit</a>

                            <a className="text-muted px-5" href="/">Delete</a>
                        </div>
                    </Toast.Body>
                </MyToast>
            </div>
        </>
    )
};
export default OffTypeList;