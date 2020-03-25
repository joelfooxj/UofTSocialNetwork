# Database API Documentation

## Links to Items within this Document
* [accountActions.js documentation](#accountActions-documentation)
* [clubActions.js documentation](#clubActions-documentation)
* [postActions.js documentation](#postActions-documentation)

## Dev Notes (Please Read)
Express requests will not be called directly, instead their wrapper action functions will be called in the front end of the application. These functions can be found inside the files in the __src/actions__ folder. This document will specify their signatures, explain their parameters and returns. There are three main types of routes that this document will have the documentation for: user related functions, club related functions and post related routes. In addition, there will be authentication related functions and some miscalleneous functions for working with data that does not fit into any of the listed categories. The links to each section can be found above. Example function calls will be provided only for some functions that represent a general type of functions included in the API and not all of the functions. __All of these functions deal with manipulating our databse.__ </br>

__NOTE: Functions marked as '[ASYNC]' return a promise!__</br>

Here is an example call of one of our functions.</br>
##### Example Call:</br>
```javascript
doSomething(arg1, arg2, arg3, ...).then((result) => {
    if(result === 200){
      console.log("Success")
    }
    else{
      console.log("Failure status: " + result)
    }
})
```

Here _result_ is whatever the API function being called returns. It could be anything from an integer status code to an Object so please read the docs carefully to make sure you know what the function returns and can use its result as desired in your code.


## accountActions Documentation
API for user related functions. To use these you need to add the following import statement in your code with the function names you with to use. The path might need to be adjusted depending on where your file is located. Ex: 
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
##### Return
None

__2.__ `[ASYNC] createAccount(usernameIn: String, permissionsIn: int, passwordIn: String, firstNameIn: String, lastNameIn: String, emailIn: String)`
##### Summary:
Creates a new account with username _usernameIn_, permissions _permissionsIn_ (0 for reg user, 1 for admin), password _passwordIn_ (this is hashed), first name _firstNameIn_, last name _lastNameIn_ and email _emailIn_. By default the account is not banned (status = 1) and the _clubsExecOf_, _clubsMemberOf_, _clubsFollowing_ and _clubsAwaitingJoin_ are empty. Timeline options in _timelineOpts_ are all set to false.
##### Parameters
* __`usernameIn`__: username of the new user  
* __`permissionsIn`__: permissions level of the new user
* __`passwordIn`__: password of the new user 
* __`firstNameIn`__: first name of the new user 
* __`lastNameIn`__: last name of the new user 
* __`emailIn`__: email of the new user 
##### Return
A promise that resolves to the status code of the request. __Throws error on terminal failure.__

__3.__ `[ASYNC] logout()`
##### Summary:
Logs out the currently logged in user by deleting them from the session cookie. Does not do any kind of routing this has to be handled by the calling component.
##### Parameters
None
##### Return
A promise that resolves to the status code of the request. __Throws error on terminal failure.__

__4.__ `[ASYNC] getUserByName(usernameIn: String)`
##### Summary:
Obtains information about the user with given username _usernameIn_ and returns a promise containing the found user object or __NULL__ if none was found.
##### Parameters
* __`usernameIn`__: username of user you wish to find
##### Return
A promise that resolves to the user object if it was found and null otherwise. __Throws error on terminal failure.__

__5.__ `[ASYNC] getUserById(id: String)`
##### Summary:
Obtains information about the user with given id _id_ and returns a promise containing the found user object or __NULL__ if none was found.
##### Parameters
* __`id`__: id of user to find
##### Return
A promise that resolves to the user object if it was found and null otherwise. __Throws error on terminal failure.__

 __6.__ `[ASYNC] deleteUser(userID: ObjectID/String)`
##### Summary:
Deletes the user with given userID. The id can be a string or an ObjectID object, but it has to be one of those otherwise the function will fail.
##### Parameters
* __`userID`__: id of user being deleted   
##### Return
A promise containing the status code of the request. __Throws error on terminal failure.__

 __7.__ `[ASYNC] banUser(userID: ObjectID/String)`
##### Summary:
Bans user with _id _userID_ by setting their _status_ to 0.
##### Parameters
* __`userID`__: id of user to be banned
##### Return
A promise containing the status code of the request. __Throws error on terminal failure.__

 __8.__ `[ASYNC] unbanUser(userID: ObjectID/String)`
##### Summary:
Unbans user with _id _userID_ by setting their _status_ to 1.
##### Parameters
* __`userID`__: id of user to be unbanned
##### Return
A promise containing the status code of the request. __Throws error on terminal failure.__

__9.__ `[ASYNC] updateUserRecord(userID: ObjectID/String, propName: String, propVal: various)`
##### Summary:
Updates property _propName_ with value _propVal_ of user with id _userID_. __Note:__ the type of propVal varies depending on field being updated; check the schema of object you are updating to know the correct type of this parameter. __DO NOT USE THIS METHOD TO UPDATE USER PASSWORDS IT WILL NOT WORK DUE TO THE HASHING INVOLVED IN CHANGING A PASSWORD, USE THE ONE BELOW.__
##### Parameters
* __`userID`__: id of user to be updated   
* __`propName`__: name of property to update
* __`propVal`__: updated property value
##### Return
A promise containing the status code of the request. __Throws error on terminal failure.__

__10.__ `[ASYNC] updatePassword(id: String/ObjectID, newPass: String)`
##### Summary:
Updates the user's password to be _newPass_ while also ensuring to rehash it.
##### Parameters
* __`id`__: id of user object the password of which is being changed
* __`newPass`__: new password
* __``__: 
##### Return
A promise containing the status code of the request. __Throws error on terminal failure.__

## clubActions Documentation

This file contains the API for manipulating club data. To import any functions from this file, use the following import statement:
```javascript
import {functionName} from '../../actions/clubActions'
```

#### Functions
__1.__ `[ASYNC] getAllClubs()`
#### Summary:
Retrieves all clubs.
#### Parameters
* none
#### Return
Returns a Promise that resolves to an array containing club objects on success. When the status code of our HTTP response is not 200, will resolve to an empty array. __Throws error on terminal failure.__

__2.__ `[ASYNC] createClub(name, profilePicture, bannerImage)`
#### Summary:
Creates a new club object and adds it to our database.
#### Parameters
* __`name`__: The name of the new club.
* __`[OPTIONAL] profilePicture`__: The full path to the profile picture for this club. Must be the absolute path, relative paths (starting with `..` or `.`) will not work.
* __`[OPTIONAL] bannerImage`__: The full path to the banner image for this club. Must be the absolute path, relative paths (starting with `..` or `.`) will not work.
#### Return
Returns a Promise containing the status of the operation. __Throws error on terminal failure.__

__3.__ `[ASYNC] getClub(id)`
#### Summary:
Retrieves a club with the given id.
#### Parameters
* __`id`__: The id of the club we want to retrieve.
#### Return
Returns a promise containing a club object. When the status of our HTTP request is not 200, returns an object containing only the status of the request. __Throws error on terminal failure.__

__4.__ `[ASYNC] updateClub(id, attr, new_val)`
#### Summary:
Update attribute `attr` of club with given id, `id`, to new value, `new_val`.
#### Parameters
* __`id`__: The id of the club we wish to update. 
* __`attr`__: The attribute of the club we wish to update. 
* __`id`__: The new value we want to set `attr` to.
#### Return
Returns a promise containing the status of the operation. __Throws error on terminal failure.__

__5.__ `[ASYNC] deleteClub(id)`
#### Summary:
Removes club with `id` from the collection.
#### Parameters
* __`id`__: The id of the club we wish to remove. 
#### Return
Returns a promise containing the status of the operation. __Throws error on terminal failure.__

## postActions Documentation

This file contains the API for manipulating post data. To import any functions from this file, use the following import statement:
```javascript
import {functionName} from '../../actions/postActions'
```

#### Functions
__1.__ `[ASYNC] createPost(posterID, content, title, location)`
#### Summary:
Creates a new post with the given arguments. 
#### Parameters
* __`posterID`__: The id of the user or club that has made this post. Ensure that this is a valid ObjectID.
* __`content`__: The text content of this post.
* __`[OPTIONAL] title`__: The title of this post.
* __`[OPTIONAL] location`__: The location this post was made.
#### Return
Returns a promise containing the status of the operation. __Throws error on terminal failure.__

__2.__ `[ASYNC] getPostbyPosterID(posterID)`
#### Summary:
Retrieves all posts made by a specific id. Ensure that posterID is a valid ObjectID or our status will always be 400.
#### Parameters
* __`posterID`__: The id of the poster we wish to retrieve posts for.
#### Return
Returns a promise containing an arary of post objects with posterID matching the provided id. When the status of the HTTP request is not 200, or no posts are found, will return an empty array.__Throws error on terminal failure.__

__3.__ `[ASYNC] removePostByID(id)`
#### Summary:
Removes a post with the given id.
#### Parameters
* __`id`__: The id of the post we wish to remove.
#### Return
Returns a promise containing the status of the operation. __Throws error on terminal failure.__

__4.__ `[ASYNC] updatePost(id, updateField, updateContent)`
#### Summary:
Updates the `updateField` member of the post with given id to `updateContent`.
#### Parameters
* __`id`__: The id of the post we wish to update.
* __`updateField`__: The field of the post we want to update.
* __`updateContent`__: The new value we want the `updateField` to take. NOTE: Just like in `createClub`, if this is a new image, this field must be the absolute path, relative paths (starting with `.` or `..`) will not work. 
#### Return
Returns a promise containing the status of the operation. __Throws error on terminal failure.__
