export const changeSignInStatus = (context, user, signedIn) => {
  context.setState({
    signedIn: signedIn,
    loggedInUser: user
  })
}

export const createAccount = (usernameIn, permissionsIn, passwordIn, firstNameIn, lastNameIn, emailIn) => {
  let data = {
    username: usernameIn,
    password: passwordIn,
    firstName: firstNameIn,
    lastName: lastNameIn,
    email: emailIn,
    permissions: permissionsIn
  }

  const url = '/users/create'
  const request = new Request(url, {
      method: 'post', 
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  });

  fetch(request)
  .then(function(res) {
      if (res.status === 200) {
          console.log("Added new account.")
         
      } else {
          console.log("Account not added. Status: " + res.status)
      }
  }).catch((error) => {
      console.log(error)
  })
}

export const logout = () => {
  const request = new Request('/logout', {
      method: 'delete', 
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
  });

  fetch(request)
  .then(function(res) {
      if (res.status === 200) {
          console.log("Logged Out")
         
      } else {
          console.log("Error, could not log out, status: " + res.status)
      }
  }).catch((error) => {
      console.log(error)
  })
}

export const attemptSignIn = (context, callLoc) => {
  const request = new Request('/log_in', {
            method: "post",
            body: JSON.stringify({username: context.state.usernameInput, password: context.state.passwordInput}),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        });
    
        fetch(request)
        .then((res) => {
            if (res.status === 200) {
                context.setState({
                    signInFailed: false,
                }, () => {
                    res.json()
                        .then((result) => {
                            const {history} = context.props;

                            changeSignInStatus(context.props.logInContext, result, true)

                            if(history && result !== null){
                                if(result.status === 0){ //banned
                                    context.setState({
                                        banned: true
                                    })
                                }
                                else{
                                    result.permissions === 1 ? history.push('/AdminDashboard') :  
                                    history.push('/FeedPage', context.state)
                                }
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
            } 
            else {
                if(callLoc == 1){
                    context.setState({
                        signInFailed: true,
                        changeButtonColor: true,
                        banned: false
                    })
                }
                else{
                    context.setState({
                        signInFailed: true,
                        changeButtonColor: true,
                        banned: false
                    })
                    setTimeout(()=>{context.setState({changeButtonColor: false})}, 500)
                }
                console.log("ERROR: Could not log in, status: " + res.status)
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export const getUser = (usernameIn, passwordIn) => {
  let data = {
    username: usernameIn,
    password: passwordIn
  }

  const url = '/users/user'
  const request = new Request(url, {
      method: 'get', 
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  });

  fetch(request)
  .then(function(res) {
      if (res.status === 200) {
          res.json()
            .then((result) => {
              console.log("User obtained successfully.")
              return result
            })
            .catch((err) => {
              console.log("User obtained successfully, but something else went wrong.")
              console.log(err)
              return null
            })     
      } else {
          console.log("Failed to obtain user. Status: " + res.status)
          return null
      }
  })
  .catch((error) => {
      console.log("Failed to obtain user.")
      console.log(error)
      return null
  })
}


export const deleteUser = (userID) => {
  const data = {
    id: userID
  }

  const request = new Request('/users/delete', {
    method: 'delete', 
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  fetch(request)
  .then(function(res) {
      if (res.status === 200) {
          console.log("Deleted User.")
      } else {
          console.log("Error: delete user failed, status: " + res.status)
      }
  }).catch((error) => {
      console.log("Error: delete user failed.")
      console.log(error)
  })
}


export const banUser = (userID) => {
  let data = {
    id: userID
  }

  const url = '/users/ban'
  const request = new Request(url, {
      method: 'patch', 
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  });

  fetch(request)
  .then(function(res) {
      if (res.status === 200) {
          console.log("Banned user.")
         
      } else {
          console.log("Could not ban user. Status: " + res.status)
      }
  }).catch((error) => {
      console.log("Could not ban user.")
      console.log(error)
  })
}

export const unbanUser = (userID) => {
  let data = {
    id: userID
  }

  const url = '/users/unban'
  const request = new Request(url, {
      method: 'patch', 
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  });

  fetch(request)
  .then(function(res) {
      if (res.status === 200) {
          console.log("Unanned user.")
         
      } else {
          console.log("Could not unban user. Status: " + res.status)
      }
  }).catch((error) => {
      console.log("Could not unban user.")
      console.log(error)
  })
}

export const updateUserRecord = (userID, propName, propVal) => {
  let data = {
    id: userID,
    propertyName: propName,
    propertyVal: propVal
  }

  const url = '/users/update'
  const request = new Request(url, {
      method: 'patch', 
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  });

  fetch(request)
  .then(function(res) {
      if (res.status === 200) {
          console.log("Set " + propName + " of user " + userID + " to: " +  propVal)
         
      } else {
          console.log("Failed to update user document. Status: " + res.status)
      }
  }).catch((error) => {
      console.log("Failed to update user document.")
      console.log(error)
  })
}






