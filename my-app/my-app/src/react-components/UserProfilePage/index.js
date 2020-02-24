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
        return (
            <div id="userProfilePage">
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
            </div>
        );
    }
}
  

export default withRouter(UserProfilePage);
