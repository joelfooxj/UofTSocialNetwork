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
			let passedInClub = this.props.location.state.club;
			
			this.state={
				allUsers: props.users, 
				allPosts: props.posts,
				thisClub: passedInClub,
				members: passedInClub.members, 
				execs: passedInClub.execs, 
				posts: passedInClub.posts, 
				requests: passedInClub.requests, 
				clubID: passedInClub.clubID,
				link: passedInClub.link
			}	


			if (!(passedInClub.execs.includes(this.props.currentUser.accountId) || this.props.currentUser.permission === 1)){
				alert("Unauthorized access"); 
				this.props.history.push('/');
			}
		}
		
		componentDidMount(){
			// this.fetchData();
		}

		fetchData(){ 
			//TODO: fetch data from the DB here 
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
					returnPath = '/BrowseAllClubs';
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


