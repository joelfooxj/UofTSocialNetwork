import React from "react";
import Grid from "@material-ui/core/Grid";
import {Row, Col, Form, Button } from 'react-bootstrap'
import InputField from "./../InputField";
import "./style.css"
import PasswordInputField from "./../PasswordInputField";
import { Link } from "react-router-dom";

import {attemptSignIn} from '../../actions/accountActions';


//Input form for log in credentials (should be part of a LogInPage)
class LogInForm extends React.Component{

    componentDidMount = () => {
        window.addEventListener('keydown', (e) => {if(e.key === "Enter"){attemptSignIn(this.props.logInContext, 0)}})
    }


    render(){
        const {username, password, onInputChange, signInFailed, changeButtonColor,
            onButtonAnimationEnd, banned} = this.props;
        
        return (
            <div className="logInFormContainer">
                <image className="logInFormBackground" src="https://upload.wikimedia.org/wikipedia/commons/9/99/Black_square.jpg"/>
                
                <Form className="logInForm">
                <Row>
                    <Col className="logInForm_username" xs={12} sm={6} lg={6} xl={6}>
                        <InputField className="logInForm_username"
                                name="usernameInput"
                                label="Username"
                                value={username}
                                onInputChange={onInputChange}
                                type="text"
                        />
                    </Col>
                    <Col className="logInForm_pswd" item xs={12} sm={6} lg={6} xl={6}>
                        <PasswordInputField className="logInForm_pswd"
                                name="passwordInput"
                                label="Password"
                                value={password}
                                onInputChange={onInputChange}
                            />
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Button className="logInForm_buttons"
                            onClick={() => {attemptSignIn(this.props.logInContext, 1)}}
                            onAnimationEnd={onButtonAnimationEnd}
                            variant={changeButtonColor? "danger": "dark"}
                            size="sm"
                        >
                            Log In 
                        </Button>
                    </Col>
                    <Col>
                    <Link className="logInForm_link" to={"./../CreateAccPage"}>
                            <Button className="logInForm_buttons"
                                variant="dark"
                                size="sm"
                                >
                                New User 
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Form>
            <div className="logInForm_fail">
                {signInFailed && !banned ? <span id="logInForm_incorrectCredPrompt">Incorrect Credentials</span> : null}
                    {banned ? <span id="logInForm_bannedPrompt">Account Banned</span> : null}
            </div>
            </div>
            
           
        )
        
    }
}



export default LogInForm;