import React from '../../../../node_modules/react'; 
import { Grid, List, ListItem, ListItemText, Button, ListItemSecondaryAction, Paper} from '../../../../node_modules/@material-ui/core'
import './index.css';
import { Link } from '../../../../node_modules/react-router-dom'
import { getUsers } from '../../../actions/accountActions'

class MemberList extends React.Component {
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

	render(){
		return (
			<div className="itemListContainer">
					<h2> Members </h2>
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
																		onClick={() => this.props.onDelete(user._id)}>
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
}

export default MemberList;
