# YOUR PRODUCT/TEAM NAME
> _Note:_ This document is meant to evolve throughout the planning phase of your project.   That is, it makes sense for you commit regularly to this file while working on the project (especially edits/additions/deletions to the _Highlights_ section). Most importantly, it is a reflection of all the planning you work you've done in the first iteration. 
 > **This document will serve as a master plan between your team, your partner and your TA.**

## Product Details
 
#### Q1: What are you planning to build?

 > Short (1 - 2 min' read)
 * Start with a single sentence, high-level description of the product.
 * Be clear - Describe the problem you are solving in simple terms.
 * Be concrete. For example:
    * What are you planning to build? Is it a website, mobile app,
   browser extension, command-line app, etc.?      
    * When describing the problem/need, give concrete examples of common use cases.
    * Assume your the reader knows nothing about the problem domain and provide the necessary context. 
 * Focus on *what* your product does, and avoid discussing *how* you're going to implement it.      
   For example: This is not the time or the place to talk about which programming language and/or framework you are planning to use.
 * **Feel free (and very much encouraged) to include useful diagrams, mock-ups and/or links**.


#### Q2: Who are your target users?

  > Short (1 - 2 min' read max)
 * Be specific (e.g. a 'a third-year university student studying Computer Science' and not 'a student')
 * **Feel free (but not obligated) to use personas.         
   You can create your personas as part of this Markdown file, or add a link to an external site (for example, [Xtensio](https://xtensio.com/user-persona/)).**

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

Describe the different roles on the team and the responsibilities associated with each role. 
 * Roles should reflect the structure of your team and be appropriate for your project. Not necessarily one role to one team member.

List each team member and:
 * A description of their role(s) and responsibilities including the components they'll work on and non-software related work
 * 3 technical strengths and weaknesses each (e.g. languages, frameworks, libraries, development methodologies, etc.)

#### Q7: What operational events will you have as a team?

Describe meetings (and other events) you are planning to have. 
 * When and where? Recurring or ad hoc? In-person or online?
 * What's the purpose of each meeting?
 * Other events could be coding sessions, code reviews, quick weekly sync meeting online, etc.
 * You must have at least 2 meetings with your project partner (if you have one) before D1 is due. Describe them here:
   * What did you discuss during the meetings?
   * What were the outcomes of each meeting?
   * You must provide meeting minutes.
   * You must have a regular meeting schedule established by the second meeting.  
  
#### Q8: What artifacts will you use to self-organize?

List/describe the artifacts you will produce in order to organize your team.       

 * Artifacts can be To-Do lists, Task boards, schedule(s), meeting minutes, etc.
 * We want to understand:
   * How do you keep track of what needs to get done?
   * How do you prioritize tasks?
   * How do tasks get assigned to team members?
   * How do you determine the status of work from inception to completion?

#### Q9: What are the rules regarding how your team works?

Describe your team's working culture.

**Communications:**
 * What is the expected frequency? What methods/channels are appropriate? 
 * If you have a partner project, what is your process (in detail) for communicating with your partner?
 
**Meetings:**
 * How are people held accountable for attending meetings, completing action items? Is there a moderator or process?
 
**Conflict Resolution:**
 * List at least three team scenarios/conflicts you discussed in lecture and how you decided you will resolve them. Indecisions? Non-responsive team members? Any other scenarios you can think of?




----
### Highlights

Specify 3 - 5 key decisions and/or insights that came up during your meetings
and/or collaborative process.

 * Short (5 min' read max)
 * Decisions can be related to the product and/or the team process.
    * Mention which alternatives you were considering.
    * Present the arguments for each alternative.
    * Explain why the option you decided on makes the most sense for your team/product/users.
 * Essentially, we want to understand how (and why) you ended up with your current product and process plan.
 * This section is useful for important information regarding your decision making process that may not necessarily fit in other sections. 
