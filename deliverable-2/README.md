# CANCER CHAT by TEAM 12

> _Note:_ This document is intended to be relatively short. Be concise and precise. Assume the reader has no prior knowledge of your application and is non-technical. 

## Description 
 * Provide a high-level description of your application and it's value from an end-user's perspective
 * What is the problem you're trying to solve?
 * Is there any context required to understand **why** the application solves this problem?
 #### Answer
 
 We are planning to build a web application that will help the cancer survivors/patients to connect with each other based on the data they provide. 
Cancer doesn’t only affect someone's physical health but also takes a toll on their mental stability. This life-changing diagnosis and the exhausting treatment that comes after it can induce feelings like anxiety, distress, depression, and loneliness.

Therefore, to solve this problem we are making an app that will help the patients find a partner to date or a mentor to consult. (Maybe Both!!) 
Our goal is to improve their mental health through which we can improve their treatment, physical health, and the life ahead. 


## Key Features
 * Described the key features in the application that the user can access
 * Provide a breakdown or detail for each feature that is most appropriate for your application
 * This section will be used to assess the value of the features built

#### Answer 

1. Login and registration
###### LOGIN

![alt text](../images/loginpage.png)

This is the login page that will allow a user with an account to login with the correct details. If a user uses incorrect details to login, this message will be prompted to advise the user.

![alt text](../images/incorrect%20login.png)

If the user doesn’t have an account with us, they can simply create one by clicking on the “Sign up now!” link below the login button.

###### REGISTRATION

![alt text](../images/register1.png)
![alt text](../images/register2.png)

When the user clicks on sign up, they will be taken to a registration page where they have to fill out a form which asks them different personal questions and questions regarding their cancer. We use this information to match the users with each other and to provide them with necessary notification/guidance with their cancer treatment. Once the form is complete and the register button is clicked, a new user is stored in the database.

2. Matching Algorithm

![alt text](../images/matching.png)

Once a user performs a successful login, they are directed to this matching page. This page displays all the users that can be potential matches for the current user. Our matching algorithm displays these potential users by filtering them on two conditions - 
* Filter by the users who liked you - so all the other users that pressed connect on the current user would show up first
* Filter by location - this filter will limit the number of users and show only those users that are close to the current user

On the profile displayed a user can click pass or connect based on if they are interested in connecting with the user.

3. Navigation Bar for accessibility

After landing on the matching page, if a user clicks on the navigation button on the top left (which is indicated by three lines), they will see this.

![alt text](../images/navigationbaropen.png)

In this menu, you can see the current user with their name and profile picture, a home button which will take the user back to the matching page, a profile button which will take the user to the profile page, a chats button which will open a chatting page where the user can choose to chat with all the others users they connected with, and a logout button which they can use to logout of the application.
 
4. In-app Chatting

Once the two users are matched (both of them press connect on each other), they will show up on each other’s respective chatting page which can be selected by pressing chat button under the navigation bar. Once you click on a user it will open a new window where two users who are connected can chat easily.

![alt text](../images/chat.png)

	In this example, both Uttkarsh Berwal and gordon ramsay pressed connect on each other and they showed up on each other’s chat window under the navigation bar.
Clicking on the users name would open a chat window with them.
![alt text](../images/chatwindow.png)
In the chat window you can privately have conversations with that user.

5. The Profile Page

![alt text](../images/profilepage.png)
This page will simply show the user how their profile looks like to the other users. (can be extended in the future to update profile as well)

6. Notifying the users of new medicines and treatments (Admin Access)

For the admin purposes, as requested by our client, we made another route <route name> that will allow the admin to get the emails of all the users based on how he wants to filter the data in a CSV format. This feature will allow admin to email the users about any new and upcoming changes in their treatments or about new medicines in the market.
![alt text](../images/admin.png)
Here you can easily filter on all the available options, click generate email list and then download it as a csv.

## Instructions
 * Clear instructions for how to use the application from the end-user's perspective
 * How do you access it? Are accounts pre-created or does a user register? Where do you start? etc. 
 * Provide clear steps for using each feature described above
 * This section is critical to testing your application and must be done carefully and thoughtfully
 
 #### Answer 
 
Watch this demo to know about the app in detail. <link>

1. Use this link <link> to open the website.
2. You will be taken to the homepage of the website where you can choose from the two options to login an old user or signup a new user.
Login and Signup
* Case 1. If you already have an account login using the email and the password that you set.
* Case 2. If you don’t have an account click on the signup button to register a new user. Clicking on signup will take you to the registration page.
Fill out the registration details and press register to create a new user.
4. Successful login and signup will both take you to the matching page. On this page you will see the users who have pressed connect on you and the users that are close to you (distance in kms) in that order. Then as the current user, you can press connect or pass based on the profile.
* Case 1. If you press pass the user will be removed from your matching carousel and you will be shown a new user.
* Case 2. If you press connect it will put you in the top priority of the other user when they login and see their matching page.
(for the purpose of this course we have created 10 fake users, so if you login from one ID and press connect or pass on the available users, it will display a message that the “you are out of matches and come back later”)
5. On the top left of the matching page where you see all the user profiles there is a navigation button (three stripes). If you click on that button it will show you 4 items -
* Item 1. The name and profile picture of the current user, that is, you
* Item 2. The home button which will take you to matching page
* Item 3. The chat button which will take you to the chatting page where you can see all the users that you are connected with
* Item 4. The logout button for logging out of the account
6. Once two users have successfully pressed connect on each other, they will show up on each other’s chatting page which can be selected from the navigation bar.
Once you click on any of the users, it will open a chatting window where you can privately chat with the other user by typing your message and hitting send. If you want to go back just click the back button on top right.
7. The last feature is for the admin, which can be accessed using this route <route>.
On this page you can see a bunch of filters from which you can choose as the admin of the Male Care Organization and after selecting all the filters press generate an email list. It will show you how many users match your set filters and if they are more than zero, it will show a new option to download the CSV files of the emails of all the users passing your filters.
These emails can be used to send important messages to the users about new and upcoming advances in cancer treatments.
(this route was requested by the partner after our demo)

 
 ## Development requirements
 * If a developer were to set this up on their machine or a remote server, what are the technical requirements (e.g. OS, libraries, etc.)?
 * Briefly describe instructions for setting up and running the application (think a true README).
 
 #### Answer
 
 ###### Frontend Development
1. First we need to make sure that Node.js is installed on the system
(https://nodejs.org/en/download/)
 
2. The Developer should also have a code editor/IDE 
3. Then after cloning the files go to the frontend folder in team-project-12-malecare-cancer-support (root) and open the terminal.
(https://github.com/csc301-fall-2020/team-project-12-malecare-cancer-support.git) -> repository link
4. Run the command npm install in the frontend folder
5. Make sure all these dependencies are installed 
If they are not installed, then manually install them by running npm install <dependency name> in the terminal
6. Run the command npm start in the terminal in the frontend folder. This will start the react app on the browser for testing.
 
###### Backend Development
1. First we need to make sure that Node.js is installed on the system
(https://nodejs.org/en/download/)
2. Then make sure that mongoDB application is installed on the system
(https://www.mongodb.com/)
4. Then after cloning the files go to the CSC301_Backend folder in team-project-12-malecare-cancer-support (root) and open the terminal.
(https://github.com/csc301-fall-2020/team-project-12-malecare-cancer-support.git) -> repository link

4. Run the command npm install in the CSC301_Backend folder
5. Make sure all the dependencies are installed

6. If they are not installed, then manually install them by running npm install <dependency name> in the terminal.
7. Run the command npm run-script start-server in the terminal in the CSC301_Backend folder. This will start the server on your local system at the port 5000.
(you should get a message of “Success, Server is up and running!” if the server starts without an error and “connected to db” after that if you are connected to the mongoDB.)

 
 ## Deployment and Github Workflow

Describe your Git / GitHub workflow. Essentially, we want to understand how your team members shares a codebase, avoid conflicts and deploys the application.

 * Be concise, yet precise. For example, "we use pull-requests" is not a precise statement since it leaves too many open questions - Pull-requests from where to where? Who reviews the pull-requests? Who is responsible for merging them? etc.
 * If applicable, specify any naming conventions or standards you decide to adopt.
 * Describe your overall deployment process from writing code to viewing a live applicatioon
 * What deployment tool(s) are you using and how
 * Don't forget to **briefly explain why** you chose this workflow or particular aspects of it!
 
 #### Answer
 
 When we decided to split the team for the backend and the frontend, we also decided that we would separate out the branches for backend and frontend in order to avoid conflicts. We started by branching off the master into two separate branches, one for frontend and one for backend. The frontend branch is called “frontend-develop” and the backend branch is called “frontend-connect”. We always tried to keep the merges in one direction, from frontend-develop to frontend-connect. This is also the reason why we chose the above mentioned names because everytime frontend code was first developed on “frontend-develop” and then connected to the backend using “frontend-connect” where we could view a working application
In addition to these branches, whenever it was possible we chose to work on a new branch for a new feature which made the workflow as smooth as possible
Mostly, all of the pull requests were made by Rutav and Uttkarsh where they reviewed it together.  The other merges were made on group meetings where everyone could review it. We chose this particular workflow to improve the efficiency, save time, and avoid conflicts when we all combine our code.

###### Deployment


 ## Licenses 

 Keep this section as brief as possible. You may read this [Github article](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/licensing-a-repository) for a start.

 * What type of license will you apply to your codebase?
 * What affect does it have on the development and use of your codebase?
 * Why did you or your partner make this choice?
 
 #### Answer 
 We are applying the open-source code License called MIT to our codebase.
 
 MIT license is a short and simple permissive license which allows other users to freely use our code, make changes and modify it, but they have to include a copy of the same license when they are distributing the software. It will not affect development of our original code in any way but will allow coders from all over the community to borrow ideas from our code and even contribute to our code if they want to. 
The MIT license falls under the permissive (or BSD-style) of FOSS licenses. BSD-style licenses allow any user to do anything with the code granted they provide attribution and don’t claim any liability in the future.

Our partner did not have much information about the licenses, so we made the decision of choosing this license after informing him. We made this particular decision because this will allow any future CSC301 teams to work on our project and extend our code without any restrictions. 
This license is also really flexible with other licenses, so if the client wants to switch to a more restrictive/proprietary license one day, they can easily apply that license on top of this one.


