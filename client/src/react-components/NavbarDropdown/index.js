import React from "react";
import "./style.css";

class Dropdown extends React.Component{
	render(){
		const { logoPic, status, userType } = this.props; 
		// if (status){
		// 	// logged in
		// 	if (usertype == 'admin'){
		// 		// admin dropdown: manage page, logout
		// 		return <div class='navDropdown'>
		// 					<a href='/managepage'>Manage Accounts and Clubs</a>
		// 					<a href='/logout'>Logout</a>
		// 				</div>
		// 	}else if (usertype == 'user'){
		// 		// user dropdown: user profile, following, messenge center, logout
		// 		return <div className='navDropdown'>
		// 					<a href='/userpage'>User profile</a>
		// 					<a href='/following'>Your Followings</a>
		// 					<a href='/messengecenter'>messengecenter</a>
		// 					<a href='/logout'>logout</a>
		// 				</div>
		// 	}
		// }else{
		// 	// not loged in
		// 	return <div class='navDropdown'>
		// 				<a href='/signinlogin'>Sign up/Log in</a>
		// 			</div>
		// }
		return <div> </div>
					

	}
}

export default Dropdown;