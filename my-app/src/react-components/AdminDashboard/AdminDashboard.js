import React from 'react';
import './AdminDashboard.css';
import AdminStats from './AdminStats/index';
import UserList from './UserList/index';
import ClubList from './ClubList/index';
import { Button } from '@material-ui/core';
import { Link } from '../../../node_modules/react-router-dom'
import Navbar from '../Navbar'
import { withRouter } from 'react-router-dom';
import { getAllClubs } from '../../actions/clubActions'
import { getUsers } from '../../actions/accountActions'
import { getAllPosts } from '../../actions/postActions'


class AdminDashboard extends React.Component {
	// props should contain Accounts and Clubs
    constructor(props){
			super(props); 
			this.state={
				accounts: [],
				clubs: [],
				posts: [] 
			}	
		}
		
		componentDidMount(){
			this.fetchClubs(); 
			this.fetchAccounts();
			this.fetchPosts();  
		}

		fetchClubs(){ 
			try {
				getAllClubs().then(retClubs => { 
					this.setState({ clubs: retClubs });
				}); 
			} catch (error) {
				alert(`${error}: There was an error retrieving all clubs`); 
			}
		}

		fetchAccounts(){
			try {
				getUsers().then(retAccounts => { 
					this.setState({ accounts: retAccounts });
				}); 
			} catch (error) {
				alert(`${error}: There was an error retrieving all accounts`); 
			}
		}

		fetchPosts(){
			try{
				getAllPosts().then(retPosts => { 
					this.setState({ posts: retPosts });
				}); 
			} catch (error) {
				alert(`${error}: There was an error retrieving all posts`); 
			}
		}

    render(){
				const { changeSignInStatus, user } = this.props;
        return(
        	<div>
        	<Navbar logoPic='https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-6.png' 
	          loggedInUser={user}>
	        </Navbar>
            <div className="adminDashboardContainer"> 
                <AdminStats 
                    numUsers={this.state.accounts.length}
                    numClubs={this.state.clubs.length}
                    numPosts={this.state.posts.length}
                />
                <UserList
								usersArr={this.state.accounts}
								/>
                <ClubList
								clubsArr={this.state.clubs}
								/> 
								<Link to="/" className="notUnderlined"> 
									<Button
										size="small"
										edge="end" 
										aria-label="join" 
										variant="outlined"
										color='primary'
										>																		
										LOGOUT
									</Button>
								</Link>
            </div>
          </div>
        );
    }
    
}

export default withRouter(AdminDashboard);


