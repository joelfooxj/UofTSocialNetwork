# team11
## Project Description:
This project is aimed at creating a social space for students to discover new clubs around UofT.

## How to Run our Project:
Navigate to https://limitless-caverns-98642.herokuapp.com/, the project should be deployed on Heroku and there is no local set up necessary. __The timeout is set to 10 minutes after logging in. You will have to re-login after 10 minutes if you timeout.__

## Log In Credentials (username, password)
Regular User: (user, user) </br>
Administrator: (admin, admin) </br>
Banned User: (banned, banned) </br>
Executive of Club: (exec, exec)</br>

## Description and Instructions
### Log In Page
This is the first page the user (both a regular user and an admin) will see upon navigating to our website. Here the user is able to enter their credentials and log into their account. If they do not have an account, they can press the "Create Account" button to navigate to the account creation page. <br/>
<br/>
If the log in was successful, the user will be navigated to their feed page where they can see posts from clubs that they follow, are an executive of or a member of depending on their timeline options set in User Center.</br>
However, if the log in was not successful, either of the two messages will appear: "Account Banned" if the account was banned by an admin or "Incorrect Credentials" if the user mistyped their username or password. If the user wishes to see their password while typing it, they can click the visibility icon next to the password field. Please note that the only way to recover access t your account after being banned is to contact the admin directly. <br/>
<br/>

### Create Account Page
This page is meant for regular users who wish to create an account. Admin accounts are created internally by the system administrator of the website. Here the user can fill in the appropriate fields to create an account. Note that the fields have to be non-empty. In addition, if a user tries to enter a username or email that is already in use, the website will let them know that it is already taken and they have to use a different one. We also have a simple regex for checking email format and telling whether an email has valid structure for our website. Once the account is created, you will be redirected to the log in page and will be able to log in with your new credentials.

### Feed Page
This is the page the user sees right after logging in. On this page the user can see posts from the following categories of clubs: clubs they are following, clubs they are an executive of and clubs they are a member of. The clubs the user sees posts from depend on what options the user has set in their User Center under 'Receive timeline updates from'. __Please note that by default all options are disabled.__ From this page you can also use the Navbar at the top of the page to navigate to other pages. </br>

The posts themselves display what club's page the post was made on, what time and the content of the post. __Please note we never meant to display the user who made the post, in our application posts are made by the clubs' members and are displayed as posts made by the club itself and not any individual user.__

### User Profile Settings Page (User Center on Navbar)
On this page the user is able to change profile information such as username, password, email, etc. The user is not allowed to change their username or email to one that already exists and they will be prevented from doing so. The email field does not display the current password and just says 'New Password' as an indication of where the new password has to be entered. Be careful, if you click edit and do not change the password it will be set to whatever is in the input field when you click save, so if you just click Edit and then Save, it will be set to 'New Password'. Lastly, on this page the user can delete their account. This action cannot be reverted and therefore this feature should be used only with absolute certainty. 

### Following Page
This page shows the profile icons of all clubs that the user is a member of or an executive of or a follower of. The user can press the view button on each club's card to view that club's profile and dashboard.

### Explore Page
This page lists all the clubs in our application. From here the user can click 'View' to view the club's page or click 'Request to join' to request to join the club. Requests have to be approved by the admin or the club executive so you would have to log in as one of them to do this. More information about admin  functions will be provided later in the document. There is also a search bar at the top that searches the club list by club name. If you are an executive of any club, those clubs will also have an 'Edit' button on their listing. You can click that to edit your club's page.

### Club Profile Page

This page is the view for any club. It displays a selected banner image and profile photo based on the club. Also displayed is a bio and posts that the club has made. A user is able to perform several different actions depending on their permissions. Executives will be able to make posts and delete existing ones. All users are able to follow and unfollow, and request to join a club if they are not a part of it already. This request must be approved by an admin before a user is actually a part of the club.

### Admin Dashboard
This is the page that the admin sees on log in. Here the admin can ban users, unban users, change users' profile information, edit club profiles and delete users and clubs. The admin can also create a new club from this page. __Only an admin can make a new club and it has to be done from this page.__ If the admin presses the 'View' button on a user profile, they will be redirected to the User Profile Page where they can edit the user information. If they press 'Edit' on a club profile, they are redirected to the Club Dashboard described below. 

### Club Dashboard
This page allows admins and club executives to edit their club. You can select the profile image and the banner image of your club. You can also see the members, followers and executives of the club as well as view posts and delete posts. Lastly, admins and executives can approve club join requests on this page.

### Create New Club

This page is where new clubs are created. Only users with admin level permissions are able to access this page as it is a part of the admin dashboard as discussed above. Here the admin can enter the name and bio text of the new club. Clubs are created with a default profile picture and banner image, which can be changed later on the club/admin dashboard.


