import Input from "../../UI/Input";

/**
 *  * Input elements{
 *  label_id,
 *  input_id,
 *  label_name,
 *  placehodler,
 *  type
 * }
 * 
 */
const RegisterForm =() =>{
    return(
        <div className="container-fluid p-4 ">
            <form className="row g-3 justify-content-center">
                <div className="col-md-8 pb-5 border shadow-lg rounded bg-light">
                    <h1 className="text-center p-3">Register</h1>
                    <Input 
                        label_id = "company_email" 
                        label_content = "Company Email "
                        input_id = "company_email" 
                        placeholder = "Enter your Company's Email"
                        type = "email"
                        />
                    <Input
                        label_id = "company_name"
                        label_content = "Company Name"
                        input_id = "Company Name"
                        placeholder = "Enter your Company's Name"
                        type = 'text'
                    />
                    <Input
                        label_id = "company_address"
                        label_content = "Company Address"
                        input_id = "company_address"
                        placeholder = "Enter your Company's Address"
                        type = 'text'
                    />
                    <Input
                        label_id = "company_password"
                        label_content = "Password"
                        input_id = "password"
                        type = "password"
                    />
                    <Input
                        label_id = "company_cpass"
                        label_content = "Comfirm Password"
                        input_id = "cpass"
                        type = "password"
                    />
                    <div className="text-center p-3">
                        <button className="btn btn-lg btn-secondary ">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );

};

export default RegisterForm;