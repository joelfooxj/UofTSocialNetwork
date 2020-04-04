import React from 'react'; 
import { Grid, List, ListItem, ListItemText, IconButton, ListItemSecondaryAction, Paper, Button } from '@material-ui/core'
import DeleteIcon from  '@material-ui/icons/Delete' 
import { Link } from 'react-router-dom'
import { banUser, unbanUser, deleteUser } from '../../../actions/accountActions'
import { getAllClubs, updateClub } from '../../../actions/clubActions'
import './index.css'

class UserList extends React.Component {
	constructor(props){ 
		super(props);
		this.state={
			accounts: props.usersArr
		}
	}

	setBanned = (accountID, banState) => {
		if (!this.state.accounts.some(account => account._id === accountID)){
			alert(`${accountID} does not exist`); 
			return;
		}
		
		if (banState === 0){ 
			// Ban account
			try {
				banUser(accountID).then(res => {
					if (res === 401){ 
						alert("Your session has timed out. Please log back in."); 
						this.props.history.push('/');
					}	else if (res !== 200){
						alert(`Failed to ban ${accountID}.`);
					}	else {
						let accountsCopy = [...this.state.accounts]; 
						accountsCopy.find(account => account._id === accountID).status = banState;
						this.setState({accounts: accountsCopy});
					}
				})
			} catch (error) {
				alert(`${error}: cannot ban account`)
			}
		}

		if (banState === 1){ 
			// Unban account
			try {
				unbanUser(accountID).then(res => {
					if (res === 401){ 
						alert("You're session has timed out. Please log back in."); 
						this.props.history.push('/');
					}	else if (res !== 200){
						alert(`Failed to unban ${accountID}.`);
					}	else {
						let accountsCopy = [...this.state.accounts]; 
						accountsCopy.find(account => account._id === accountID).status = banState;
						this.setState({accounts: accountsCopy});
					}
				});
			} catch (error) {
				alert(`${error}: cannot unban account`)
			}
		}

	}

	delAccount = (accountID) => {
		if (!this.state.accounts.some(account => account._id === accountID)){
			alert(`${accountID} does not exist`); 
			return;
		}
		try {
			deleteUser(accountID).then(res => {
				if (res === 401){ 
					alert("You're session has timed out. Please log back in."); 
					this.props.history.push('/');
				}	else if (res !== 200){
					alert(`${accountID} was not deleted. Please try again.`);
				} else {
					this.removeFromClubs(accountID);
					let accountsCopy = [...this.state.accounts]; 
					this.setState({accounts: accountsCopy.filter(account => account._id !== accountID)});
				}
			});
		} catch (error) {
			alert(`${error}`);
		}
	}

	async removeFromClubs(accountID){ 
		try {
			const clubs = await getAllClubs();
			let club;
			for (club of clubs){ 
				await updateClub(club._id, 'requested', club.requested.filter(r => r !== accountID));
				await updateClub(club._id, 'execs', club.members.filter(m => m !== accountID));
				await updateClub(club._id, 'members', club.execs.filter(e => e !== accountID));
			}
		} catch (error) {
			console.log(`${error}`)
		} 
	}

	render(){
		return (
			<div className="userList">
					<h2> Users </h2>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}> 
							<List dense={true}> 
									{this.state.accounts.map(account =>
										{
											// 0 - banned, 1 - not banned
											let buttonColor = 'secondary'; 
											let buttonText = ''; 
											if (account.status === 0) {
												buttonColor = 'primary' 
												buttonText = 'Unban';
											} else {
												buttonColor = 'secondary';
												buttonText = 'Ban';
											}

											if(account.permissions === 1) return null; 

											return(
													<Paper elevation={0} variant='outlined' key={account._id} className="listItem">
														<ListItem> 
																<ListItemText
																	primary={account.firstName + ' ' + account.lastName}
																/>
																<ListItemSecondaryAction>
																	<Link 
																		to={{
																			pathname: `/UserProfilePage`, 
																			state: {
																				account: account
																			}
																		}}
																		className="notUnderlined">
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
																		size="small"
																		edge="end" 
																		aria-label="join" 
																		variant="outlined"
																		color={buttonColor}
																		onClick={() => this.setBanned(account._id, account.status === 0 ? 1 : 0)}
																		>																		
																		{buttonText}
																	</Button>
																	<IconButton edge="end" aria-label="delete" onClick={() => this.delAccount(account._id)}>
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
