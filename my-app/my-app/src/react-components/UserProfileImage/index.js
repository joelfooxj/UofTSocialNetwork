import React from 'react';
import "./style.css"


class UserProfileImage extends React.Component{

    state = {
        profileImageFile: null
    }

    fileSelectHandler = event => {
        this.setState({
            profileImageFile: event.target.files[0]
        }, () => {console.log(this.state.profileImageFile)})
        
    }


    render(){


        return (
            <div id="imageDiv">
                <input type="file" onChange={this.fileSelectHandler}></input> 
                <img id="image" src={this.state.profileImageFile ? URL.createObjectURL(this.state.profileImageFile)  : ""} alt=""></img>
            </div>
        )
    }
}

export default UserProfileImage;
