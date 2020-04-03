import React from 'react';
import Navbar from '../Navbar';
import FeedCard from '../FeedCard';
import './style.css';
import { getClub} from '../../actions/clubActions.js'
import { getPostByPosterID } from '../../actions/postActions.js'
import { withRouter } from 'react-router-dom';

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
      ids = this.mergeArrsWithoutDuplicates(ids, this.props.loggedInUser.clubsMemberOf)
  }

  if (timelineOpts[1]) {
      ids = this.mergeArrsWithoutDuplicates(ids, this.props.loggedInUser.clubsFollowing)
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
          tempPosts.push(clubPosts[i])
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
      
              tempFeeds.push(<FeedCard posterPic={pic} eventTime={this.state.posts[i].date} 
                                 eventPlace={this.state.posts[i].location} eventTitle={this.state.posts[i].title} 
                                 eventDetail={this.state.posts[i].content} eventClubName={postClub.name}>
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


    return (
      <div>
        <Navbar  logoPic='https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-6.png' 
           loggedInUser={loggedInUser} appContext={appContext}>
        </Navbar>
        <div className='feedsContainer'>
          {this.state.feeds}
        </div>
      </div>
      )
  
  }
}

export default withRouter(FeedPage);