import React from '../../../../node_modules/react'; 
import { Grid, List, ListItem, ListItemText, Button, ListItemSecondaryAction, Paper} from '../../../../node_modules/@material-ui/core'
import './index.css';
import { Link } from '../../../../node_modules/react-router-dom'

const userList = props => {
		const users = props.users;
    return (
        <div className="itemListContainer">
            <h2> Members </h2>
            <Grid container spacing={2}>
                    <Grid item xs={12} md={6}> 
											<List dense={true}> 
													{users.map(user => 
														<Paper elevation={0} variant='outlined' key={user.id} >
															<ListItem> 
																	<ListItemText
																		primary={user.firstName + ' ' + user.lastName}
																	/>
																	<ListItemSecondaryAction>
																		<Link to={{
																			pathname: "/UserProfilePage", 
																			state: {
																				accounts: users, 
																				accountId: user.id
																			}
																		}}
																		style={{ textDecoration:'none',  margin:'10px' }}>
																			<Button 
																				size="small"
																				edge="end" 
																				aria-label="view" 
																				variant="outlined"
																				color="primary">
																				view
																			</Button> 
																		</Link>
																	<Button 
																		size="small"
																		edge="end" 
																		aria-label="delete" 
																		variant="outlined"
																		color="primary"
																		onClick={() => props.onDelete('member', user.id)}>
																		Remove
																	</Button>
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

export default userList;