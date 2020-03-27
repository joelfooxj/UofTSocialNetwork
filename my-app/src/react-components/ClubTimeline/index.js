import React from "react";
import './style.css';
import ClubPost from "../ClubPost";
import CustomButton from "../CustomButton";
import info from '../../tempInfo';
import {removePostByID, getPostByPosterID, collectPosts, createPost} from '../../actions/postActions'

class ClubTimeline extends React.Component {
    cPosts = info.Posts.filter((p) => p.authorID === this.props.clubInfo.clubID);
    
    constructor(props) {
        super(props);
        this.state = {
            clubInfo: props.clubInfo,
            userInfo: props.userInfo,
            posts: [],
            loaded: false
        }
    }
    
    // This will be a database call later
    getPosts() {
        getPostByPosterID(this.state.clubInfo._id).then((result) => {
            this.setState({
                posts: result,
                loaded: true
            })
        }).catch((error) => {
            console.log("Fatal error")
            throw new Error(error)
        })
    }

    removePost(postID) {
        let newPosts = this.state.posts
        let target = -1
        for (let i = 0; i < newPosts.length; i++) {
            if (newPosts[i]._id === postID) {
                target = i;
                break;
            }
        }

        if (target >= 0) {
            newPosts.splice(target, 1)
            removePostByID(postID).then((result) => {
                if (result === 200) {
                    this.setState({
                        posts: newPosts
                    })
                } else {
                    alert(`There was a problem removing the post. Status: ${result}`)
                }
            }).catch((error) => {
                console.log("Fatal error")
                throw new Error(error)
            })
        }
    }

    addPost(postContent) {
        let newPosts = this.state.posts
        createPost(this.state.clubInfo._id, postContent).then((result) => {
            return result
        }).then((result) => {
            if (result.status) {
                alert(`There was a problem adding a post. Status: ${result.status}`)
            } else {
                newPosts.push(result)
                this.setState({
                    posts: newPosts
                })
            }
        }).catch((error) => {
            console.log("Fatal error.")
            console.log(error)
            throw new Error(error);
        })
    }

    // Returns true if the current user is a club executive
    isExec = function() {
        let val = this.props.clubInfo.execs.includes(this.props.userInfo._id);
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

        this.addPost(form.value);
    }

    componentDidMount() {
        this.getPosts()
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
                            clubInfo={this.props.clubInfo}
                            userInfo={this.props.userInfo}
                            postInfo={p}
                            timeline={this}
                            removePost={this.removePost.bind(this)}
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