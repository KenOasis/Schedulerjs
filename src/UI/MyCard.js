import {Card } from "react-bootstrap";

const MyCard = (props) =>{
    return(
        <Card style={{width:'18rem'}} id={props.id}>
            <Card.Body>
                {props.children}
            </Card.Body>
        </Card>
    );

};
export default MyCard;