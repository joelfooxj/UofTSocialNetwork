import React from 'react';
import UserProfileField from "./../UserProfileField"
import "./style.css"
import Checkbox from '@material-ui/core/Checkbox';
import { withRouter } from 'react-router-dom';
import CustomButton from "./../CustomButton"
import UserProfileImage from "./../UserProfileImage"

class UserProfilePage extends React.Component{

    //THIS FUNCTION WILL QUERY THE DATABASE FOR THE CORRECT ACCOUNT INFORMATION
    getAccount(){
        let accs = this.props.location.state.accounts
        let id = this.props.location.state.accountId

        for(let i = 0; i < accs.length; i++){
            if(accs[i].id === id){
                return accs[i]
            }
        }

        return null
    }

    render(){
        const account = this.getAccount()
        return (
            <div id="mainDiv">
                <img id="bannerImgDiv" src={require("./static/headingBanner.png")} alt="Heading Banner"/>
                <UserProfileImage id={"profileImg"}/>
                <div id="userProfilePageInfo">
                    <h1>General Info</h1>
                    <UserProfileField
                        label={"Username"}
                        name={"username"}
                        type={"text"}
                        defaultValue={account.username}
                        disabled={true}
                        onChange={(attrVal) => {this.props.changeAccInfo(account.id, "username", attrVal)}}
                    />
                    <UserProfileField
                        label={"Password"}
                        name={"password"}
                        type={"password"}
                        defaultValue={account.password}
                        disabled={true}
                        onChange={(attrVal) => {this.props.changeAccInfo(account.id, "password", attrVal)}}
                    />
                    <UserProfileField
                        label={"First Name"}
                        name={"firstName"}
                        type={"text"}
                        defaultValue={account.firstName}
                        disabled={true}
                        onChange={(attrVal) => {this.props.changeAccInfo(account.id, "firstName", attrVal)}}
                    />
                    <UserProfileField
                        label={"Last Name"}
                        name={"lastName"}
                        type={"text"}
                        defaultValue={account.lastName}
                        disabled={true}
                        onChange={(attrVal) => {this.props.changeAccInfo(account.id, "lastName", attrVal)}}
                    />
                    <UserProfileField
                        label={"Email"}
                        name={"email"}
                        type={"text"}
                        defaultValue={account.email}
                        disabled={true}
                        onChange={(attrVal) => {this.props.changeAccInfo(account.id, "email", attrVal)}}
                    />
                
                    <div id="checkboxDiv">
                        <h1 id="timelineOptsHeader">Receive timeline updates from:</h1>
                        <Checkbox 
                                color={"primary"}
                                label={"Clubs I am a part of"}
                                checked={account.timelineOpts[0]}
                                onChange={() => {this.props.changeAccTimelineOpts(account.id, 0)}}
                                >
                        </Checkbox>
                        <span>Clubs I follow</span>
                        
                        <br></br>
                        <Checkbox 
                                color={"primary"}
                                label={"Clubs I follow"}
                                checked={account.timelineOpts[1]}
                                onChange={() => {this.props.changeAccTimelineOpts(account.id, 1)}}
                                >
                        </Checkbox>
                        <span>Clubs I am a part of</span>
                        <br></br>
                        <Checkbox 
                                color={"primary"}
                                checked={account.timelineOpts[2]}
                                onChange={() => {this.props.changeAccTimelineOpts(account.id, 2)}}
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
                    onClick={() => {this.props.history.push("/"); this.props.deleteAcc(account.id)}}
                >
                    
                </CustomButton>
            </div>
            
        );
    }
}
  

export default withRouter(UserProfilePage);
