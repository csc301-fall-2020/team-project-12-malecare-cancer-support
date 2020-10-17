# Team 12 

## Product Details
 
#### Q1: What are you planning to build?

 We are planning to build a web application that will help the cancer survivors/patients to connect with each other based on the data they provide. 
 
 Cancer doesn’t only affect someone's physical health but also takes a toll on their mental stability. This life-changing diagnosis and the exhausting treatment that comes after   it can induce feelings like anxiety, distress, depression, and **loneliness**. 
 
### And WE BELIEVE 

![no one should face cancer alone](https://i0.wp.com/zoeamar.com/wp-content/uploads/2016/01/macmillan-image.jpg?w=600&ssl=1)

Therefore, to solve this problem we are making an app that will help the patients find a partner to date or a mentor to consult. (Maybe Both!!) 

Our goal is to improve their mental health through which we can improve their treatment, physical health, and the life ahead. 

We have designed a mockup which can be viewed [here.](https://www.figma.com/proto/AKsBmCRIOOWOj00waI7xUa/Untitled?node-id=18%3A12&scaling=contain)
#### Q2: Who are your target users?

[Persona link](https://app.xtensio.com/design/8n53ykwd)

Through this application we will be targeting all the cancer patients/survivors throughout the world irrespective of color, race, sex, religion, or sexual preferences. 

According to https://www.cancer.org/research/cancer-facts-statistics/global.html ,by 2040, the global burden is expected to grow to 27.5 million new cancer cases.

![stats](https://cdn.statcdn.com/Infographic/images/normal/20706.jpeg)

That is approximately 70,000 new cases every day. So all these people will be our target users.


#### Q3: Why would your users choose your product? What are they using today to solve their problem/need?

   Our app will give cancer patients an easy to use, intuitive platform to find and connect with other people who are going
    through the same experience as them. Therefore it will make them feel less anxious, distressed, depressed or lonely. It will
    be inclusive regardless of users race, sex, religion, or sexual preference. Additionally, it will notify users of any new
    and upcoming clinical trials of which they are not aware. 
Currently, MaleCancer already has a website that they are using called cancermatch.com. But, the old website had many
    problems including but not limited to: hard to navigate user interface and the non functional user sign up process. 
    Our web app will allow our users to save time (in days) and the effort it takes to call MaleCancer for manual registration 
    by making the signup/signin screen functional. Our web app allows users to become mentors, so they can share their 
    experiences and wisdom with other users. We will provide users with specifically selected profiles of other users based on
    location, their common experiences, treatments, diagnoses. This will help users to connect efficiently with mentors or a 
    date or both. Our app will help our partner’s organization’s mission of helping cancer patients of any race, gender over the
    world by connecting them to each other and notifying them about helpful resources.


#### Q4: How will you build it?

Our technology stack for our web application is:
* Languages: HTML, CSS, Javascript, SQL;
* Frameworks: 
    * Frontend: ReactJS
    * Backend: NodeJS + ExpressJS
    * General: Jest
* Libraries:
    * Frontend: Bootstrap, Material-UI, Redux
    * Backend: Socket.io
* Database: SQL database
* PaaS: AWS
* Other tools: Let's Encrypt, Liquibase, circleCI

We plan to deploy our web application using AWS since our partner has an AWS account. We are planning that both the web application and the SQL database will be hosted on AWS.
We will follow a basic web application architecture: 

![Architecture](https://i.ibb.co/Bz6wDnc/yeett.png)

We are planning to use third party APIs for our app. Our application will likely use Google API. Specifically, our application will use Google OAuth, so users of the app can sign in using their Google accounts.

We will do Behaviour Driven Development. That is, all team members would write a few tests (e.g. Jest tests) for their daily commited code based on the user stories that we need to implement. On the weekends, we will write more comprehensive tests for our code and conduct code reviews before merging our code to a master branch, so our master branch only contains tested and working code. Moreover, we are planning to setup CI pipeline using circleCI, so we can conduct integration tests on our code.

#### Q5: What are the user stories that make up the MVP?

**User Story:** As a cancer patient or survivor, I want to connect with other patients or survivors in order to mentor them or be mentored by them.

**Acceptance criteria:** 
* Show profiles of mentors to user
* Show users as  mentors/mentees to others seeking mentors/mentees.
* Allow users to match with mentors/mentees.
* Allow users to chat with matched mentors/mentees.

**User Story:** As a cancer patient or survivor, I want to be able to get notified of the most recent clinical trials and treatments near me in order to help improve my recovery process.

**Acceptance criteria:**
* User should receive notifications by email 
* User should receive information about clinical trials and treatments that are relevant to the user’s condition and location

**User Story:** As a cancer patient or survivor, I want to connect with other patients or survivors in order to find a significant other who went through the same processes as me and understands how I am feeling.

**Acceptance criteria:**
* Show potential matches in order of matching percentages.
* Allow users to chat with matched survivors/patients
* Allow users to exchange contact information with each other.

**User Story:** As a cancer patient or survivor, I want to connect with other patients or survivors in order to hookup or have casual relationships with them without being judged.

**Acceptance criteria:**
* Have extensive matching criteria that are not exclusive to traditional dating to get into a relationship.
* Allow users to chat with matched survivors/patients
* Allow users to unmatch at any given time and have their chats deleted

**User Story:** As a cancer patient or survivor, I want to see other patients or survivors in order to not feel alone in my journey.

**Acceptance criteria:**
* Allow users to filter matches by their location.
* Allow users to chat with matched survivors/patients

Profile information: Name, email, location, optional phone number, social media handles

User stories:
* Login and create profile
* Find others
* Looking at others' requests
* Switching between dating & mentorship portions
* Update profile

Views/pages:
* Login
* Tutorial
* Page with mentorship and dating "tabs"
* Update profile

----

## Process Details

#### Q6: What are the roles & responsibilities on the team?

We have separated our project into Frontend (including UI), Backend (including algorithms used by the app), and Database portions, with team members assigned to these areas. Team members in each area are responsible for setting up a development environment for their component, developing features, writing tests, and integrating their component with other team members’ work.
We have two people responsible for email communication with the partner on behalf of the team; all team members are expected to attend meetings with the partner unless other circumstances arise.
Someone: take minutes during partner meeting

Arnur
* Roles & responsibilities: Frontend & UI
* Strengths: Experience with frontend frameworks (Vue, Angular, React), experience with frontend libraries (Bootstrap, Materialize CSS, Vuetify), proficient in Javascript
* Weaknesses: Inexperienced with Github workflow, little experience with SQL databases, inexperienced with cloud platforms e.g. AWS 

Ismail
* Roles & responsibilities: Frontend & UI
* Strengths: Python, Java, C
* Weaknesses: Databases, Web development, CI/CD

Jonathan
* Roles & responsibilities: Frontend & UI
* Strengths: Python, C, CI/CD
* Weaknesses: Databases, Not as familiar with JavaScript, ADA UI design

Pascal
* Roles & responsibilities: Backend (incl. database); UI mockups
* Strengths: Javascript, Python, Frontend framework - Vue
* Weaknesses: UI mockups, UX, Presentation

Uttkarsh
* Roles & responsibilities: Backend (incl. database)
* Strengths: Experience with Backend Development (Node.js , Express, etc.),
* Proficient in JavaScript, understanding of integrating API’s with the project, and Frontend UI
* Weaknesses: Not well versed with SQL databases, inexperienced with unit testing and integration testing, No experience with React

Rutav
* Roles & responsibilities: Backend (may help with database)
* Strengths: SQL, Python, Java
* Weaknesses: Web Development, Javascript, NoSQL databases

#### Q7: What operational events will you have as a team?
  
As a team we will meet once per week online on Zoom at Tuesdays 6-7pm Toronto time. For the first few team meetings, we will be doing overall planning for the app (UI, user stories, setting up frameworks, etc) and distributing tasks. As we begin working on code, at our meetings we will share updates on each member’s progress, any outstanding bugs, and details about integrating different components together, along with any needs for communication with the project partner. Other communication needs will be done via Messenger (see more details in our answer to Question 9). We are meeting with our project partner on Thursdays 12-1pm on a weekly basis.

We met with our project partner on October 8 and October 15. At our first meeting, we discussed the project partner’s requirements and ideas for the project, and inquired about technical and functional details for the project. We were able to better understand the project partner’s requirements and the potential userbase; the project partner agreed to send us data for cancer types and treatments in a week. The meeting minutes for the first meeting are below:

First meeting notes:
* Appname: CancerChat,
  Web app is ok, 
  Connect cancer patients with each other, 
* Users: 18+, all cancer patients across the world, 
  Potential users: ~74k connected with organization, ¼ would probably start using this app at first
  Two types of users:
  * Cancer survivors meeting with each other (for dating like tinder)
  * Mentorship (for information)
  * Or both
* Project partner app requirements:
  Simple to use: other website takes “20 clicks” to find what you’re looking for 
  Few barriers to use, must be visually intuitive
  * Including useable by people under medication or fatigued/dizzy, eg ADA standards
  Can match with medication(and/or) cancer type and cancer stage and treatments
  Admin access to obtain email list of users under certain criteria (to later send emails/notifications about treatment suggestions and clinical trials).
* User information
  Ask users to enter their location
  Email is REQUIRED phone number is optional
* Data policy: Doesn’t need to be HIPA. But follow regular data protection guidelines: GDPR
* Project partner has accounts for AWS or liquibase.com; organization has a privacy policy already set up
* US ADA guidelines for UI style that is cancer patient-friendly
* Project partner will send us lists of cancer types and treatments next week

Second meeting notes: 
* Obtained strong approval for our user stories
* Obtained feedback on mockups
  Rename “Likes” to a different term
  Think more about placement of icons, profile information to display
* Partner would like a chat feature to be within the scope of the project (eg 3rd party plugin)
  
#### Q8: What artifacts will you use to self-organize?
 
**Partner Meetings**: During our meetings with the partner, we will take notes to keep track of topics that were discussed, the meetings will be around 30 to 60 minutes long.

**Team Meetings**: The team meetings will last anywhere between an hour to two hours and occur twice a week. During these we will identify and assign tasks as a whole team, after which we will split into our subteams (Frontend, Backend, etc.) and discuss any more specifics that we need to, for example we will identify problems, concerns, and new idea suggestions in this time. These team meetings To keep track of all of these issues the team will be using a Trello board to keep track of what the tasks are and who they were assigned to, most of these tasks will be created during the Team meeting. We will utilize a column in Trello that keeps track of the status on each task, and also use its tags to assign priority to each task. This way the whole team will be able to effectively communicate with each other.  

#### Q9: What are the rules regarding how your team works?

**Team communication**: We will use a team Messenger group chat, as it is the method of communication all team members use most frequently. After a team meeting, we agreed that we would expect and prefer team members to respond to general messages within 24 hours, and respond to technical questions about the team member’s area/code preferably within a few hours. We noted that if a team member could not answer the question at the moment, we would prefer the team member to acknowledge the question and briefly reply instead of just ghosting.

**Team meetings**: we expect everyone to attend our team meetings that will happen every week at 6pm Toronto time on Tuesdays. We will send a reminder message in our Messenger group before each meeting.

**Communication with partner**: we anticipate most communication to be done during our weekly meetings with the partner. If there are any urgent items we need to discuss during the week, any team member can bring it up in our Messenger group chat or during a team meeting; at that point the team can discuss and then designate a person, who will write up an email for the partner (CC-ing everyone) and convey the results to the team
Accountability: During our team meetings we will check up on each team member’s progress, and inquire about any outstanding/delayed work (including whether there were any circumstances that came up). If team members are non-responsive regarding attending meetings or completing action items, we will follow the procedure listed in the conflict resolution section below.

**Conflict resolution:**
- Different opinions on implementation of technical details: discuss as a team, and then have team members vote.
- Non-responsive team member: first try contacting them via messages; then call via Messenger if two days pass with no response; as a last resort, contact our project TA with the relevant details.
- Different opinions on how tasks should be distributed: have team members in the given area (Frontend, Backend, Database) first try to work it out; if that is unsuccessful, have other team members moderate the discussion.



----
### Highlights

**Choosing Projects**: From the start of the project our approach to every decision so far has been to take a vote. For the project selection, we decided to give each team member the chance to vote for as many projects as they wanted but each vote of theirs had varying weights. Each team member was allowed to assign values of 1, 0.75, 0.5 and 0.25 only once to each respective project of their choosing, and 0.1 zero or more times to projects without a vote. The top three projects which had the highest weight aggregate were chosen to include in the proposal. We used this method because it gave each team member time to decide on their own without being swayed by the opinion of other group members, and this made for a better way to gauge everyone’s interests. The projects with the top 3 scores were chosen to be included in our project proposal. 

**Meeting Times**: Instead of picking meeting times and having team members make adjustments to their schedule  accordingly we decided to take everyone’s timetables (including lecture times and other commitments) and time zones into account and found common free times where the meetings would take place. This way no one would have to adjust their schedules to fit team meetings, we found this to be a good way of coordinating this as it took every input into account. 

**Web or Mobile**: After the first team meeting with the partner it was decided that we would be developing a web app instead of a mobile app. The main reason for this was that the partner already has a user base from cancermatch.com and would like to migrate them over to our web app. Going with a mobile app would have been another hurdle in this process as we would have had to account for different platforms and would add another step for the users as they would have to download the app.

**Type of Database**: We chose to use a SQL database for this project. Initially we wanted to work with a NoSQL database as it would have been easier to use and implement for us but after meetings with the partner and a team meeting we decided to go with a SQL database as the product we are building is meant to be used for an extended period of time. This meant that using a NoSQL database like MongoDB might have caused problems for the client in the long run and for that reason we decided not to use it. 

**Front end Framework**: For this we chose to use React. An alternative to this would have been Vue JS, we decided against using Vue JS as most of us don’t have experience working with it. Another reason for choosing React was its huge community which is exemplified with many more tutorials and StackOverflow questions, both of which might come to be very useful to us. React is also maintained by Facebook which means that there is long term support available whereas Vue is maintained by a team financed by crowdfunding. 

