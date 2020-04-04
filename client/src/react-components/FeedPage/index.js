import React from 'react';
import Navbar from '../Navbar';
import FeedCard from '../FeedCard';
import './style.css';
import { getClub} from '../../actions/clubActions.js'
import { getPostByPosterID } from '../../actions/postActions.js'
import { withRouter } from 'react-router-dom';
import { uid } from "react-uid";
import Spinner from 'react-bootstrap/Spinner';

class FeedPage extends React.Component{

  state = {
    posts: [],
    feeds: []
  }

mergeArrsWithoutDuplicates = (arr1, arr2) => {
  let res = arr1.concat(arr2)
  res = res.filter(function(item, pos) {return res.indexOf(item) === pos})
  return res;
}

collectIds = () => {
  let ids = []
  let timelineOpts = this.props.loggedInUser.timelineOpts;
 

  if (timelineOpts[0]) {
      ids = this.mergeArrsWithoutDuplicates(ids, this.props.loggedInUser.clubsFollowing)
  }

  if (timelineOpts[1]) {
      ids = this.mergeArrsWithoutDuplicates(ids, this.props.loggedInUser.clubsMemberOf)
  }

  if (timelineOpts[2]) {
      ids = this.mergeArrsWithoutDuplicates(ids, this.props.loggedInUser.clubsExecOf)
  }

  return ids;
}

  componentDidMount = async () => {
    let tempPosts = []
    let tempFeeds = []
    let clubIds = this.collectIds()
    for (let i = 0; i < clubIds.length; i++) {
      try{
        let clubPosts = await getPostByPosterID(clubIds[i])
        if (clubPosts.status) {
          if (clubPosts.status === 401) {
            alert('Your session has timed out. Please log back in.')
            this.props.history.push("/")
          } else {
            alert("An error has occurred.")
          }
          return;
        }

        for(let j = 0; j < clubPosts.length; j++){
          tempPosts.push(clubPosts[j])
        }

        tempPosts = tempPosts.sort(function(a, b) {
          let aDate = new Date(a.date)
          let bDate = new Date(b.date)
          return bDate - aDate;
        })
      } catch (error) {
        console.log(error)
        console.log("An error occurred")
        this.props.history.push('/')
      }
    }

    try {
      for (let k = 0; k < tempPosts.length; k++) {
        let pic = null 
        let postClub = null 
        let club = await getClub(tempPosts[k].posterID)
        postClub = club
        pic = postClub.profilePicture

        tempFeeds.push(<FeedCard clubImage={pic} postTime={tempPosts[k].date} 
                        postContent={tempPosts[k].content} postClubName={postClub.name}>
                       </FeedCard>)
      }
    } catch (error) {
      console.log(error)
      console.log("An error occurred")
      this.props.history.push('/')
    }

    this.setState({
      posts: tempPosts,
      feeds: tempFeeds,
      loaded: true
    })
  }

  render() {
    const { loggedInUser, appContext } = this.props
    const displayFeeds = this.state.feeds.map(feedCard => <li className='listElement' key={uid(feedCard)}>{feedCard}</li>)


    return (
      <div>
        <Navbar  logoPic='https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-6.png' 
           loggedInUser={loggedInUser} appContext={appContext}>
        </Navbar>
        {this.state.loaded ?
            <div className='feedsContainer'>
              <h1 id='timelineHeader'>Timeline</h1>
              {(this.state.feeds.length === 0) ? 
                <div id="notFollowingTxt">You're not following any clubs yet.</div> :
                displayFeeds
              }
            </div>
           :
          <div id='loadingDiv'><Spinner animation='border'/></div>
        }
      </div>
      )
  
  }
}

export default withRouter(FeedPage);