import React from 'react';
import './ClubDashboard.css';
import ClubStats from './ClubStats/index';
import MemberList from './MemberList/index';
import ExecList from './ExecList/index';
import RequestList from './RequestList/index';
import PostList from './PostList/index';

class ClubDashboard extends React.Component {
    constructor(props){
			super(props);
			this.state={
				tempData: props.tempData,
				members: props.thisClub.members, 
				execs: props.thisClub.execs, 
				posts: props.thisClub.posts, 
				requests: props.thisClub.requests, 
				clubID: props.thisClub.clubID,
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
			
			switch(inType){
				case 'member': 
					this.props.thisClub.members = this.state.members.filter(member => member != inID);
					this.props.thisClub.execs = this.state.execs.filter(exec => exec != inID);
					break; 
				case 'exec': 
					this.props.thisClub.execs = this.state.execs.filter(exec => exec != inID);
					break;
				case 'request': 
					this.props.thisClub.requests = this.state.requests.filter(request => request != inID);
				case 'post': 
					this.props.thisClub.posts = this.state.posts.filter(post => post != inID)
				default: 
					break;
			}

			this.setState({
				members: this.props.thisClub.members, 
				execs: this.props.thisClub.execs, 
				requests: this.props.thisClub.requests, 
				posts: this.props.thisClub.posts
			});
		}

		goToObject = (inType, inID) => {
			// TODO: route to the relevant object page
			alert('going to ' + inType + inID); 
		}

		onRequestApprove = (inUserID) => {
			this.props.thisClub.requests = this.state.requests.filter(request => request != inUserID);
			this.props.thisClub.members.push(inUserID);
			this.setState({
				requests: this.props.thisClub.requests, 
				members: this.props.thisClub.members, 
			}); 
		}

    render(){
        return(
            <div className="clubDashboardContainer"> 
                <ClubStats 
									statsList={[
										"No. of Members: " + this.state.members.length,
										"No. of Requests: " + this.state.requests.length,
										"No. of Posts: " + this.state.posts.length,
									]}
                />
								<MemberList 
								users={this.state.tempData.Users.filter(user => this.state.members.includes(user.userID))}
								onDelete={this.deleteObject}
								onClick={this.goToObject}/>
								<ExecList 
								users={this.state.tempData.Users.filter(user => this.state.execs.includes(user.userID))}
								onDelete={this.deleteObject}
								onClick={this.goToObject}/>
								<RequestList 
								users={this.state.tempData.Users.filter(user => this.state.requests.includes(user.userID))}
								onDelete={this.deleteObject}
								onClick={this.goToObject}
								onApprove={this.onRequestApprove}/>
								<PostList
								posts={this.state.tempData.Posts.filter(post => this.state.posts.includes(post.postID))}
								onDelete={this.deleteObject}
								onClick={this.goToObject}
								/>
            </div>
        );
    }
}

export default ClubDashboard;


