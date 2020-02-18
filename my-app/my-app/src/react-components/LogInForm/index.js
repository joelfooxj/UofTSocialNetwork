import React from "react";
import Grid from "@material-ui/core/Grid";

import InputField from "./../InputField";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import "./style.css"

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
                    />
                    <InputField
                        name="passwordInput"
                        label="Password"
                        value={password}
                        onChange={onInputChange}
                    />
                    <Button className="LogInButton"> Log In</Button>

                </Grid>
                
            </div>
           
        )
        
    }
}

export default LogInForm;