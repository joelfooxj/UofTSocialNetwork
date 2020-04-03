import React from 'react'; 
import { Grid, List, ListItem, ListItemText, Button, ListItemSecondaryAction, Paper} from '@material-ui/core'
import './index.css';
import { Link } from 'react-router-dom'
import { getUsers } from '../../../actions/accountActions'

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

		componentDidUpdate(prevProps, prevState){
			if (this.props.users !== prevProps.users){
				getUsers().then(res => { 
					if(!res){ 
						alert(`Unable to get members`);
					} else { 
						this.setState({
							users: res.filter(r => this.props.users.includes(r._id)), 
							requestIDs: this.props.users
						});
					}
				}, error => {
					alert(`${error}: Unable to get members`);
				});
			}
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
																			onClick={() => this.props.onDelete('requested', user._id)}
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
