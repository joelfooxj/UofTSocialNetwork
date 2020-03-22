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

    
    
    //set usernameInput and passwordInput when text input is entered
    onInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    //set signed in status based on whether sign in succeeded or not
    onAttemptSignIn = (callLoc) => {
        const request = new Request(, {
            method: "post",
            body: ,
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        });
    
        fetch(request)
            .then(function (res) {
                if (res.status === 200) {
                    
                } else {
                    
                }
            })
            .catch(error => {
                console.log(error);
            });
        
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