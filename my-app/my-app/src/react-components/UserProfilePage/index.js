import React from 'react';
import UserProfileField from "./../UserProfileField"
import "./style.css"
import { withRouter } from 'react-router-dom';


class UserProfilePage extends React.Component{


    render(){
        const account = this.props.location.state.account
        return (
            <div id="userProfilePage">
                <UserProfileField
                    label={"Username"}
                    name={"usernameField"}
                    type={"text"}
                    defaultValue={account.username}
                    disabled={true}
                />
                <UserProfileField
                    label={"Password"}
                    name={"passwordField"}
                    type={"password"}
                    defaultValue={account.password}
                    disabled={true}
                />
                <UserProfileField
                    label={"Name"}
                    name={"nameField"}
                    type={"text"}
                    defaultValue={account.firstName + " " + account.lastName}
                    disabled={true}
                />
                <UserProfileField
                    label={"Email"}
                    name={"emailField"}
                    type={"text"}
                    defaultValue={account.email}
                    disabled={true}
                />
            </div>
        );
    }
}
  

export default withRouter(UserProfilePage);
