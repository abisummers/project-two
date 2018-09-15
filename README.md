# project-two

Project Two of Ironhack bootcamp. For this project we worked in pairs to create our first full stack application. We wanted to create a platform that allows UX/UI and web dev students to share ideas and projects to allow them to have instant feedback. Only verified users can access the site. To sign up you have to specify what course you are doing from a dropdown option. After you have signed up, an email is sent to your account.  When you log in, there are four options, a create a project, create and idea, view ideas and view projects. On the projects you can leave a comment about how to improve it, your message the creator directlty.

On admin accounts there is also another option on the homepage, which tells you how many users there are to verify and allows you to go directly to user management page. 

The inspiration came from a staff member at Ironhack who wanted a platform that allows UX/UI design and web dev students to share work and to communicate with each other. 


https://ironhack-sharer.herokuapp.com/ 


#PRE CODE 
Drew wireframes to allow us to clearly see what commponents were needed
Installed npm packages such as bcrypt for password secruity 
Decided what models would be needed
Thought of the routes we would need to allow us to break down the code to allow oraganisation 
Dedicated tasks to each person to help prevent conflicts on merge 


DAY #1 
Created user, project and idea models 
Created most of the routes
Added a basic layout with a nav to check that all the links worked 
Added forms for logging in, creating account, and adding projects and ideas 


DAY #2 
Added flash messages to give users feedback 
Added settings to users, projects and idea pages 
Added delete buttons
Added comment section to project page 

DAY #3 
Added image upload
Added admin zone 
Created a seed file for the users 
Added nodemailer which sends a message to user when the sign up
Hid delete/edit buttons on projects/ideas when they do not belong to current user 


DAY #4 
Started CSS
Added setting for verifing the users 
Added requiremnets for password and name length 
Deployed the app 


DAY #5 
Finished CSS 
Added logo 
Moved the layout of the flash messages 
Fixed small bugs
