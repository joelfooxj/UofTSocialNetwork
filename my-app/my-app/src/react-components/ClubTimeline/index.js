import React from "react";
import './style.css';
import ClubPost from "../ClubPost";

class ClubProfileTimeline extends React.Component {
    render() {
        return(
            <div id="timeline">
                <ClubPost clubName={this.props.clubName} profilePic={this.props.profilePic}/>
            </div>
        )
    }
}

export default ClubProfileTimeline;