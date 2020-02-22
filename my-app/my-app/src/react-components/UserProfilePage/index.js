import React from 'react';
import UserProfileField from "./../UserProfileField"
import "./style.css"
import { withRouter } from 'react-router-dom';


class UserProfilePage extends React.Component{

    /*THIS FUNCTION WILL UPDATE THE DATABASE WITH NEW ACCOUNT INFO, FOR NOW IT DOES NOTHING*/


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
        console.log(this.props.userInfo.changeAccInfo)
        return (
            <div id="userProfilePage">
                <UserProfileField
                    label={"Username"}
                    name={"username"}
                    type={"text"}
                    defaultValue={account.username}
                    disabled={true}
                    onChange={this.props.changeAccInfo}
                />
                <UserProfileField
                    label={"Password"}
                    name={"password"}
                    type={"password"}
                    defaultValue={account.password}
                    disabled={true}
                    onChange={this.props.changeAccInfo}
                />
                <UserProfileField
                    label={"First Name"}
                    name={"firstName"}
                    type={"text"}
                    defaultValue={account.firstName}
                    disabled={true}
                    onChange={this.props.changeAccInfo}
                />
                <UserProfileField
                    label={"Last Name"}
                    name={"lastName"}
                    type={"text"}
                    defaultValue={account.lastName}
                    disabled={true}
                    onChange={this.props.changeAccInfo}
                />
                <UserProfileField
                    label={"Email"}
                    name={"email"}
                    type={"text"}
                    defaultValue={account.email}
                    disabled={true}
                    onChange={this.props.changeAccInfo}
                />
            </div>
        );
    }
}
  

export default withRouter(UserProfilePage);
