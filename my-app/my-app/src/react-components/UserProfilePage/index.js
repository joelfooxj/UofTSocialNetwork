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
                    name={"username"}
                    type={"text"}
                    defaultValue={account.username}
                    disabled={true}
                />
                <UserProfileField
                    label={"Password"}
                    name={"password"}
                    type={"password"}
                    defaultValue={account.password}
                    disabled={true}
                />
                <UserProfileField
                    label={"First Name"}
                    name={"firstName"}
                    type={"text"}
                    defaultValue={account.firstName}
                    disabled={true}
                />
                <UserProfileField
                    label={"Last Name"}
                    name={"lastName"}
                    type={"text"}
                    defaultValue={account.lastName}
                    disabled={true}
                />
                <UserProfileField
                    label={"Email"}
                    name={"email"}
                    type={"text"}
                    defaultValue={account.email}
                    disabled={true}
                />
            </div>
        );
    }
}
  

export default withRouter(UserProfilePage);
