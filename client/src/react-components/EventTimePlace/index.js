import React from 'react';
import './style.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';


class EventTimePlace extends React.Component{
	render(){
		const { eventTime, eventPlace } = this.props;
		return (
		<div className='EventTimePlace'>
			<Container>
				<Row>
				    <Col>Time:</Col>
				    <Col>Place:</Col>
			  	</Row>
			  	<Row>
				    <Col>{eventTime}</Col>
				    <Col>{eventPlace}</Col>
			  	</Row>
		  	</Container>
		</div>

	);
	}
}

export default EventTimePlace;
