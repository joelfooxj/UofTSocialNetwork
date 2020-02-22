import React from 'react'; 
import { Grid, List, ListItem, ListItemText } from '@material-ui/core';

const UserList = props => {
		// props should contain list of user info + function/buttons for each item
		
        const users = props.usersArr;
        console.log(users);
    return (
        <div className="userList">
            <h2> Users </h2>
            <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>                    
                        {/* Possible styling components for later */}
												{
                          // <div> name </div> 
													users.map(user => 
														<div>
															Name: {user.name}
														</div> 															
													)
												}
                    </Grid> 
            </Grid>
        </div> 
    )
}

export default UserList;
