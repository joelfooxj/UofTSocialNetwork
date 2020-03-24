import React from 'react';
import Navbar from '../Navbar';
import FeedCard from '../FeedCard';
import { withRouter } from 'react-router-dom';
import './style.css';
import { Container, Row, Col } from 'react-bootstrap'
import Jumbotron from 'react-bootstrap/Jumbotron'


class FeedPage extends React.Component{
  render() {
    const { changeSignInStatus, loggedInUser, allPosts, allClubs, makeEventDecision, appContext} = this.props;
    
      var feeds = []
      for (let i=0;i<allPosts.length;i++){
        feeds.push(<FeedCard posterPic={allPosts[i].poster} eventTime={allPosts[i].date} 
        eventPlace={allPosts[i].place} eventTitle={allPosts[i].title} 
        eventDetail={allPosts[i].content} eventClubName={allClubs[allPosts[i].clubID-1].name}>
          </FeedCard>)
      }
      
    
    return (
      <div>
        <Navbar changeSignInStatus={changeSignInStatus} logoPic='https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-6.png' 
          status={true} loggedInUser={loggedInUser} appContext={appContext}>
        </Navbar>
        <div className='feedsContainer'>
        
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

export default withRouter(FeedPage);