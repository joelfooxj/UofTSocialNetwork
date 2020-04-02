import React from "react";
import LogInForm from "./../LogInForm"
import LogInPageBanner from "./../LogInPageBanner"
import "./style.css"
import { withRouter } from 'react-router-dom';
import video from './welcome.mp4'

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




    onButtonAnimationEnd = () => {
        this.setState({
            changeButtonColor: false,
        })
    }
    
    render(){
        return (
            <div>
                <video autoPlay muted loop id="logInVideo">
                 <source src={video} type="video/mp4"/>
                </video>
                <LogInForm id="logInPage_logInForm"
                    username={this.state.usernameInput}
                    password={this.state.passwordInput}
                    onInputChange={this.onInputChange}
                    onAttemptSignIn={() => {this.onAttemptSignIn(1)}}
                    signInFailed={this.state.signInFailed}
                    changeButtonColor={this.state.changeButtonColor}
                    onButtonAnimationEnd={this.onButtonAnimationEnd}
                    banned={this.state.banned}
                    logInContext={this}
                />
            </div>

        )
    }
}

export default withRouter(LogInPage);