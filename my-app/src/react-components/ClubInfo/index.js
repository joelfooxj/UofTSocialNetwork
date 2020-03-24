import React from "react";
import './style.css';
import CustomButton from "../CustomButton";

class ClubInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: props.userInfo,
            clubInfo: props.clubInfo
        }
    }

    //THESE SHOULD BE MOVED INTO AN OUTSIDE ACTION FILE
    //They were changed just so that the page actually loads, these functions should just check the club IDs within the various 
    //club info arrays (see schema or database) attached to our User object

    // Functions for verifying permisisons of current user.
    // Returns true if the current user is an exec.
    isExec = function() {
        let val = this.state.clubInfo.execs.includes(this.state.userInfo._id);
        return val;
    }
    
    // Returns true if the current user is an executive of the club.
    isMember = function() {
        let val = this.state.clubInfo.members.includes(this.state.userInfo._id);
        return val;
    }

    // Returns true if the current user has requested to join this club
    didRequest = function() {
        let val = this.state.clubInfo.requests.includes(this.state.userInfo._id) 
        return val;
    }

    // Returns true if the current user is following this club.
    isFollowing = function() {
        return this.state.userInfo.clubsFollowing.includes(this.state.clubInfo.clubID)
        /*
        let target = -1;
        for (let i = 0; i < this.state.currUserInfo.accs.length; i++) {
            if (this.state.currUserInfo.accs[i].id === this.state.userInfo._id) {
                target = i;
                break;
            }
        }

        if ((target >= 0) && 
            this.state.currUserInfo.accs[target].clubsFollowing.includes(this.state.clubInfo.clubID)) {
            return true;
        }
        
        return false;*/
    }

    render() {
        return(
            <div id="ClubInfoContainer">
                <div id="InfoContents">
                    <div id="ClubNameText">
                        <strong>{this.state.clubInfo.name}</strong>
                    </div>
                    <span id="ClubButtons">
                        {!this.isFollowing() &&
                            <CustomButton
                                width="100px"
                                height="35px"
                                variant="outline"
                                buttonText="Follow"
                                backgroundColor="lightgray"
                                border="1px gray solid"
                                margin="5px"
                                onClick={()=>(this.props.followClub(this, this.state.clubInfo.clubID))}
                            />
                        }

                        {this.isFollowing() &&
                            <CustomButton
                                width="110px"
                                height="35px"
                                variant="outline"
                                buttonText="Unfollow"
                                backgroundColor="lightgray"
                                border="1px gray solid"
                                margin="5px"
                                onClick={() => this.props.unfollowClub(this, this.props.clubInfo.clubID)}
                            />
                        }

                        {!this.isMember() && !this.didRequest() && !this.isExec() &&
                            <CustomButton
                                width="100px"
                                height="35px"
                                variant="outline"
                                buttonText="Join"
                                backgroundColor="lightgray"
                                border="1px gray solid"
                                margin="5px"
                                onClick={() => this.props.joinClub(this, this.props.clubInfo.clubID)}
                            />
                        }

                        {this.isMember() && !this.isExec() &&
                            <CustomButton
                                width="125px"
                                height="35px"
                                variant="outline"
                                buttonText="Leave Club"
                                backgroundColor="lightgray"
                                border="1px gray solid"
                                margin="5px"
                                onClick={() => this.props.leaveClub(this, this.props.clubInfo.clubID)}
                            />
                        }

                        {this.didRequest() &&
                        <CustomButton
                            width="125px"
                            height="35px"
                            variant="outline"
                            buttonText="Requested"
                            backgroundColor="lightgray"
                            border="1px gray solid"
                            margin="5px"
                        />
                    }
                    </span>
                    <div id="ClubInfoText">
                        {this.state.clubInfo.bioText}
                    </div>
                </div>
            </div>
        )
    }
}

export default ClubInfo;