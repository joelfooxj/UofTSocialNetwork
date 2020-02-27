import React from 'react';
import './style.css';
import CreateAccUserInfo from "./../CreateAccUserInfo"
import CustomButton from "./../CustomButton"
import { withRouter } from 'react-router-dom';


class CreateAccPage extends React.Component{

  state = {
    usernameInput: "",
    passwordInput: "",
    firstNameInput: "",
    lastNameInput: "",
    emailInput: "",
    permissions: 0
  }

  inputHandler = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  render(){
    const {createAccAction} = this.props
    return (
      <div id="mainDiv">
        <h1 id="mainHeader">Create Account</h1>
        <CreateAccUserInfo onInputChange={this.inputHandler}></CreateAccUserInfo>
        <CustomButton
          id={"doneButton"}
          width={"fit-content"}
          height={"fit-content"}
          borderColor={"#3F51B5"}
          textColor={"#3F51B5"}
          buttonText={"Done"}
          variant={"outlined"}
          top={"700px"}
          left={"48%"}
          onClick={() => {createAccAction(this.state.usernameInput, this.state.permissions, this.state.passwordInput, this.state.firstNameInput, this.state.lastNameInput, this.state.emailInput); this.props.history.push("/"); }}
        ></CustomButton>
      </div>
    );
  }
}
  

export default withRouter(CreateAccPage);
