import { Link } from "react-router-dom";
const Button =(props) =>{

    return(
        <Link className={"btn btn-secondary "+props.classname }to={props.to} role="button">{props.name}</Link>
    );
};

export default Button;