import EmployeeFilter from "../../../Components/Admin/Employees/EmployeeFilter";
import EmployeeList from "../../../Components/Admin/Employees/EmployeeList";

const Employee = () =>{
    return(
        <section>
            <EmployeeFilter />
            <EmployeeList />
        </section>
    );
};
export default Employee;