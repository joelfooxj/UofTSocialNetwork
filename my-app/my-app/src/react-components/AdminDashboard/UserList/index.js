import React from '../../../../node_modules/react'; 
import { Grid, List, ListItem, ListItemText, IconButton, ListItemSecondaryAction, Paper, Button } from '../../../../node_modules/@material-ui/core'
import DeleteIcon from  '../../../../node_modules/@material-ui/icons/Delete' 

import { Link } from '../../../../node_modules/react-router-dom'

class UserList extends React.Component {
	constructor(props){ 
		super(props);
		this.state={
			users: props.usersArr, 
			accounts: props.usersArr, 
			accountsId: 0
		}
	}

	banUser = (inID, banState) => {
		this.props.usersArr.find(user => user.id === inID).banned = banState;
		this.setState({
			users: this.props.usersArr
		});
	}

	onDelete = (userID) => {
		const getUser = this.props.usersArr.find(user => user.id == userID); 
		const getUserIndex = this.props.usersArr.indexOf(getUser); 
		this.props.usersArr.splice(getUserIndex, 1); 
		this.setState({
			users: this.props.usersArr
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
											let buttonColor = 'secondary'; 
											let buttonText = ''; 
											if (user.banned) {
												buttonColor = 'primary' 
												buttonText = 'Unban'; 
												banState = false;
											} else {
												buttonColor = 'secondary';
												buttonText = 'Ban';
												banState = true; 
											}
											return(
													<Paper elevation={0} variant='outlined' key={user.id} style={{ margin:'10px'}}>
														<ListItem> 
																<ListItemText
																	primary={user.firstName + ' ' + user.lastName}
																/>
																<ListItemSecondaryAction>
																	<Link 
																		to={{
																			pathname: "/UserProfilePage", 
																			state: {
																				accounts: this.state.users,
																				accountId: user.id
																			}
																		}}
																		style={{ textDecoration:'none' }}
																		key={user.id}												
																	>
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
