import React from '../../../../node_modules/react'; 
import { Grid, List, ListItem, ListItemText, IconButton, ListItemSecondaryAction, Paper } from '../../../../node_modules/@material-ui/core'
import DeleteIcon from '../../../../node_modules/@material-ui/icons/Delete' 

import { Link } from '../../../../node_modules/react-router-dom'

const ClubList = props => {
		
    const clubs = props.clubsArr;
    return (
        <div className="userList">
            <h2> Clubs </h2>
            <Grid container spacing={2}>
                    <Grid item xs={12} md={6}> 
											<List dense={true}> 
                          {clubs.map(club => 
                          <Link to={{
                            pathname: "/ClubProfilePage", 
                            state: {
                              club: club
                            }
                          }}
                          style={{ textDecoration:'none' }}
                          key={club.clubID}
                          >
                            <Paper elevation={0} variant='outlined'  >
                              <ListItem button> 
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
                          </Link>
													)}
											</List> 
                    </Grid> 
            </Grid>
        </div> 
    )
}

export default ClubList;