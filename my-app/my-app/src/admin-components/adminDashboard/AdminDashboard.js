import React from 'react';
import './AdminDashboard.css';
import AdminStats from './adminStats/index.js';

//TODO: REMOVE AFTER DB ESTABLISHED
import tempData from '../../tempInfo.js';

import UserList from './userList/index.js';
import ClubList from './clubList/index.js';




class AdminDashboard extends React.Component {
    constructor(props){
			super(props); 
			this.state={
        currentStats: {},
				userList:[], 
				clubList:[]
			}	
		}

    
		
		componentDidMount(){
			this.fetchData(); 
		}

		fetchData(){ 
			//TODO: fetch data from the DB here 

			const [Users, Clubs] = tempData;
			this.setState({
				userList: Users, 
				clubList: Clubs, 
				currentStats: {
					numUsers: Users.length,
					numClubs: Clubs.length, 
					numPosts: Clubs.map(club => club.posts.length).reduce((sum, val) => sum + val)
				},
			})
		}

		deleteObject = (inType, inID)  => {
			//TODO: delete object from database

			this.setState(inType === 'user' ? 
			{userList: this.state.userList.filter(user => user.userID != inID)} : 
			{clubList: this.state.clubList.filter(club => club.clubID != inID)});
		}

		goToObject = (inType, inID) => {
			// TODO: route to the relevant object page
			alert('going to ' + inType + inID); 
		}

    render(){
			console.log(this.state);
        return(
            <div className="adminDashboardContainer"> 
                <AdminStats 
                    numUsers={this.state.currentStats.numUsers}
                    numClubs={this.state.currentStats.numClubs}
                    numPosts={this.state.currentStats.numPosts}
                />
                <UserList
								usersArr={this.state.userList}
								onClick={this.goToObject}
								onDelete={this.deleteObject}
								/>
                <ClubList
								clubsArr={this.state.clubList}
								onClick={this.goToObject}
								onDelete={this.deleteObject}
								/> 
            </div>
        );
    }
    
}

export default AdminDashboard;


