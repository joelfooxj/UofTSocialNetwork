import React from 'react';
import TextField from "@material-ui/core/TextField";
import "./style.css"


class UserProfileField extends React.Component{

    state = {
        beingChanged: false
    }


    render(){
        const {label, name, type, defaultValue, disabled} = this.props

        let field = <TextField className="infoField"
                name={name}
                type={type}
                label={label}
                id="margin-normal"
                defaultValue={defaultValue || ""}
                className="infoField"
                margin="normal"
                disabled={disabled}
                onChange={() => {console.log("hello there")}}
            />
        

        return (
            field
        );
    }
}
  

export default UserProfileField;
