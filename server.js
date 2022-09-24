const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const methodOverride = require('method-override')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const dashboardRoutes = require('./routes/dashboard')
const tasksRoutes = require('./routes/tasks')
const entriesRoutes = require('./routes/entries')

//Use dotenv to hide sensitive data
require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)
// Connect to MongoDB
connectDB()
//Using EJS for templating
app.set('view engine', 'ejs')
//Static folder
app.use(express.static('public'))
//Bodyparser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//Logging
app.use(logger('dev'))
//Use forms for put and delete
app.use(methodOverride('_method'))

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())
//Use flash messages for errors
app.use(flash())
//Routes for main, dashboard, tasks, and entries 
app.use('/', mainRoutes)
app.use('/dashboard', dashboardRoutes)
app.use('/tasks', tasksRoutes)
app.use('/entries', entriesRoutes)

//Server running  
app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}.`)
})    