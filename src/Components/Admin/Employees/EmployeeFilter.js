import { Link } from "react-router-dom";

const EmployeeFilter = () =>{
    return(
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className=" text-secondary mx-4 nav-link"  to="/admin/employee/add-employee">Add</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="/">Action</a></li>
                                <li><a className="dropdown-item" href="/">Another action</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="/">Something else here</a></li>
                            </ul>
                        </li>
                        <li>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-secondary" type="submit">Search</button>
                            </form>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
};
export default EmployeeFilter;