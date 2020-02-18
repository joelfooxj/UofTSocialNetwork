import React from "react";

import LogInForm from "./../LogInForm"

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