import TextArea from "../../../UI/TextArea";
import Input from "../../../UI/Input";

const AddGroupForm = () =>{
    return(
        <div className="container-fluid p-4 ">
            <form className="row g-3 justify-content-start">
                <div className="col-md-8 pb-5 border shadow-lg rounded bg-light">
                    <h2 className="text-center p-3">Group</h2>
                    <Input 
                        label_id = "group_name" 
                        label_content = "Group Name "
                        input_id = "gname" 
                        placeholder = "Enter your Group Name"
                        type = "text"
                        />
                    <TextArea title="Description"/>
                    <p className="text-muted text-end px-4 ">Limited Char</p>
                    <div className="text-center p-3">
                        <button className="btn btn-lg btn-secondary ">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );

};
export default AddGroupForm;