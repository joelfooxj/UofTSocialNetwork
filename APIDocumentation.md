# Database API Documentation

## Links to Items within this Document
* [accountActions.js documentation](#accountActions-documentation)

## Dev Notes
Express requests will not be called directly, instead their wrapper action functions will be called in the front end of the application. These functions can be found inside the files in the __src/actions__ folder. This document will specify their signatures, explain their parameters and returns. There are three main types of routes that this document will have the documentation for: user related functions, club related functions and post related routes. In addition, there will be authentication related functions and some miscalleneous functions for working with data that does not fit into any of the listed categories. The links to each section can be found above. __All of these functions deal with manipulating our databse.__ </br>

__NOTE: Functions marked as 'async' return a promise!__


## accountActions Documentation
API for working with user sign in status. To use these in your code make sure to import them. Ex: 
```javascript
import {functionName} from '../../actions/accountActions'
```
#### Functions
__1.__ `changeSignInStatus(context: React.component, user: Object, signedIn: boolean)`
##### Summary:
Set the _signedIn_ state property of context to _signedIn_ and the _loggedInUser_ state property of _context_ to _user_. _Context_ is the React component the state of which needs to be updated. Most often this function should be called with the App comonent from App.js  as its context with the App component being passed to the calling component as a prop. __Note:__ can be used for both setting state on login and logout.

##### Parameters
* __`context`__: the main App context the state of which stores the currently logged in user.   
* __`user`__: object holding information about the currently logged in user. See models/SessionUser.js for details on what kind of fields it contains.  
* __`signedIn`__: whether the user is signed in or not.

__2.__ `createAccount(usernameIn: String, permissionsIn: int, passwordIn: String, firstNameIn: String, lastNameIn: String, emailIn: String)`
##### Summary:
Creates a new account with username _usernameIn_, permissions _permissionsIn_ (0 for reg user, 1 for admin), password _passwordIn_ (this is hashed), first name _firstNameIn_, last name _lastNameIn_ and email _emailIn_. By default the account is not banned (status = 1) and the _clubsExecOf_, _clubsMemberOf_, _clubsFollowing_ and _clubsAwaitingJoin_ are empty. Timeline options in _timelineOpts_ are all set to false.
##### Parameters
* __`usernameIn`__: username of the new user  
* __`permissionsIn`__: permissions level of the new user
* __`passwordIn`__: password of the new user 
* __`firstNameIn`__: first name of the new user 
* __`lastNameIn`__: last name of the new user 
* __`emailIn`__: email of the new user 


__3.__ `logout()`
##### Summary:
Logs out the currently logged in user by deleting them from the session cookie. Does not do any kind of routing this has to be handled by the calling component.
##### Parameters
None

__4.__ `[ASYNC] getUser(usernameIn: String, passwordIn: String)`
##### Summary:
Obtains information about the user with given username _usernameIn_ and password _passwordIn_ and returns a promise containing the found user object or __NULL__ if none was found.
##### Parameters
* __`usernameIn`__: username of user you wish to find
* __`passwordIn`__: password of user you wish to find

 __5.__ `deleteUser(userID: ObjectID/String)`
##### Summary:
Deletes the user with given userID. The id can be a string or an ObjectID object, but it has to be one of those otherwise the function will fail.
##### Parameters
* __`userID`__: id of user being deleted   

 __6.__ `banUser(userID: ObjectID/String)`
##### Summary:
Bans user with _id _userID_ by setting their _status_ to 0.
##### Parameters
* __`userID`__: id of user to be banned

 __7.__ `unbanUser(userID: ObjectID/String)`
##### Summary:
Unbans user with _id _userID_ by setting their _status_ to 1.
##### Parameters
* __`userID`__: id of user to be unbanned

__8.__ `updateUserRecord(userID: ObjectID/String, propName: String, propVal: various)`
##### Summary:
Updates property _propName_ with value _propVal_ of user with id _userID_. __Note:__ the type of propVal varies depending on field being updated; check the schema of object you are updating to know the correct type of this parameter.
##### Parameters
* __`userID`__: id of user to be updated   
* __`propName`__: name of property to update
* __`propVal`__: updated property value

__1.__ ``
##### Summary:

##### Parameters
* __``__:   
* __``__:   
* __``__: 


