import React from 'react';
import Navbar from '../Navbar';
import FeedCard from '../FeedCard';
import './style.css';
import { getClub} from '../../actions/clubActions.js'
import { getPostByPosterID } from '../../actions/postActions.js'
import { withRouter } from 'react-router-dom';
import { uid } from "react-uid";


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

  componentDidMount = () => {
    let tempPosts = []
    let clubIds = this.collectIds()
    for(let i = 0; i < clubIds.length; i++){
      getPostByPosterID(clubIds[i]).then(clubPosts => {

        if(clubPosts.status){
          if(clubPosts.status === 401){
            alert('Your session has timed out. Please log back in.')
            this.props.history.push("/")
          }
          else{
            alert("An error has occurred.")
          }
          return
        }

        for(let j = 0; j < clubPosts.length; j++){
          tempPosts.push(clubPosts[j])
        }

        this.setState({
          posts: tempPosts
        }, () => {
          let tempFeeds = []
          for(let i = 0; i < this.state.posts.length; i++){
            let pic = null 
            let postClub = null
            getClub(this.state.posts[i].posterID).then(club => {

              postClub = club
              pic = postClub.profilePicture
      
              tempFeeds.push(<FeedCard clubImage={pic} postTime={this.state.posts[i].date} 
                                 postContent={this.state.posts[i].content} postClubName={postClub.name}>
                         </FeedCard>)
              this.setState({
                feeds: tempFeeds
              })
            }, err => console.log(err))
          }
        })
      }, err => console.log(err))
    }

    
  }

  render() {
    const { loggedInUser, appContext } = this.props

    const displayFeeds = this.state.feeds.map(feedCard => <li className='listElement' key={uid(feedCard)}>{feedCard}</li>)


    return (
      <div>
        <Navbar  logoPic='https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-6.png' 
           loggedInUser={loggedInUser} appContext={appContext}>
        </Navbar>
        <div className='feedsContainer'>
        {(this.state.feeds.length === 0) ? 
          <div id="noFollowing">You're not following any clubs yet.</div> :
          displayFeeds
        }
        </div>
      </div>
      )
  
  }
}

export default withRouter(FeedPage);