import React from 'react';
import './ClubDashboard.css';
import ClubStats from './clubStats/index';
import MemberList from './memberList/index';
import ExecList from './ExecList/index';
import RequestList from './RequestList/index';
import PostList from './PostList/index';
import { Button } from '../../../node_modules/@material-ui/core'
import { withRouter, Link } from '../../../node_modules/react-router-dom'
import { getClub, updateClub } from '../../actions/clubActions'

class ClubDashboard extends React.Component {
    constructor(props){
			super(props);

			this.state={
				thisClub: {},
				members: [], 
				execs: [], 
				posts: [], 
				requests: [], 
				clubID: props.match.params.id, 
				loading:true
			}	
		}
		
		componentDidMount(){
			getClub(this.state.clubID).then(retObj => {
				if (retObj.status !== 200){
					alert(`Club ${this.state.clubID} does not exist`); 
					this.props.history.goBack();
				} else if (!(retObj.execs.includes(this.props.currentUser._id) || this.props.currentUser.permissions === 1)){
					alert("Unauthorized access"); 
					this.props.history.goBack();
				} else { 
					this.setState({ 
						thisClub: retClub,
						members: retClub.members, 
						execs: retClub.execs, 
						posts: retClub.posts, 
						requests: retClub.requests,
						loading:false
					});
				}
			}, error => {
				alert(`${error}: Cannot fetch club ${this.state.clubID}`); 
				this.props.history.goBack();
			});
		}

		deleteObject = async (inType, inID)  => {
			//TODO: change the arguments for inType in the children - members, execs, posts, requests
			try {
				const status = await updateClub(this.state.clubID, inType, this.state[inType].filter(o => o._id !== inID));
				if (status === 200){ 
					const objCopy = [...this.state[inType]]
					this.setState({
						[inType]: objCopy.filter(o => o._id !== inID)
					});	
				} else { 
					alert(`Unable to delete ${inType}[${inID}]`)
				}
			} catch (error) {
				alert(`${error}: Unable to delete ${inType}[${inID}]`);		
			}
		}

		onRequestApprove = (inUserID) => {
			try {
				const newRequests = this.state.requests.filter(r => r._id !== inUserID); 
				const newMembers = [...this.state.members];
				newMembers.push(inUserID);
				const reqStatus = await updateClub(this.state.clubID, "requests", newRequests);
				const memStatus = await updateClub(this.state.clubID, "members", newMembers);
				if (reqStatus === 200 && memStatus === 200) {
					this.setState({
						requests: newRequests, 
						members: newMembers
					});
				} else {
					alert(`There has been an error updating approval for ${inUserID}`)
				}
			} catch (error) {
				alert(`${error}: Unable to approve request for user ${inUserID}`)
			} 
		}

    render(){
				let returnPath = ''; 
				let returnText ='';
				if (this.props.currentUser.permission == 1){
					returnPath = "/AdminDashboard";
					returnText = "Return to Admin Dashboard";
				} 
				else if (this.state.execs.includes(this.props.currentUser._id)){
					returnPath = '/Following';
					returnText = 'Return to Following Clubs Page';
				}  
        return(
            <div className="clubDashboardContainer"> 
							<h1> {this.state.thisClub.name} Dashboard </h1> 
							<Link  
								to={`/club/${this.state.clubID}`}
								style={{ textDecoration:'none' }}>
								<Button 
									size="small"
									edge="end" 
									aria-label="join" 
									variant="outlined"
									color='primary'																			
									>																		
									Go to club profile page
								</Button>
							</Link> 
							<ClubStats 
								statsList={[
									"No. of Members: " + this.state.members.length,
									"No. of Requests: " + this.state.requests.length,
									"No. of Posts: " + this.state.posts.length,
									"No. of Executives: " + this.state.execs.length,
								]}
							/>
							<MemberList 
							users={this.state.members}
							onDelete={this.onDelete}/>
							<ExecList 
							users={this.state.execs}
							onDelete={this.onDelete}/>
							<RequestList 
							users={this.state.requests}
							onDelete={this.onDelete}
							onApprove={this.onRequestApprove}/>
							<PostList
							posts={this.state.posts}
							thisClubID={this.state.clubID}/>
							<Link
								to={returnPath} 
								style={{ textDecoration:'none' }}>
								<Button 
									size="small"
									edge="end" 
									aria-label="join" 
									variant="outlined"
									color='primary'																			
									>																		
									{returnText}
								</Button>
							</Link>							
            </div>
        );
    }
}

export default withRouter(ClubDashboard);


