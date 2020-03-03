import React from 'react';
// import './style.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

class EventDescriptionCard extends React.Component{
	render(){
		const { title, detail, clubName } = this.props;

		return (
		<div className='eventDescription'>
			<Container>
				<Row>
					<Col className='title' lg={1} xl={1}><h5>{clubName}</h5></Col>
					<Col className='title'><h5>{title}</h5></Col>
				</Row>
				<Row>
					<Col lg={1} xl={1}></Col>
					<Col>{detail}</Col>
				</Row>
			</Container>
		</div>

	);
	}
}

export default EventDescriptionCard;

