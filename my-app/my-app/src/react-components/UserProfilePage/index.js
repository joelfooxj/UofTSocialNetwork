import React from 'react';
import UserProfileField from "./../UserProfileField"
import "./style.css"

class UserProfilePage extends React.Component{

    state = {
        username: "",
        password: "",
        email: "",
        lastName: "",
        firstName: "",
    }

    //TODO: THESE ARE TEMPORARY HARDCODED VALUES
    Account = function(username, permission, clubsExecOf, accID, password, firstName, lastName, email){
        this.username = username
        this.permission = permission
        this.clubsExecOf = clubsExecOf
        this.id = accID
        this.password = password
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
    }
    accs = [
        new this.Account("user", 0, ["UofT PTSD Support Group"], 1, "user", "user", "user", "user@user.com"),
        new this.Account("mike1995", 0, ["UofT Students Anonymous"], 2, "password", "mike", "johnson", "mike@gmail.com"),
        new this.Account("admin", 1, [], 3, "admin", "admin", "admin", "admin@admin.com")
    ]

    /*THIS FUNCTION OR SOME SIMILAR ONE WILL COMMUNICATE WITH OUR DATABASE
    TO RETRIEVE USER DATA, FOR NOW IT IS HARD CODED TO SIMULATE THE DATABASE.
    
    REFRESHING THIS PAGE WILL LOG YOU OUT UNTIL THE BACK END IS PROPERLY IMPLEMENTED
    WITH LOG IN EXPIRATION
    */
    pullUserInfo(){
        let userAcc = null
        for(let i = 0; i < this.accs.length; i++){
            if(this.accs[i].id == this.props.userAccId){
                userAcc = this.accs[i]
            }
        }
        this.setState({
            username: userAcc.username,
            password: userAcc.password,
            email: userAcc.email,
            firstName: userAcc.firstName,
            lastName: userAcc.lastName,
        })
    }

    componentWillMount(){
        this.pullUserInfo()
    }

   
    render(){
        return (
            <div id="userProfilePage">
                <UserProfileField className="infoField"
                    label={"Username"}
                    name={"usernameField"}
                    type={"text"}
                    defaultValue={this.state.username}
                    disabled={true}
                />
                <UserProfileField className="infoField"
                    label={"Password"}
                    name={"passwordField"}
                    type={"password"}
                    defaultValue={this.state.password}
                    disabled={true}
                />
                <UserProfileField className="infoField"
                    label={"Name"}
                    name={"nameField"}
                    type={"text"}
                    defaultValue={this.state.firstName + " " + this.state.lastName}
                    disabled={true}
                />
                <UserProfileField className="infoField"
                    label={"Email"}
                    name={"emailField"}
                    type={"text"}
                    defaultValue={this.state.email}
                    disabled={true}
                />
            </div>
        );
    }
}
  

export default UserProfilePage;
