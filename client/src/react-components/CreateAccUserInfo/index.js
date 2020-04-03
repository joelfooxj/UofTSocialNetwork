import React from 'react';
import TextField from "@material-ui/core/TextField";
import "./style.css"

class CreateAccUserInfo extends React.Component{

    state = {
        errorUsername: false,
        errorPassword: false,
        errorFirstName: false,
        errorLastName: false,
        errorEmail: false,
        flags: [0, 0, 0, 0, 0]
    }

    changeErrorState = (e, name, i) => {
        if(e.target.value === ""){
            this.setState({
                [name]: true
            })
        }
        else{
            const flags = this.state.flags
            flags[i] = 1
            this.setState({
                [name]: false,
                flags: flags
            })
        }
    }

    render(){
        const {onInputChange, changeAccCreateState} = this.props
        const emailRegex = new RegExp("[a-zA-Z]{1,25}[@][a-zA-Z]{1,25}[.](com|org|ca)")

        return(
            <div id="inputForm">
                <div id={"formDiv"}>
                    <div className={"inputField"}>
                        <TextField 
                            name={"usernameInput"}
                            type={"text"}
                            label={"Username"}
                            id="margin-normal"
                            className="usernameInput"
                            margin="normal"
                            onChange={(e) => {this.changeErrorState(e, "errorUsername"); onInputChange(e);}}
                            onClick={(e) => {this.changeErrorState(e, "errorUsername"); onInputChange(e);}}
                            error={this.state.errorUsername}
                            helperText={this.state.errorUsername ? "Field Must Not Be Empty" : ""}
                        />
                    </div>
                    <div className={"inputField"}>
                        <TextField 
                            className={"infoInputField"}
                            name={"passwordInput"}
                            type={"password"}
                            label={"Password"}
                            id="margin-normal"
                            className="passwordInput"
                            margin="normal"
                            onChange={(e) => {this.changeErrorState(e, "errorPassword"); onInputChange(e);}}
                            onClick={(e) => {this.changeErrorState(e, "errorPassword"); onInputChange(e);}}
                            error={this.state.errorPassword}
                            helperText={this.state.errorPassword ? "Field Must Not Be Empty" : ""}
                        />
                    </div>

                    <div className={"inputField"}>
                        <TextField 
                            className={"infoInputField"}
                            name={"firstNameInput"}
                            type={"text"}
                            label={"First Name"}
                            id="margin-normal"
                            className="firstNameInput"
                            margin="normal"
                            onChange={(e) => {this.changeErrorState(e, "errorFirstName"); onInputChange(e);}}
                            onClick={(e) => {this.changeErrorState(e, "errorFirstName"); onInputChange(e);}}
                            error={this.state.errorFirstName}
                            helperText={this.state.errorFirstName ? "Field Must Not Be Empty" : ""}
                        />
                    </div>

                    <div className={"inputField"}>
                        <TextField 
                            className={"infoInputField"}
                            name={"lastNameInput"}
                            type={"text"}
                            label={"Last Name"}
                            id="margin-normal"
                            className="lastNameInput"
                            margin="normal"
                            onChange={(e) => {this.changeErrorState(e, "errorLastName"); onInputChange(e);}}
                            onClick={(e) => {this.changeErrorState(e, "errorLastName"); onInputChange(e);}}
                            error={this.state.errorLastName}
                            helperText={this.state.errorLastName ? "Field Must Not Be Empty" : ""}
                        />
                    </div>

                    <div className={"inputField"}>
                        <TextField 
                            className={"infoInputField"}
                            name={"emailInput"}
                            type={"text"}
                            label={"Email"}
                            id="margin-normal"
                            className="emailInput"
                            margin="normal"
                            onChange={(e) => {this.changeErrorState(e, "errorEmail"); if(e.value !== "" && !emailRegex.test(e.value)){changeAccCreateState(true)}else{changeAccCreateState(false)} onInputChange(e);}}
                            onClick={(e) => {this.changeErrorState(e, "errorEmail"); onInputChange(e);}}
                            error={this.state.errorEmail}
                            helperText={this.state.errorEmail ? "Field Must Not Be Empty" : ""}
                        />
                    </div>
                </div>
            </div>
            
        )
    }
}
  

export default CreateAccUserInfo;
