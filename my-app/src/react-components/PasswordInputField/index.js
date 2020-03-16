import React from 'react'

import IconButton from '@material-ui/core/IconButton';
import InputField from "./../InputField";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


import "./style.css"

//custom password field input
class PasswordInputField extends React.Component{
    state = {
        showPassword: true
    }

    //change visibility of password text, should be attached to a button
    togglePasswordVisibility(){
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    //prevent default action of password field
    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    render(){
        const { label, value, onInputChange, name} = this.props;
        return (
            <div id="passField">
                <InputField
                    name={name}
                    label={label}
                    value={value}
                    onInputChange={onInputChange}
                    type={this.state.showPassword ? "password" : "text"}
                />
                <IconButton className="passField_showHidePassButton"
                  aria-label="toggle password visibility"
                  onClick={this.togglePasswordVisibility.bind(this)}
                  onMouseDown={this.handleMouseDownPassword}
                >
                    {this.state.showPassword ?  <VisibilityOff/> : <Visibility />}
                </IconButton>
            </div>
        )
    }
}

export default PasswordInputField