# team11
## Project Description:
This project is aimed at creating a social space for students to discover new clubs around UofT.

## How to Download and Run our Project:
* git clone 
* cd team11
* npm install
* npm install @material-ui/core
* npm install @material-ui/icons
* npm install react-boostrap
* npm install react-router-dom
* cd my-app/my-app
* npm start



## Description and Instructions
### Log In Page
This is the first page the user (both a regular user and an admin) will see upon navigating to our website. Here the user is able to enter their credentials and log into their account. If they do not have an account, they can press the "Create Account" button to navigate to the account creation page. <br/>
<br/>
If the log in was successful, the user will be navigated to their feed page where they can see events and posts from clubs that they follow.
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

### Club Profile Page
This page is the view for any club. It displays a selected banner image and profile photo based on the club. Also displayed is a bio and posts that the club has made. A user is able to perform several different actions depending on their permissions. Executives will be able to make posts and delete existing ones. Club members are able to All users are able to follow and unfollow, and request to join a club if they are not a part of it already. This request must be approved by an admin before a user is actually a part of the club.

### MainPage/Feed Page
This page is the main page of the app, it has a navbar that integrated multiple functionality. If the user type is admin, then the admin will be able to access the admin dashboard page. If the user type is user, then the user will be able to access hotposts, all feeds, club following manage and user profile page. Both user contains a search page which searches across all the posts and clubs, this will be implemented in pharse 2. The first two feeds on this page is a sample of posts with full description, those will be delete later. The posts following are the postes from all the clubs that the current user is following.

### Club Following Manage Page
This page is for the purpose of manage clubs that the user is following. The clubs are ordered by the following order with the information of the club profile, club name, club followers. A delete button is besides each entry.

### Navigation 
Explore - Goes to a list of all clubs that exist on our website.
Feeds   - Goes to the main feed page for this user.
Following - Goes to a page displaying a list of clubs that the user is following.
UserCenter - Goes to the user profile.
