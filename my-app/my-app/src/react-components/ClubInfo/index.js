import React from "react";
import './style.css';
import CustomButton from "../CustomButton";

class ClubInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currUserInfo: props.currUserInfo,
            clubInfo: props.clubInfo
        }
    }

    isExec = function(clubId) {
        for (let i = 0; i < this.state.currUserInfo.accs.length; i++) {
            if (this.state.currUserInfo.accs[i].clubsExecOf.includes(clubId)) {
                return true;
            }
        }
        return false;;
    }

    isFollowing = function(clubId) {
        let target = -1;
        for (let i = 0; i < this.state.currUserInfo.accs.length; i++) {
            if (this.state.currUserInfo.accs[i].id === this.state.currUserInfo.id) {
                target = i;
                break;
            }
        }

        if ((target >= 0) && (this.state.currUserInfo.accs[target].clubsFollowing.includes(clubId) ||
            this.state.currUserInfo.accs[target].clubsExecOf.includes(clubId) ||
            this.state.currUserInfo.accs[target].clubsMemberOf.includes(clubId))) {
                return true;
        }
        return false;
    }

    isMember = function(clubId) {
        let target = -1;
        for (let i = 0; i < this.state.currUserInfo.accs.length; i++) {
            if (this.state.currUserInfo.accs[i].id === this.state.currUserInfo.id) {
                target = i;
                break;
            }
        }

        if ((target >= 0) && (this.state.currUserInfo.accs[target].clubsExecOf.includes(clubId) ||
            this.state.currUserInfo.accs[target].clubsMemberOf.includes(clubId))) {
                return true;
        }
        return false;
    }

    render() {
        return(
            <div id="ClubInfoContainer">
                <div id="InfoContents">
                    <div id="ClubNameText">
                        <strong>{this.state.clubInfo.name}</strong>
                    </div>
                    <span id="ClubButtons">
                        {!this.isFollowing(this.state.clubInfo.clubID) &&
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

                        {this.isFollowing(this.props.clubInfo.clubID) &&<CustomButton
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

                        {!this.isMember(this.props.clubInfo.clubID) &&
                            <CustomButton
                                width="100px"
                                height="35px"
                                variant="outline"
                                buttonText="Join"
                                backgroundColor="lightgray"
                                border="1px gray solid"
                                margin="5px"
                            />
                        }

                        {this.isMember(this.props.clubInfo.clubID) &&
                            <CustomButton
                                width="125px"
                                height="35px"
                                variant="outline"
                                buttonText="Leave Club"
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