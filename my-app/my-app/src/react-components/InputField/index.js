import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

class InputField extends React.Component{
    render(){
        const { label, value, onInputChange, name } = this.props;

        return (
            <Grid item xl={3} lg={3} md={4} s={12} xs={12}>
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