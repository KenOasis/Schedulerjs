import { Routes ,Route } from "react-router-dom";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import AdminIndex from "../Pages/AdminPages/AdminIndex";
import GroupIndex from "../Pages/AdminPages/Groups/GroupIndex";
import AddGroup from "../Pages/AdminPages/Groups/AddGroup";
import GroupProfile from "../Pages/AdminPages/Groups/Profile/GroupProfile";
import Role from "../Pages/AdminPages/Groups/Role/Role";
import AddRole from "../Pages/AdminPages/Groups/Role/AddRole";
import OffType from "../Pages/AdminPages/OffType/OffType";
import GroupOutlet from "../Pages/AdminPages/Groups/Profile/GroupOutlet";
import Employee from "../Pages/AdminPages/Employee/Employee";
import AddEmployee from "../Pages/AdminPages/Employee/AddEmployee";
const Router = () =>{
    return(
        <Routes>
            <Route path="/" element ={<Home/>} exact />
            <Route path="/register" element = {<Register/> } exact/>
            <Route path="/login" element={<Login/>} exact/>
            <Route path="/admin" element={<AdminIndex/>} >
                <Route index element={<GroupIndex/>}/>
                <Route path="add-group" element={<AddGroup/>} />
                <Route path="group/:groupId" element={<GroupOutlet/>}>
                    <Route index element={<GroupProfile/>}/>
                    <Route path="role" element={<Role/>} />
                    <Route path="role/add-role" element={<AddRole/>}/>
                </Route>
                <Route path="offtype" element={<OffType/>}/> 
                <Route path="employee" element={<Employee/>}/>
                <Route path="employee/add-employee" element={<AddEmployee/>} />
            </Route>
      </Routes>
    );

};
export default Router;