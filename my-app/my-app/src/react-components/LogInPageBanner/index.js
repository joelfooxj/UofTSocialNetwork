import React from "react";
import "./style.css"

class LogInPageBanner extends React.Component{
    render(){
        return (
            <img className="LogInPageBanner" src={require("./static/websitebanner.png")} alt="Failed To Load"/>
        )
    }
}

export default LogInPageBanner

