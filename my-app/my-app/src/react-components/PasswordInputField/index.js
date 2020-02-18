import React from 'react'

import IconButton from '@material-ui/core/IconButton';
import InputField from "./../InputField";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


import "./style.css"

class PasswordInputField extends React.Component{
    state = {
        showPassword: true
    }

    togglePasswordVisibility(){
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    handleMouseDownPassword = event => {
        event.preventDefault();
      };

    render(){
        const { label, value, onInputChange, name} = this.props;

        return (
            <div>
                <InputField
                    name={name}
                    label={label}
                    value={value}
                    onChange={onInputChange}
                    type={this.state.showPassword ? "password" : "text"}
                />
                <IconButton className="ShowHidePassButton"
                  aria-label="toggle password visibility"
                  onClick={this.togglePasswordVisibility.bind(this)}
                  onMouseDown={this.handleMouseDownPassword}
                >
                    {this.state.showPassword ?  <VisibilityOff /> : <Visibility />}
                </IconButton>
            </div>
        )
    }
}

export default PasswordInputField