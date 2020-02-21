import React from "react";
import './style.css';
import ClubInfo from "../ClubInfo/index.js"

class ClubProfileBanner extends React.Component {
    render() {
        return(
            <div class="ClubBannerContainer">
                <img class="ClubProfilePicture" src={this.props.profileImage}/>
                <div class="ClubProfileBannerImageContainer">
                    <img class="ClassProfileBannerImage" src={this.props.bannerImage}/>
                </div>
                <ClubInfo infoText={"This is placeholder text."}/>
            </div>
        );
    }
}

export default ClubProfileBanner;