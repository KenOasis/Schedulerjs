const TextArea = (props) =>{
    return(
        <div className="input-group mb-3 px-4">
            <span className="input-group-text">{props.title}</span>
            <textarea className="form-control" aria-label={props.title} rows="6" ></textarea>
        </div>
    );
};
export default TextArea;