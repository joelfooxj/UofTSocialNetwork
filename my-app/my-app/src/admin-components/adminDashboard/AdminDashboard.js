import React from 'react';
import './AdminDashboard.css';
import AdminStats from './adminStats/index.js';



class AdminDashboard extends React.Component {
    // destructure props here 

    //SOME HARDCODED VARIABLES

    state={
        numUsers: 50, 
        numClubs: 10, 
        numPosts: 200,
    }

    render(){
        return(
            <div className="adminDashboardContainer"> 
                <AdminStats 
                    numUsers={this.state.numUsers}
                    numClubs={this.state.numClubs}
                    numPosts={this.state.numPosts}
                />
            </div>
        );
    }
    
}

export default AdminDashboard;


