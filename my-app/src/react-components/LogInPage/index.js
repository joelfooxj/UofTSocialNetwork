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
        const request = new Request('/log_in', {
            method: "post",
            body: JSON.stringify({username: this.state.usernameInput, password: this.state.passwordInput}),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        });
    
        fetch(request)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        signInFailed: false,
                    }, () => {
                        res.json()
                            .then((result) => {
                                const {history} = this.props;

                                this.props.changeSignInStatus(result, true)

                                if(history && result !== null){
                                    if(result.status === 0){ //banned
                                        this.setState({
                                            banned: true
                                        })
                                    }
                                    else{
                                        result.permissions === 1 ? history.push('/AdminDashboard') :  
                                        history.push('/FeedPage', this.state)
                                    }
                                }
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    })
                } 
                else {
                    if(callLoc == 1){
                        this.setState({
                            signInFailed: true,
                            changeButtonColor: true,
                            banned: false
                        })
                    }
                    else{
                        this.setState({
                            signInFailed: true,
                            changeButtonColor: true,
                            banned: false
                        })
                        setTimeout(()=>{this.setState({changeButtonColor: false})}, 500)
                    }
                    console.log("ERROR: Could not log in, status: " + res.status)
                }
            })
            .catch(error => {
                console.log(error);
            });
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
                    banned={this.state.banned}
                />

            </div>
        )
    }
}

export default withRouter(LogInPage);