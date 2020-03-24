export const changeSignInStatus = (context, user, signedIn) => {
  context.setState({
    signedIn: signedIn,
    loggedInUser: user
  })
}

export const createAccount = async (usernameIn, permissionsIn, passwordIn, firstNameIn, lastNameIn, emailIn) => {
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
      method: 'POST', 
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  });

  try{
    const res = await fetch(request)
    return res
  }
  catch(err){
    throw new Error(err)
  }
}

export const logout = async () => {
  const request = new Request('/logout', {
      method: 'DELETE', 
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
  });

  try{
    const res = await fetch(request)
    return res.status
  }
  catch(err){
    throw new Error(err)
  }
}

export const attemptSignIn = (context, callLoc) => {
  const request = new Request('/log_in', {
            method: "POST",
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


export const getUserByName = async (usernameIn) => {
  const url = '/users/findUserByName/'+usernameIn
  const request = new Request(url, {
      method: 'GET', 
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
  });

  try{
    const res = await fetch(request)
    if(res.status === 200){
      return await res.json()
    }
    else{
      console.log("Failed to obtain user object, status: " + res.status)
      return null
    }
  }
  catch(err){
    throw new Error(err)
  }
}

export const getUserById = async (idIn) => {
  const url = '/users/findUserByID/'+idIn
  const request = new Request(url, {
      method: 'GET', 
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
  });

  try{
    const res = await fetch(request)
    if(res.status === 200){
      return await res.json()
    }
    else{
      return null
    }
  }
  catch(err){
    throw new Error(err)
  }
}


export const deleteUser = async (userID) => {
  const data = {
    id: userID
  }

  const request = new Request('/users/delete', {
    method: 'DELETE', 
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  try{
    const res = await fetch(request)
    return res.status
  }
  catch(err){
    throw new Error(err)
  }
}


export const banUser = async (userID) => {
  let data = {
    id: userID
  }

  const url = '/users/ban'
  const request = new Request(url, {
      method: 'PATCH', 
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  });

  try{
    const res = await fetch(request)
    return res.status
  }
  catch(err){
    throw new Error(err)
  }
}

export const unbanUser = async (userID) => {
  let data = {
    id: userID
  }

  const url = '/users/unban'
  const request = new Request(url, {
      method: 'PATCH', 
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  });

  try{
    const res = await fetch(request)
    return res.status
  }
  catch(err){
    throw new Error(err)
  }
}

export const updateUserRecord = async (userID, propName, propVal) => {
  let data = {
    id: userID,
    propertyName: propName,
    propertyVal: propVal
  }

  const url = '/users/update'
  const request = new Request(url, {
      method: 'PATCH', 
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  });

  try{
    const res = await fetch(request)
    return res.status
  }
  catch(err){
    throw new Error(err)
  }
}

export const updatePassword = async (id, newPass) => {
  let data = {
    id: id,
    pass: newPass
  }

  const url = '/users/updatePass'
  const request = new Request(url, {
      method: 'PUT', 
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  });

  try{
    const res = await fetch(request)
    return res.status
  }
  catch(err){
    throw new Error(err)
  }
}






