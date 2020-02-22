import React from 'react';
import TextField from "@material-ui/core/TextField";
import "./style.css"
import CustomButton from "./../CustomButton"

class UserProfileField extends React.Component{

    state = {
        beingChanged: false
    }


    render(){
        const {label, name, type, defaultValue, disabled} = this.props
        let field = <TextField 
                name={name}
                type={type}
                label={label}
                id="margin-normal"
                defaultValue={defaultValue || ""}
                className="infoFieldText"
                margin="normal"
                disabled={disabled}
                onChange={() => {console.log("hello there")}}
            />
        


        return (
            <div className="infoField">
                {field}
                <CustomButton id="editButton"
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
                >
                </CustomButton>
                
            </div>
        );
    }
}
  

export default UserProfileField;
