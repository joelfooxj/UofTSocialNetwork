import React from 'react'; 
import { Grid } from '@material-ui/core'
import './index.css'

const AdminStats = props => {
    return (
        <div className="statsContainer">
            <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                    <h2> Admin Statistics </h2>
                    <div>
                        <ul>
                            <li> No. of Users:  {props.numUsers}</li>
                            <li> No. of Clubs:  {props.numClubs}</li>
                            <li> No. of Posts:  {props.numPosts}</li>
                        </ul>
                    </div>
                    </Grid> 
            </Grid>
        </div> 
    )
}

export default AdminStats; 