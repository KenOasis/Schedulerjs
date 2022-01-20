import { Fragment } from "react";
import Footer from "../Components/Main/Footer";
import MainHeader from "../Components/Main/MainHeader";

const Layout = (props) =>{
    return(
        <Fragment>
            <main className="d-flex flex-column min-vh-100">
                <MainHeader/>
                {props.children}
                <Footer/>
            </main>
        </Fragment>
    );
    
};
export default Layout;