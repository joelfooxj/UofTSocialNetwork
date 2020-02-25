import React from "react";
import './style.css';

class ClubProfileBanner extends React.Component {
    text = ""

    render() {
        return(
            <div class="ClubBannerContainer">
                <div class="ClubProfileBannerImageContainer">
                    <img class="ClubProfileBannerImage" src={this.props.bannerImage} alt="Failed to Load"/>
                </div>
            </div>
        );
    }
}

export default ClubProfileBanner;