import React from '../../../../node_modules/react'; 
import { Grid, List, ListItem, ListItemText, IconButton, ListItemSecondaryAction, Paper, Button } from '../../../../node_modules/@material-ui/core'
import DeleteIcon from '../../../../node_modules/@material-ui/icons/Delete' 
import { Link } from '../../../../node_modules/react-router-dom'
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
    }
    try {
      deleteClub(clubID).then(res => {
        if(res !== 200){
          alert(`${clubID} was not deleted. Please try again.`);
        } else {
          let clubsCopy = [...this.state.clubs]; 
          clubsCopy.filter(club => club._id !== clubID);
          this.setState({clubs: clubsCopy});
        } 
      });
    } catch (error) {
      alert(`${error}: ${clubID} was not deleted`);
    }
  }

  render(){
    return (
      <div className="userList">
          <h2> Clubs </h2>
          <Grid container spacing={2}>
                  <Grid item xs={12} md={6}> 
                    <List dense={true}> 
                        {this.state.clubs.map(club =>                           
                          <Paper elevation={0} variant='outlined' key={club._id} className="listItem">
                            <ListItem> 
                                <ListItemText
                                  primary={club.name}
                                  secondary={club.clubInfo}
                                />
                                <ListItemSecondaryAction>
                                  <Link  
                                    to={{
                                      pathname:"/ClubDashboard", //TODO: Add id here?  
                                      state:{
                                        club: club
                                      }
                                    }}
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