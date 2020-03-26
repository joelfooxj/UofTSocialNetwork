import React from 'react';
import UserProfileField from "./../UserProfileField"
import "./style.css"
import Checkbox from '@material-ui/core/Checkbox';
import { withRouter } from 'react-router-dom';
import CustomButton from "./../CustomButton"
import UserProfileImage from "./../UserProfileImage"
import Navbar from './../Navbar'

//actions
import {updateUserRecord, deleteUser, updatePassword, readCookie} from '../../actions/accountActions';


class UserProfilePage extends React.Component{

    state = {
        displayTimelineOpts: this.props.userInfo.timelineOpts
    }
    render(){
        const {userInfo} = this.props;
        return (
            <div id="mainDiv">
                <Navbar logoPic='https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-6.png' 
                  status={true} loggedInUser={userInfo}>
                </Navbar>
                <img id="bannerImgDiv" src={require("./static/headingBanner.png")} alt="Heading Banner"/>
                <UserProfileImage id={"profileImg"}/>
                <div id="userProfilePageInfo">
                    <h1>General Info</h1>
                    <UserProfileField
                        label={"Username"}
                        name={"username"}
                        type={"text"}
                        defaultValue={userInfo.username}
                        disabled={true}
                        userID={userInfo._id}
                        id={"usernameIn"}
                    />
                    <UserProfileField
                        label={"Password"}
                        name={"password"}
                        type={"text"}
                        defaultValue={"New Password"}
                        disabled={true}
                        userID={userInfo._id}
                        id={"passIn"}
                    />
                    <UserProfileField
                        label={"First Name"}
                        name={"firstName"}
                        type={"text"}
                        defaultValue={userInfo.firstName}
                        disabled={true}
                        userID={userInfo._id}
                        id={"fisrtNameIn"}
                    />
                    <UserProfileField
                        label={"Last Name"}
                        name={"lastName"}
                        type={"text"}
                        defaultValue={userInfo.lastName}
                        disabled={true}
                        userID={userInfo._id}
                        id={"lastNameIn"}
                    />
                    <UserProfileField
                        label={"Email"}
                        name={"email"}
                        type={"text"}
                        defaultValue={userInfo.email}
                        disabled={true}
                        userID={userInfo._id}
                        id={"emailIn"}
                    />
                
                    <div id="checkboxDiv">
                        <h1 id="timelineOptsHeader">Receive timeline updates from:</h1>
                        <Checkbox 
                                color={"primary"}
                                label={"Clubs I am a part of"}
                                checked={this.state.displayTimelineOpts[0]}
                                onChange={() => {userInfo.timelineOpts[0] = !userInfo.timelineOpts[0]; updateUserRecord(userInfo._id, "timelineOpts", userInfo.timelineOpts).then((res) => {console.log(res); this.setState({displayTimelineOpts: userInfo.timelineOpts})})}}
                                >
                        </Checkbox>
                        <span>Clubs I follow</span>
                        
                        <br></br>
                        <Checkbox 
                                color={"primary"}
                                label={"Clubs I follow"}
                                checked={this.state.displayTimelineOpts[1]}
                                onChange={() => {userInfo.timelineOpts[1] = !userInfo.timelineOpts[1]; updateUserRecord(userInfo._id, "timelineOpts", userInfo.timelineOpts).then((res) => {console.log(res); this.setState({displayTimelineOpts: userInfo.timelineOpts})})}}
                                >
                        </Checkbox>
                        <span>Clubs I am a part of</span>
                        <br></br>
                        <Checkbox 
                                color={"primary"}
                                checked={this.state.displayTimelineOpts[2]}
                                onChange={() => {userInfo.timelineOpts[2] = !userInfo.timelineOpts[2];  updateUserRecord(userInfo._id, "timelineOpts", userInfo.timelineOpts).then((res) => {console.log(res); this.setState({displayTimelineOpts: userInfo.timelineOpts})})}}
                                >
                        </Checkbox>
                        <span>Clubs I am an executive of</span>
                    </div>
                </div>
                
                <CustomButton
                    id={"delAccButton"}
                    variant={"outlined"}
                    disableElevation={false}
                    buttonText={"Delete Account"}
                    textColor={"#ff0000"}
                    borderColor={"#ff0000"}
                    width={"150px"}
                    height={"30px"}
                    padding={"0px"}
                    top={"-75px"}
                    left={"555px"}
                    fontSize={"10px"}
                    onClick={() => {this.props.history.push("/"); deleteUser(userInfo._id).then((res) => {console.log(res)})}}
                >
                    
                </CustomButton>
            </div>
            
        );
    }
}
  

export default withRouter(UserProfilePage);
