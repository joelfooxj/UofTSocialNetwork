# team11
## Project Description:
This project is aimed at creating a social space for students to discover new clubs around UofT.

## How to Run our Project:
Navigate to https://limitless-caverns-98642.herokuapp.com/, the project should be deployed on Heroku and there is no local set up necessary. __The timeout is set to 10 minutes after logging in. You will have to re-login after 10 minutes if you timeout.__

## Log In Credentials (username, password)
Regular User: (user, user) </br>
Administrator: (admin, admin) </br>

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

### Club Dashboard
(the one you navigate to if you click Edit on Explore)

### Amin Dashboard

### Create New Club




### Club Profile Page
This page is the view for any club. It displays a selected banner image and profile photo based on the club. Also displayed is a bio and posts that the club has made. A user is able to perform several different actions depending on their permissions. Executives will be able to make posts and delete existing ones. Club members are able to All users are able to follow and unfollow, and request to join a club if they are not a part of it already. This request must be approved by an admin before a user is actually a part of the club.

### MainPage/Feed Page
This page is the main page of the app, it has a navbar that integrated multiple functionality. If the user type is admin, then the admin will be able to access the admin dashboard page. If the user type is user, then the user will be able to access hotposts, all feeds, club following manage and user profile page. Both user contains a search page which searches across all the posts and clubs, this will be implemented in pharse 2. The first two feeds on this page is a sample of posts with full description, those will be delete later. The posts following are the postes from all the clubs that the current user is following.

### Club Following Page
This page is for the purpose of showing clubs that the user is following. The clubs are ordered by the following order with the information of the club profile, club name, club followers. 

### Navigation 
Explore - Goes to a list of all clubs that exist on our website.
Feeds   - Goes to the main feed page for this user.
Following - Goes to a page displaying a list of clubs that the user is following.
UserCenter - Goes to the user profile.

### Browse All Clubs Page 
This page allows the user to view all clubs. 
