import React from '../../../../node_modules/react'; 
import { Grid, List, ListItem, ListItemText, IconButton, ListItemSecondaryAction, Paper } from '../../../../node_modules/@material-ui/core'
import DeleteIcon from '../../../../node_modules/@material-ui/icons/Delete' 

const ClubList = props => {
		
    const clubs = props.clubsArr;
    return (
        <div className="userList">
            <h2> Clubs </h2>
            <Grid container spacing={2}>
                    <Grid item xs={12} md={6}> 
											<List dense={true}> 
													{clubs.map(club => 
													<Paper elevation={0} variant='outlined' key={club.clubID} >
                            <ListItem button onClick={() => props.onClick('club', club.clubID)}> 
                                <ListItemText
                                  primary={club.name}
                                />
                                <ListItemSecondaryAction>
                                  <IconButton edge="end" aria-label="delete" onClick={() => props.onDelete('club', club.clubID)}>
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

export default ClubList;