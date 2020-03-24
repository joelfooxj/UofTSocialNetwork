import React from 'react';
import UserProfileField from "./../UserProfileField"
import "./style.css"
import Checkbox from '@material-ui/core/Checkbox';
import { withRouter } from 'react-router-dom';
import CustomButton from "./../CustomButton"
import UserProfileImage from "./../UserProfileImage"
import Navbar from './../Navbar'

//actions
import {updateUserRecord, deleteUser, updatePassword} from '../../actions/accountActions';


class UserProfilePage extends React.Component{
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
                        onChange={(attrVal) => {updateUserRecord(userInfo._id, "username", attrVal).then((res) => {console.log(res)})}}//TODO:{this.props.changeAccInfo(account.id, "username", attrVal)}}
                    />
                    <UserProfileField
                        label={"Password"}
                        name={"password"}
                        type={"password"}
                        defaultValue={"notarealpassword"}
                        disabled={true}
                        onChange={(attrVal) => {updatePassword(userInfo._id, attrVal).then((res) => {console.log(res)})}} //TODO:{this.props.changeAccInfo(account.id, "password", attrVal)}}
                    />
                    <UserProfileField
                        label={"First Name"}
                        name={"firstName"}
                        type={"text"}
                        defaultValue={userInfo.firstName}
                        disabled={true}
                        onChange={(attrVal) => {updateUserRecord(userInfo._id, "firstName", attrVal).then((res) => {console.log(res)})}} //TODO{this.props.changeAccInfo(account.id, "firstName", attrVal)}}
                    />
                    <UserProfileField
                        label={"Last Name"}
                        name={"lastName"}
                        type={"text"}
                        defaultValue={userInfo.lastName}
                        disabled={true}
                        onChange={(attrVal) => {updateUserRecord(userInfo._id, "lastName", attrVal).then((res) => {console.log(res)})}} //TODO{this.props.changeAccInfo(account.id, "lastName", attrVal)}}
                    />
                    <UserProfileField
                        label={"Email"}
                        name={"email"}
                        type={"text"}
                        defaultValue={userInfo.email}
                        disabled={true}
                        onChange={(attrVal) => {updateUserRecord(userInfo._id, "email", attrVal).then((res) => {console.log(res)})}} //TODO{this.props.changeAccInfo(account.id, "email", attrVal)}}
                    />
                
                    <div id="checkboxDiv">
                        <h1 id="timelineOptsHeader">Receive timeline updates from:</h1>
                        <Checkbox 
                                color={"primary"}
                                label={"Clubs I am a part of"}
                                checked={userInfo.timelineOpts[0]}
                                onChange={() => {const newOpts = [!userInfo.timelineOpts[0], userInfo.timelineOpts[1], userInfo.timelineOpts[2]]; updateUserRecord(userInfo._id, "timelineOpts", newOpts).then((res) => {console.log(res)})}}//TODO{this.props.changeAccTimelineOpts(account.id, 0)}}
                                >
                        </Checkbox>
                        <span>Clubs I follow</span>
                        
                        <br></br>
                        <Checkbox 
                                color={"primary"}
                                label={"Clubs I follow"}
                                checked={userInfo.timelineOpts[1]}
                                onChange={() => {const newOpts = [userInfo.timelineOpts[0], !userInfo.timelineOpts[1], userInfo.timelineOpts[2]]; updateUserRecord(userInfo._id, "timelineOpts", newOpts).then((res) => {console.log(res)})}} //TODO {this.props.changeAccTimelineOpts(account.id, 1)}}
                                >
                        </Checkbox>
                        <span>Clubs I am a part of</span>
                        <br></br>
                        <Checkbox 
                                color={"primary"}
                                checked={userInfo.timelineOpts[2]}
                                onChange={() => {const newOpts = [userInfo.timelineOpts[0], userInfo.timelineOpts[1], !userInfo.timelineOpts[2]]; updateUserRecord(userInfo._id, "timelineOpts", newOpts).then((res) => {console.log(res)})}} //TODO{this.props.changeAccTimelineOpts(account.id, 2)}}
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
                    onClick={() => {this.props.history.push("/"); deleteUser(userInfo._id).then((res) => {console.log(res)})}}//TODO: this.props.deleteAcc(account.id)}}
                >
                    
                </CustomButton>
            </div>
            
        );
    }
}
  

export default withRouter(UserProfilePage);
