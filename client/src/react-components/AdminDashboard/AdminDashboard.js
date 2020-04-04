import React from 'react';
import './AdminDashboard.css';
import AdminStats from './AdminStats/index';
import UserList from './UserList/index';
import ClubList from './ClubList/index';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
import Navbar from '../Navbar'
import { withRouter } from 'react-router-dom';
import { getAllClubs } from '../../actions/clubActions'
import { getUsers } from '../../actions/accountActions'
import { getAllPosts } from '../../actions/postActions'


class AdminDashboard extends React.Component {
    constructor(props){
			super(props); 
			this.state={
				accounts: [],
				clubs: [],
				posts: [], 
				loading: true
			}
		}

		componentDidMount(){
			this.fetchAll().then(retObj => {
				this.setState({
					accounts: retObj.retAccounts,
					clubs: retObj.retClubs, 
					posts: retObj.retPosts, 
					loading:false
				});
			});
		}

		async fetchAll(){
			let retAccounts = [];
			let retClubs = []; 
			let retPosts = []; 

			try {
				retAccounts = await getUsers(); 
				retClubs = await getAllClubs(); 
				retPosts = await getAllPosts();

				if (retAccounts === null || retClubs === null || retPosts === null){
					this.props.history.push('/')
				}
			} catch (error) {
				alert(`${error}: There was an error retrieving some data`); 
			}

			return {retAccounts, retClubs, retPosts};
		}
		
    render(){
				const { user, context } = this.props;

				if (this.state.loading){
					return(
						<div> 
							<h1 className="centeredText"> LOADING... </h1>
						</div>
					);
				}

        return(
        	<div>
        	<Navbar logoPic='https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-6.png' 
	          loggedInUser={user} appContext={context}>
	        </Navbar>
            <div className="adminDashboardContainer"> 
                <AdminStats 
                    numUsers={this.state.accounts.length}
                    numClubs={this.state.clubs.length}
                    numPosts={this.state.posts.length}
                />
                <UserList
								usersArr={this.state.accounts}
								context={context}
								/>
                <ClubList
								clubsArr={this.state.clubs}
								context={context}
								/> 
            </div>
          </div>
        );
    }
}

export default withRouter(AdminDashboard);


