import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import "./style.css"

class InputField extends React.Component{
    render(){
        const { label, value, onInputChange, name } = this.props;

        return (
            <Grid className="LogInInputGrid" container direction="column">
                <TextField
                    name={name}
                    label={label}
                    id="margin-normal"
                    defaultValue={value || ""}
                    className="input"
                    margin="normal"
                    onChange={onInputChange}
                    
                />
            </Grid>
        )
    }
}

export default InputField;