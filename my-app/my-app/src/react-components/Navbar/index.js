import React from "react";
import "./style.css";
import NavbarRB from 'react-bootstrap/Navbar'
import NavRB from 'react-bootstrap/Nav'
import Dropdown from '../NavbarDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { withRouter } from 'react-router-dom';

class Navbar extends React.Component{
	// status: True => logged in, False => not yet
	// logoPic: the sourse to the logo picture
	// profilePic: the sourse to the profile picture
	constructor(props){
		super(props)
		this.setState({
			account:this.props.user,
			numLink: 2,
			logoutPressed: false,
			searchPressed: false,
			feedPressed: false,
			explorePressed: false,
			userPressed: false,
			trendPressed:false,
			feedsPressed: false,
			followingPressed: false,
			adminPressed: false})
	}


	logout(changeSignInStatus, user){
		// changeSignInStatus(false, user.id, user.permission,user.clubsExecOf)
		// const {history} = this.props;
  //       if(history){
  //           history.push('/', this.state)
  //       }
  		let acc = this.props.user

  		this.setState({
            logoutPressed:true
        }, () => {
            this.props.changeSignInStatus(false, acc.id, acc.permission, acc.clubsExecOf)

        })
	}

	switchpage(pagename){
		const { history } = this.props;
		history.push('/'+pagename, this.state)
	}

	render(){
		const { logoPic, status, user, changeSignInStatus } = this.props; 
		const userType = user.permission
		const Links = () => {
			if (userType){
				return (
					<NavRB className="mr-auto" inline>
						<NavRB.Link onlick={this.switchpage('AdminDashboard')} href='/AdminDashboard'>Admin DashBoard</NavRB.Link>
					</NavRB>
				);
			}else{
				return (
					<NavRB className="mr-auto" inline>
						<NavRB.Link onlick={this.switchpage('browseAllClubs')} href='/browseAllClubs'>Explore</NavRB.Link>
						<NavRB.Link onlick={this.switchpage('FeedPage')} href='/FeedPage'>Feeds</NavRB.Link>
						<NavRB.Link onlick={this.switchpage('Following')} href='/Following'>Following</NavRB.Link>
						<NavRB.Link onlick={this.switchpage('UserProfilePage')} href='/UserProfilePage'>UserCenter</NavRB.Link>
					</NavRB>
				);
			}
			
		}

	
		return (
			<div style={{display:'block'}}>
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
							<NavRB.Link onclick={this.logout} href='/'>Logout</NavRB.Link>
						</NavRB>
					</NavbarRB.Collapse>
				</Container>
				</NavbarRB>
			</div>
			
			)
	}
}


			

export default withRouter(Navbar);