import React from 'react';
import './style.css';
import CustomButton from "./../CustomButton";
import Navbar from '../Navbar/index';
import TextField from "@material-ui/core/TextField";
import { createClub } from '../../actions/clubActions';
import { withRouter } from 'react-router-dom';

class CreateClubPage extends React.Component {
    state = {
        nameInput: "",
        bioInput: "",
        dupName: false,
        clubCreated: false
    }

    fieldChange = (e, field) => {
        if (e.target.value === "") {
            this.setState({
                [field]: null
            })
        } else {
            this.setState({
                [field]: e.target.value
            })
        }
    }

    formSubmit = async () => {
        try {
            let creationResult = await createClub(this.state.nameInput, this.state.bioInput);

            if (creationResult.status === 200) {
                this.setState({
                    clubCreated: true
                })
            } else if (creationResult.status === 409) {
                this.setState({
                    dupName: true
                })
            } else if (creationResult.status === 401) {
                alert("Your session has timed out. Please log back in.");
                this.props.history.push('/')
            } else {
                alert("Could not create new club, please try again later.");
                this.props.history.goBack();
                return;            
            }
        } catch (error) {
            console.log("Fatal error")
            this.props.history.goBack();
        }
    }

    render() {
        return(
            <div id="clubCreationContainer">
                <Navbar logoPic='https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-6.png' 
                    status={true} loggedInUser={this.props.userInfo} appContext={this.props.context}>
                </Navbar>
                
                <div id="titleText">
                    Create a Club
                </div>

                <form id="clubCreationForm">
                    <div className={"inputField"}>
                        <div>
                            <TextField 
                                name={"nameInput"}
                                type={"text"}
                                label={"Club Name"}
                                id="margin-normal"
                                className="nameInput"
                                margin="normal"
                                onChange={(e) => {this.fieldChange(e, 'nameInput')}}
                                onClick={(e) => {this.fieldChange(e, 'nameInput')}}
                                error={this.state.nameInput === null}
                                helperText={(this.state.nameInput === null) ? "Field Must Not Be Empty" : ""}
                            />
                        </div>

                        <div>
                            <TextField 
                                name={"bioInput"}
                                type={"text"}
                                label={"Club Bio"}
                                id="margin-normal"
                                className="bioInput"
                                margin="normal"
                                multiline
                                onChange={(e) => {this.fieldChange(e, 'bioInput')}}
                                onClick={(e) => {this.fieldChange(e, 'bioInput')}}
                                error={this.state.bioInput === null}
                                helperText={(this.state.bioInput === null) ? "Field Must Not Be Empty" : ""}
                            />
                        </div>
                    </div>
                </form>

                <CustomButton
                    id={"doneButton"}
                    width={"fit-content"}
                    height={"fit-content"}
                    borderColor={"#3F51B5"}
                    textColor={"#3F51B5"}
                    buttonText={"Done"}
                    variant={"outlined"}
                    top={"20px"}
                    left={"45%"}
                    onClick={this.formSubmit}
                />
                
                <div id="messageDiv">
                    {(this.state.nameInput !== "" && this.state.dupName) ? <span className="dupNameErrorSpan">Club name already in use!</span> : null}
                    {(this.state.clubCreated) ? <span className="clubCreatedSpan">Successfully created club.</span> : null}
                </div>
            </div>
        )
    }
}

export default withRouter(CreateClubPage);