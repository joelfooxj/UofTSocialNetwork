import React from 'react';
import './style.css';
import CreateAccUserInfo from "./../CreateAccUserInfo"
import CustomButton from "./../CustomButton"
import LogInPageBanner from "./../LogInPageBanner"
import { withRouter } from 'react-router-dom';

class CreateAccPage extends React.Component{

  state = {
    usernameInput: "",
    passwordInput: "",
    firstNameInput: "",
    lastNameInput: "",
    emailInput: "",
    permissions: 0,
    allowCreation: false
  }

  inputHandler = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    })
  }


  render(){
    const {createAccAction, changeAccCreateState, accCreateState} = this.props
    const emailRegex = new RegExp("[a-zA-Z]{1,25}[@][a-zA-Z]{1,25}[.](com|org|ca)")

    return (
      <div id="mainDiv">
        <LogInPageBanner id="banner"/>
        <h1 id="mainHeader">Create Account</h1>
        <div id="infoDiv">
          <CreateAccUserInfo className="info" onInputChange={this.inputHandler} changeAccCreateState={changeAccCreateState}></CreateAccUserInfo>
        </div>
        <CustomButton
          id={"doneButton"}
          width={"fit-content"}
          height={"fit-content"}
          borderColor={"#3F51B5"}
          textColor={"#3F51B5"}
          buttonText={"Done"}
          variant={"outlined"}
          top={"20px"}
          left={"48%"}
          onClick={() => {createAccAction(this.state.usernameInput, this.state.permissions, this.state.passwordInput, this.state.firstNameInput, this.state.lastNameInput, this.state.emailInput); this.props.history.push("/"); }}
          disabled={!emailRegex.test(this.state.emailInput) || this.state.usernameInput==="" || this.state.passwordInput==="" || this.state.firstNameInput==="" || this.state.lastNameInput==="" || this.state.emailInput===""}
        ></CustomButton>
        {!emailRegex.test(this.state.emailInput) ? <span id="emailErrorSpan">Email must have the following form: something@something.com/ca/org</span> : null}
      </div>
    );
  }
}
  

export default withRouter(CreateAccPage);