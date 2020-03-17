import React from '../../../../node_modules/react'; 
import { Grid } from '../../../../node_modules/@material-ui/core'
import './index.css'

const AdminStats = props => {
    return (
        <div className="statsContainer">
            <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                    <h2> Admin Statistics </h2>
                    <div>
                        {/* Possible styling components for later */}
                        {/* <List dense={true}>
                            <ListItem>
                            <ListItemText
                                primary="Users"
                            />
                            </ListItem>
                        </List> */}
                        <ul>
                            <li> No. of Users:  {props.numUsers}</li>
                            <li> No. of Clubs:  {props.numClubs}</li>
                            <li> No. of Posts:  {props.numPosts}</li>
                        </ul>
                    </div>
                    </Grid> 
            </Grid>
        </div> 
    )
}

export default AdminStats; 