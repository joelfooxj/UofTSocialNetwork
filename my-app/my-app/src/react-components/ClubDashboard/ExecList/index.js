import React from '../../../../node_modules/react'; 
import { Grid, List, ListItem, ListItemText, Button, ListItemSecondaryAction, Paper } from '../../../../node_modules/@material-ui/core'
import DeleteIcon from '../../../../node_modules/@material-ui/icons/Delete'; 
import './index.css';

const ExecList = props => {
	const users = props.users;
	return (
		<div className="itemListContainer">
				<h2> Executives </h2>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}> 
						<List dense={true}> 
							{
								users.map(user => 
									<Paper elevation={0} variant='outlined' key={user.userID} >
										<ListItem button onClick={() => props.onClick('user', user.userID)}> 
												<ListItemText
													primary={user.name}
												/>
												<ListItemSecondaryAction>
													<Button 
														edge="end" 
														aria-label="delete" 
														variant="outlined"
														color="primary"
														onClick={() => props.onDelete('exec', user.userID)}>
														Remove
													</Button>
												</ListItemSecondaryAction>
										</ListItem> 
									</Paper>)
							}
						</List> 
					</Grid> 
				</Grid>
		</div> 
	)
}

export default ExecList;
