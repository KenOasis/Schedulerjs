import { Link } from "react-router-dom";
import Breadcrumb from "../../../UI/Breadcrumb";

const InnerNav = (props) =>{
    return(
        <div className="">
            <Breadcrumb>
                <li className="breadcrumb-item">
                    <Link to={"/admin/group/"+props.groupId} className="text-secondary">Company name</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={"/admin/group/"+props.groupId+"/role"} className="text-secondary">Role</Link>
                </li>
            </Breadcrumb>
        </div>
    );
};
export default InnerNav;