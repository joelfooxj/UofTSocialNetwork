import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import InputField from "./../InputField";

import "./style.css"
import PasswordInputField from "./../PasswordInputField";

//Input form for log in credentials (should be part of a LogInPage)
class LogInForm extends React.Component{

    render(){
        const {username, password, onInputChange, onAttemptSignIn} = this.props;
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
                    <Button className="logInForm_signInButton"
                        onClick={onAttemptSignIn}
                        variant={"outlined"}
                        disableElevation={false}
                    >
                         Sign In 
                    </Button>

                </Grid>
                
            </div>
           
        )
        
    }
}

export default LogInForm;