import React from 'react'
import './style.css';
import ClubFollowingCard from '../ClubFollowingCard'
import Navbar from '../Navbar'
import { withRouter } from 'react-router-dom';
import { getAllPosts } from '../../actions/postActions.js'
import { getClub } from '../../actions/clubActions.js'
import Spinner from 'react-bootstrap/Spinner';

class ClubFollowing {
	constructor(profile, name, follower, type){
		this.clubProfile=profile
		this.clubName = name
		this.clubFollowing = follower
		this.type = type
	}
}

class FollowingPage extends React.Component{
	state = {
		elements: [],
		loaded: false
	}

	mergeArrsWithoutDuplicates = (arr1, arr2) => {
        let res = arr1.concat(arr2)
        res = res.filter(function(item, pos) {return res.indexOf(item) === pos})
        return res;
    }

    collectIds = () => {
        let ids = []
        let timelineOpts = this.props.userInfo.timelineOpts;
        if (timelineOpts[0]) {
            ids = this.mergeArrsWithoutDuplicates(ids, this.props.userInfo.clubsMemberOf)
        }

        if (timelineOpts[1]) {
            ids = this.mergeArrsWithoutDuplicates(ids, this.props.userInfo.clubsFollowing)
        }

        if (timelineOpts[2]) {
            ids = this.mergeArrsWithoutDuplicates(ids, this.props.userInfo.clubsExecOf)
        }

        return ids;
    }

	clubToCardMap = (club) => {
		let type = ""

		if (this.props.userInfo.clubsFollowing.includes(club._id)) {
			if (type === "") {
				type = "Follower"
			} else {
				type = type.concat('/Follower')
			}
		}

		if (this.props.userInfo.clubsMemberOf.includes(club._id)) {
			if (type === "") {
				type = "Member"
			} else {
				type = type.concat('/Member')
			}
		}

		if (this.props.userInfo.clubsExecOf.includes(club._id)) {
			if (type === "") {
				type = "Executive"
			} else {
				type = type.concat('/Executive')
			}
		}

		return(
			<ClubFollowingCard
				clubProfile={club.profilePicture}
				clubName={club.name}
				clubFollowing={club.members.length - club.execs.length}
				type={type}
			/>
		)
	}

	getFollowingClubs = async () => {
		try {
			let ids = this.collectIds()
			let newElements = []

			for (let i = 0; i < ids.length; i++) {
				let club = await getClub(ids[i]);

				if (club.status) {
					alert(`There was a problem retrieving clubs. Status: ${club.status}`)
					this.props.history.goBack()
					return;
				} else {
					newElements.push(club)
				}
			}

			newElements = newElements.map(this.clubToCardMap)

			this.setState({
				elements: newElements,
				loaded: true
			})
		} catch (error) {
			alert("Fatal error");
			console.log(error)
			this.props.history.push('/');
		}
	}

	componentDidMount() {
		this.getFollowingClubs()
	}

	render() {
		if (this.state.loaded) {
			return(
				<div>
					<Navbar 
						logoPic='https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-6.png'
						loggedInUser={this.props.userInfo} 
						appContext={this.props.appContext}
					/>

					<div className='clublist'>
						{(this.state.elements.length === 0) ? 
							<span>You're not following any clubs yet.</span> :
							this.state.elements
						}
					</div>
				</div>
			)
		} else {
			return(
				<Spinner animation="border"/>
			)
		}
	}

	// render(){
	// 	const { userInfo, loggedInStatus, changeSignInStatus, appContext} = this.props;
	// 	let followingObject = []
	// 	let count =0
	// 	getAllClubs().then((allClubs)=>{
	// 		for (let i=0;i<allClubs.length;i++){
	// 			let club = null
	// 			club = getClub(allClubs[i])
	// 			if(userInfo.clubsFollowing.includes(club._id)){
	// 				count+=1
	// 				followingObject.push(new ClubFollowing(club.profilePicture, club.name, club.members.length-club.execs.length, 'following'))
	// 			}else if (userInfo.clubsMemberOf.includes(club.clubID)){
	// 				followingObject.push(new ClubFollowing(club.profilePicture, club.name, club.members.length-club.execs.length, 'memberOf'))
	// 				count+=1
	// 			}else if (userInfo.clubsExecOf.includes(club.clubID)){
	// 				followingObject.push(new ClubFollowing(club.profilePicture, club.name, club.members.length-club.execs.length, 'execsOf'))
	// 				count+=1
	// 			}
	// 		}
	// 	}).catch((e)=>{});
		
	// 	let elements = followingObject.map( club => <ClubFollowingCard clubProfile={club.clubProfile} clubName={club.clubName} clubFollowing={club.clubFollowing} type={club.type} /> );
		
	// 	return (
	// 		<div>
	// 		<Navbar logoPic='https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-6.png' 
	// 		loggedInUser={userInfo} appContext={appContext}>
	// 		</Navbar>
	// 		<div className='clublist'>
	// 			{elements}
	// 		</div>
	// 		</div>
	// 	);
	// }
}

export default withRouter(FollowingPage);