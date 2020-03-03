import React from "react";
import './style.css';
import ClubPost from "../ClubPost";
import CustomButton from "../CustomButton";
import info from '../../tempInfo';

class ClubTimeline extends React.Component {
    cPosts = info.Posts.filter((p) => p.authorID === this.props.clubInfo.clubID);
    
    constructor(props) {
        super(props);
        this.state = {
            posts: this.getPosts(props.clubInfo.clubID)
        }
    }
    
    // This will be a database call later
    getPosts(id) {
        let posts = info.Posts.filter((p) => p.authorID === id)
        posts.sort(function(a, b) {
            // sort posts by date
            let adate, bdate;
            adate = a.date.split('-').reverse().join('');
            bdate = b.date.split('-').reverse().join('');
            return adate > bdate ? 1 : adate < bdate ? -1 : 0
        }) 
        return posts
    }

    // The last id used to create a post, used for ensuring new posts
    // have a unique id for this club.
    lastID = 1;

    // Returns true if the current user is a club executive
    isExec = function() {
        let val = this.props.clubInfo.execs.includes(this.props.currUserInfo.id);
        return val;
    }

    // On Click function for adding a post
    onClickAddPost = function(e) {
        e.preventDefault();
        let form = e.target;

        // where button is clicked may change parents, use while loop
        while (form && form.id !== "makePost") {
            form = form.parentNode;
        }

        if (!form) {
            alert("Something went wrong.");
            return;
        }

        form = form.children[1].children[0]

        if (form.value.length === 0) {
            alert("Please enter post text.");
            return;
        }

        this.props.addPost(this, form.value);
    }

    render() {
        return(
            <div id="timeline">
                    {(this.isExec() || this.props.currUserInfo.isAdmin) && 
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
                                    onClick={this.onClickAddPost.bind(this)}
                                />
                            </div>
                            <div id="makePostTextArea">
                                <textarea id="makePostText" placeholder="What's on your mind?"/>
                            </div>
                        </div>
                    }
                {this.state.posts.map(p => (
                    <ClubPost 
                        id={p.postID}
                        clubName={this.props.clubInfo.name} 
                        profilePic={this.props.clubInfo.profilePic}
                        postContent={p.content}
                        timeline={this}
                        removePost={this.props.removePost}
                        isExec={this.isExec()}
                    />
                ))}
            </div>
        )
    }
}

export default ClubTimeline;