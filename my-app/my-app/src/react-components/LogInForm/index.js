import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import InputField from "./../InputField";

import "./style.css"
import PasswordInputField from "./../PasswordInputField";

class LogInForm extends React.Component{

    render(){
        const {username, password, onInputChange, onAttemptSignIn} = this.props;
        return (
            <div className="LogInForm">
                <h1 className="SignInHeader">
                    Welcome!
                </h1>
                <Grid className="LogInFormGrid" container spacing={2} direction="column">
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
                    
                    <Button className="SignInButton"
                        onClick={onAttemptSignIn}
                    >
                         Sign In 
                    </Button>

                </Grid>
                
            </div>
           
        )
        
    }
}

export default LogInForm;