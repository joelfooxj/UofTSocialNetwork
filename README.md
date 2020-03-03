# team11
Project description

## How to Download and Run our Project:


## Description and Instructions
### Log In Page
This is the first page the user (both a regular user and an admin) will see upon navigating to our website. Here the user is able to enter their credentials and log into their account. If they do not have an account, they can press the "Create Account" button to navigate to the account creation page. <br/>
<br/>
If the log in was successful, the user will be navigated to [INSERT PAGE HERE]
However, if the log in was not successful, either of two messages will appear: "Account Banned" if the account was banned by an admin or "Incorrect Credentials" if the user mistyped their username or password. If the user wishes to see their password while typing it, they can click the visibility icon next to the password field. Please note that the only way to recover access t your account after being banned is to contact the admin directly. <br/>
<br/>
__Working Credentials Include:__
* (user, user)
* (admin, admin)
* (mike1995, password (banned account))
<br/>
The format is (username, password).

### Create Account Page
This page is meant for regular users who wish to create an account. Admin accounts are created internally by the system administrator of the website. Here the user can fill in the appropriate fields to create an account. Note that the fields have to be non-empty. Once the account is created, you will be redirected to the log in page and will be able to log in with your new credentials.

### User Profile Settings Page
On this page the user is able to change profile information such as username, password, email, etc. The user is also able to upload a profile picture to be used for their account. Please note that for now the profile picture will change only on this page as we are going to be using a database in phase 2 to support image file uploads so that all our views could display the profile picture as necessary. In addition, the image will revert back to default when you leave the page. Again, this will not be the case once the image is actually uploaded to a database and we can check if this account already has an image, for now the interaction is completely hardcoded. Lastly, on this page the user can delete their account. This action cannot be reverted and therefore this feature should be used only with absolute certainty. 


##
