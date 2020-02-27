import React from 'react';
import './ClubDashboard.css';
import ClubStats from './clubStats/index';
import MemberList from './memberList/index';

class ClubDashboard extends React.Component {
    constructor(props){
			super(props); 
			const thisClub = props.tempData.Clubs.filter(club => club.clubID == props.clubID)[0];
			this.state={
				tempData: props.tempData, // TODO: REMOVE AFTER DB SETUP
				thisClub: thisClub, 
				clubID: props.clubID,
			}	
		}
		
		componentDidMount(){
			this.fetchData(); 
		}

		fetchData(){ 
			//TODO: fetch data from the DB here 
			console.log('fetching data now'); 
		}

		deleteObject = (inType, inID)  => {
			//TODO: delete object from database		
			
			if (inType === 'user'){
				this.state.thisClub.members = this.state.thisClub.members.filter(member => member != inID);
				this.setState({
					thisClub: this.state.thisClub
				})
			}
		}

		goToObject = (inType, inID) => {
			// TODO: route to the relevant object page
			alert('going to ' + inType + inID); 
		}

    render(){
        return(
            <div className="clubDashboardContainer"> 
                <ClubStats 
                    statsList={[
											"No. of Members: " + this.state.thisClub.members.length,
											"No. of Requests: " + this.state.thisClub.requests.length,
											"No. of Posts: " + this.state.thisClub.posts.length,
										]}
                />
								<MemberList 
								users={this.state.tempData.Users.filter(user => this.state.thisClub.members.includes(user.userID))}
								onDelete={this.deleteObject}
								onClick={this.goToObject}/>
            </div>
        );
    }
    
}

export default ClubDashboard;


