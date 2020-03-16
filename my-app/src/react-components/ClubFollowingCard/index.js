import React from 'react'
import {Row, Col, Image, Card, Container} from 'react-bootstrap'

class ClubFollowingCard extends React.Component{

	state={
		deleted:false
	}

	delete(){
        this.setState({ deleted: true });
    }



	render(){
		const { clubProfile, clubName, clubFollowing } = this.props;
		const deleteThis = this.state.deleted ? {display:'none'} : {}
		return (
		<Container onClick={this.deleteThis}>
		<Row><Col xl={1} lg={1}></Col><Col>
		<Card  className="text-center" border="dark">
		<Card.Body>
			<Container>
				<Row>
					<Col lg={1} xl={1}>
						<Image width={"50px"} height={"50px"} src={clubProfile}/>
					</Col>
					<Col lg={2} xl={2}>
						<h5>{clubName}</h5>
					</Col>
					<Col>
						<p>Follower: {clubFollowing}</p>
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

export default ClubFollowingCard;