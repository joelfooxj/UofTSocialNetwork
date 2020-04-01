import React from 'react';
import './ClubDashboard.css';
import ClubStats from './clubStats/index';
import MemberList from './memberList/index';
import ExecList from './ExecList/index';
import RequestList from './RequestList/index';
import PostList from './PostList/index';
import { Button, Paper} from '../../../node_modules/@material-ui/core'
import { withRouter, Link } from '../../../node_modules/react-router-dom'
import { getClub, updateClub, updateClubImage } from '../../actions/clubActions'

class ClubDashboard extends React.Component {
    constructor(props){
			super(props);

			this.state={
				thisClub: {},
				members: [], 
				execs: [],
				requested: [], 
				clubID: props.match.params.id, 
				loading:true, 
				selectedImage: null
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
				} else { 
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

		deleteObject = async (inType, inID) => { 
			try {
				let copy = [...this.state[inType]]; 
				copy = copy.filter(o => o !== inID); 
				const status = await updateClub(this.state.clubID, inType, copy); 
				if (status === 200){ 
					this.setState({ [inType]: copy});
				} else { throw new Error(`Status [${status}]`)}
			} catch (error) {
				alert(`${error}: Unable to delete ${inType}[${inID}]`);
			}
		}

		deleteMember(inID){ 
			this.deleteObject("members", inID); 
			if (this.state.execs.includes(inID)){ 
				this.deleteObject("execs", inID); 
			}
		}

		onRequestApprove = async (inUserID) => {
			try {
				let newRequested = [...this.state.requested]; 
				newRequested = newRequested.filter(r => r !== inUserID);
				let newMembers = [...this.state.members];
				newMembers.push(inUserID);
				const reqStatus = await updateClub(this.state.clubID, "requested", newRequested);
				const memStatus = await updateClub(this.state.clubID, "members", newMembers);
				if (reqStatus === 200 && memStatus === 200) {
					this.setState({
						members: newMembers, 
						requested: newRequested
					})
				} else {
					alert(`There has been an error updating approval for ${inUserID}`)
				}
			} catch (error) {
				alert(`${error}: Unable to approve request for user ${inUserID}`)
			} 
		}

		fileSelectedHandler = event => {
			this.setState({
					selectedImage: event.target.files[0]
			})
		}

		handler(id, attr, formdat) {
			if (!this.state.selectedImage) {
					alert("Select an image.")
			} else {
					updateClubImage(id, attr, formdat).then((result) => {
							console.log(result)
					})
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
							]}/>
						<span> 
							<div>
								<h2> Profile Picture </h2>
								<img src={this.state.thisClub.profilePicture} className="picture"/>
								<form onSubmit={(e) => {
									e.preventDefault()
									this.handler(this.state.clubID, 'profilePicture', new FormData(e.target))
									}}
									onChange={(e) => {
												e.preventDefault()
												this.fileSelectedHandler(e)
									}}>
									<div>
										<input name="image" type="file" accepts="image/*"/>
									</div>
										<Button variant='outlined' color='primary' type="submit">Upload Image</Button>
								</form>
							</div>
							<div>
								<h2> Banner Picture </h2>
								<img src={this.state.thisClub.bannerImage} className="picture"/>
								<form onSubmit={(e) => {
									e.preventDefault()
									this.handler(this.state.clubID, 'bannerImage', new FormData(e.target))
									}}
									onChange={(e) => {
												e.preventDefault()
												this.fileSelectedHandler(e)
									}}>
									<div>
										<input name="image" type="file" accepts="image/*"/>
									</div>
										<Button variant='outlined' color='primary' type="submit">Upload Image</Button>
								</form>
							</div>
						</span>
						<MemberList 
						users={this.state.members}
						onDelete={this.deleteMember.bind(this)}/>
						<ExecList 
						users={this.state.execs}
						onDelete={this.deleteObject.bind(this)}/>
						<RequestList 
						users={this.state.requested}
						onDelete={this.deleteObject.bind(this)}
						onApprove={this.onRequestApprove.bind(this)}/>
						<PostList
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


