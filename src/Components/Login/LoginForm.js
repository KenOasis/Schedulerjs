
import Input from "../../UI/Input";
const LoginForm = () =>{
    return(
        <div className="container-fluid p-4 ">
            <form className="row g-3 justify-content-center">
                <div className="col-md-8 pb-5 border shadow-lg rounded bg-light">
                    <h1 className="text-center p-3">Login</h1>
                    <Input 
                        label_id = "cemail" 
                        label_content = "Company Email "
                        input_id = "log_email" 
                        placeholder = "Enter your Company's Email"
                        type = "email"
                        />
                    <Input
                        label_id = "cpassword"
                        label_content = "Password"
                        input_id = "log_password"
                        placeholder = "Enter your Password"
                        type = 'password'
                    />
                    <div className="text-center p-3">
                        <button className="btn btn-lg btn-secondary ">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
    
};
export default LoginForm;