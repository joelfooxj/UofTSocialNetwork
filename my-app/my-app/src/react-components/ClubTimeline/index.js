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
                        <div id="makePost">
                            <div id="postButton">
                                <CustomButton
                                    width="125px"
                                    height="75px"
                                    variant="outline"
                                    buttonText="Make Post"
                                    backgroundColor="lightgray"
                                    border="1px gray solid"
                                    margin="10px"
                                    onClick={(function(e) {
                                        e.preventDefault();
                                        let form = e.target;
                                        while (form && form.id != "makePost") {
                                            form = form.parentNode;
                                        }

                                        if (!form) {
                                            alert("Something went wrong.");
                                            return;
                                        }
                                        
                                        form = form.children[1].children[0]

                                        if (form.value.length == 0) {
                                            alert("Please enter post text");
                                            return;
                                        }
                                        this.props.addPost(this, form.value)
                                    }).bind(this)}
                                />
                            </div>
                            <div id="makePostTextArea">
                                <textarea id="makePostText" placeholder="What's on your mind?"/>
                            </div>
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