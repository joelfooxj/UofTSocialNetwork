import React from 'react'
import './style.css';
import ClubFollowingCard from '../ClubFollowingCard'
import {CardColumns, Container} from 'react-bootstrap'
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
        ids = this.mergeArrsWithoutDuplicates(ids, this.props.userInfo.clubsFollowing)
        return ids;
    }

	clubToCardMap = (club) => {
		return(
			<ClubFollowingCard
				clubProfile={club.profilePicture}
				clubName={club.name}
				clubID={club._id}
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
					console.log(`There was a problem retrieving clubs. Status: ${club.status}`)
					
					if (club.status === 401) {
						alert('Your session has timed out. Please log back in.')
						this.props.history.push('/')
					} else {
						this.props.history.goBack()
					}

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
		return(
			<div>
				<Navbar 
					logoPic='https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-6.png'
					loggedInUser={this.props.userInfo} 
					appContext={this.props.appContext}
				/>

				{this.state.loaded ?
					<React.Fragment>
						<div className='clublist'>
							{(this.state.elements.length === 0) ? 
								<div id="noFollowing">You're not following any clubs yet.</div> :
								<Container><CardColumns>{this.state.elements}</CardColumns></Container>
							}
						</div>
					</React.Fragment> :
					<div id="loadingDiv">
						<Spinner animation="border"/>
					</div>
				}
			</div>
		) 
	}
}

export default withRouter(FollowingPage);