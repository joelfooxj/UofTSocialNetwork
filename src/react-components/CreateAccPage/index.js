import React from 'react';
import './style.css';
import CreateAccUserInfo from "./../CreateAccUserInfo"
import CustomButton from "./../CustomButton"
import LogInPageBanner from "./../LogInPageBanner"
import { withRouter } from 'react-router-dom';

//actions
import {createAccount} from '../../actions/accountActions';

class CreateAccPage extends React.Component{

  state = {
    usernameInput: "",
    passwordInput: "",
    firstNameInput: "",
    lastNameInput: "",
    emailInput: "",
    permissions: 0,
    allowCreation: false,
    dupUsername: false,
    dupEmail: false
  }

  inputHandler = (e) => {
    this.setState({
      [e.target.name]:e.target.value,
      dupUsername: e.target.name === "usernameInput" ? false : this.state.dupUsername,
      dupEmail: e.target.name === "emailInput" ? false : this.state.dupEmail
    })
  }


  render(){
    const {changeAccCreateState, accCreateState} = this.props
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
          onClick={() => {
            createAccount(this.state.usernameInput, this.state.permissions, this.state.passwordInput, this.state.firstNameInput, this.state.lastNameInput, this.state.emailInput)
            .then((result) => {
              if(result.status === 200){
                this.props.history.push("/"); 
              }
              else if(result.status === 409){
                  if(result.statusText === "username"){
                    this.setState({dupUsername: true})
                  }
                  else if(result.statusText  === "email"){
                    this.setState({dupEmail: true})
                  }
              }
              else{
                console.log("Could not create new user. Status: " + result.status)
              }
            })}}
          disabled={!emailRegex.test(this.state.emailInput) || this.state.usernameInput==="" || this.state.passwordInput==="" || this.state.firstNameInput==="" || this.state.lastNameInput==="" || this.state.emailInput===""}
        ></CustomButton>

        {(this.state.emailInput !== "" && !emailRegex.test(this.state.emailInput)) ? <span className="emailErrorSpan">Email must have the following form: something@something.com/ca/org</span> : null}
        {(this.state.usernameInput !== "" && this.state.dupUsername && !this.state.dupEmail) ? <span className="dupUserErrorSpan">Username already in use!</span> : null}
        {(this.state.emailInput !== "" && this.state.dupEmail && !this.state.dupUsername) ? <span className="dupEmailErrorSpan">Email already in use!</span> : null}

        <CustomButton
          id={"backButton"}
          width={"fit-content"}
          height={"fit-content"}
          borderColor={"#3F51B5"}
          textColor={"#3F51B5"}
          buttonText={"Back"}
          variant={"outlined"}
          top={"30px"}
          left={"48%"}
          onClick={() => {this.props.history.push("/");}}
        ></CustomButton>
      </div>
    );
  }
}
  

export default withRouter(CreateAccPage);
