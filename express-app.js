const express = require('express')
const cors = require('cors')
const basicRoutes = require('./routes/basicRoutes')
const adminRoutes = require('./routes/adminRoutes')
const session = require('express-session')
const { SESSION_SECRET } = require('./config')


module.exports = async (app) => {
    
    app.use(cors())
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))


    // setting d express session middleware
    app.use(session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    }))

    // vendors account routes
    app.use('/', basicRoutes)

    // product routes
    app.use('/admin', adminRoutes)
    
}