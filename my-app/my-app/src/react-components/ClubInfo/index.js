import React from "react";
import './style.css';

class ClubInfo extends React.Component {
    render() {
        return(
            <div id="ClubInfoContainer">
                <div id="ClubInfoText">
                    {this.props.infoText}
                </div>
            </div>
        )
    }
}

export default ClubInfo;