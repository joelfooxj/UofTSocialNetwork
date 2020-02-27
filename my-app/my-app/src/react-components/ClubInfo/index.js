import React from "react";
import './style.css';
import CustomButton from "../CustomButton";

class ClubInfo extends React.Component {
    isExec = function(clubId) {
        for (let i = 0; i < this.props.currUserInfo.accs.length; i++) {
            if (this.props.currUserInfo.accs[i].clubsExecOf.includes(clubId)) {
                return true;
            }
        }
        return false;;
    }

    isFollowing = function(clubId) {
        for (let i = 0; i < this.props.currUserInfo.accs.length; i++) {
            if (this.props.currUserInfo.accs[i].clubsFollowing.includes(clubId)) {
                return true;
            }
        }
        return false;
    }

    isMember = function(clubId) {
        for (let i = 0; i < this.props.currUserInfo.accs.length; i++) {
            if (this.props.currUserInfo.accs[i].clubsMemberOf.includes(clubId)) {
                return true;
            }
        }
        return false;
    }

    render() {
        return(
            <div id="ClubInfoContainer">
                <div id="InfoContents">
                    <div id="ClubNameText">
                        <strong>{this.props.userInfo.profileName}</strong>
                    </div>
                    <span id="ClubButtons">
                        {//this.isFollowing(this.props.userInfo.id) &&
                        true &&
                            <CustomButton
                                width="100px"
                                height="35px"
                                variant="outline"
                                buttonText="Follow"
                                backgroundColor="lightgray"
                                border="1px gray solid"
                                margin="5px"
                            />
                        }

                        {//!this.isFollowing(this.props.userInfo.id) &&
                        true &&
                        <CustomButton
                            width="110px"
                            height="35px"
                            variant="outline"
                            buttonText="Unfollow"
                            backgroundColor="lightgray"
                            border="1px gray solid"
                            margin="5px"
                        />
                    }

                        {//this.isExec(this.props.userInfo.id) && 
                        true &&
                            <CustomButton
                                width="125px"
                                height="35px"
                                variant="outline"
                                buttonText="New Post"
                                backgroundColor="lightgray"
                                border="1px gray solid"
                                margin="5px"
                            />
                        }

                        {//!this.isMember(this.props.userInfo.id) &&
                        true &&
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

                        {//this.isMember(this.props.userInfo.id) &&
                        true &&
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
                        {this.props.userInfo.bioText}
                    </div>
                </div>
            </div>
        )
    }
}

export default ClubInfo;