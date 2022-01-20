import { Container,Row,Col,} from "react-bootstrap";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../../Components/Admin/AdminSidebar";


const AdminIndex  = () =>{
    return(
        <div>
            <Container fluid>
                <Row>
                    <AdminSideBar/>
                    <Col md={10}>
                        <div className="text-left">
                        <h2>Company name</h2>
                        </div>
                        <hr></hr>
                        <Outlet/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
export default AdminIndex;