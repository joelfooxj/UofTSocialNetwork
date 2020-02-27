import React from "react";
import './style.css';
import ClubProfileBanner from "../ClubBanner";
import ClubTimeline from "../ClubTimeline";
import ClubProfilePicture from "../ClubProfilePicture";
import ClubInfo from "../ClubInfo";

class ClubProfilePage extends React.Component {
    render() {
        return(
            <div id="profilePage">
                <ClubProfilePicture profilePic={this.props.userInfo.profilePic} />
                <ClubProfileBanner bannerImage={this.props.userInfo.bannerImage}/>
                <ClubInfo userInfo={this.props.userInfo} currUserInfo={this.props.currUserInfo}/>
                <ClubTimeline profilePic={this.props.userInfo.profilePic} clubName={this.props.userInfo.profileName}/>
            </div>
        )
    }
}

export default ClubProfilePage;