import React from 'react';
import './AdminDashboard.css';
import AdminStats from './AdminStats/index';
import UserList from './UserList/index';
import ClubList from './ClubList/index';

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
			console.log(inType + ' ' + inID);
			this.setState(inType === 'user' ? 
			{accounts: this.state.accounts.filter(user => user.id != inID)} : 
			{clubs: this.state.clubs.filter(club => club.clubID != inID)});
		}

		goToObject = (inType, inID) => {
			// TODO: route to the relevant object page
			alert('going to ' + inType + inID); 
		}

    render(){
				const totalPosts = this.state.clubs.map(club => club.posts.length).reduce((c, p) => c + p, 0)
				// const totalPosts = this.state.clubs.map((p, club) => p + club.posts.length, 0)
        return(
            <div className="adminDashboardContainer"> 
                <AdminStats 
                    numUsers={this.state.accounts.length}
                    numClubs={this.state.clubs.length}
                    numPosts={totalPosts}
                />
                <UserList
								usersArr={this.state.accounts}
								onClick={this.goToObject}
								onDelete={this.deleteObject}
								/>
                <ClubList
								clubsArr={this.state.clubs}
								onClick={this.goToObject}
								onDelete={this.deleteObject}
								/> 
            </div>
        );
    }
    
}

export default AdminDashboard;


