import Input from "../../../UI/Input";
import MyDropDown from "../../../UI/MyDropdown";
const AddEmployeeForm = () =>{
    return(
        <div className="container-fluid p-4 ">
            <form className="row g-3 justify-content-start">
                <div className="col-md-8 pb-5 border shadow-lg rounded bg-light">
                    <h1 className="text-center p-3">Add Employee</h1>
                    <Input 
                        label_id = "employee_name" 
                        label_content = "Name"
                        input_id = "input_employee_name" 
                        placeholder = ""
                        type = "text"
                        />
                    <Input
                        label_id = "phone_label"
                        label_content = "Phone#"
                        input_id = "phone"
                        placeholder = ""
                        type = 'number'
                    />
                    <MyDropDown label="Group" id="group_selector">
                        <select className="form-select" id="group_selector" defaultValue="unknow">
                            <option >Choose...</option>
                            <option value="1">group1</option>
                            <option value="2">group2</option>
                            <option value="3">group3</option>
                        </select>
                    </MyDropDown>
                    <MyDropDown label="Role" id="role_selector">
                        <select className="form-select" id="role_selector" defaultValue="unknow">
                            <option >Choose...</option>
                            <option value="1">role1</option>
                            <option value="2">role2</option>
                            <option value="3">role3</option>
                        </select>
                    </MyDropDown>
                    <div className="d-flex justify-content-center">
                        <div className="form-check form-switch ">
                            <label className="form-check-label" htmlFor="activate">Activacte</label>
                            <input className="form-check-input" type="checkbox" role="switch" id="activate" />
                        </div>
                    </div>
                    <div className="text-center p-3">
                        <button className="btn btn-lg btn-secondary ">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default AddEmployeeForm;