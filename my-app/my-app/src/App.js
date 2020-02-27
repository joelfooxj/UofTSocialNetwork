import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter} from 'react-router-dom';


import LogInPage from './react-components/LogInPage';
import CreateAccPage from './react-components/CreateAccPage';
import UserProfilePage from './react-components/UserProfilePage';

class App extends React.Component{

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
    this.timelineOpts = [false, false, false] /*0 - timeline updates for clubs this user is a part of
                                                1 - timeline updates for clubs this user follows
                                                2 - timeline updates for clubs this user is an executive of
                                              */
  }
  accs = [
    new this.Account("user", 0, ["UofT PTSD Support Group"], 1, "user", "user", "user", "user@user.com"),
    new this.Account("mike1995", 0, ["UofT Students Anonymous"], 2, "password", "mike", "johnson", "mike@gmail.com"),
    new this.Account("admin", 1, [], 3, "admin", "admin", "admin", "admin@admin.com")
  ]

  state = {
    signedIn: false,
    permission: 0, // 0 - reg user, 1 - admin
    execOf: [],
    accountId: -1,
    accounts: this.accs
  }

  changeSignInStatus(val, id, perm, clubs){
    this.setState({
      signedIn: val,
      accountId: id,
      permission: perm,
      execOf: clubs
    })
  }

  //THE FOLLOWING FUNCTIONS WILL INTERFACE WITH THE DATABASE TO UPDATE THE CORRECT VALUES
  changeAccInfo = (accId, attrName, attrVal) => {
    for(let i = 0; i < this.accs.length; i++){
      if(this.accs[i].id === accId){
        this.accs[i][attrName] = attrVal
      }
    }

    this.setState({
      accounts: this.accs
    })
  }

  changeAccTimelineOpts = (accId, optionIndex) =>{
    for(let i = 0; i < this.accs.length; i++){
      if(this.accs[i].id === accId){
        this.accs[i].timelineOpts[optionIndex] = !this.accs[i].timelineOpts[optionIndex]
      }
    }

    this.setState({
      accounts: this.accs
    })
  }

  deleteAccount = (accId) => {
      let newAccounts = []
      for(let i = 0; i < this.state.accounts.length; i++){
        if(!(this.state.accounts[i].id === accId)){
          newAccounts.push(this.state.accounts[i])
        }
      }
      console.log(newAccounts)
      this.setState({
        accounts: newAccounts
      })
  }

  createAccount = (username, permissions, password, firstName, lastName, email) => {
    const newAcc = new this.Account(username, permissions, [], this.state.accounts.length + 1, password, firstName, lastName, email)
    const accs = this.state.accounts
    accs.push(newAcc)
    this.setState({
      accounts: accs
    })
  }

  render(){
    return (
      <BrowserRouter>
          <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
            <Route exact path='/' render={() => 
                            (<LogInPage 
                              changeSignInStatus={this.changeSignInStatus.bind(this)}
                              accounts={this.state.accounts}
                            />)}/>
            <Route exact path='/CreateAccPage' render={() => 
                            (<CreateAccPage createAccAction={this.createAccount}/>)}/>
            <Route exact path='/UserProfilePage' render={() =>
                            (<UserProfilePage 
                              userInfo={{accs: this.state.accounts,
                                           id: this.state.accountId,
                                          }
                                       }
                              changeAccInfo={this.changeAccInfo}
                              changeAccTimelineOpts={this.changeAccTimelineOpts}
                              deleteAcc={this.deleteAccount}
                            />)}/>
          </Switch>
        </BrowserRouter>
    );
  }
}
  

export default App;