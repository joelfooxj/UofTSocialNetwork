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
        accountId: -1,
        banned: false,
        isAdmin: false
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
            this.setState({
                banned: false
            })
            return false
        }  

        this.setState({
            accountId: acc.id,
            banned: acc.banned,
            isAdmin: acc.permission === 1
        }, () => {
            this.props.changeSignInStatus(true, acc.id, acc.permission, acc.clubsExecOf, acc.permission === 1)

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
    onAttemptSignIn = (callLoc) => {
        if(this.checkCredentials()){
            this.setState({
                signInFailed: false,
                accounts: this.props.accounts,
            }, () => {
                const {history} = this.props;
                if(history && !this.state.banned){
                    this.state.isAdmin ? history.push('/AdminDashboard') :  
                    history.push('/FeedPage', this.state)
                } 
            })
            
            
        }
        else{
            if(callLoc == 1){
                this.setState({
                    signInFailed: true,
                    changeButtonColor: true
                })
            }
            else{
                this.setState({
                    signInFailed: true,
                    changeButtonColor: true
                })
                setTimeout(()=>{this.setState({changeButtonColor: false})}, 500)
            }
        }
    }

    onButtonAnimationEnd = () => {
        this.setState({
            changeButtonColor: false,
        })
    }
    componentDidMount = () => {
        window.addEventListener('keydown', (e) => {if(e.key === "Enter"){this.onAttemptSignIn(0)}})
    }
    render(){
        return (
            <div className="LogInPage">
                <LogInPageBanner id="logInPage_banner"/>
                <LogInForm id="logInPage_logInForm"
                    username={this.state.usernameInput}
                    password={this.state.passwordInput}
                    onInputChange={this.onInputChange}
                    onAttemptSignIn={() => {this.onAttemptSignIn(1)}}
                    signInFailed={this.state.signInFailed}
                    changeButtonColor={this.state.changeButtonColor}
                    onButtonAnimationEnd={this.onButtonAnimationEnd}
                    signedIn={this.state.signedIn}
                    banned={this.state.banned}
                />

            </div>
        )
    }
}

export default withRouter(LogInPage);