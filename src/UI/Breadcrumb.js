const Breadcrumb = (props) =>{
    return(
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {props.children}
            </ol>
        </nav>
    );

};

export default Breadcrumb;