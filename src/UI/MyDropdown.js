const MyDropDown = (props) =>{
    return(
        <div className="input-group mb-3 px-4">
            <label className="input-group-text" htmlFor={props.id}>{props.label}</label>
            {props.children}
        </div>
    );
};

export default MyDropDown;