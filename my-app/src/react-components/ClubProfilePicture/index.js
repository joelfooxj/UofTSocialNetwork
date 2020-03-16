import React from "react";
import './style.css';

class ClubProfileBanner extends React.Component {
    render() {
        return(
            <img class="ClubProfilePicture" src={this.props.profilePic} alt="Failed to Load"/>
        );
    }
}

export default ClubProfileBanner;