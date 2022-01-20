
import { Link } from "react-router-dom";
const Home = () =>{
    return(
        <div className="p-5 mb-4 rounded-3">
            <div className="container-fluid py-5 border bg-light">
                <div className="jumbotron text-center py-5 ">
                    <h1 className="display-4 "> Welcome To OScheduler</h1>
                    <p className="lead">ba la ba la .....</p>
                    <hr></hr>
                    <p>balabala....</p>
                    <Link className="btn btn-lg btn-secondary" to='/register' role="button">Get Start</Link>
                </div>
            </div>
        </div>
    )
};

export default Home;