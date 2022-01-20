import { Card } from "react-bootstrap";
import MyCard from "../../../UI/MyCard";
import Button from "../../../UI/Button";
const Dummy_data=[
    {id:"c1" , group_name: "Disney_river", description:"aaaaaaaaaaaaaaaaaaaaaa"},
    {id:"c2" , group_name: "OK_company", description:"okokokokokokokokokok"}
]
const GroupList = () =>{
    return(
        <div className="d-flex flex-row bd-hightlight mb-3">
            {Dummy_data.map(group => (
                <div className="p-2 bd-hightlight" key={group.id}>
                    <MyCard id={group.id}>
                        <Card.Title>{group.group_name}</Card.Title>
                        <Card.Text>{group.description}</Card.Text>
                        <Button to={"/admin/group/"+group.id}  name="Detail"/>
                    </MyCard>
                </div>
            ))}
        </div>
    );

};
export default GroupList;