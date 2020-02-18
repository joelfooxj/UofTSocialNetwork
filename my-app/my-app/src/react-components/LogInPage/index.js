import React from "react";

import LogInForm from "./../LogInForm"
import LogInPageBanner from "./../LogInPageBanner"

class LogInPage extends React.Component{

    state = {
        usernameInput: "",
        passwordInput: ""
    }

    onInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return (
            <div className="LogInPage">
                <LogInPageBanner/>
                <LogInForm
                    username={this.state.usernameInput}
                    password={this.state.passwordInput}
                    onInputChange={this.onInputChange}
                />

            </div>
        )
    }
}

export default LogInPage;