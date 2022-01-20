/**
 * 
 * @param {*} props 
 * {
 *  label_id,
 *  input_id,
 *  label_name,
 *  placeholder,
 *  type
 * }
 * @returns 
 */

const Input = (props) =>{
    return(
        <div className="input-group mb-3 px-4">
            <span className="input-group-text" id={props.label_id}>{props.label_content}</span>
            <input type={props.type} 
                   className="form-control"
                   value={props.value}
                   placeholder={props.placeholder} 
                   id={props.input_id} 
                   aria-label={props.label_content} 
                   aria-describedby ={props.label_id} ></input>
        </div>

    )
};
export default Input;