import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter} from 'react-router-dom';
import {Redirect} from "react-router";

import FeedPage from './react-components/FeedPage';
import FollowingPage from './react-components/FollowingPage' 
import LogInPage from './react-components/LogInPage';
import CreateAccPage from './react-components/CreateAccPage';
import UserProfilePage from './react-components/UserProfilePage';
import ClubProfilePage from './react-components/ClubProfilePage';
import ClubPost from './react-components/ClubPost';
import info from "./tempInfo";
//import {changeAccInfo, changeAccTimelineOpts, deleteAccount, changeSignInStatus} from './actions/accountActions';
import ClubDashboard from './react-components/ClubDashboard/ClubDashboard';
import AdminDashboard from './react-components/AdminDashboard/AdminDashboard';
import BrowseAllClubs from "./react-components/BrowseAllClubs/index";

//
import Navbar from './react-components/Navbar';
import EventTimePlace from './react-components/EventTimePlace';
// tempoary classes for storeing testing objects only 
import {readCookie} from './actions/accountActions';

class userObject {
  constructor(type, name){
    this.userType = type
    this.userName = name
    this.userProfile = 'https://assets.currencycloud.com/wp-content/uploads/2018/01/profile-placeholder.gif'
    if (type!='admin'){
      this.followingClub = []
      this.managingClub = []
      this.requests = []
    }
  }
}
const admin = new userObject('admin', 'ADMIN')
const userNoClub = new userObject('user', 'inactivist')

//

class App extends React.Component{

  constructor(props){
    super(props)
    readCookie(this)
  }

  state = {
    signedIn: false,
    accountCreationFailed: false,
    //new properties
    loggedInUser: null,
  }

  changeAccountCreationState = (newState) => {
    this.setState({
      accountCreationFailed: newState
    })
  }

  makeEventDecision = (account, postId, decision) =>{
    if (decision in ['going','notgoing', 'interested']){
      account.eventDecision[postId] = decision
    }
  }

  render(){
    return (
      <BrowserRouter>
          <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
            <Route exact path='/' render={() => 
                            (<LogInPage logInContext={this}/>)}/>
            <Route exact path='/CreateAccPage' render={() => 
                            (<CreateAccPage 
                                            changeAccCreateState={this.changeAccountCreationState}
                                            accCreateState={this.state.accountCreationFailed}
                            />)}/>
            <Route exact path='/FeedPage' render={({history}) => 
                            (this.state.loggedInUser && this.state.loggedInUser.permissions === 0 ?
                              <FeedPage 
                              appContext={this}
                              loggedInUser={this.state.loggedInUser}
                              history={history}
                              allPosts={info.Posts}
                              allClubs={info.Clubs}
                              makeEventDecision={this.makeEventDecision} //import this from an action file
                            /> :
                            <LogInPage logInContext={this}/>)}
            />
            <Route exact path='/Following' render={() => 
                            (this.state.loggedInUser ?
                              <FollowingPage 
                              userInfo={this.state.loggedInUser}
                              allClubs={info.Clubs} //TODO: REMOVE THIS, IT IS NOT NECESSARY ONCE WE START USING OUR DB
                            /> :
                            <Redirect to='/'/>)}
            />
            <Route exact path='/UserProfilePage' render={() =>
                            (this.state.loggedInUser ?
                              <UserProfilePage 
                                userInfo={this.state.loggedInUser}
                               // userInfo={{accs: this.state.accounts,
                                //            id: this.state.accountId,
                               //             }
                                //        }
                                //changeSignInStatus={this.changeSignInStatus.bind(this)}
                                //changeAccInfo={(accId, attrName, attrVal) => {changeAccInfo(this, info.Accs, accId, attrName, attrVal)}}
                                //changeAccTimelineOpts={(accId, optionIndex) => {changeAccTimelineOpts(this, info.Accs, optionIndex, accId)}}
                                //deleteAcc={(accId) => {deleteAccount(this, accId, info.Accs)}}
                              /> : 
                              <LogInPage logInContext={this}/>)}
            />
            {/*SOMETHING HAS TO BE DONE WITH THESE, WE CAN POTENTIALLY HAVE AN INDEFINITE NUMBER OF CLUBS*/ }
            <Route path='/club/:id' render={(props) => 
              //(this.state.signedIn ?
                <ClubProfilePage {...props} userInfo={this.state.loggedInUser}/> 
                //<Redirect to='/'/>)
            }/>
            <Route exact path='/ClubDashboard' render={ () => 
              (this.state.loggedInUser ? <ClubDashboard users={info.Accs} posts={info.Posts} currentUser={this.state}/> : <LogInPage logInContext={this}/>) }/>
            <Route exact path='/AdminDashboard' render={() => 
              (this.state.loggedInUser && this.state.loggedInUser.permissions === 1 ? <AdminDashboard 
                user={ this.state.loggedInUser} 
                accounts={info.Accs} clubs={info.Clubs}/> : <LogInPage logInContext={this}/>) }/>
            <Route exact path='/browseAllClubs' render={() => 
            (this.state.loggedInUser ? 
              <BrowseAllClubs allClubs={info.Clubs} userInfo={this.state.loggedInUser}/> : 
              <LogInPage logInContext={this}/>) }/>
            
            
          </Switch>
        </BrowserRouter>
    );
  }
}
  

export default App;