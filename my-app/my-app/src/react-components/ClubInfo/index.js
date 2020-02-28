import React from "react";
import './style.css';
import CustomButton from "../CustomButton";

class ClubInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currUserInfo: props.currUserInfo,
            userInfo: props.userInfo
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
                        <strong>{this.state.userInfo.profileName}</strong>
                    </div>
                    <span id="ClubButtons">
                        {!this.isFollowing(this.state.userInfo.id) &&
                            <CustomButton
                                width="100px"
                                height="35px"
                                variant="outline"
                                buttonText="Follow"
                                backgroundColor="lightgray"
                                border="1px gray solid"
                                margin="5px"
                                onClick={()=>(this.props.followClub(this, this.state.userInfo.id))}
                            />
                        }

                        {this.isFollowing(this.props.userInfo.id) &&<CustomButton
                            width="110px"
                            height="35px"
                            variant="outline"
                            buttonText="Unfollow"
                            backgroundColor="lightgray"
                            border="1px gray solid"
                            margin="5px"
                            onClick={() => this.props.unfollowClub(this, this.props.userInfo.id)}
                        />
                        }

                        {!this.isMember(this.props.userInfo.id) &&
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

                        {this.isMember(this.props.userInfo.id) &&
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
                        {this.state.userInfo.bioText}
                    </div>
                </div>
            </div>
        )
    }
}

export default ClubInfo;