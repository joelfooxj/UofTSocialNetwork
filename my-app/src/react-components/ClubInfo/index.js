import React from "react";
import './style.css';
import CustomButton from "../CustomButton";
import {updateUserRecord} from '../../actions/accountActions';
import {updateClub} from '../../actions/clubActions';
import * as actions from './actions';
import ClubDashboard from "../ClubDashboard/ClubDashboard";

class ClubInfo extends React.Component {
    constructor(props) {
        console.log(props)
        super(props);
        this.state = {
            //userInfo: props.userInfo,
            clubInfo: props.clubInfo
        }
    }

    //THESE SHOULD BE MOVED INTO AN OUTSIDE ACTION FILE
    //They were changed just so that the page actually loads, these functions should just check the club IDs within the various 
    //club info arrays (see schema or database) attached to our User object

    // Functions for verifying permisisons of current user.
    // Returns true if the current user is an exec.
    isExec = function() {
        let val = this.state.clubInfo.execs.includes(this.props.userInfo._id);
        return val;
    }
    
    // Returns true if the current user is an executive of the club.
    isMember = function() {
        let val = this.state.clubInfo.members.includes(this.props.userInfo._id);
        return val;
    }

    // Returns true if the current user has requested to join this club
    didRequest = function() {
        let val = this.state.clubInfo.requested.includes(this.props.userInfo._id) 
        return val;
    }

    // Returns true if the current user is following this club.
    isFollowing = function() {
        return this.props.userInfo.clubsFollowing.includes(this.state.clubInfo._id)
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
                                onClick={()=>(actions.followClub(this))}
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
                                onClick={() => actions.unfollowClub(this)}
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
                                onClick={() => actions.joinClub(this)}
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
                                onClick={() => actions.leaveClub(this)}
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
                            onClick={() => actions.cancelRequest(this)}
                        />
                    }
                    </span>
                    <div id="ClubInfoText">
                        {this.state.clubInfo.clubInfo}
                    </div>
                </div>
            </div>
        )
    }
}

export default ClubInfo;