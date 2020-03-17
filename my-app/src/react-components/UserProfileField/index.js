import React from 'react';
import TextField from "@material-ui/core/TextField";
import "./style.css"
import CustomButton from "./../CustomButton"

class UserProfileField extends React.Component{

    state = {
        beingChanged: false
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
        const {label, name, type, defaultValue, onChange} = this.props
        let field = null
        let editField = <TextField 
                            name={name}
                            type={type}
                            label={label}
                            id="margin-normal"
                            defaultValue={defaultValue || ""}
                            className="infoFieldText"
                            margin="normal"
                            disabled={true}
                        />
        let saveField = <TextField 
                            name={name}
                            type={type}
                            label={label}
                            id="margin-normal"
                            defaultValue={defaultValue || ""}
                            className="infoFieldText"
                            margin="normal"
                            disabled={false}
                            onChange={(e) => {onChange(e.target.value)}}
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
                        top={"42px"}
                        left={"10px"}
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
                            top={"42px"}
                            left={"10px"}
                            fontSize={"10px"}
                            onClick={this.saveButtonOnClick}
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
