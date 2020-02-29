import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter} from 'react-router-dom';


import LogInPage from './react-components/LogInPage';
import CreateAccPage from './react-components/CreateAccPage';
import UserProfilePage from './react-components/UserProfilePage';
import ClubProfilePage from './react-components/ClubProfilePage';
import ClubPost from './react-components/ClubPost';
import Accs from './tempInfo';
import Account from './tempInfo';

class App extends React.Component{

  //TODO: THESE ARE TEMPORARY HARDCODED VALUES
  

  state = {
    signedIn: false,
    permission: 0, // 0 - reg user, 1 - admin
    execOf: [],
    accountId: -1,
    accounts: Accs
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
    for(let i = 0; i < Accs.length; i++){
      if(Accs[i].id === accId){
        Accs[i][attrName] = attrVal
      }
    }

    this.setState({
      accounts: Accs
    })
  }

  changeAccTimelineOpts = (accId, optionIndex) =>{
    for(let i = 0; i < Accs.length; i++){
      if(Accs[i].id === accId){
        Accs[i].timelineOpts[optionIndex] = !Accs[i].timelineOpts[optionIndex]
      }
    }

    this.setState({
      accounts: Accs
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

    console.log(newCurrUserInfo.accs[target].clubsFollowing)
    if ((target >= 0) && newCurrUserInfo.accs[target].clubsFollowing.includes(clubID)) {
      let index = newCurrUserInfo.accs[target].clubsFollowing.indexOf(clubID)
      newCurrUserInfo.accs[target].clubsFollowing.splice(index, 1)
    }
    console.log(newCurrUserInfo.accs[target].clubsFollowing)

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
    const newAcc = new Account(username, permissions, [], this.state.accounts[this.state.accounts.length - 1].id + 1, password, firstName, lastName, email)
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
            <Route exact path='/ClubProfilePage' render={() => 
                            (<ClubProfilePage 
                                userInfo={{profileName: "Lorem Ipsum Club",
                                          id: 0,
                                          isClub: true,
                                          bioText: `Lorem ipsum dolor sit amet, consectetur adipiscing 
                                                    elit. Donec pharetra sodales nunc. Sed facilisis, orci 
                                                    sed ornare vulputate, metus orci rutrum felis, viverra 
                                                    hendrerit magna felis vitae mauris. Aliquam posuere fringilla
                                                    dolor, id varius risus feugiat sit amet. Aliquam vitae lacus
                                                    quis nisl vestibulum scelerisque. Nunc rhoncus mauris 
                                                    eu quam faucibus tempus. Maecenas blandit magna quis 
                                                    odio scelerisque, a convallis urna porta. Class aptent 
                                                    taciti sociosqu ad litora torquent per conubia nostra, 
                                                    per inceptos himenaeos. Mauris placerat leo ac tellus 
                                                    pretium, ac tincidunt tellus feugiat. Donec risus erat, 
                                                    tempus et velit id, molestie consectetur mauris. Fusce 
                                                    vitae leo nec risus rhoncus fringilla in vel neque. Cra
                                                    sed odio interdum, varius risus non, pulvinar nunc. Morbi
                                                    fermentum dolor lectus, commodo blandit diam eleifend 
                                                    eget. Etiam sed porta orci. Fusce posuere malesuada lectus,
                                                    a dignissim risus placerat a. Proin quis purus nec erat
                                                    viverra rutrum id sed nisl. Ut ut arcu laoreet, 
                                                    porttitor diam bibendum, molestie metus. Mauris nec 
                                                    ornare elit, non laoreet nisl. Maecenas in ultrices elit.`,
                                         profilePic: require("./react-components/ClubProfilePage/static/profilepic.png"),
                                         bannerImage: require("./react-components/ClubProfilePage/static/bannerimage.jpg"),
                                        }}
                                currUserInfo={{id: this.state.accountId,
                                               accs: this.state.accounts}}
                                addPost={this.makePost}
                                getClubPosts={this.getClubPosts}
                                followClub={this.followClub}
                                unfollowClub={this.unfollowClub}
                                removePost={this.removePost}
                              />)}
              />
          </Switch>
        </BrowserRouter>
    );
  }
}
  

export default App;