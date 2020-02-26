import React from 'react'; 
import { Grid, List, ListItem, ListItemText, IconButton, ListItemSecondaryAction, Paper } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'; 
import './index.css';

const MemberList = props => {
	// props should contain users associated with this club
    return (
        <div className="itemListContainer">
            <h2> Members </h2>
            <Grid container spacing={2}>
                    <Grid item xs={12} md={6}> 
											<List dense={true}> 
													{users.map(user => 
														<Paper elevation={0} variant='outlined' key={user.userID} >
															<ListItem button onClick={() => props.onClick('user', user.userID)}> 
																	<ListItemText
																		primary={user.name}
																	/>
																	<ListItemSecondaryAction>
																		<IconButton edge="end" aria-label="delete" onClick={() => props.onDelete('user', user.userID)}>
																			<DeleteIcon fontSize="small" color="primary"/>
																		</IconButton>
																	</ListItemSecondaryAction>
															</ListItem> 
														</Paper>
														)}
											</List> 
                    </Grid> 
            </Grid>
        </div> 
    )
}

export default MemberList;
