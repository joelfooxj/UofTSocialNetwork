import React from 'react'
import {Row, Col, Image, Card, Button, Container} from 'react-bootstrap'
import './style.css';

import { withRouter } from 'react-router-dom'
 
class ClubFollowingCard extends React.Component{
	goToClub(e) {
		e.preventDefault();
		this.props.history.push(`/club/${this.props.clubID}`)
	}

	render(){
		return (
			<Card className="clubFollowingCard">
			  <Card.Img className="clubFollowingCardImg" variant="top" src={this.props.clubProfile} />
			  <Card.Body>
			    <Card.Title onClick={this.goToClub.bind(this)} className="text-center"><Button variant="outline-info">{this.props.clubName}</Button></Card.Title>
			  </Card.Body>
			</Card>
		);
	}
}

export default withRouter(ClubFollowingCard);