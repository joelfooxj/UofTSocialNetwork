import React from 'react';
import TextField from "@material-ui/core/TextField";
import "./style.css"

class CreateAccUserInfo extends React.Component{

    

    render(){
        const {onInputChange} = this.props

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
                            onChange={onInputChange}
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
                            onChange={onInputChange}
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
                            onChange={onInputChange}
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
                            onChange={onInputChange}
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
                            onChange={onInputChange}
                        />
                    </div>
                </div>
            </div>
            
        )
    }
}
  

export default CreateAccUserInfo;
