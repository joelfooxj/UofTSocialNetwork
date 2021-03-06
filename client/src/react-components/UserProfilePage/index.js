import React from 'react';
import UserProfileField from "./../UserProfileField"
import "./style.css"
import Checkbox from '@material-ui/core/Checkbox';
import { withRouter } from 'react-router-dom';
import CustomButton from "./../CustomButton"
import Navbar from './../Navbar'

//actions
import {updateUserRecord, deleteUser, updatePassword, readCookie} from '../../actions/accountActions';


class UserProfilePage extends React.Component{

    state = {
        displayTimelineOpts: this.props.userInfo.timelineOpts
    }

    componentDidMount = async () => {
        let req = new Request('/users/check-session', {
            method: 'GET', 
            headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
            }
        })

        try{
            const res = await fetch(req)
            if(res.status === 401){
                alert('Your session has timed out. Please log back in.')
                this.props.history.push('/')
            }
            
          }
          catch(err){
            throw new Error(err)
          }
    }

    render(){
        let userInfo = this.props.userInfo

        const {context} = this.props;

        return (
            <div id="mainDiv">
                <Navbar logoPic='https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-6.png' 
                  status={true} loggedInUser={userInfo} appContext={this.props.context}>
                </Navbar>
                <img id="bannerImgDiv" src={require("./static/headingBanner.png")} alt="Heading Banner"/>
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
                        context={context}
                    />
                    <UserProfileField
                        label={"Password"}
                        name={"password"}
                        type={"text"}
                        defaultValue={"New Password"}
                        disabled={true}
                        userID={userInfo._id}
                        id={"passIn"}
                        context={context}
                    />
                    <UserProfileField
                        label={"First Name"}
                        name={"firstName"}
                        type={"text"}
                        defaultValue={userInfo.firstName}
                        disabled={true}
                        userID={userInfo._id}
                        id={"fisrtNameIn"}
                        context={context}
                    />
                    <UserProfileField
                        label={"Last Name"}
                        name={"lastName"}
                        type={"text"}
                        defaultValue={userInfo.lastName}
                        disabled={true}
                        userID={userInfo._id}
                        id={"lastNameIn"}
                        context={context}
                    />
                    <UserProfileField
                        label={"Email"}
                        name={"email"}
                        type={"text"}
                        defaultValue={userInfo.email}
                        disabled={true}
                        userID={userInfo._id}
                        id={"emailIn"}
                        context={context}
                    />
                
                    <div id="checkboxDiv">
                        <h1 id="timelineOptsHeader">Receive timeline updates from:</h1>
                        <Checkbox 
                                color={"primary"}
                                label={"Clubs I am a part of"}
                                checked={userInfo.timelineOpts[0]}
                                onChange={() => {
                                    userInfo.timelineOpts[0] = !userInfo.timelineOpts[0];
                                    updateUserRecord(userInfo._id, "timelineOpts", userInfo.timelineOpts, context)
                                    .then((res) => {
                                        if(res === 200){
                                            this.setState({displayTimelineOpts: userInfo.timelineOpts})
                                        }
                                        else if(res === 401){
                                            alert('Your session has timed out. Please log back in.')
                                            this.props.history.push('/')
                                        }
                                        else{
                                            alert(`An error occurred, status code: ${res}`)
                                        }
                                    })
                                }}
                                >
                        </Checkbox>
                        <span>Clubs I follow</span>
                        
                        <br></br>
                        <Checkbox 
                                color={"primary"}
                                label={"Clubs I follow"}
                                checked={userInfo.timelineOpts[1]}
                                onChange={() => {
                                    userInfo.timelineOpts[1] = !userInfo.timelineOpts[1];
                                    updateUserRecord(userInfo._id, "timelineOpts", userInfo.timelineOpts, context)
                                    .then((res) => {
                                        if(res === 200){
                                            this.setState({displayTimelineOpts: userInfo.timelineOpts})
                                        }
                                        else if(res === 401){
                                            alert('Your session has timed out. Please log back in.')
                                            this.props.history.push('/')
                                        }
                                        else{
                                            alert(`An error occurred, status code: ${res}`)
                                        }
                                    })
                                }}
                                >
                        </Checkbox>
                        <span>Clubs I am a part of</span>
                        <br></br>
                        <Checkbox 
                                color={"primary"}
                                label={"Clubs I am an exec of"}
                                checked={this.state.displayTimelineOpts[2]}
                                onChange={() => {
                                    userInfo.timelineOpts[2] = !userInfo.timelineOpts[2];
                                    updateUserRecord(userInfo._id, "timelineOpts", userInfo.timelineOpts, context)
                                    .then((res) => {
                                        if(res === 200){
                                            this.setState({displayTimelineOpts: userInfo.timelineOpts})
                                        }
                                        else if(res === 401){
                                            alert('Your session has timed out. Please log back in.')
                                            this.props.history.push('/')
                                        }
                                        else{
                                            alert(`An error occurred, status code: ${res}`)
                                        }
                                    })
                                }}

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
                    top={"-20vh"}
                    left={"555px"}
                    fontSize={"10px"}
                    onClick={() => {
                        this.props.history.push("/");
                        deleteUser(userInfo._id)
                        .then((res) => {
                            if(res === 401){
                                alert('Your session has timed out. Please log back in.')
                                this.props.history.push('/')
                            }
                            else{
                                console.log(res)
                            }
                        })
                    }}
                >
                    
                </CustomButton>
            </div>
            
        );
    }
}
  

export default withRouter(UserProfilePage);
