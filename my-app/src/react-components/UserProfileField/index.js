import React from 'react';
import TextField from "@material-ui/core/TextField";
import "./style.css"
import CustomButton from "./../CustomButton"

import {updateUserRecord, updatePassword} from '../../actions/accountActions';

class UserProfileField extends React.Component{

    state = {
        beingChanged: false,
        disableSaveButton: false
    }

    editButtonOnClick = () => {
        this.setState({
            beingChanged: true
        })
    }

    saveButtonOnClick = () => {
        this.setState({
            beingChanged: false
        })
    }

    render(){
        const {label, name, type, defaultValue, userID, id} = this.props
        let field = null
        let editField = <TextField 
                            name={name}
                            type={type}
                            label={label}
                            id={id}
                            defaultValue={defaultValue || ""}
                            className="infoFieldText"
                            margin="normal"
                            disabled={true}
                        />
        let saveField = <TextField 
                            name={name}
                            type={type}
                            label={label}
                            defaultValue={defaultValue || ""}
                            id={id}
                            className="infoFieldText"
                            margin="normal"
                            disabled={false}
                            onChange={(e) => {if(e.target.value === ""){this.setState({disableSaveButton: true})} else{this.setState({disableSaveButton: false})}}}
                        />
        let editButton = <CustomButton id="editButton"
                        color={"primary"}
                        variant={"outlined"}
                        disableElevation={false}
                        buttonText={"Edit"}
                        textColor={"#3F51B5"}
                        borderColor={"#3F51B5"}
                        width={"10px"}
                        height={"15px"}
                        padding={"0px"}
                        top={"-23px"}
                        left={"200px"}
                        fontSize={"10px"}
                        onClick={this.editButtonOnClick}
                    >
                    </CustomButton>
        let saveButton = <CustomButton id="saveButton"
                            color={"primary"}
                            variant={"outlined"}
                            disableElevation={false}
                            buttonText={"Save"}
                            textColor={"#3F51B5"}
                            borderColor={"#3F51B5"}
                            width={"10px"}
                            height={"15px"}
                            padding={"0px"}
                            top={"-23px"}
                            left={"200px"}
                            fontSize={"10px"}
                            onClick={() => {this.saveButtonOnClick();
                                                if(name === "password"){
                                                    updatePassword(userID, document.getElementById(id).value).then((res) => {console.log(res)})
                                                    
                                                } 
                                                else{updateUserRecord(userID, name, document.getElementById(id).value, this.props.context)
                                                    .then((res) => {console.log(res)})
                                                }
                                            }
                                    }
                            disabled={this.state.disableSaveButton}
                        >
                        </CustomButton>

        let button = editButton

        if(this.state.beingChanged){
            button = saveButton
            field = saveField
        }
        else{
            button = editButton
            field = editField
        }

        return (
            <div className="infoField">
                {field}
                {button}
            </div>
        );
    }
}
  

export default UserProfileField;
