import {FaPlus,FaMinus} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const Role = () =>{
    const param=useParams();
    console.log(param);
    return(
        <section>
            <h3 className="text-muted">Role</h3>
            <br></br>
            <Link className="btn btn-secondary mx-4" to={"/admin/group/"+param.groupId+"/role/add-role"}><FaPlus/></Link> 
            <Link className="btn btn-secondary mx-4" to="/"><FaMinus/></Link>
        </section>
    );
};
export default Role;