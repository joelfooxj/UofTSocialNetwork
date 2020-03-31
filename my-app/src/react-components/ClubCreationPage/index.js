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
        dupName: false
    }

    fieldChange = (e, field) => {
        if (e.target.value === "" && field === "nameInput") {
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
                this.props.history.goBack();
            } else if (creationResult.status === 409) {
                this.setState({
                    dupName: true
                })
            } else {
                alert("Could not create new club, please try again later.");
                this.props.history.push('/')
                return;            
            }
        } catch (error) {
            console.log("Fatal error")
            this.props.history.push('/')
        }
    }

    render() {
        return(
            <div>
                <Navbar logoPic='https://pngimage.net/wp-content/uploads/2018/06/logo-placeholder-png-6.png' 
                    status={true} loggedInUser={this.props.userInfo}>
                </Navbar>
                
                <form>
                    <div className={"inputField"}>
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
                        />
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
                    left={"48%"}
                    onClick={this.formSubmit}
                />

                {(this.state.nameInput !== "" && this.state.dupName) ? <span className="dupNameErrorSpan">Club name already in use!</span> : null}
            </div>
        )
    }
}

export default withRouter(CreateClubPage);