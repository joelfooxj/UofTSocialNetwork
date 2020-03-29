import React from "react";
import './style.css';
import ClubProfileBanner from "../ClubBanner";
import ClubTimeline from "../ClubTimeline";
import ClubProfilePicture from "../ClubProfilePicture";
import ClubInfo from "../ClubInfo";
import {getClub} from '../../actions/clubActions'
import Navbar from '../Navbar/index'

class ClubProfilePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: props.match.params.id,
            clubInfo: {},
            loaded: false

        }

        this.getClubInfo(this.state.id)
    }

    getClubInfo(id) {
        getClub(id).then((result) => {
            if (result.status) {
                alert(`Something went wrong retrieving club information. Status: ${result.status}`)
                return;
            }
            this.setState({
                clubInfo: result,
                loaded: true
            })
        }).catch((error) => {
            console.log("Fatal error")
            console.log(error)
            throw new Error(error)
        })
    }

    // componentWillMount() {
    //     this.getClubInfo(this.state.id)
    // }

    render() {
        if (this.state.loaded) {
            return(
                <div id="profilePage">
                    <Navbar logoPic='https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-6.png' 
                        status={true} loggedInUser={this.props.userInfo}>
                    </Navbar>

                    <ClubProfilePicture 
                        profilePic={this.state.clubInfo.profilePicture} 
                    />
    
                    <ClubProfileBanner 
                        bannerImage={this.state.clubInfo.bannerImage}
                    />
    
                    <ClubInfo 
                        clubInfo={this.state.clubInfo} 
                        userInfo={this.props.userInfo}
                    />
    
                    <ClubTimeline 
                        clubInfo={this.state.clubInfo}
                        userInfo={this.props.userInfo}
                    />
                </div>
            )
        } else {
            return(
                <div>
                    Loading...
                </div>
            )
        }
    }
}

export default ClubProfilePage;