import React from 'react';
import Navbar from '../Navbar';
import FeedCard from '../FeedCard';
import { withRouter } from 'react-router-dom';
import './style.css';
import { Container, Row, Col } from 'react-bootstrap'
import Jumbotron from 'react-bootstrap/Jumbotron'
import { getAllPosts } from '../../actions/postActions.js'
import { getClub, getAllClubs } from '../../actions/clubActions.js'

class FeedPage extends React.Component{

  getAllClubsIDInFeed = function(user){
    const followClubs = user.timelineOpts[0]
    const partOf = user.timelineOpts[1]
    const exeOf = user.timelineOpts[2]
    var clubsID = []
    if (followClubs){
      // for (let i=0;i<user.clubsFollowing.length;i++){
      //   // clubId, clubName
      //   clubsName.pop(getClub(user.clubsFollowing[i]).name)
      // }
      clubsID = clubsID.concat(user.clubsFollowing)
    }
    if (partOf){
      clubsID = clubsID.concat(user.clubsMemberOf)
    }
    if (exeOf){
      clubsID = clubsID.concat(user.ExecOf)
    }
    return clubsID
  }

  getAllPostsInFeed = function(clubIDs){
    const allPosts = getAllPosts()
    var feedPosts = []
    for (let i=0;i<allPosts.length;i++){
      if (clubIDs.includes(allPosts[i].posterID)){
        feedPosts.push(allPosts[i])
      }
    }
    return feedPosts
  }

  render() {
    // const { changeSignInStatus, loggedInUser, allPosts, allClubs, makeEventDecision, appContext} = this.props;
    const { loggedInUser, loggedInStatus, makeEventDecision, changeSignInStatus, appContext } = this.props
    const allClubs = this.getAllClubsIDInFeed(loggedInUser)
    const allPosts = this.getAllPostsInFeed(allClubs)
    var feeds = []
    for (let i=0;i<allPosts.length;i++){
      feeds.push(<FeedCard posterPic={allPosts[i].image} eventTime={allPosts[i].date} 
      eventPlace={allPosts[i].location} eventTitle={allPosts[i].title} 
      eventDetail={allPosts[i].content} eventClubName={getClub(allPosts[i].posterID).name}>
        </FeedCard>)
    }
      

    return (
      <div>
        <Navbar  logoPic='https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-6.png' 
           loggedInUser={loggedInUser} appContext={appContext}>
        </Navbar>
        <div className='feedsContainer'>
          <p> place holder to demostrate usage</p>
          <FeedCard posterPic='https://cdn4.vectorstock.com/i/1000x1000/13/63/abstract-poster-event-template-vector-26151363.jpg' 
            eventTime='2020-2-29' eventPlace='Bahen Information Center' eventTitle='Pub night with xxx' eventDetail='    Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' eventClubName="xxx" >
          </FeedCard>
          
          <FeedCard posterPic='https://d1csarkz8obe9u.cloudfront.net/posterpreviews/landscape-polygon-dance-night-club-event-poster-template-7b992b14f8645fc966ef0288b6c30ed5_screen.jpg?ts=1561728036' 
            eventTime='2020-2-29' eventPlace='Bahen Information Center' eventTitle='Pub night with xxx' eventDetail='    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' eventClubName="xxx" >
          </FeedCard>
          {feeds}
        </div>
      </div>
      )
  
  }
}

export default FeedPage;