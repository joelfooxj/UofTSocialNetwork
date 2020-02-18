import React from "react";
import Grid from "@material-ui/core/Grid";

import InputField from "./../InputField";

import "./style.css"
import PasswordInputField from "./../PasswordInputField";

class LogInForm extends React.Component{

    render(){
        const {username, password, onInputChange} = this.props;
       
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
                        onChange={onInputChange}
                        type="text"
                    />
                    <PasswordInputField
                        name="passwordInput"
                        label="Password"
                        value={password}
                        onChange={onInputChange}
                    />
                        

                </Grid>
                
            </div>
           
        )
        
    }
}

export default LogInForm;