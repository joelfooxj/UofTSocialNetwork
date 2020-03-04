import React from 'react';
import './index.css';
import {Container, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, Paper } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';
import Navbar from '../Navbar'


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
      this.state.allClubs : this.state.allClubs.filter(club => club.name.toLowerCase().includes(e.target.value.toLowerCase()))
    });
  }

  goToClub = clubID => {
    let target = null
    target = this.state.allClubs.find(club => club.clubID == clubID);

    if (target) {
      const {history} = this.props; 
      history.push(target.link);
    } else {
      alert("Something went wrong.")
    }
  }

  joinRequest = e => {
    console.log(e.currentTarget.id); 
    let getClub = this.state.allClubs.find(club => club.clubID === parseInt(e.currentTarget.id));    
    getClub.requests.push(this.props.currentUserID);
    this.setState({ allClubs: this.props.allClubs });
  }

  render(){
    return (
      <div> 
        <Navbar changeSignInStatus={this.props.changeSignInStatus} logoPic='https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-6.png' 
          status={true} user={this.props.user}>
        </Navbar>
        <Container id="container" maxWidth="xs">
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
                if (club.members.includes(this.props.currentUserID)) {
                  disabledState = true; 
                  buttonText = 'Joined'; 
                } else if (club.requests.includes(this.props.currentUserID)) {
                  disabledState = true; 
                  buttonText = 'Requested'
                } else {
                  disabledState = false; 
                  buttonText = 'Request to join';
                }
                return (
                <Paper elevation={0} variant='outlined' key={club.clubID}> 
                  <ListItem variant="outlined">
                    <ListItemText
                    primary={club.name}/>
                      <ListItemSecondaryAction>
                        {
                          club.execs.includes(this.props.currentUserID) || this.props.userIsAdmin ? 
                            <Link
                            to={{
                              pathname:'/ClubDashboard', 
                              state:{
                                club:club
                              }
                            }}
                            style={{textDecoration:'none'}}> 
                              <Button
                              size="small"
                              edge="end" 
                              variant="outlined"
                              color="primary"
                              style={{marginLeft:'10px'}}> 
                                edit
                              </Button>
                            </Link>
                          : null
                        }
                        <Link
                        to={{
                          pathname:club.link, 
                          state:{
                            club:club
                          }
                        }}
                        style={{textDecoration:'none'}}> 
                          <Button
                          size="small"
                          edge="end" 
                          variant="outlined"
                          color="primary"
                          style={{marginLeft:'10px'}}> 
                            view
                          </Button>
                        </Link>
                        <Link
                        to={{
                          pathname:club.link, 
                          state:{
                            club:club
                          }
                        }}
                        style={{textDecoration:'none'}}> 
                          <Button
                          size="small"
                          edge="end" 
                          variant="outlined"
                          color="primary"
                          style={{marginLeft:'10px'}}> 
                            view
                          </Button>
                        </Link>
                        <Button 
                            id={club.clubID}
                            size="small"
                            edge="end" 
                            aria-label="join" 
                            variant="outlined"
                            color="primary"
                            disabled={disabledState}
                            onClick={this.joinRequest}
                            style={{margin:'10px'}}
                            >
                            {buttonText}
                        </Button>
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

export default withRouter(BrowseAllClubs); 
