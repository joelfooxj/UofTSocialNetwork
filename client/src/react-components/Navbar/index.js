import React from "react";
import "./style.css";
import NavbarRB from 'react-bootstrap/Navbar'
import NavRB from 'react-bootstrap/Nav'

import Container from 'react-bootstrap/Container'
import { withRouter } from 'react-router-dom';

//actions
import {logout, changeSignInStatus} from '../../actions/accountActions';


class Navbar extends React.Component{
	// status: True => logged in, False => not yet
	// logoPic: the sourse to the logo picture
	// profilePic: the sourse to the profile picture
	state = {
		loggedInUser:this.props.loggedInUser,
		numLink: 2,
		logoutPressed: false,
		searchPressed: false,
		feedPressed: false,
		explorePressed: false,
		userPressed: false,
		trendPressed:false,
		feedsPressed: false,
		followingPressed: false,
		adminPressed: false,
	}

	switchpage = (pagename) => {
		const { history } = this.props;
		console.log(this)
		history.push('/'+pagename, this.state)
	}

	render(){
		console.log(this.props)
		const { logoPic, loggedInUser, appContext } = this.props; 
		const userType = loggedInUser.permissions
		const Links = () => {
			if (userType){
				return (
					<NavRB className="mr-auto" inline="true">
						<NavRB.Link onClick={()=>this.switchpage('AdminDashboard')} href='/AdminDashboard'>Admin DashBoard</NavRB.Link>
					</NavRB>
				);
			}else{
				return (
					<NavRB className="mr-auto" inline="true">
						<NavRB.Link onClick={()=>this.switchpage('browseAllClubs')} >Explore</NavRB.Link>
						<NavRB.Link onClick={()=>this.switchpage('FeedPage')} >Feeds</NavRB.Link>
						<NavRB.Link onClick={()=>this.switchpage('Following')} >Following</NavRB.Link>
						<NavRB.Link onClick={()=>this.switchpage('UserProfilePage')}>UserCenter</NavRB.Link>
					</NavRB>
				);
			}
			
		}

	
		return (
			<div>
				<NavbarRB sticky="top" bg='dark' variant="dark" expand='md'>
				
					<NavbarRB.Brand>
						<Container>
							<img className='navLogoPic' src={logoPic} alt='logo'/>
						</Container>
					</NavbarRB.Brand>
					<NavbarRB.Toggle aria-controls="basic-navbar-nav" />
					<NavbarRB.Collapse id="basic-navbar-nav">
						<Links />
						<NavRB>
							<NavRB.Link 
							 onClick={() => {logout(); changeSignInStatus(this.props.appContext, null, false);}}
							 href='/'>Logout</NavRB.Link>
						</NavRB>
					</NavbarRB.Collapse>
				
				</NavbarRB>
			</div>
			
			)
	}
}


			

export default withRouter(Navbar);