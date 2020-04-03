import React from 'react'
import {Row, Col, Image, Card, Container} from 'react-bootstrap'
import { Button } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
 
class ClubFollowingCard extends React.Component{
	goToClub(e) {
		e.preventDefault();
		this.props.history.push(`/club/${this.props.clubID}`)
	}

	render(){
		return (
			<Container>
			<Row><Col xl={1} lg={1}></Col><Col>
			<Card  className="text-center" border="dark">
			<Card.Body>
				<Container>
					<Row>
						<Col lg={1} xl={1}>
							<Image width={"50px"} height={"50px"} src={this.props.clubProfile}/>
						</Col>
						<Col lg={2} xl={2}>
							<h5>{this.props.clubName}</h5>
						</Col>
						<Col >
							<Button variant='contained' color='primary' onClick={this.goToClub.bind(this)}>View</Button>
						</Col>
					</Row>

				</Container>
			</Card.Body>
			</Card></Col>
			<Col xl={1} lg={1}></Col></Row>
			</Container>
		);
	}
}

export default withRouter(ClubFollowingCard);