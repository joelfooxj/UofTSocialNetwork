import React from "react";

import LogInForm from "./../LogInForm"
import LogInPageBanner from "./../LogInPageBanner"
import "./style.css"
import { withRouter } from 'react-router-dom';

class LogInPage extends React.Component{

    state = {
        usernameInput: "",
        passwordInput: "",
        signInFailed: false,
        singedIn: false,
        changeButtonColor: false,
        accounts: [],
        accountId: -1
    }

    /*NOTE: THIS FUNCTION WILL QUERY OUR DATABASE RECORDS TO DETERMINE IF THE USER
     HAS AN ACCOUNT WITH OUR SERVICE. FOR NOW IT IS USING A HARDCODED ARRAY OF OBJECTS
     THAT REPRESENT ACCOUNTS. THIS FUNCTION WILL ALSO UPDATE VARIOUS INTERNAL ACCOUNT
     ATTRIBUTES REQUIRED FOR THE CORRECT FUNCTIONING OF THE APP. IT MAY OR MAY NOT
     USE HELPERS TO QUERY THE DATABASE.
    */
    checkCredentials = () => {
        let acc = null
        let accs = this.props.accounts
        for(let i = 0; i < accs.length; i++){
            if(accs[i].username === this.state.usernameInput && accs[i].password === this.state.passwordInput){
                acc = accs[i]
            }
        }

        if(acc === null){
            return false
        }  

        this.setState({
            accountId: acc.id
        }, () => {
            this.props.changeSignInStatus(true, acc.id, acc.permission, acc.clubsExecOf)
        })
        
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
                accounts: this.props.accounts
            }, () => {
                const {history} = this.props;
                if(history){
                    history.push('/UserProfilePage', this.state)
                }
            })
            
        }
        else{
            console.log("Sign In Failed")//TODO: REMOVE
            this.setState({
                signInFailed: true,
                changeButtonColor: true
            })
        }
    }

    onButtonAnimationEnd = () => {
        this.setState({
            changeButtonColor: false,
        })
    }

    render(){
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
                    signedIn={this.state.signedIn}
                />

            </div>
        )
    }
}

export default withRouter(LogInPage);