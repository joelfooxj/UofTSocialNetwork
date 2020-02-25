import React from "react";
import './style.css';

class ClubPost extends React.Component {
    render() {
        return(
            <div class="post">
                <div class="postIconContainer">
                    <img src={this.props.profilePic} class="postIcon"/>
                </div>

                <div class="postContent">
                    <p><strong>{this.props.clubName}</strong></p>
                    <p>{this.props.postContent}</p>
                </div>
            </div>
        )
    }
}

export default ClubPost;