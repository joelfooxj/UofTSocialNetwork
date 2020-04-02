import React from '../../../../node_modules/react'; 
import { Grid } from '../../../../node_modules/@material-ui/core'
import './index.css'

const ClubStats = props => {
    return (
        <div className="statsContainer">
            <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                    <h2> Club Statistics </h2>
                    <div>
                        <ul>
                        {
                            props.statsList.map((stat, index) => <li key={index}> { stat } </li>)
                        }
                        </ul>
                    </div>
                    </Grid> 
            </Grid>
        </div> 
    )
}

export default ClubStats; 