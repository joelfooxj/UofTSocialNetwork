import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import "./style.css"
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

//custom input field class for collecting text input
class InputField extends React.Component{
    render(){
        const { classes, label, value, onInputChange, name, type } = this.props;


        return (
            <Grid className="logInGrid" container direction="column">
                <TextField className="logInInput"
                    name={name}
                    type={type}
                    label={label}
                    color="white"
                    id="margin-normal"
                    defaultValue={value || ""}
                    className={classes.root}
                    margin="dense"
                    onChange={onInputChange}
                    InputLabelProps={{
                        classes: {
                          root: classes.inputLabel,
                          focused: "focused"
                        }
                      }}
                    InputProps={classes.inputLabel}
                />
            </Grid>
        )
    }
}

/*
 * Note: there are only two ways to change the color of modules from material-ui
 *       both cannot be done by putting styles in css file
 */
const styles = () => ({
    inputLabel: {
        color: "rgb(f8f9fa)",
        "&.focused": {
          color: "white"
        }
    },
    input:{
        color: "white"
    },
    root:{
        color:"white"
    }
})
InputField.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InputField);