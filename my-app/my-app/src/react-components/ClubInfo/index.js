import React from "react";
import './style.css';

class ClubInfo extends React.Component {
    render() {
        return(
            <div id="ClubInfoContainer">
                <div id="InfoContents">
                    <div id="ClubNameText">
                        <strong>{this.props.clubName}</strong>
                    </div>
                    <span id="ClubButtons">
                        buttons here
                    </span>
                    <div id="ClubInfoText">
                        {this.props.infoText}
                    </div>
                </div>
            </div>
        )
    }
}

export default ClubInfo;