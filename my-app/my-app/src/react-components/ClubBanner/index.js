import React from "react";
import './style.css';

class ClubProfileBanner extends React.Component {
    render() {
        return(
            <div class="ClubBannerContainer">
                <img class="ClubProfileBannerImage" src={this.props.bannerImage} alt="Failed to Load"/>
            </div>
        );
    }
}

export default ClubProfileBanner;