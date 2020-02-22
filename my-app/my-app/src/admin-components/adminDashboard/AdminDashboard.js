import React from 'react';
import './AdminDashboard.css';
import AdminStats from './adminStats/index.js';

//TODO: REMOVE AFTER DB ESTABLISHED
import tempData from '../../tempInfo.js';

// import UserList from './userList/index.js'; 
// import ClubList from './clubList/index.js';




class AdminDashboard extends React.Component {
    // destructure props here 

    state={
        currentStats: {},
				userList:[], 
				clubList:[]
		}
		
		componentDidMount(){
			this.fetchData(); 
		}

		fetchData(){ 
			//fetch data from the DB here 
			const [Users, Clubs] = tempData;
			// post-processing + write to state
			this.setState({
				userList: Users, 
				clubList: Clubs, 
				currentStats: {
					numUsers: Users.length,
					numClubs: Clubs.length, 
					numPosts: 3
				},
			})
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
                {/* <UserList
								usersArr={this.state.userList}
								/> */}
                {/* <ClubList
								clubsArr={this.state.clubList}
								/>  */}
            </div>
        );
    }
    
}

export default AdminDashboard;


