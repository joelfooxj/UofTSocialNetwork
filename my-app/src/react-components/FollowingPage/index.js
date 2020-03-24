import React from 'react'
import './style.css';
import ClubFollowingCard from '../ClubFollowingCard'
import Navbar from '../Navbar'
import { withRouter } from 'react-router-dom';

class ClubFollowing {
	constructor(profile, name, follwer){
		this.clubProfile=profile
		this.clubName = name
		this.clubFollowing = follwer
	}
}

class FollowingPage extends React.Component{
	render(){
		const {userInfo, allClubs } = this.props;

		//THIS HAS TO BE CHANGED TO USE OUR DB
		//ALSO, DON'T USE VAR
		var followingObject = []
		for (let i=0;i<allClubs.length;i++){
			let club = null
			if(userInfo.clubsFollowing.includes(allClubs[i].clubID)){
				club = allClubs[i]
				followingObject.push(new ClubFollowing(club.profilePic, club.name, club.members.length-club.execs.length))
				
			}
		}

		let elements = followingObject.map( club => <ClubFollowingCard clubProfile={club.clubProfile} clubName={club.clubName} clubFollowing={club.clubFollowing} /> );
		
		return (
			<div>
			<Navbar logoPic='https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-6.png' 
			status={true} loggedInUser={userInfo}>
			</Navbar>
			<div className='clublist'>
				{elements}
			</div>
			</div>
		);
	}
}

export default withRouter(FollowingPage);