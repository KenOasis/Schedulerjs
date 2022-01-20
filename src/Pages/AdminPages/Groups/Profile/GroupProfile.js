import {useParams } from "react-router-dom";
import Profile from "../../../../Components/Admin/Groups/Profile";

const GroupProfile = ()=>{
    const param =useParams();
    console.log(param)
    return(
        <section>
            <Profile />
        </section>
    );
};
export default GroupProfile;