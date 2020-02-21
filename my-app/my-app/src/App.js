import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';


import LogInPage from './react-components/LogInPage';
import CreateAccPage from './react-components/CreateAccPage';
import UserProfilePage from './react-components/UserProfilePage';

class App extends React.Component{

  state = {
    signedIn: false,
    permission: 0, // 0 - reg user, 1 - admin
    execOf: [],
    accountId: -1
  }

  changeSignInStatus(val, id, perm, clubs){
    this.setState({
      signedIn: val,
      accountId: id,
      permission: perm,
      execOf: clubs
    })
  }

  render(){
    console.log(this.state)
    return (
      <BrowserRouter>
          <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
            <Route exact path='/' render={() => 
                            (<LogInPage changeSignInStatus={this.changeSignInStatus.bind(this)}/>)}/>
            <Route exact path='/CreateAccPage' render={() => 
                            (<CreateAccPage/>)}/>
            <Route exact path='/UserProfilePage' render={() =>
                            (<UserProfilePage 
                              userAccId={this.state.accountId}
                            />)}/>
          </Switch>
        </BrowserRouter>
    );
  }
}
  

export default App;
