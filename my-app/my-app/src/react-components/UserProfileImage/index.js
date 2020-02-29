import React from 'react';
import "./style.css"
import CustomButton from "../CustomButton";

class UserProfileImage extends React.Component{

    state = {
        profileImageFile: null
    }

    //THIS FUNCTION WILL INTERFACE WITH OUR DATABASE TO EITHER UPLOAD OR PULL AN IMAGE
    fileSelectHandler = event => {
        this.setState({
            profileImageFile: event.target.files[0]
        }, () => {console.log(this.state.profileImageFile)})
    }

    render(){

        const {id} = this.props
        return (
            <div id={id}>
                <input 
                    style={{display: "none"}}
                    type="file"
                    onChange={this.fileSelectHandler}
                    ref={fileInput => this.fileInput = fileInput} //refs allow use to create references to DOM elements within the render method
                            //ref takes a function in which we bind some property of our class to this input
                    ></input> 
                <CustomButton
                    id="imageUploadButton"
                    onClick={() => {this.fileInput.click()}}
                    buttonText={"Choose Image"}
                    top={"170px"}
                    left={"200px"}
                    width={"100px"}
                    fontSize={"8px"}
                    position={"absolute"}
                    variant={"outlined"}
                    borderColor={"#3F51B5"}
                    textColor={"#3F51B5"}
                ></CustomButton>
                <img id="image" src={this.state.profileImageFile ? URL.createObjectURL(this.state.profileImageFile)  : require("./static/defaultProfileImg.png")} alt="ProfileImage"></img>
            </div>
        )
    }
}

export default UserProfileImage;
