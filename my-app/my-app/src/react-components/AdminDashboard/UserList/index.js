import React from '../../../../node_modules/react'; 
import { Grid, List, ListItem, ListItemText, IconButton, ListItemSecondaryAction, Paper, Button } from '../../../../node_modules/@material-ui/core'
import DeleteIcon from  '../../../../node_modules/@material-ui/icons/Delete' 

class UserList extends React.Component {
	constructor(props){ 
		super(props);
		this.state={
			users: props.usersArr
		}
	}

	banUser = (inID, banState) => {
		this.props.usersArr.find(user => user.id === inID).banned = banState;
		this.setState({
			users: this.props.usersArr
		});
	}

	onDelete = (userID) => {
		this.setState({
			users: this.state.users.filter(user => user.id != userID)
		});
	}

	render(){
		return (
			<div className="userList">
					<h2> Users </h2>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}> 
							<List dense={true}> 
									{this.state.users.map(user =>
										{
											let banState = false;
											let buttonColor = 'primary'; 
											let buttonText = ''; 
											if (user.banned) {
												buttonColor = 'secondary' 
												buttonText = 'Unban'; 
												banState = false;
											} else {
												buttonColor = 'primary';
												buttonText = 'Ban';
												banState = true; 
											}
											return(
												<Paper elevation={0} variant='outlined' key={user.id} >
													<ListItem button onClick={() => this.props.onClick('user', user.id)}> 
															<ListItemText
																primary={user.firstName + ' ' + user.lastName}
															/>
															<ListItemSecondaryAction>
															<Button 
																	id={user.id}
																	size="small"
																	edge="end" 
																	aria-label="join" 
																	variant="outlined"
																	color={buttonColor}
																	onClick={() => this.banUser(user.id, banState)}
																	>																		
																	{buttonText}
																</Button>
																<IconButton edge="end" aria-label="delete" onClick={() => this.onDelete(user.id)}>
																	<DeleteIcon fontSize="small" color="primary"/>
																</IconButton>																			
															</ListItemSecondaryAction>
													</ListItem> 
												</Paper>
											)
										}
									)}
							</List> 
						</Grid> 
					</Grid>
			</div>
		)
	}
}

export default UserList;
