import React from "react";
import './style.css';
import ClubPost from "../ClubPost";

class ClubTimeline extends React.Component {
    render() {
        return(
            <div id="timeline">
                <ClubPost 
                    profilePic={this.props.profilePic}
                    clubName={this.props.clubName}
                    postContent="placeholder post!"
                />
                <ClubPost 
                    profilePic={this.props.profilePic}
                    clubName={this.props.clubName}
                    postContent="placeholder post!"
                />
                <ClubPost 
                    profilePic={this.props.profilePic}
                    clubName={this.props.clubName}
                    postContent="placeholder post!"
                />
                <ClubPost 
                    profilePic={this.props.profilePic}
                    clubName={this.props.clubName}
                    postContent="placeholder post!"
                />
            </div>
        )
    }
}

export default ClubTimeline;