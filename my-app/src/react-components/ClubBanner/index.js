import React from "react";
import './style.css';

class ClubProfileBanner extends React.Component {
    render() {
        return(
            <div className="ClubBannerContainer">
                <img className="ClubProfileBannerImage" src={this.props.bannerImage} alt="Failed to Load"/>
            </div>
        );
    }
}

export default ClubProfileBanner;