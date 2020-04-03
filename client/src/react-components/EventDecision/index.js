import React from 'react';
// import './style.css';
import Button from "@material-ui/core/Button";
import {ButtonGroup} from 'react-bootstrap'
import ToggleButton from 'react-bootstrap/ToggleButton'

class EventDecision extends React.Component{
	render(){
		return (
			<div>
				<ButtonGroup className="justify-content-end" toggle>
				  <ToggleButton variant="outline-success" type="radio" name="radio" value="going">Going</ToggleButton>
				  <ToggleButton variant="outline-secondary" type="radio" name="radio" value='interested'>Interested</ToggleButton>
				  <ToggleButton variant="outline-danger" type="radio" name="radio" value='notgoing'>Nope</ToggleButton>
				</ButtonGroup>
			</div>
	)
	}
}

export default EventDecision;