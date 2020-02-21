import React from "react";
import './style.css';
import ClubProfileBanner from "../ClubBanner";
import ClubTimeline from "../ClubTimeline";

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