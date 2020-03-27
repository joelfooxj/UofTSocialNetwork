import React from "react";
import './style.css';
import ClubPost from "../ClubPost";
import CustomButton from "../CustomButton";
import info from '../../tempInfo';
import * as actions from './actions'
import {removePostByID, getPostByPosterID, collectPosts, createPost} from '../../actions/postActions'

class ClubTimeline extends React.Component {
    cPosts = info.Posts.filter((p) => p.authorID === this.props.clubInfo.clubID);
    
    constructor(props) {
        super(props);
        this.state = {
            clubInfo: props.clubInfo,
           // userInfo: props.userInfo,
            posts: [],
            loaded: false
        }
    }

    // Returns true if the current user is a club executive
    isExec = function() {
        let val = this.props.clubInfo.execs.includes(this.props.userInfo._id);
        return val;
    }

    componentDidMount() {
        actions.getPosts(this)
    }

    render() {
        if (this.state.loaded) {
            return(
                <div id="timeline">
                        {(this.isExec() || this.props.userInfo.permissions === 1) && 
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
                                        onClick={(e) => actions.onClickAddPost(this, e)}
                                    />
                                </div>
                                <div id="makePostTextArea">
                                    <textarea id="makePostText" placeholder="What's on your mind?"/>
                                </div>
                            </div>
                        }
                    {this.state.posts.map(p => (
                        <ClubPost 
                            clubInfo={this.props.clubInfo}
                            userInfo={this.props.userInfo}
                            postInfo={p}
                            timeline={this}
                            removePost={(postID) => actions.removePost(this, postID)}
                            isExec={this.isExec()}
                            isAdmin={this.props.userInfo.permissions === 1}
                        />
                    ))}
                </div>
            )
        } else {
            return(
                <div>
                    Loading...
                </div>
            )
        }
    }
}

export default ClubTimeline;