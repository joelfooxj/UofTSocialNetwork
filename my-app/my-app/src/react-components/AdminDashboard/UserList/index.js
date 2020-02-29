import React from '../../../../node_modules/react'; 
import { Grid, List, ListItem, ListItemText, IconButton, ListItemSecondaryAction, Paper } from '../../../../node_modules/@material-ui/core'
import DeleteIcon from  '../../../../node_modules/@material-ui/icons/Delete' 

const UserList = props => {		
	const users = props.usersArr;				
	return (
			<div className="userList">
					<h2> Users </h2>
					<Grid container spacing={2}>
									<Grid item xs={12} md={6}> 
										<List dense={true}> 
												{users.map(user => 
													<Paper elevation={0} variant='outlined' key={user.id} >
														<ListItem button onClick={() => props.onClick('user', user.id)}> 
																<ListItemText
																	primary={user.firstName + ' ' + user.lastName}
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

export default UserList;
