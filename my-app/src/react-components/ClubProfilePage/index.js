import React from "react";
import './style.css';
import ClubProfileBanner from "../ClubBanner";
import ClubTimeline from "../ClubTimeline";
import ClubProfilePicture from "../ClubProfilePicture";
import ClubInfo from "../ClubInfo";
import {getClub} from '../../actions/clubActions'
import Navbar from '../Navbar/index'
import Spinner from 'react-bootstrap/Spinner';

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
                console.log(`Something went wrong retrieving club information. Status: ${result.status}`)

                if (result.status === 401) {
                    this.props.history.push('/')
                } else {
                    this.props.history.goBack()
                }
                
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

    render() {
        return(
            <div id="profilePage">
                <Navbar logoPic='https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-6.png' 
                    status={true} loggedInUser={this.props.userInfo}>
                </Navbar>

                {this.state.loaded ? 
                    <React.Fragment>
                        <ClubProfilePicture 
                            profilePic={this.state.clubInfo.profilePicture} 
                        />

                        <ClubProfileBanner 
                            bannerImage={this.state.clubInfo.bannerImage}
                        />

                        <ClubInfo 
                            clubInfo={this.state.clubInfo} 
                            userInfo={this.props.userInfo}
                            rootContext={this.props.rootContext}
                        />

                        <ClubTimeline 
                            clubInfo={this.state.clubInfo}
                            userInfo={this.props.userInfo}
                        />
                    </React.Fragment> :
                    <div id="loadingDiv">
                        <Spinner animation="border"/>
                    </div>
                }
            </div>
        )
    }
}

export default ClubProfilePage;