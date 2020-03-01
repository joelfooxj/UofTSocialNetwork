import React from "react";
import './style.css';
import ClubProfileBanner from "../ClubBanner";
import ClubTimeline from "../ClubTimeline";
import ClubProfilePicture from "../ClubProfilePicture";
import ClubInfo from "../ClubInfo";

class ClubProfilePage extends React.Component {
    render() {
        console.log(this.props)
        return(
            <div id="profilePage">
                <ClubProfilePicture 
                    profilePic={this.props.clubInfo.profilePic} 
                />

                <ClubProfileBanner 
                    bannerImage={this.props.clubInfo.bannerImage}
                />

                <ClubInfo 
                    clubInfo={this.props.clubInfo} 
                    currUserInfo={this.props.currUserInfo}
                    followClub={this.props.followClub}
                    unfollowClub={this.props.unfollowClub}
                    joinClub={this.props.joinClub}
                    leaveClub={this.props.leaveClub}
                />

                <ClubTimeline 
                    addPost={this.props.addPost}
                    removePost={this.props.removePost}
                    clubInfo={this.props.clubInfo}
                    currUserInfo={this.props.currUserInfo}
                />
            </div>
        )
    }
}

export default ClubProfilePage;