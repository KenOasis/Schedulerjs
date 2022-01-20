import Input from "../../../../UI/Input";
import TextArea from "../../../../UI/TextArea";

const AddRoleForm = () => {
    return(
        <div className="container-fluid p-4 ">
            <form className="row g-3 justify-content-start">
                <div className="col-md-8 pb-5 border shadow-lg rounded bg-light">
                    <h3 className="text-center p-3">Role</h3>
                    <Input 
                        label_id = "role_title" 
                        label_content = "Title"
                        input_id = "input_title" 
                        placeholder = ""
                        type = "text"
                        />
                    <Input
                        label_id = "abbreviation"
                        label_content = "Abbreviation"
                        input_id = "ab"
                        placeholder = " "
                        type = 'text'
                    />
                    <Input
                        label_id = "company_address"
                        label_content = "Company Address"
                        input_id = "company_address"
                        placeholder = "Enter your Company's Address"
                        type = 'text'
                    />
                    <div className="input-group mb-3 px-4">
                        <label className="input-group-text" for="prioritySelector">Priority</label>
                        <select className="form-select " id="prioritySelector">
                            <option selected>Open select menu</option>
                            <option value="1"> 1 </option>
                            <option value="2"> 2 </option>
                            <option value="3"> 3 </option>
                            <option value="4"> 4 </option>
                            <option value="5"> 5 </option>
                        </select>
                    </div>
                    <TextArea title="Description"/>
                    <div className="text-center p-3 ">
                        <button className="btn btn-lg btn-secondary m-3">Submit</button>
                        <button className="btn btn-lg btn-secondary m-3">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default AddRoleForm;