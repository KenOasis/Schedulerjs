import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";


const Dummy_data = {id:"c1" , group_name: "Disney river", description:"aaaaaaaaaaaaaaaaaaaaaa"};

const Profile = () =>{
    return(
        <section>
            <Container>
                <Row>
                    <Col xs={6}>
                        <h3 className="text-muted">{Dummy_data.group_name}</h3>
                    </Col>
                    <Col xs={6}>
                        <Link className="text-muted" to="/">Edit</Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="text-muted">{Dummy_data.description}</p>
                    </Col>
                </Row>
            </Container>
            
        </section>
    );
};

export default Profile;