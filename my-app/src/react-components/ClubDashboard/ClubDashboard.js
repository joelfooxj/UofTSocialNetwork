import React from 'react';
import './ClubDashboard.css';
import ClubStats from './clubStats/index';
import MemberList from './memberList/index';
import ExecList from './ExecList/index';
import RequestList from './RequestList/index';
import PostList from './PostList/index';
import { Button } from '../../../node_modules/@material-ui/core'
import { withRouter, Link } from '../../../node_modules/react-router-dom'

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
			this.fetchAll().then(retObj => {
				const retClub = retObj.retClubs.find(club => club._id == this.state.clubID); 
				this.setState({
					clubPosts: retObj.retPosts.filter(post => post.posterID == this.state.clubID), 
					thisClub: retClub,
					members: retClub.members, 
					execs: retClub.execs, 
					posts: retClub.posts, 
					loading:false
				});
			});
			if (!(passedInClub.execs.includes(this.props.currentUser._id) || this.props.currentUser.permissions === 1)){
				alert("Unauthorized access"); 
				this.props.history.push('/');
			}
		}

		async fetchAll(){
			let retClub = {}; 
			let retPosts = []; 
			 
			try {
				await getUsers().then(accounts => {
					retAccounts = accounts;
				}); 
			} catch (error) {
				alert(`${error}: There was an error retrieving all accounts`); 
			}
			
			try {
				await getAllClubs().then(clubs => {
					retClubs = clubs;
				}); 
			} catch (error) {
				alert(`${error}: There was an error retrieving all clubs`); 
			}

			try{
				await getAllPosts().then(posts => {
					retPosts = posts;
				}); 
			} catch (error) {
				alert(`${error}: There was an error retrieving all posts`); 
			}

			return {retAccounts, retClubs, retPosts};
		}




		deleteObject = (inType, inID)  => {
			//TODO: delete object from database
			
			const thisClub = this.state.thisClub; 
			
			switch(inType){
				case 'member': 
					thisClub.members = this.state.members.filter(member => member !== inID);
					thisClub.execs = this.state.execs.filter(exec => exec !== inID);
					break; 
				case 'exec': 
					thisClub.execs = this.state.execs.filter(exec => exec !== inID);
					break;
				case 'request': 
					thisClub.requests = this.state.requests.filter(request => request !== inID);
					break;
				case 'post': 
					thisClub.posts = this.state.posts.filter(post => post !== inID);
					break;
				default: 
					break;
			}

			this.setState({
				members: thisClub.members, 
				execs: thisClub.execs, 
				requests: thisClub.requests, 
				posts: thisClub.posts
			});
		}

		onRequestApprove = (inUserID) => {
			const thisClub = this.state.thisClub;
			thisClub.requests = this.state.requests.filter(request => request !== inUserID);
			thisClub.members.push(inUserID);
			this.setState({
				requests: thisClub.requests, 
				members: thisClub.members, 
			}); 
		}

    render(){
				let returnPath = ''; 
				let returnText ='';
				if (this.props.currentUser.permission == 1){
					returnPath = "/AdminDashboard";
					returnText = "Return to Admin Dashboard";
				} 
				else if (this.state.execs.includes(this.props.currentUser.accountId)){
					returnPath = '/Following';
					returnText = 'Return to Following Clubs Page';
				}  
        return(
            <div className="clubDashboardContainer"> 
							<h1> {this.state.thisClub.name} Dashboard </h1> 
							<Link  
								to={{
									pathname: this.state.thisClub.link
								}}
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
								]}
							/>
							<MemberList 
							users={this.state.allUsers.filter(user => this.state.members.includes(user.id))}
							onDelete={this.deleteObject}/>
							<ExecList 
							users={this.state.allUsers.filter(user => this.state.execs.includes(user.id))}
							onDelete={this.deleteObject}/>
							<RequestList 
							users={this.state.allUsers.filter(user => this.state.requests.includes(user.id))}
							onDelete={this.deleteObject}
							onApprove={this.onRequestApprove}/>
							<PostList
							posts={this.state.allPosts.filter(post => this.state.posts.includes(post.postID))}
							thisClubLink={this.state.link}
							onDelete={this.deleteObject}
							/>
							<Link  
								to={{
									pathname: returnPath
								}}
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


