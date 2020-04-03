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
		const { clubProfile, clubName, type } = this.props;
		const deleteThis = this.state.deleted ? {display:'none'} : {}
		return (
		<Container>
		<Row><Col xl={1} lg={1}></Col><Col>
		<Card  className="text-center" border="dark">
		<Card.Body>
			<Container>
				<Row>
					<Col lg={1} xl={1}>
						<Image width={"5vh"} height={"5vh"} src={clubProfile}/>
					</Col>
					<Col lg={3} xl={3}>
						<h5>{clubName}</h5>
					</Col>
					<Col lg="auto" xl="auto">
						<p>Member Type: {type}</p>
					</Col>
					<Col lg={1} xl={1} >
						<Button className="float-right" onclick={this.state.deleted}>unfollow</Button>
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