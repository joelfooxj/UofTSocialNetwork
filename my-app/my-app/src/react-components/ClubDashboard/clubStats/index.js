import React from 'react'; 
import { Grid, List, ListItem, ListItemText } from '@material-ui/core';
import './index.css'

const ClubStats = props => {
    console.log(props); 
    return (
        <div className="statsContainer">
            <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                    <h2> Club Statistics </h2>
                    {/* <div> {props.statsList[0]} </div>  */}
                    <div>
                        <ul>
                        {
                            props.statsList.map(stat => <li> { stat } </li>)
                            
                        }
                        </ul>
                    </div>
                    </Grid> 
            </Grid>
        </div> 
    )
}

export default ClubStats; 