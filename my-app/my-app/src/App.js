import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';


import LogInPage from './react-components/LogInPage';
import CreateAccPage from './react-components/CreateAccPage';
import UserProfilePage from './react-components/UserProfilePage';
import ClubProfilePage from './react-components/ClubProfilePage';
import info from "./tempInfo";
import AdminDashboard from './react-components/AdminDashboard/AdminDashboard';

class App extends React.Component{

  //TODO: THESE ARE TEMPORARY HARDCODED VALUES
  

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
  changeAccInfo = (accId, attrName, attrVal) => {
    for(let i = 0; i < info.Accs.length; i++){
      if(info.Accs[i].id === accId){
        info.Accs[i][attrName] = attrVal
      }
    }

    this.setState({
      accounts: info.Accs
    })
  }

  changeAccTimelineOpts = (accId, optionIndex) =>{
    for(let i = 0; i < info.Accs.length; i++){
      if(info.Accs[i].id === accId){
        info.Accs[i].timelineOpts[optionIndex] = !info.Accs[i].timelineOpts[optionIndex]
      }
    }

    this.setState({
      accounts: info.Accs
    })
  }

  deleteAccount = (accId) => {
      let newAccounts = []
      for(let i = 0; i < this.state.accounts.length; i++){
        if(!(this.state.accounts[i].id === accId)){
          newAccounts.push(this.state.accounts[i])
        }
      }
      this.setState({
        accounts: newAccounts
      })
  }

  followClub(inf, clubID) {
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

    inf.setState({
      currUserInfo: newCurrUserInfo,
      clubInfo: newClubInfo
    });

  }

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

  makePost(timeline, postContent) {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;
    console.log(today);

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

    console.log(target)
    if ((target >= 0) && !newClubInfo.requests.includes(newCurrUserInfo.id)) {
      newClubInfo.requests.push(newCurrUserInfo.id);
    }

    inf.setState({
      currUserInfo: newCurrUserInfo,
      clubInfo: newClubInfo
    });
  }

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

    console.log(target)
    console.log(newClubInfo.members)
    if ((target >= 0) && newClubInfo.members.includes(newCurrUserInfo.id)) {
      let val = newClubInfo.members.indexOf(newCurrUserInfo.id);
      newClubInfo.members.splice(val, 1);
    }

    inf.setState({
      currUserInfo: newCurrUserInfo,
      clubInfo: newClubInfo
    });
  }


  createAccount = (username, permissions, password, firstName, lastName, email) => {
    const newAcc = new info.Account(username, permissions, [], this.state.accounts[this.state.accounts.length - 1].id + 1, password, firstName, lastName, email)
    const accs = this.state.accounts
    accs.push(newAcc)
    this.setState({
      accounts: accs
    })
  }

  render(){
    console.log(info)
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
                            (this.state.signedIn ?
                              <UserProfilePage 
                                userInfo={{accs: this.state.accounts,
                                            id: this.state.accountId,
                                            }
                                        }
                                changeAccInfo={this.changeAccInfo}
                                changeAccTimelineOpts={this.changeAccTimelineOpts}
                                deleteAcc={this.deleteAccount}
                              /> : 
                              <Redirect to='/'/>)}/>
            <Route exact path='/csc309' render={() => 
                            (this.state.signedIn ?
                              <ClubProfilePage 
                                clubInfo={info.Clubs[0]}
                                currUserInfo={{id: this.state.accountId,
                                               accs: this.state.accounts}}
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
                                             accs: this.state.accounts}}
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
                                             accs: this.state.accounts}}
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
            <Route exact path='/AdminDashboard' render={ () => (<AdminDashboard accounts={info.Accs} clubs={info.Clubs}/>) }/>
          </Switch>
        </BrowserRouter>
    );
  }
}
  

export default App;