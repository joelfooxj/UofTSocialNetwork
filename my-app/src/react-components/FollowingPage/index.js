import React from 'react'
import './style.css';
import ClubFollowingCard from '../ClubFollowingCard'
import Navbar from '../Navbar'
import { withRouter } from 'react-router-dom';
import { getAllPosts } from '../../actions/postActions.js'
import { getClub, getAllClubs } from '../../actions/clubActions.js'

class ClubFollowing {
	constructor(profile, name, follower, type){
		this.clubProfile=profile
		this.clubName = name
		this.clubFollowing = follower
		this.type = type
	}
}

class FollowingPage extends React.Component{

	render(){
		const { userInfo, loggedInStatus, changeSignInStatus, appContext} = this.props;
		const allClubs = getAllClubs()
		console.log(allClubs)
		let followingObject = []
		let count =0
		console.log(userInfo)
		for (let i=0;i<allClubs.length;i++){
			let club = null

			club = getClub(allClubs[i])
			console.log(club)
			if(userInfo.clubsFollowing.includes(club._id)){
				count+=1
				followingObject.push(new ClubFollowing(club.profilePicture, club.name, club.members.length-club.execs.length, 'following'))
			}else if (userInfo.clubsMemberOf.includes(club.clubID)){
				followingObject.push(new ClubFollowing(club.profilePicture, club.name, club.members.length-club.execs.length, 'memberOf'))
				count+=1
			}else if (userInfo.clubsExecOf.includes(club.clubID)){
				followingObject.push(new ClubFollowing(club.profilePicture, club.name, club.members.length-club.execs.length, 'execsOf'))
				count+=1
			}
		}
		console.log(count)

		let elements = followingObject.map( club => <ClubFollowingCard clubProfile={club.clubProfile} clubName={club.clubName} clubFollowing={club.clubFollowing} type={club.type} /> );
		
		return (
			<div>
			<Navbar logoPic='https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-6.png' 
			loggedInUser={userInfo} appContext={appContext}>
			</Navbar>
			<div className='clublist'>
				{elements}
			</div>
			</div>
		);
	}
}

export default withRouter(FollowingPage);