import React from 'react'; 
import { Grid, List, ListItem, ListItemText, IconButton, ListItemSecondaryAction, Paper, Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete' 
import { Link } from 'react-router-dom'
import './index.css'
import { deleteClub } from '../../../actions/clubActions'

class ClubList extends React.Component {
  constructor(props){
    super(props); 
    this.state = {
      clubs: props.clubsArr
    }
  }

  delClub = (clubID) => {
    if (!this.state.clubs.some(club => club._id === clubID)){
      alert(`${clubID} does not exist`);
      return;
    }
    
    deleteClub(clubID).then(res => {
      if (res === 401){ 
        alert("Your session has timed out. Please log back in."); 
        this.props.context.props.history.push('/');
      }	else if(res !== 200){
        alert(`${clubID} was not deleted. Please try again.`);
      } else {
        let clubsCopy = [...this.state.clubs];
        this.setState({clubs: clubsCopy.filter(club => club._id !== clubID)});
      } 
    }, error => {
      alert(`${error}: ${clubID} was not deleted`);
    });
  }

  render(){
    return (
      <div className="userList">
          <h2> Clubs </h2>
          <Grid container spacing={2}>
                  <Grid item xs={12} md={6}> 
                    <List dense={true}> 
                        <ListItem> 
                          <Link to="/createClub"> 
                            <Button 
                              size="small"
                              edge="end" 
                              aria-label="join" 
                              variant="outlined"
                              color='primary'>																		
                              create new club
                            </Button>
                          </Link>
                        </ListItem>
                        {this.state.clubs.map(club =>                           
                          <Paper elevation={0} variant='outlined' key={club._id} className="listItem">
                            <ListItem> 
                                <ListItemText className="clubText"
                                  primary={club.name}
                                  secondary={club.clubInfo}
                                />
                                <ListItemSecondaryAction>
                                  <Link  
                                    to={`/ClubDashboard/${club._id}`}
                                    className="link">
                                    <Button 
                                      size="small"
                                      edge="end" 
                                      aria-label="join" 
                                      variant="outlined"
                                      color='primary'																			
                                      >																		
                                      edit
                                    </Button>
                                  </Link> 
                                  <Link 
                                    to={`/club/${club._id}`}
                                    className="link">
                                    <Button 
                                      size="small"
                                      edge="end" 
                                      aria-label="join" 
                                      variant="outlined"
                                      color='primary'																			
                                      >																		
                                      view
                                    </Button>
                                  </Link> 
                                  <IconButton edge="end" aria-label="delete" onClick={() => this.delClub(club._id)}>
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
    
}

export default ClubList;