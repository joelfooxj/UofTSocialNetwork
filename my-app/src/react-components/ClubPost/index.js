import React from "react";
import './style.css';
import CustomButton from "../CustomButton";
import Button from '@material-ui/core/Button';

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
                        <span className="removePostButton">
                            <Button
                            onClick={() => this.props.removePost(this.props.postInfo._id)}
                            variant='contained'
                            disableElevation
                            >
                                Remove
                            </Button>
                        </span>
                    </div>
                }
            </div>
        )
    }
}

export default ClubPost;