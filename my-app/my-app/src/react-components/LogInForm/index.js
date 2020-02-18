import React from "react";
import Grid from "@material-ui/core/Grid";

import InputField from "./../InputField";

class LogInForm extends React.Component{
    

    render(){
        const {username, password, onInputChange} = this.props;

        return (
        <Grid classname="LogInForm" container spacing={2}>
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

        </Grid>
        )
        
    }
}

export default LogInForm;