# Profit Prophet

A simple task/profit tracker to help independent contractors bid their work

### Tech used:
**HTML, CSS, JavaScript, EJS, Express, Node, TailwindCSS, Docker**

### Front-End
The front end was built with EJS as a templating language and tailwindCSS for style.

### Back-End
The backend follows MVC principals and was built using Node, Express, Mongoose and MongoDB. Passport-local, Express session and Bcrypt were used for authentication.

### Deployment 
The site was originally deployed on heroku. However since heroku is nolonger supporting their free teir, the site has since been moved to fly.io for hosting. fly.io utilizes the docker build system for hosting.

## Optimizations
This is a long term project with many future optimizations planned.
- I would like to update the front end from EJS to React
- I would like to add images to the entries, so contractors can keep pictures of completed work
- I would like to add per hour profits to tasks so you can see an hourly rate for each task.

### Dependencies

NONE! this is a web-app for everyone! 

### Installing

* Just visit "https://profit-prophet.fly.dev" to use.

### Executing program

* First you must add some tasks to track
  -click edit tasks
  -add task name, and how much you charge for the task
  -click submit (your task should populate in the list)

* Track your first task 
  -on the dashboard page select your task from drop down menu
  -click start to start the timer (use the pause button for unpaid breaks)
  -when finished with task click stop button to stop timer
  -click record button to record time to 'duration' of task
  -add how many units of task were completed 
  -click submit to add entry

* See how your hard work pays off!
  -the dashboard will track your total hours worked and total pay earned and give you an hourly average.
  -use the entries tab to view and delete all entries individually.

## Help

Feel free to email me if any bugs/issues arise.

