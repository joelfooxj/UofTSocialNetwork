import React from "react";
import './style.css';

import ClubProfileBanner from "../ClubBanner";
import ClubTimeline from "../ClubTimeLine";

class ClubProfilePage extends React.Component {
    render() {
        return(
            <div>
                <ClubProfileBanner profileImage="" bannerImage=""/>
                <ClubTimeline/>
            </div>
        )
    }
}

export default ClubProfilePage;