import { Fragment, useState } from "react";
import { Button } from "react-bootstrap";
import {FaPlus} from "react-icons/fa";
import MyModal from "../../../UI/MyModal";
import Input from "../../../UI/Input";
import TextArea from "../../../UI/TextArea";
const AddOffTypeForm = () =>{
    const [modalShow, setModalShow]= useState(false);
    return(
        <Fragment>
            
            <Button className="btn btn-secondary m-4 " onClick={()=>setModalShow(true)}><FaPlus/></Button>
            <MyModal  
                    show={modalShow}
                    onHide={()=>setModalShow(false)}
                    title="Add Off Type">
            <form className="">
                <div className="mb-3">
                    <Input 
                        label_id = "off_type" 
                        label_content = "Type"
                        input_id = "Off_type_input" 
                        type = "text"
                        />
                    <TextArea title="Description"/>
                    <p className="text-muted text-end px-4 ">Limited Char</p>
                    <div className="text-center p-3">
                        <button className="btn btn-lg btn-secondary m-3">Submit</button>
                        <button className="btn btn-lg btn-secondary m-3">Close</button>
                    </div>
                </div>
            </form>
            </MyModal>
        </Fragment>
    );
};
export default AddOffTypeForm;