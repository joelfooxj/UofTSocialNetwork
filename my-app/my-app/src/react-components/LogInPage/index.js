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

    //set usernameInput and passwordInput when text input is entered
    onInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    //set signed in status based on whether sign in succeeded or not
    onAttemptSignIn = () => {
        if(this.checkCredentials()){
            console.log("Signed In") //TODO: REMOVE
            this.props.changeSignInStatus(true)
            this.setState({
                signInFailed: false,
            })
        }
        else{
            console.log("Sign In Failed")//TODO: REMOVE
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