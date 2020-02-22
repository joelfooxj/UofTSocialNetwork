import React from 'react';
import UserProfileField from "./../UserProfileField"
import "./style.css"
import { withRouter } from 'react-router-dom';


class UserProfilePage extends React.Component{

    /*THIS FUNCTION WILL UPDATE THE DATABASE WITH NEW ACCOUNT INFO, FOR NOW IT DOES NOTHING*/
    changeAccountInfo = () => {
        console.log("NOT IMPLEMENTED")
    }

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
                    onChange={this.changeAccountInfo}
                />
                <UserProfileField
                    label={"Password"}
                    name={"password"}
                    type={"password"}
                    defaultValue={account.password}
                    disabled={true}
                    onChange={this.changeAccountInfo}
                />
                <UserProfileField
                    label={"First Name"}
                    name={"firstName"}
                    type={"text"}
                    defaultValue={account.firstName}
                    disabled={true}
                    onChange={this.changeAccountInfo}
                />
                <UserProfileField
                    label={"Last Name"}
                    name={"lastName"}
                    type={"text"}
                    defaultValue={account.lastName}
                    disabled={true}
                    onChange={this.changeAccountInfo}
                />
                <UserProfileField
                    label={"Email"}
                    name={"email"}
                    type={"text"}
                    defaultValue={account.email}
                    disabled={true}
                    onChange={this.changeAccountInfo}
                />
            </div>
        );
    }
}
  

export default withRouter(UserProfilePage);
