import React from 'react'
import './style.css';
import ClubFollowingCard from '../ClubFollowingCard'
import Navbar from '../Navbar'
import { withRouter } from 'react-router-dom';
import { getClub } from '../../actions/clubActions.js'
import Spinner from 'react-bootstrap/Spinner';

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
}

export default withRouter(FollowingPage);