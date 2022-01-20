import { Outlet, useParams } from "react-router-dom";
import InnerNav from "../../../../Components/Admin/Groups/InnerNav";

const GroupOutlet = () =>{
    const param =useParams();
    console.log(param)
    return(
        <section>
            <InnerNav groupId={param.groupId}/>
            <Outlet/>
        </section>
    )
};
export default GroupOutlet;