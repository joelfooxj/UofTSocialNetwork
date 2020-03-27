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

 

  //THE FOLLOWING FUNCTIONS WILL INTERFACE WITH THE DATABASE TO UPDATE THE CORRECT VALUES

  

 /*
   * Adds the current user to the club signified by the club id's following list.
   *
   * Note: This function will interface with the database once the backend has been implemented. 
  */
  followClub(inf, clubID) {
    // Find correct user
    let newCurrUserInfo = inf.state.currUserInfo;
    let newClubInfo = inf.state.clubInfo;
    let target = -1;
    for (let i = 0; i < newCurrUserInfo.accs.length; i++) {
      if (newCurrUserInfo.accs[i].id === newCurrUserInfo.id) {
        target = i;
        break;
      }
    }

    if ((target >= 0) && !newCurrUserInfo.accs[target].clubsFollowing.includes(clubID)) {
      newCurrUserInfo.accs[target].clubsFollowing.push(clubID);
    }

    // set info state to change button
    inf.setState({
      currUserInfo: newCurrUserInfo,
      clubInfo: newClubInfo
    });

  }


  /*
   * Removes the current user from the club signified by the club id's following list.
   *
   * Note: This function will interface with the database once the backend has been implemented. 
   */
  unfollowClub(inf, clubID) {
    let newCurrUserInfo = inf.state.currUserInfo;
    let newClubInfo = inf.state.clubInfo; 
    let target = -1;
    for (let i = 0; i < newCurrUserInfo.accs.length; i++) {
      if (newCurrUserInfo.accs[i].id === newCurrUserInfo.id) {
        target = i;
        break;
      }
    }

    if ((target >= 0) && newCurrUserInfo.accs[target].clubsFollowing.includes(clubID)) {
      let index = newCurrUserInfo.accs[target].clubsFollowing.indexOf(clubID)
      newCurrUserInfo.accs[target].clubsFollowing.splice(index, 1)
    }

    inf.setState({
      currUserInfo: newCurrUserInfo,
      clubInfo: newClubInfo 
    });
  }


  /*
   * Makes a new post on the given timeline.
   *
   * Note: This function will interface with the database once the backend has been implemented. 
   */
  makePost(timeline, postContent) {
    let today = new Date(); 
    let dd = String(today.getDate()).padStart(2, '0'); 
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    let yyyy = today.getFullYear(); 
    today = dd + '-' + mm + '-' + yyyy; 

    let newPost = { 
      postID: timeline.lastID + 1,
      title: "post" + String(timeline.lastID + 1),  
      content: postContent, 
      authorID: timeline.props.clubInfo.clubID, 
      date: today 
    }

    timeline.lastID += 1;
    let newPosts = timeline.state.posts;
    newPosts.unshift(newPost)
    timeline.setState({
      posts: newPosts
    })
  }


  /*
   * Deletes a given post from the given timeline.
   *
   * Note: This function will interface with the database once the backend has been implemented. 
   */
  removePost(timeline, post) {
    let newPosts = timeline.state.posts;
    let target = -1;

    for (let i = 0; i < newPosts.length; i++) {
      if (newPosts[i].postID === post.props.id) { 
        target = i;
        break;
      }
    }

    if (target >= 0) {
      newPosts.splice(target, 1);
    }

    timeline.setState({
      posts: newPosts
    })
  }

  /*
   * Requests a join to the club signified by the club id. This request must be granted or denied
   * by an admin level user.
   *
   * Note: This function will interface with the database once the backend has been implemented. 
   * */
  joinClub(inf, clubID) {
    let newCurrUserInfo = inf.state.currUserInfo;
    let newClubInfo = inf.state.clubInfo;
    let target = -1;

    for (let i = 0; i < newCurrUserInfo.accs.length; i++) {
      if (newCurrUserInfo.accs[i].id === newCurrUserInfo.id) {
        target = i;
        break;
      }
    }

    if ((target >= 0) && !newClubInfo.requests.includes(newCurrUserInfo.id)) {
      newClubInfo.requests.push(newCurrUserInfo.id);
    }

    inf.setState({ 
        currUserInfo: newCurrUserInfo, 
        clubInfo: newClubInfo 
      }); 
  }
   /* 
   * Removes the current user from the club signified by the given club id. 
      * Note: This function will interface with the database once the backend has been implemented. 
      * 
   */
   leaveClub(inf, clubID) {
    let newCurrUserInfo = inf.state.currUserInfo;
    let newClubInfo = inf.state.clubInfo;
    let target = -1;
    for (let i = 0; i < newCurrUserInfo.accs.length; i++) {
      if (newCurrUserInfo.accs[i].id === newCurrUserInfo.id) {
        target = i;
        break;
      }
    }

    if ((target >= 0) && newClubInfo.members.includes(newCurrUserInfo.id)) {
      let val = newClubInfo.members.indexOf(newCurrUserInfo.id);
      newClubInfo.members.splice(val, 1);
    }

    inf.setState({
      currUserInfo: newCurrUserInfo,
      clubInfo: newClubInfo
    });
  }
  
  
  //TODO: MOVE THIS OUT INTO A SEPARATE ACTION FILE. IN FACT DO THAT FOR ALL THESE FUNCTIONS THAT 
  //CLUTER THIS FILE
 

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