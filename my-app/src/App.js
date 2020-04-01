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
import {changeAccInfo, changeAccTimelineOpts, deleteAccount, changeSignInStatus} from './actions/accountActions';
import ClubDashboard from './react-components/ClubDashboard/ClubDashboard';
import AdminDashboard from './react-components/AdminDashboard/AdminDashboard';
import BrowseAllClubs from "./react-components/BrowseAllClubs/index";
import CreateClubPage from './react-components/ClubCreationPage/index'

//
import Navbar from './react-components/Navbar';
import EventTimePlace from './react-components/EventTimePlace';
// tempoary classes for storeing testing objects only 
import {readCookie, makeEventDecision} from './actions/accountActions';

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
                                loggedInUser={this.state.loggedInUser}
                                loggedInStatus={this.state.signedIn}
                                makeEventDecision={makeEventDecision}
                                changeSignInStatus={changeSignInStatus}
                                appContext={this}
                                /> :
                            
                            <LogInPage logInContext={this}/>)}
            />
            <Route exact path='/Following' render={() => 
                            (this.state.loggedInUser ?
                              <FollowingPage 
                              userInfo={this.state.loggedInUser}
                              loggedInStatus={this.state.signedIn}
                              changeSignInStatus={changeSignInStatus}
                              appContext={this}
                            /> :
                            <Redirect to='/'/>)}
            />
            <Route exact path='/UserProfilePage' render={() =>
                            (this.state.loggedInUser ?
                              <UserProfilePage 
                                userInfo={this.state.loggedInUser}
                                context={this}
                             /> : 
                              <LogInPage logInContext={this}/>)}
            />
            {/*SOMETHING HAS TO BE DONE WITH THESE, WE CAN POTENTIALLY HAVE AN INDEFINITE NUMBER OF CLUBS*/ }
            <Route path='/club/:id' render={(props) => 
              (this.state.signedIn ?
                <ClubProfilePage {...props} userInfo={this.state.loggedInUser} rootContext={this}/> :
                <Redirect to='/'/>)
            }/>
            <Route path='/createClub' render={ () => 
              (this.state.loggedInUser ? 
                <CreateClubPage userInfo={this.state.loggedInUser}/> : 
                <Redirect to='/'/>
              )
            }/>
            <Route exact path='/ClubDashboard/:id' render={ () => 
              (this.state.loggedInUser ? <ClubDashboard currentUser={this.state.loggedInUser}/> : <LogInPage logInContext={this}/>) }/>
            <Route exact path='/AdminDashboard' render={() => 
              (this.state.loggedInUser && this.state.loggedInUser.permissions === 1 ? 
              <AdminDashboard user={ this.state.loggedInUser } /> : <LogInPage logInContext={this}/>) }/>
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