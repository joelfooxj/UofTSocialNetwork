import React from "react";
import './style.css';
import ClubProfileBanner from "../ClubBanner";
import ClubTimeline from "../ClubTimeline";

import ClubProfileBanner from "../ClubBanner";
import ClubTimeline from "../ClubTimeLine";

class ClubProfilePage extends React.Component {
    render() {
        return(
            <div>
                This is placeholder.
                <ClubProfileBanner profileImage="" bannerImage=""/>
                <ClubTimeline />
            </div>
        )
    }
}

export default ClubProfilePage;