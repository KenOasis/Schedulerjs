import { Link } from "react-router-dom";

const MainHeader = () =>{
    return(
        <div className="p-3 mb-3 rounded-3 bg-light" >
            <nav className="navbar navbar-expand-lg navbar-light ">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Oscheduler</Link>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item p-3">
                                <a className="nav-link" href="*"> User Login In</a> 
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login" >Company Login In</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Get Start</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default MainHeader;