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
    let clubsID = []
    if (followClubs){
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
    getAllPosts().then((posts)=>{
    let feedPosts = []
        for (let i=0;i<posts.length;i++){
          if (clubIDs.includes(posts[i].posterID)){
            feedPosts.push(posts[i])
          }
        }
        return feedPosts
    }).catch((e)=>{
        return
    })
    
  }

  render() {
    // const { changeSignInStatus, loggedInUser, allPosts, allClubs, makeEventDecision, appContext} = this.props;
    const { loggedInUser, loggedInStatus, makeEventDecision, changeSignInStatus, appContext } = this.props
    const allClubs = this.getAllClubsIDInFeed(loggedInUser)
    const allPosts = this.getAllPostsInFeed(allClubs)
    let feeds = []
    for (let i=0;i<allPosts.length;i++){
      getClub(allPosts[i].posterID).then((post)=>{
        feeds.push(<FeedCard posterPic={allPosts[i].image} eventTime={allPosts[i].date} 
      eventPlace={allPosts[i].location} eventTitle={allPosts[i].title} 
      eventDetail={allPosts[i].content} eventClubName={post.name}>
        </FeedCard>)
      }).catch((e)=>{})
      
    }
      

    return (
      <div>
        <Navbar  logoPic='https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-6.png' 
           loggedInUser={loggedInUser} appContext={appContext}>
        </Navbar>
        <div className='feedsContainer'>
          {feeds}
        </div>
      </div>
      )
  
  }
}

export default FeedPage;