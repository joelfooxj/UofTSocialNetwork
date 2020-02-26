import React from "react";
import './style.css';
import ClubProfileBanner from "../ClubBanner";
import ClubTimeline from "../ClubTimeline";
import ClubProfilePicture from "../ClubProfilePicture";
import ClubInfo from "../ClubInfo";

class ClubProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePic: require("./static/profilepic.png"), // these are hardcoded for now
            bannerImage: require("./static/bannerimage.jpg") // these are hardcoded for now
        }
    }

    text = ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pharetra sodales nunc. Sed facilisis, orci sed ornare vulputate, metus orci rutrum felis, viverra hendrerit magna felis vitae mauris. Aliquam posuere fringilla dolor, id varius risus feugiat sit amet. Aliquam vitae lacus quis nisl vestibulum scelerisque. Nunc rhoncus mauris eu quam faucibus tempus. Maecenas blandit magna quis odio scelerisque, a convallis urna porta. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris placerat leo ac tellus pretium, ac tincidunt tellus feugiat.

    Donec risus erat, tempus et velit id, molestie consectetur mauris. Fusce vitae leo nec risus rhoncus fringilla in vel neque. Cras sed odio interdum, varius risus non, pulvinar nunc. Morbi fermentum dolor lectus, commodo blandit diam eleifend eget. Etiam sed porta orci. Fusce posuere malesuada lectus, a dignissim risus placerat a. Proin quis purus nec erat viverra rutrum id sed nisl. Ut ut arcu laoreet, porttitor diam bibendum, molestie metus. Mauris nec ornare elit, non laoreet nisl. Maecenas in ultrices elit. `

    clubName = "Lorem Ipsum Club";

    render() {
        return(
            <div id="profilePage">
                <ClubProfilePicture profilePic={this.state.profilePic} />
                <ClubProfileBanner bannerImage={this.state.bannerImage}/>
                <ClubInfo infoText={this.text} clubName={this.clubName}/>
                <ClubTimeline profilePic={this.state.profilePic} clubName={this.clubName}/>
            </div>
        )
    }
}

export default ClubProfilePage;