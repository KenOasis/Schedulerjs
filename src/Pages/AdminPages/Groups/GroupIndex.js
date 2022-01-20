import { Link } from "react-router-dom";
import {AiOutlineUsergroupAdd} from "react-icons/ai"
import GroupList from "../../../Components/Admin/Groups/GroupList";

const GroupIndex = () =>{
    return(
        <section>
            <Link className="btn btn-lg btn-secondary" to='/admin/add-group' role="button">
                <AiOutlineUsergroupAdd/>
            </Link>
            <GroupList />
        </section>
    );
};

export default GroupIndex;