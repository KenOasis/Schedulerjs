import { Link } from "react-router-dom";
import {FaUserFriends,FaUserAlt} from"react-icons/fa";
import {AiOutlineCoffee} from "react-icons/ai"
import NavSideBar from "../../UI/NavSideBar";
/**
 *
 * {
 * button_name,
 * id,
 * off_label_id,
 * off_label_conent,
 * }
 */
const AdminSideBar = () =>{
    return(
        <NavSideBar>
            <li className="nav-item">
                <Link to="/admin" className="nav-link text-truncate text-secondary h5 "><FaUserAlt/>&nbsp;Groups</Link>
            </li>
            <li className="nav-item">
                <Link to="/admin/employee" className="nav-link text-truncate text-secondary h5 "><FaUserFriends/>&nbsp;Employees</Link>
            </li>
            <li className="nav-item">
                <Link to="/admin/offtype" className="nav-link text-truncate text-secondary h5 "><AiOutlineCoffee/>&nbsp;Off Type</Link>
            </li>
        </NavSideBar>
    )

};

export default AdminSideBar;