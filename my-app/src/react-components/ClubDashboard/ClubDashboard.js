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
				requested: [], 
				clubID: props.match.params.id, 
				loading:true
			}	
		}
		
		componentDidMount(){
			getClub(this.state.clubID).then(retObj => {
				if (typeof(retObj.status) !== "undefined"){
					alert(`Status ${retObj.status}: Club ${this.state.clubID} does not exist`); 
					this.props.history.goBack();
				} else if (!(retObj.execs.includes(this.props.currentUser._id) || this.props.currentUser.permissions === 1)){
					alert("Unauthorized access"); 
					this.props.history.goBack();
				} else { // the obj is returned, but I can't set the state
					this.setState({ 
						thisClub: retObj,
						members: retObj.members, 
						execs: retObj.execs, 
						requested: retObj.requested,
						loading:false
					});
				}
			}, error => {
				alert(`${error}: Cannot fetch club ${this.state.clubID}`); 
				this.props.history.goBack();
			});
		}

		deleteObject = async (inType, inID)  => {
			try {
				alert(`checking state: ${inType}`);
				alert(`checking state: ${this.state["execs"]}`);
				alert(`checking state: ${this.state.inType.filter(o => o !== inID)}`);
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

		onRequestApprove = async (inUserID) => {
			try {
				const newRequests = this.state.requested.filter(r => r._id !== inUserID); 
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
			if (this.state.loading){
				return(
					<div> 
						<h1 className="centeredText"> LOADING... </h1>
					</div>
				);
			}

			let returnPath = ''; 
			let returnText ='';
			if (this.props.currentUser.permissions === 1){
				returnPath = "/AdminDashboard";
				returnText = "Return to Admin Dashboard";
			} 
			if (this.state.execs.includes(this.props.currentUser._id)){
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
								"No. of Requests: " + this.state.requested.length,
								"No. of Executives: " + this.state.execs.length,
							]}
						/>
						<MemberList 
						users={this.state.members}
						onDelete={this.deleteObject}/>
						<ExecList 
						users={this.state.execs}
						onDelete={this.deleteObject}/>
						<RequestList 
						users={this.state.requested}
						onDelete={this.deleteObject}
						onApprove={this.onRequestApprove}/>
						<PostList
						thisClubID={this.deleteObject}/>
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


