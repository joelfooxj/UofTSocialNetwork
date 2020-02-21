import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import InputField from "./../InputField";

import "./style.css"
import PasswordInputField from "./../PasswordInputField";
import { Link } from "react-router-dom";

//Input form for log in credentials (should be part of a LogInPage)
class LogInForm extends React.Component{

    render(){
        const {username, password, onInputChange, onAttemptSignIn, signInFailed, changeButtonColor,
            onButtonAnimationEnd} = this.props;

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
                    <div className="logInForm_buttonDiv" to={"./../UserProfilePage"}>
                        <Link className="logInForm_link">
                            <Button className="logInForm_buttonDiv_signInButton"
                                onClick={onAttemptSignIn}
                                onAnimationEnd={onButtonAnimationEnd}
                                variant={"outlined"}
                                color={changeButtonColor ? "secondary" : "primary"}
                                disableElevation={false}
                            >
                                Sign In 
                            </Button>
                        </Link>
                        <br></br>
                        <Link className="logInForm_link" to={"./../CreateAccPage"}>
                            <Button className="logInForm_buttonDiv_CreateAccLink"
                                variant={"outlined"}
                                color={"primary"}
                                disableElevation={"false"}
                            >
                                Create Account
                            </Button>
                        </Link>
                    </div>
                    
                    {signInFailed ? <span id="logInForm_incorrectCredPrompt">Incorrect Credentials</span> : null}
                </Grid>
                
                
                
            </div>
           
        )
        
    }
}

export default LogInForm;