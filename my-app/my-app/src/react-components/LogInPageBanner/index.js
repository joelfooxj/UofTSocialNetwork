import React from "react";
import "./style.css"

//container for the banner image that appears on LogInPage
//TODO: This could probably be refactored to be used as a general purpose image container
class LogInPageBanner extends React.Component{
    render(){
        return (
            <img className="logInPageBanner" src={require("./static/websitebanner.png")} alt="Failed To Load"/>
        )
    }
}

export default LogInPageBanner

