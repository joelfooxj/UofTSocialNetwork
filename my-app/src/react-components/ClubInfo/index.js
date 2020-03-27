import React from "react";
import './style.css';
import CustomButton from "../CustomButton";
import {updateUserRecord} from '../../actions/accountActions';
import {updateClub} from '../../actions/clubActions';
import ClubDashboard from "../ClubDashboard/ClubDashboard";

class ClubInfo extends React.Component {
    constructor(props) {
        console.log(props)
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
        let val = this.state.clubInfo.requested.includes(this.state.userInfo._id) 
        return val;
    }

    // Returns true if the current user is following this club.
    isFollowing = function() {
        return this.state.userInfo.clubsFollowing.includes(this.state.clubInfo._id)
    }

    followClub = (clubID) => {
        this.state.userInfo.clubsFollowing.push(clubID)
        updateUserRecord(this.state.userInfo._id, 'clubsFollowing', this.state.userInfo.clubsFollowing).then((result) => {
            if (result === 200) {
                this.setState({
                    userInfo: this.state.userInfo
                })
            } else {
                alert(`There was a problem updating the user. Status: ${result.status}`)
            }
        }).catch((error) => {
            console.log("Fatal Error")
            throw new Error(error)
        })
    }

    unfollowClub = (clubID) => {
        let target = -1
        let clubsFollowing = this.state.userInfo.clubsFollowing
        for (let i = 0; i < clubsFollowing.length; i++) {
            if (clubID === clubsFollowing[i]) {
                target = i
                break;
            }
        }

        if (target >= 0) {
            this.state.userInfo.clubsFollowing.splice(target, 1)
            updateUserRecord(this.state.userInfo._id, 'clubsFollowing', this.state.userInfo.clubsFollowing).then((result) => {
                if (result === 200) {
                    this.setState({
                        userInfo: this.state.userInfo
                    })
                } else {
                    alert(`There was a problem updating the user. Status: ${result.status}`)
                }
            }).catch((error) => {
                console.log("Fatal Error")
                throw new Error(error)
            })
        } else {
            console.log("Couldnt unfollow club. Club not found.")
        }
    }

    joinClub = () => {
        let requested = this.state.clubInfo.requested
        if (requested.includes(this.state.userInfo._id)) {
            return;
        }

        this.state.clubInfo.requested.push(this.state.userInfo._id)
        updateClub(this.state.clubInfo._id, 'requested', this.state.clubInfo.requested).then((result) => {
            if (result === 200) {
                this.setState({
                    clubInfo: this.state.clubInfo
                })
            } else {
                alert(`There was a problem updating the user. Status: ${result}`)
            }
        }).catch((error) => {
            console.log("Fatal error")
            throw new Error(error);
        })
    }
    
    cancelRequest = () => {
        let target = -1
        let requested = this.state.clubInfo.requested

        for (let i = 0; i < requested.length; i++) {
            if (requested[i] === this.state.userInfo._id) {
                target = i
                break;
            }
        }

        if (target >= 0) {
            this.state.clubInfo.requested.splice(target, 1)
            updateClub(this.state.clubInfo._id, 'requested', this.state.clubInfo.requested).then((result) => {
                if (result === 200) {
                    this.setState({
                        clubInfo: this.state.clubInfo
                    })
                } else {
                    alert(`There was a problem updating the user. Status: ${result.status}`)
                }
            }).catch((error) => {
                console.log("Fatal error")
                throw new Error(error)
            })
        } else {
            console.log("Could find request to remove.");
        }
    }

    leaveClub = () => {
        let target = -1
        let members = this.state.clubInfo.members

        for (let i = 0; i < members.length; i++) {
            if (members[i] === this.state.userInfo._id) {
                target = i;
                break;
            }
        }

        if (target >= 0) {
            this.state.clubInfo.members.splice(target, 1)
            updateClub(this.state.clubInfo._id, 'members', this.state.clubInfo.members).then((result) => {
                if (result === 200) {
                    this.setState({
                        clubInfo: this.state.clubInfo
                    })
                } else {
                    alert(`There was a problem updating the user. Status: ${result.status}`)
                }
            }).catch((error) => {
                console.log("Fatal error")
                throw new Error(error)
            })
        } else {
            console.log("Could not find club to leave.")
        }
    }

    render() {
        console.log(this.state)
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
                                onClick={()=>(this.followClub(this.state.clubInfo._id))}
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
                                onClick={() => this.unfollowClub(this.state.clubInfo._id)}
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
                                onClick={() => this.joinClub()}
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
                                onClick={() => this.leaveClub()}
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
                            onClick={() => this.cancelRequest()}
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