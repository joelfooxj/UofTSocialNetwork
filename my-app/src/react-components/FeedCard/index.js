import React from 'react';
import './style.css';
import EventDescriptionCard from './../EventDescriptionCard';
import EventTimePlace from './../EventTimePlace';
import EventDecision from './../EventDecision';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'

class FeedCard extends React.Component{
	render(){
		const { posterPic, eventTime, eventPlace, eventTitle, eventDetail, eventClubName } = this.props;
		return (
	<div className='feedcard'>
	<Container>
	<Jumbotron>
			<Row>
			</Row>
			<Row>
				<Col className='eventPosterContainer' xs={6} md={4} xl={4}>
					<Image className='eventPoster' src={posterPic} fluid thumbnail alt='no pic'/>
				</Col>
				<Col>
					<Container>
						<Row>
							<Col>
								<EventDescriptionCard title={eventTitle} detail={eventDetail} clubName={eventClubName}>
								</EventDescriptionCard>
							</Col>
						</Row>
						<Row>
							<Col>
								<EventTimePlace eventTime={eventTime} eventPlace={eventPlace}>
								</EventTimePlace>
							</Col>
						</Row>
						<Row>
							<div className='eventDecisionList'>
								<EventDecision></EventDecision>
							</div>
						</Row>
					</Container>
				</Col>
			</Row>
		</Jumbotron>
	</Container>
	</div>);
		}


}

export default FeedCard;
