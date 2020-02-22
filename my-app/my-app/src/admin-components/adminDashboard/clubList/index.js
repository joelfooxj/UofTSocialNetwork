import React from 'react'; 
import { Grid, List, ListItem, ListItemText } from '@material-ui/core';

const ClubList = props => {
		// props should contain list of club info + function/buttons for each item
		// there should be a delete function and an edit function 
		const clubs = props.clubsArr;
    return (
        <div className="clubsList">
            <h2> Clubs </h2>
            <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>                    
                        {/* Possible styling components for later */}
												{
													clubs.map(club => 
														<div>
															Name: {club.name}
														</div> 		
													)
												}
                    </Grid> 
            </Grid>
        </div> 
    )
}

export default ClubList;