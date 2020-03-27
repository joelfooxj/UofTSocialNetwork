import React from 'react';
import './index.css';
import {Container, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, Paper } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';
import Navbar from '../Navbar'
import { getAllClubs, updateClub } from '../../actions/clubActions';



class BrowseAllClubs extends React.Component {
  constructor(props){
    super(props); 
    this.state={
      allClubs: [], 
      displayedClubs: []
    }
  }

  //THESE SHOULD NOW BE SUPPLEMENTED BY OUR DB FUNCTIONS
  ///////////////////////////////////////////////////////////////////////////////////////////////////////


  // user this.props.userInfo for the currently logged in user
  
  componentDidMount(){
    console.log("starting component"); 
    try {
      const retClubs = getAllClubs(); 
      this.setState({
        allClubs: retClubs, 
        displayedClubs: retClubs
      })
    } catch (error) {
      alert(error);
    }
  }



  filterClubs = e => { 
    this.setState({
      displayedClubs: e.target.value === '' ?
      this.state.allClubs : this.state.allClubs.filter(club => club.name.toLowerCase().includes(e.target.value.toLowerCase()))
    });
  }

  // TODO: make sure that this links to the correct page.
  // Don't actually every use this...
  // goToClub = clubID => {
  //   let target = null
  //   target = this.state.allClubs.find(club => club._id == clubID);

  //   if (target) {
  //     const {history} = this.props; 
  //     history.push(`/clubs/${target._id}`);
  //   } else {
  //     alert("Unable to find club link.")
  //   }
  // }

  joinRequest = e => {
    console.log(e.currentTarget._id); 
    let allClubsCopy = [...this.state.allClubs];
    let getClub = allClubsCopy.find(club => club._id === parseInt(e.currentTarget._id));
    let retRequested = getClub.requested;
    if (retRequested.includes(this.props.userInfo._id)){
      alert("You have already joined this club.") // THERE IS A BUG IF THIS SHOWS UP
    } else {
      retRequested.push(this.props.userInfo._id);
      try {
        if (updateClub(getClub._id, "requested", retRequested) !== 200){
          alert(`Failed to update club ${getClub.name}`)
        }
      } catch (error) {
        alert(error);
        alert(`Failed to update club ${getClub.name}`);
        retRequested.pop(); 
      }
      this.setState({allClubs: allClubsCopy});
    }

    
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  render(){
    return (
      <div> 
        <Navbar logoPic='https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-6.png' 
                loggedInUser={this.props.userInfo}>
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
          {
            this.state.allClubs.length === 0 ? 
            <h2> There are no clubs. </h2> :
            <List dense={true}> 
            {
              this.state.displayedClubs.map(club => {
                let disabledState = false; 
                let buttonText = ''; 
                if (club.members.includes(this.props.userInfo._id)) {
                  disabledState = true; 
                  buttonText = 'Joined'; 
                } else if (club.requested.includes(this.props.userInfo._id)) {
                  disabledState = true; 
                  buttonText = 'Requested'
                } else {
                  disabledState = false; 
                  buttonText = 'Request to join';
                }
                return (
                <Paper elevation={0} variant='outlined' key={club._id}> 
                  <ListItem variant="outlined">
                    <ListItemText
                    primary={club.name}/>
                      <ListItemSecondaryAction>
                        {
                          club.execs.includes(this.props.userInfo._id) || this.props.userInfo.permissions === 1 ? 
                            <Link
                            to={{
                              pathname:'/ClubDashboard', 
                              state:{
                                club:club
                              }
                            }}
                            className="notUnderlined"> 
                              <Button size="small" edge="end"  variant="outlined" color="primary" className="button"> 
                                edit
                              </Button>
                            </Link>
                          : null
                        }
                        <Link
                        to={{
                          pathname:`/clubs/${club._id}`, 
                          state:{
                            club:club
                          }
                        }}
                        className="notUnderlined"> 
                          <Button
                          size="small"
                          edge="end" 
                          variant="outlined"
                          color="primary"
                          className="button"> 
                            view
                          </Button>
                        </Link>
                        <Button 
                            id={club._id}
                            size="small"
                            edge="end" 
                            aria-label="join" 
                            variant="outlined"
                            color="primary"
                            disabled={disabledState}
                            onClick={this.joinRequest}
                            className="button">
                            {buttonText}
                        </Button>
                      </ListItemSecondaryAction>
                  </ListItem>
                </Paper>
                )})
            }
            </List>
          }
        </Container> 
      </div>
    )
  }
}

export default withRouter(BrowseAllClubs); 
