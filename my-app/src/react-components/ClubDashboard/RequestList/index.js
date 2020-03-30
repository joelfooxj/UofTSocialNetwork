import React from '../../../../node_modules/react'; 
import { Grid, List, ListItem, ListItemText, Button, ListItemSecondaryAction, Paper} from '../../../../node_modules/@material-ui/core'
import './index.css';
import { Link } from '../../../../node_modules/react-router-dom'

class RequestList extends React.Component{
		constructor(props){ 
			super(props); 
			this.state = { 
				requestIDs: props.users,
				users: []
			}
		}

		componentDidMount(){ 
			getUsers().then(res => { 
				if(!res){ 
					alert(`Unable to get requests`);
				} else { 
					this.setState({users: res.filter(r => this.state.requestIDs.includes(r._id))});
				}
			}, error => {
				alert(`${error}: Unable to get requests`);
			});
		}

		render(){ 
			return (
        <div className="itemListContainer">
            <h2> Requests </h2>
            <Grid container spacing={2}>
                    <Grid item xs={12} md={6}> 
											<List dense={true}> 
													{this.state.users.map(user => 
														<Paper elevation={0} variant='outlined' key={user._id} >
															<ListItem> 
																	<ListItemText
																		primary={user.firstName + ' ' + user.lastName}
																	/>
																	<ListItemSecondaryAction>
																		<Button 
																			size="small"
																			edge="end" 
																			aria-label="delete" 
																			variant="outlined"
																			color="primary"
																			onClick={() => this.props.onApprove(user._id)}
																			style={{ margin:'10px' }}>
																			Approve
																		</Button>
																		<Button 
																			size="small"
																			edge="end" 
																			aria-label="delete" 
																			variant="outlined"
																			color="primary"
																			onClick={() => props.onDelete('request', user._id)}
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
}

export default RequestList;
