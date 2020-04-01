import React from "react";
import './style.css';
import CustomButton from "../CustomButton";
import Button from '@material-ui/core/Button';
import * as actions from './actions';

class ClubInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clubInfo: props.clubInfo
        }
    }

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
                        {!this.isFollowing()  &&
                            <Button 
                            onClick={()=>(actions.followClub(this, this.props.rootContext))} 
                            variant='contained'
                            disableElevation> 
                                Follow 
                            </Button>
                        }

                        <span class="spacingSpan"/>

                        {this.isFollowing() &&
                            <Button 
                            onClick={()=>(actions.unfollowClub(this, this.props.rootContext))} 
                            variant='contained'
                            disableElevation> 
                                Unfollow 
                            </Button>
                        }

                        <span class="spacingSpan"/>

                        {!this.isMember() && !this.didRequest() && !this.isExec() &&
                            <Button 
                            onClick={()=>(actions.joinClub(this))} 
                            variant='contained'
                            disableElevation> 
                                Join
                            </Button>
                        }

                        <span class="spacingSpan"/>

                        {this.didRequest() && !this.isMember() &&
                            <Button 
                            onClick={()=>(actions.cancelRequest(this))} 
                            variant='contained'
                            disableElevation> 
                                Requested
                            </Button>
                        }

                        <span class="spacingSpan"/>

                        {this.isMember() && !this.isExec() &&
                            <Button 
                            onClick={()=>(actions.leaveClub(this))} 
                            variant='contained'
                            disableElevation> 
                                Leave Club
                            </Button>
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