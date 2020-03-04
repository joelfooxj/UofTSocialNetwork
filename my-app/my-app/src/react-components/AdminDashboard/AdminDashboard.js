import React from 'react';
import './AdminDashboard.css';
import AdminStats from './AdminStats/index';
import UserList from './UserList/index';
import ClubList from './ClubList/index';
import { Button } from '@material-ui/core';
import { Link } from '../../../node_modules/react-router-dom'
import Navbar from '../Navbar'
import { withRouter } from 'react-router-dom';

class AdminDashboard extends React.Component {
	// props should contain Accounts and Clubs
    constructor(props){
			super(props); 
			this.state={
				accounts: props.accounts, 
				clubs: props.clubs
			}	
		}
		
		componentDidMount(){
			this.fetchData(); 
		}

		fetchData(){ 
			//TODO: fetch data from the DB here 
		}

		deleteObject = (inType, inID)  => {
			//TODO: delete object from database
			this.setState(inType === 'user' ? 
			{accounts: this.state.accounts.filter(user => user.id != inID)} : 
			{clubs: this.state.clubs.filter(club => club.clubID != inID)});
		}

    render(){
				const totalPosts = this.state.clubs.map(club => club.posts.length).reduce((c, p) => c + p, 0)
				const { changeSignInStatus, user, accounts, clubs } = this.props;
				// const totalPosts = this.state.clubs.map((p, club) => p + club.posts.length, 0)
        return(
        	<div>
        	<Navbar changeSignInStatus={changeSignInStatus} logoPic='https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-6.png' 
	          status={true} user={user}>
	        </Navbar>
            <div className="adminDashboardContainer"> 
                <AdminStats 
                    numUsers={this.state.accounts.length}
                    numClubs={this.state.clubs.length}
                    numPosts={totalPosts}
                />
                <UserList
								usersArr={this.state.accounts}
								onClick={this.goToObject}
								/>
                <ClubList
								clubsArr={this.state.clubs}
								onDelete={this.deleteObject}
								/> 
								<Link to="/" style={{ textDecoration:'none' }}> 
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


