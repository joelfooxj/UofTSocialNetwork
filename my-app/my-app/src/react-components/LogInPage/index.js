import React from "react";

import LogInForm from "./../LogInForm"
import LogInPageBanner from "./../LogInPageBanner"

class LogInPage extends React.Component{

    state = {
        usernameInput: "",
        passwordInput: "",
        signInFailed: false
    }

    /*NOTE: THIS FUNCTION WILL QUERY OUR DATABASE RECORDS TO DETERMINE IF THE USER
     HAS AN ACCOUNT WITH OUR SERVICE.
     
     For now it just contains some placeholder code to make sure the app works
     */
    checkCredentials(){
        if(this.state.usernameInput === "user" && this.state.passwordInput === "user"){
            return true
        }

        return false
    }

    onInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onAttemptSignIn = () => {
        if(this.checkCredentials()){
            console.log("Signed In")
            this.props.changeSignInStatus(true)
        }
        else{
            console.log("Sign In Failed")
            this.setState({
                signInFailed: true,
            })
        }
    }

    render(){
        return (
            <div className="LogInPage">
                <LogInPageBanner/>
                <LogInForm
                    username={this.state.usernameInput}
                    password={this.state.passwordInput}
                    onInputChange={this.onInputChange}
                    onAttemptSignIn={this.onAttemptSignIn}
                    signInFailed={this.state.signInFailed}
                />

            </div>
        )
    }
}

export default LogInPage;