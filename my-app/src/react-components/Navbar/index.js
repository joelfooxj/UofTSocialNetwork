import React from "react";
import "./style.css";
import NavbarRB from 'react-bootstrap/Navbar'
import NavRB from 'react-bootstrap/Nav'

import Container from 'react-bootstrap/Container'
import { withRouter } from 'react-router-dom';

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
		accountId: this.props.accId,
		accounts: this.props.accs
	}


	logout = () => {
		
	}

	switchpage = (pagename) => {
		const { history } = this.props;
		console.log(this)
		history.push('/'+pagename, this.state)
	}

	render(){
		console.log(this.props)
		const { logoPic, status, loggedInUser, changeSignInStatus } = this.props; 
		const userType = loggedInUser.permissions
		const Links = () => {
			if (userType){
				return (
					<NavRB className="mr-auto" inline>
						<NavRB.Link onClick={()=>this.switchpage('AdminDashboard')} href='/AdminDashboard'>Admin DashBoard</NavRB.Link>
					</NavRB>
				);
			}else{
				return (
					<NavRB className="mr-auto" inline>
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
				<Container>
					<NavbarRB.Brand>
						<Container>
							<img className='navLogoPic' src={logoPic} alt='logo'/>
						</Container>
					</NavbarRB.Brand>
					<NavbarRB.Toggle aria-controls="basic-navbar-nav" />
					<NavbarRB.Collapse id="basic-navbar-nav">
						<Links />
						<NavRB>
							<NavRB.Link onClick={this.logout} href='/'>Logout</NavRB.Link>
						</NavRB>
					</NavbarRB.Collapse>
				</Container>
				</NavbarRB>
			</div>
			
			)
	}
}


			

export default withRouter(Navbar);