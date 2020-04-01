import React from 'react';
import Navbar from '../Navbar';
import FeedCard from '../FeedCard';
import { withRouter } from 'react-router-dom';
import './style.css';
import { Container, Row, Col } from 'react-bootstrap'
import Jumbotron from 'react-bootstrap/Jumbotron'
import { getAllPosts } from '../../actions/postActions.js'
import { getClub, getAllClubs} from '../../actions/clubActions.js'
import { getPostByPosterID } from '../../actions/postActions.js'

class FeedPage extends React.Component{

  /*
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
    clubsExecOf: {
		type: Array
	},
	clubsMemberOf: {
		type: Array
	},
	clubsFollowing: {
		type: Array
	},
	clubsAwaitingJoin: {
  }
*/

mergeArrsWithoutDuplicates = (arr1, arr2) => {
  let res = arr1.concat(arr2)
  res = res.filter(function(item, pos) {return res.indexOf(item) === pos})
  return res;
}

collectIds = () => {
  let ids = []
  let timelineOpts = this.props.loggedInUser.timelineOpts;

  if (timelineOpts[0]) {
      ids = this.mergeArrsWithoutDuplicates(ids, this.props.loggedInUser.clubsMemberOf)
  }

  if (timelineOpts[1]) {
      ids = this.mergeArrsWithoutDuplicates(ids, this.props.loggedInUser.clubFollowing)
  }

  if (timelineOpts[2]) {
      ids = this.mergeArrsWithoutDuplicates(ids, this.props.loggedInUser.clubsExecOf)
  }

  return ids;
}

  render() {
    const { loggedInUser, loggedInStatus, makeEventDecision, changeSignInStatus, appContext } = this.props

    let posts = []
    let clubIds = this.collectIds()
    for(let i = 0; i < clubIds.length; i++){
      getPostByPosterID(clubIds[i]).then(clubPosts => posts.push(clubPosts), err => console.log(err))
    }
     
    console.log(clubIds)
    console.log(posts) //TODO: REMOVE
    
    let feeds = []
    for(let i = 0; i < posts.length; i++){

      let pic = null 
      let postClub = null
      getClub(posts[i].posterID).then(club => postClub = club, err => console.log(err))

      pic = postClub.profilePicture


      feeds.push(<FeedCard posterPic={pic} eventTime={posts[i].date} 
                           eventPlace={posts[i].location} eventTitle={posts[i].title} 
                           eventDetail={posts[i].content} eventClubName={postClub.name}>
                 </FeedCard>)
    }
    

    /*
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
      
    }*/


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