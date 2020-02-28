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
                <ClubProfilePicture 
                    profilePic={this.props.userInfo.profilePic} 
                />

                <ClubProfileBanner 
                    bannerImage={this.props.userInfo.bannerImage}
                />

                <ClubInfo 
                    userInfo={this.props.userInfo} 
                    currUserInfo={this.props.currUserInfo}
                    followClub={this.props.followClub}
                    unfollowClub={this.props.unfollowClub}
                />

                <ClubTimeline 
                    addPost={this.props.addPost}
                    userInfo={this.props.userInfo}
                    currUserInfo={this.props.currUserInfo}
                />
            </div>
        )
    }
}

export default ClubProfilePage;