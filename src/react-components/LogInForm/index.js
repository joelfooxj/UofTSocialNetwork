import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import InputField from "./../InputField";

import "./style.css"
import PasswordInputField from "./../PasswordInputField";
import { Link } from "react-router-dom";

import {attemptSignIn} from '../../actions/accountActions';


//Input form for log in credentials (should be part of a LogInPage)
class LogInForm extends React.Component{

    componentDidMount = () => {
        window.addEventListener('keydown', (e) => {if(e.key === "Enter"){attemptSignIn(this.props.logInContext, 0)}})
    }

    render(){
        const {username, password, onInputChange, signInFailed, changeButtonColor,
            onButtonAnimationEnd, banned} = this.props;

        return (
            
            <div className="logInForm">
                <h1 className="logInForm_signInHeader">
                    Welcome!
                </h1>
                <Grid className="logInForm_logInFormGrid" container spacing={2} direction="column">
                    <InputField
                        name="usernameInput"
                        label="Username"
                        value={username}
                        onInputChange={onInputChange}
                        type="text"
                    />
                    <PasswordInputField
                        name="passwordInput"
                        label="Password"
                        value={password}
                        onInputChange={onInputChange}
                    />
                    <div className="logInForm_buttonDiv">
                        <Button className="logInForm_buttonDiv_signInButton"
                            onClick={() => {attemptSignIn(this.props.logInContext, 1)}}
                            onAnimationEnd={onButtonAnimationEnd}
                            variant={"outlined"}
                            color={changeButtonColor ? "secondary" : "primary"}
                            disableElevation={false}
                        >
                            Sign In 
                        </Button>
                        <br></br>
                        <Link className="logInForm_link" to={"./../CreateAccPage"}>
                            <Button className="logInForm_buttonDiv_CreateAccLink"
                                variant={"outlined"}
                                color={"primary"}
                                disableElevation={false}
                            >
                                Create Account
                            </Button>
                        </Link>
                    </div>
                    
                    {signInFailed && !banned ? <span id="logInForm_incorrectCredPrompt">Incorrect Credentials</span> : null}
                    {banned ? <span id="logInForm_bannedPrompt">Account Banned</span> : null}
                </Grid>
                
                
                
            </div>
           
        )
        
    }
}

export default LogInForm;