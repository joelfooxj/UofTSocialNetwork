import React from 'react';
import './ClubDashboard.css';
import ClubStats from './clubStats/index'

//TODO: REMOVE AFTER DB ESTABLISHED
import tempData from '../../tempInfo.js';

// import MemberList from './MemberList/index.js';
// import RequestList from './clubList/index.js';

class ClubDashboard extends React.Component {
    constructor(props){
			super(props); 
			this.state={
				clubID: props.clubID,
        currentStats: {},
				members:[], 
				posts:[], 
				requests:[]
			}	
		}
		
		componentDidMount(){
			this.fetchData(); 
		}

		fetchData(){ 
			//TODO: fetch data from the DB here 

			const [Users, Clubs] = tempData; 
			const thisClub = Clubs.filter(club => club.clubID == this.state.clubID)[0];			
			this.setState({
				members: thisClub.members, 
				posts: thisClub.posts, 
				requests: thisClub.requests,
				currentStats: {	
					numMembers: thisClub.members.length,
					numRequests: thisClub.requests.length, 
					numPosts: thisClub.posts.length
				},
			});
		}

		deleteObject = (inType, inID)  => {
			//TODO: delete object from database

			// this.setState(inType === 'member' ? 
			// {userList: this.state.userList.filter(user => user.userID != inID)} : 
			// {clubList: this.state.clubList.filter(club => club.clubID != inID)});
		}

		goToObject = (inType, inID) => {
			// TODO: route to the relevant object page
			alert('going to ' + inType + inID); 
		}

    render(){
        return(
            <div className="clubDashboardContainer"> 
                <ClubStats 
                    statsList={[
											"No. of Members: " + this.state.currentStats.numMembers,
											"No. of Requests: " + this.state.currentStats.numRequests, 
											"No. of Posts: " + this.state.currentStats.numPosts
										]}
                />
            </div>
        );
    }
    
}

export default ClubDashboard;


