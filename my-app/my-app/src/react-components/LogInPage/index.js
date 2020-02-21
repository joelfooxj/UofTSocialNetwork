import React from "react";

import LogInForm from "./../LogInForm"
import LogInPageBanner from "./../LogInPageBanner"
import "./style.css"
import { Redirect } from 'react-router'

class LogInPage extends React.Component{

    state = {
        usernameInput: "",
        passwordInput: "",
        signInFailed: false,
        goToProfile: false,
        changeButtonColor: false
    }


    //TODO: THESE ARE TEMPORARY HARDCODED VALUES
    Account = function(username, permission, clubsExecOf, accID, password){
        this.username = username
        this.permission = permission
        this.clubsExecOf = clubsExecOf
        this.id = accID
        this.password = password
    }
    accs = [
        new this.Account("user", 0, ["UofT PTSD Support Group"], 1, "user"),
        new this.Account("mike1995", 0, ["UofT Students Anonymous"], 2, "password"),
        new this.Account("admin", 1, [], 3, "admin")
    ]

    /*NOTE: THIS FUNCTION WILL QUERY OUR DATABASE RECORDS TO DETERMINE IF THE USER
     HAS AN ACCOUNT WITH OUR SERVICE. FOR NOW IT IS USING A HARDCODED ARRAY OF OBJECTS
     THAT REPRESENT ACCOUNTS. THIS FUNCTION WILL ALSO UPDATE VARIOUS INTERNAL ACCOUNT
     ATTRIBUTES REQUIRED FOR THE CORRECT FUNCTIONING OF THE APP. IT MAY OR MAY NOT
     USE HELPERS TO QUERY THE DATABASE.
    */
    checkCredentials(){
        let acc = null
        for(let i = 0; i < this.accs.length; i++){
            if(this.accs[i].username === this.state.usernameInput && this.accs[i].password === this.state.passwordInput){
                acc = this.accs[i]
            }
        }

        if(acc === null){
            return false
        }

        this.props.changeSignInStatus(true, acc.id, acc.permission, acc.clubsExecOf)
        return true
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
            this.setState({
                signInFailed: false,
                goToProfile: true
            })
        }
        else{
            console.log("Sign In Failed")//TODO: REMOVE
            this.setState({
                signInFailed: true,
                goToProfile: false,
                changeButtonColor: true
            })
        }
    }

    onButtonAnimationEnd = () => {
        this.setState({
            changeButtonColor: false
        })
    }

    render(){
        if(this.state.goToProfile){
            return <Redirect to="/UserProfilePage"/>
        }

        return (
            <div className="LogInPage">
                <LogInPageBanner id="logInPage_banner"/>
                <LogInForm id="logInPage_logInForm"
                    username={this.state.usernameInput}
                    password={this.state.passwordInput}
                    onInputChange={this.onInputChange}
                    onAttemptSignIn={this.onAttemptSignIn}
                    signInFailed={this.state.signInFailed}
                    changeButtonColor={this.state.changeButtonColor}
                    onButtonAnimationEnd={this.onButtonAnimationEnd}
                />

            </div>
        )
    }
}

export default LogInPage;