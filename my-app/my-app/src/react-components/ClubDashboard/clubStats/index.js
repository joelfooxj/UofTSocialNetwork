import React from 'react'; 
import { Grid, List, ListItem, ListItemText } from '@material-ui/core';
import './index.css'

const ClubStats = props => {
    return (
        <div className="statsContainer">
            <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                    <h2> Club Statistics </h2>
                    <div>
                        <ul>
                        {
                            this.props.statsList.forEach(stat =>  <li> {stat} </li> )
                        }
                        </ul>
                    </div>
                    </Grid> 
            </Grid>
        </div> 
    )
}

export default ClubStats; 