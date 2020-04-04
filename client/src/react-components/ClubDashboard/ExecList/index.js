import React from 'react'; 
import { Grid, List, ListItem, ListItemText, Button, ListItemSecondaryAction, Paper } from '@material-ui/core'
import './index.css';
import { Link } from 'react-router-dom'
import { getUsers } from '../../../actions/accountActions'

class ExecList extends React.Component {
	constructor(props){ 
		super(props); 
		this.state = { 
			userIDs: props.users, 
			users:[]
		}
	}

	componentDidMount(){ 
		getUsers().then(res => {
			if(!res){ 
				alert(`Unable to get members`);
				this.props.history.goBack(); 
			} else { 
				this.setState({users: res.filter(u => this.state.userIDs.includes(u._id))});
			}
		}, error => {
			alert(`${error}: Unable to get members`);
		});
	}

	componentDidUpdate(prevProps, prevState){
		if (this.props.users !== prevProps.users){
			getUsers().then(res => {

				if(!res){ 
					alert(`Unable to get members`);
					this.props.history.goBack(); 
				} else { 
					this.setState({
						users: res.filter(u => this.props.users.includes(u._id)),
						userIDs: this.props.users
					});
				}
			}, error => {
				alert(`${error}: Unable to get members`);
			});
		}
	}

	render() {
		return (
			<div className="itemListContainer">
					<h2> Executives </h2>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}> 
							<List dense={true}> 
								{
									this.state.users.map(user => 
										<Paper elevation={0} variant='outlined' key={user._id}>
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
															onClick={() => this.props.onDelete('execs', user._id)}>
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
	
}

export default ExecList;
