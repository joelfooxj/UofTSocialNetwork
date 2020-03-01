import React from 'react';
import './index.css';
import {Container, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, Paper } from '@material-ui/core';


class BrowseAllClubs extends React.Component {
  constructor(props){
    super(props); 
    this.state={
      tempData: props.tempData, 
      allClubs: props.allClubs,
      displayedClubs: props.allClubs
    }
  }

  filterClubs = e => { 
    this.setState({
      displayedClubs: e.target.value === '' ?
      this.state.allClubs : this.state.allClubs.filter(club => club.name.includes(e.target.value))
    });
  }

  goToClub = clubID => {
    //alert("Going to profile page of: club " + clubID);
    let target = false;
    for (let i = 0; i < this.state.allClubs.length; i++) {
      if (clubID === this.state.allClubs[i].clubID) {
        target = this.state.allClubs[i];
        break;
      }
    }

    if (target) {
      history.push(target.link);
    } else {
      alert("Something went wrong.")
    }
  }

  joinRequest = e => {
    console.log(e.currentTarget.id); 
    let getClub = this.state.allClubs.filter(club => club.clubID === parseInt(e.currentTarget.id))[0];
    getClub.requests.push(this.props.currentUser.userID);
    this.setState({ allClubs: this.props.allClubs });
  }

  render(){
    return (
      <div> 
        <Container maxWidth="xs">
          <h1 className="mainTitle"> CLUBS </h1> 
          <form onChange={this.filterClubs}> 
            <TextField 
            label="Search clubs by name" 
            variant="filled"
            color="primary"
            size="small"
            fullWidth/>
          </form>
          <List dense={true}> 
            {
              this.state.displayedClubs.map(club => {
                let disabledState = false; 
                let buttonText = ''; 
                if (club.members.includes(this.props.currentUser.userID)) {
                  disabledState = true; 
                  buttonText = 'Joined'; 
                } else if (club.requests.includes(this.props.currentUser.userID)) {
                  disabledState = true; 
                  buttonText = 'Requested'
                } else {
                  disabledState = false; 
                  buttonText = 'Request to join';
                }
                return (
                <Paper elevation={0} variant='outlined' key={club.clubID}> 
                  <ListItem button onClick={() => this.goToClub(club.clubID)} variant="outlined">
                    <ListItemText
                    primary={club.name}/>
                      <ListItemSecondaryAction>
                        {
                          <Button 
                            id={club.clubID}
                            size="small"
                            edge="end" 
                            aria-label="join" 
                            variant="outlined"
                            color="primary"
                            disabled={disabledState}
                            onClick={this.joinRequest}
                            >
                            {buttonText}
                          </Button>
                        }
                      </ListItemSecondaryAction>
                  </ListItem>
                </Paper>
                )})
            }
          </List>
        </Container> 
      </div>
    )
  }
}

export default BrowseAllClubs; 
