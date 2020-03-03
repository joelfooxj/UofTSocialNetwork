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
import {changeAccInfo, changeAccTimelineOpts, deleteAccount} from './actions/accountActions';
import ClubDashboard from './react-components/ClubDashboard/ClubDashboard';
import AdminDashboard from './react-components/AdminDashboard/AdminDashboard';
import BrowseAllClubs from "./react-components/BrowseAllClubs/index";

//
import Navbar from './react-components/Navbar';
import EventTimePlace from './react-components/EventTimePlace';
// tempoary classes for storeing testing objects only 

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
  

  state = {
    signedIn: false,
    permission: 0, // 0 - reg user, 1 - admin
    execOf: [],
    accountId: -1,
    accounts: info.Accs
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

  

  followClub(inf, clubID) {
    let newCurrUserInfo = inf.state.currUserInfo;
    let newUserInfo = inf.state.userInfo;
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

    inf.setState({
      currUserInfo: newCurrUserInfo,
      userInfo: newUserInfo
    });

  }

  unfollowClub(inf, clubID) {
    let newCurrUserInfo = inf.state.currUserInfo;
    let newUserInfo = inf.state.userInfo;
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
      userInfo: newUserInfo
    });
  }

  makePost(timeline, postContent) {
    let newPost = <ClubPost
                    id={timeline.lastID + 1}
                    clubName={timeline.props.userInfo.profileName}
                    profilePic={timeline.props.userInfo.profilePic}
                    postContent={postContent}
                    timeline={timeline}
                    removePost={this.removePost}
                    isExec={timeline.isExec(timeline.props.userInfo.id)}
                  />
    timeline.lastID += 1;
    let newPosts = timeline.state.posts;
    newPosts.unshift(newPost)
    timeline.setState({
      posts: newPosts
    })
  }

  removePost(timeline, post) {
    let newPosts = timeline.state.posts;
    let target = -1;

    for (let i = 0; i < newPosts.length; i++) {
      if (newPosts[i].props.id === post.props.id) {
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

  joinClub(clubID) {
    ;
  }

  leaveClub(clubID) {
    ;
  }

  createAccount = (username, permissions, password, firstName, lastName, email) => {
    const newAcc = new info.Account(username, permissions, [], this.state.accounts[this.state.accounts.length - 1].id + 1, password, firstName, lastName, email)
    const accs = this.state.accounts
    accs.push(newAcc)
    this.setState({
      accounts: accs
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
                            (<LogInPage 
                              changeSignInStatus={this.changeSignInStatus.bind(this)}
                              accounts={this.state.accounts}
                            />)}/>
            <Route exact path='/CreateAccPage' render={() => 
                            (<CreateAccPage createAccAction={this.createAccount}/>)}/>
            <Route exact path='/FeedPage' render={() => 
                            (this.state.signedIn ?
                              <FeedPage 
                              changeSignInStatus={this.changeSignInStatus.bind(this)}
                              userInfo={{accs: this.state.accounts,
                                          id: this.state.accountId,
                                            }}
                              allPosts={info.Posts}
                              allClubs={info.Clubs}
                              makeEventDecision={this.makeEventDecision}
                            /> :
                            <Redirect to='/'/>)}
            />
            <Route exact path='/Following' render={() => 
                            (this.state.signedIn ?
                              <FollowingPage 
                              changeSignInStatus={this.changeSignInStatus.bind(this)}
                              userInfo={{accs: this.state.accounts,
                                          id: this.state.accountId,
                                            }}
                              allClubs={info.Clubs}
                            /> :
                            <Redirect to='/'/>)}
            />
            <Route exact path='/UserProfilePage' render={() =>
                            (this.state.signedIn && !this.state.isAdmin?
                              <UserProfilePage 
                                userInfo={{accs: this.state.accounts,
                                            id: this.state.accountId,
                                            }
                                        }
                                changeAccInfo={(accId, attrName, attrVal) => {changeAccInfo(this, info.Accs, accId, attrName, attrVal)}}
                                changeAccTimelineOpts={(accId, optionIndex) => {changeAccTimelineOpts(this, info.Accs, optionIndex, accId)}}
                                deleteAcc={(accId) => {deleteAccount(this, accId, info.Accs)}}
                              /> : 
                              <Redirect to='/'/>)}
            />
            <Route exact path='/csc309' render={() => 
                            (this.state.signedIn ?
                              <ClubProfilePage 
                                clubInfo={info.Clubs[0]}
                                currUserInfo={{id: this.state.accountId,
                                               accs: this.state.accounts,
                                               isAdmin: this.state.isAdmin}}
                                addPost={this.makePost}
                                getClubPosts={this.getClubPosts}
                                followClub={this.followClub}
                                unfollowClub={this.unfollowClub}
                                removePost={this.removePost}
                                joinClub={this.joinClub}
                                leaveClub={this.leaveClub}
                              /> :
                              <Redirect to='/'/>)}
            />
            <Route exact path='/uoft' render={() => 
                          (this.state.signedIn ?
                            <ClubProfilePage 
                              clubInfo={info.Clubs[1]}
                              currUserInfo={{id: this.state.accountId,
                                             accs: this.state.accounts,
                                             isAdmin: this.state.isAdmin}}
                              addPost={this.makePost}
                              getClubPosts={this.getClubPosts}
                              followClub={this.followClub}
                              unfollowClub={this.unfollowClub}
                              removePost={this.removePost}
                              joinClub={this.joinClub}
                              leaveClub={this.leaveClub}
                            /> :
                            <Redirect to='/'/>)}
            />
            <Route exact path='/team11' render={() => 
                          (this.state.signedIn ? 
                            <ClubProfilePage 
                              clubInfo={info.Clubs[2]}
                              currUserInfo={{id: this.state.accountId,
                                             accs: this.state.accounts,
                                             isAdmin: this.state.isAdmin}}
                              addPost={this.makePost}
                              getClubPosts={this.getClubPosts}
                              followClub={this.followClub}
                              unfollowClub={this.unfollowClub}
                              removePost={this.removePost}
                              joinClub={this.joinClub}
                              leaveClub={this.leaveClub}
                           /> : 
                           <Redirect to='/'/>)}
            />
            <Route exact path='/ClubDashboard' render={ () => 
              (this.state.signedIn ? <ClubDashboard users={info.Accs} posts={info.Posts} currentUser={this.state}/> : <Redirect to='/'/>) }/>
            <Route exact path='/AdminDashboard' render={() => 
              (this.state.signedIn && this.state.isAdmin ? <AdminDashboard accounts={info.Accs} clubs={info.Clubs}/> : <Redirect to='/'/>) }/>
            <Route exact path='/browseAllClubs' render={() => 
            (this.state.signedIn ? 
              <BrowseAllClubs allClubs={info.Clubs} currentUserID={this.state.accountId} userIsAdmin={this.state.isAdmin}/> : 
              <Redirect to='/'/>) }/>
          </Switch>
        </BrowserRouter>
    );
  }
}
  

export default App;