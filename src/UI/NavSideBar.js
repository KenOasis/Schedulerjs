import {FaList} from "react-icons/fa";
import {Col} from "react-bootstrap";
const NavSideBar = (props) =>{
    return(
        <Col md={2} className="bg-light">
            <div className="d-flex flex-column flex-shrink-0 p-3 text-width bg-light " style={{width:"230px" ,height:"calc(100vh - 120px)"}}>
                <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto ">
                    <FaList/>
                    <span className="fs-4 mx-3">Memu</span>
                </div>
                <hr></hr>
                <ul className="nav nav-pills flex-column mb-auto">
                    {props.children}
                </ul>
            </div>
        </Col>
    );
};
export default NavSideBar;