import React from 'react'
import {Row, Col, Image, Card, Container, Button} from 'react-bootstrap'

class ClubFollowingCard extends React.Component{

	state={
		deleted:false
	}

	delete(){
        this.setState({ deleted: true });

    }


	render(){
		const { clubProfile, clubName } = this.props;
		const deleteThis = this.state.deleted ? {display:'none'} : {}
		return (
		<Container>
		<Row><Col xl={1} lg={1}></Col><Col>
		<Card  className="text-center" border="dark">
		<Card.Body>
			<Container>
				<Row>
					<Col md={1}lg={1} xl={1}>
						<Image width={"50px"} height={"50px"} src={clubProfile}/>
					</Col>
					<Col>
						<h5 className="text-left">{clubName}</h5>
					</Col>
					<Col md={2}lg={2} xl={2} >
						<Button className="text-right"onclick={this.state.deleted}>unfollow</Button>
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