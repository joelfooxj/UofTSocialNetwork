

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

















/*
//Functions in this file are used for manipulating account data
//they will both, manipulate our internal states and make 
//database queries as necessary


/**
 * NOTE: This function will also interact with our database to 
 * update the account information there.
 * 
 * Change attributes of account with id accId.
 * 
 * Set attribute with name attrName to have value attrVal and
 * update the state of the internal component storing this 
 * information given as main.
 * 
 * 
 * @param {React.Component} context component storing internal account data
 * @param {Array} accs              array of all user accounts.
 * @param {int} accId               id of account to be changed.
 * @param {String} attrName         name of account attribute to be changed.
 * @param {String} attrVal          new value of attribute being changed.
 */
/*export const changeAccInfo = (context, accs, accId, attrName, attrVal) => {
    for(let i = 0; i < accs.length; i++){
        if(accs[i].id === accId){
          accs[i][attrName] = attrVal
        }
      }
  
      context.setState({
        accounts: accs
      })
}*/


/**
 * NOTE: This function will query our database and update the information there
 * as well.
 * 
 * Toggle timeline option at index optionIndex of the option array of account
 * with id accId.
 * 
 * @param {React.Component} context component storing internal information to 
 *                                  be updated.
 * @param {Array} accs              array of all user accounts.
 * @param {int} optionIndex         index of option to toggle.
 * @param {int} accId               id of account the options of which are 
 *                                  being changed.
 */
/*export const changeAccTimelineOpts = (context, accs, optionIndex, accId) => {
  for(let i = 0; i < accs.length; i++){
    if(accs[i].id === accId){
      accs[i].timelineOpts[optionIndex] = !accs[i].timelineOpts[optionIndex]
    }
  }

  context.setState({
    accounts: accs
  })
}*/

/**
 * NOTE: This function will query our database and remove the account
 * from there too.
 * 
 * Delete the account with accId.
 * 
 * 
 * @param {React.Component} context component storing internal information to 
 *                                  be updated.
 * @param {int}  accId              id of account to be removed.
 * @param {Array} accs              array of all user accounts
 */
/*export const deleteAccount = (context, accId, accs) => {
  let newAccounts = []
  for(let i = 0; i < accs.length; i++){
    if(!(accs[i].id === accId)){
      newAccounts.push(accs[i])
    }
  }
  context.setState({
    accounts: newAccounts
  })
}*/
