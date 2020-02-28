import React from "react";
import './style.css';
import ClubPost from "../ClubPost";
import CustomButton from "../CustomButton";

class ClubTimeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [
                        <ClubPost 
                            clubName={this.props.userInfo.profileName} 
                            profilePic={this.props.userInfo.profilePic}
                            postContent="Placeholder post my friend"
                        />,
                        <ClubPost 
                            clubName={this.props.userInfo.profileName} 
                            profilePic={this.props.userInfo.profilePic}
                            postContent="Placeholder post my friend"
                        />
                    ]
        }
    }

    isExec = function(clubId) {
        let target = -1;
        for (let i = 0; i < this.props.currUserInfo.accs.length; i++) {
            if (this.props.currUserInfo.accs[i].id === this.props.currUserInfo.id) {
                target = i;
                break;
            }
        }

        if ((target >= 0) && this.props.currUserInfo.accs[target].clubsExecOf.includes(clubId)) {
                return true;
        }
        return false;
    }

    render() {
        return(
            <div id="timeline">
                    {this.isExec(this.props.userInfo.id) && 
                        <div id="makePostButton">
                            <CustomButton
                                width="125px"
                                height="35px"
                                variant="outline"
                                buttonText="New Post"
                                backgroundColor="lightgray"
                                border="1px gray solid"
                                margin="5px"
                                onClick={() => (this.props.addPost(this, "testing"))}
                            />
                        </div>
                    }
                {this.state.posts.map(post => (
                    post
                ))}
            </div>
        )
    }
}

export default ClubTimeline;