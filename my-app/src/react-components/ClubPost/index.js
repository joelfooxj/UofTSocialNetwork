import React from "react";
import './style.css';
import CustomButton from "../CustomButton";

class ClubPost extends React.Component {
    render() {
        return(
            <div class="post">
                <div class="postIconContainer">
                    <img src={this.props.clubInfo.profilePicture} class="postIcon" alt="Failed to load"/>
                </div>

                <div class="postContent">
                    <p><strong>{this.props.clubInfo.name}</strong></p>
                    <p>{this.props.postInfo.content}</p>
                </div>

                {(this.props.isExec || this.props.isAdmin) &&
                    <div id="removePost">
                        <CustomButton
                            height="50px"
                            width="60px"
                            variant="outline"
                            buttonText="Remove"
                            backgroundColor="lightgray"
                            border="1px gray solid"
                            margin="10px"
                            onClick={() => this.props.removePost(this.props.postInfo._id)}
                        />
                    </div>
                }
            </div>
        )
    }
}

export default ClubPost;