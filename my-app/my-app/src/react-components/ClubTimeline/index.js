import React from "react";
import './style.css';
import ClubPost from "../ClubPost";
import CustomButton from "../CustomButton";
import info from '../../tempInfo';

class ClubTimeline extends React.Component {
    cPosts = info.Posts.filter((p) => p.authorID === this.props.clubInfo.clubID);
    
    constructor(props) {
        super(props);
        console.log(this.cPosts)
        this.state = {
            posts: this.getPosts(props.clubInfo.clubID)
        }
    }
    
    // hardcoded
    getPosts(id) {
        let posts = info.Posts.filter((p) => p.authorID === id)
        posts.sort(function(a, b) {
            let adate, bdate;
            adate = a.date.split('-').reverse().join('');
            bdate = b.date.split('-').reverse().join('');
            return adate > bdate ? 1 : adate < bdate ? -1 : 0
        }) 
        return posts
    }

    lastID = 1;

    isExec = function() {
        let val = this.props.clubInfo.execs.includes(this.props.currUserInfo.id);
        return val;
    }

    render() {
        return(
            <div id="timeline">
                    {this.isExec() && 
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
                                        while (form && form.id !== "makePost") {
                                            form = form.parentNode;
                                        }

                                        if (!form) {
                                            alert("Something went wrong.");
                                            return;
                                        }
                                        
                                        form = form.children[1].children[0]

                                        if (form.value.length === 0) {
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