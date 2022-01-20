import { Card } from "react-bootstrap";
import Button from "../../../UI/Button";
import MyCard from "../../../UI/MyCard"

const EmployeeList  = () =>{
    return(
        <MyCard>
            <Card.Img variant="top" src="https://www.jquery-az.com/wp-content/uploads/2015/12/2.2-HTML-img-src-relative.jpg" />
            <Card.Title>Mickey Mouse</Card.Title>
            <Card.Text>sssssss</Card.Text>
            <Button to="/" name="GO"></Button>
        </MyCard>
    );
};

export default EmployeeList;