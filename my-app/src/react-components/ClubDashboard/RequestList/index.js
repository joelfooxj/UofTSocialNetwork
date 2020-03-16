import React from '../../../../node_modules/react'; 
import { Grid, List, ListItem, ListItemText, Button, ListItemSecondaryAction, Paper} from '../../../../node_modules/@material-ui/core'
import './index.css';
import { Link } from '../../../../node_modules/react-router-dom'

const RequestList = props => {
		const users = props.users;
    return (
        <div className="itemListContainer">
            <h2> Requests </h2>
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
																					accounts: props.users, 
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
																			onClick={() => props.onApprove(user.id)}
																			style={{ margin:'10px' }}>
																			Approve
																		</Button>
																		<Button 
																			size="small"
																			edge="end" 
																			aria-label="delete" 
																			variant="outlined"
																			color="primary"
																			onClick={() => props.onDelete('request', user.id)}
																			style={{ margin:'10px' }}>
																			Deny
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

export default RequestList;
