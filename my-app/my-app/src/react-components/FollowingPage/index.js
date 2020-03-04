import React from 'react'
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap'
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
		const { changeSignInStatus, userInfo, allClubs } = this.props;
		const user = userInfo.accs[userInfo.id-1];
		var followingObject = []
		
		let a = []

		for (let i=0;i<allClubs.length;i++){
			let club = null
			if(user.clubsFollowing.includes(allClubs[i].clubID)){
				club = allClubs[i]
				followingObject.push(new ClubFollowing(club.profilePic, club.name, club.members.length-club.execs.length))
			}
		}
		const elements = followingObject.map( club => <ClubFollowingCard clubProfile={club.clubProfile} clubName={club.clubName} clubFollowing={club.clubFollowing} /> );

		return (
		<div>
		<Navbar changeSignInStatus={changeSignInStatus} logoPic='https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-6.png' 
          status={true} user={user}>
        </Navbar>

		{elements}
		</div>
			);
	}
}

export default withRouter(FollowingPage);