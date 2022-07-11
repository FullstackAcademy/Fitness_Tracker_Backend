// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router
const express = require('express');
const apiRouter = express.Router();
const {JWT_SECRET} = process.env

const jwt = require('jsonwebtoken');
const {getUserById} = require('../db/users')

apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
    
    if (!auth) {
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);
      try {
        const { id } = jwt.verify(token, JWT_SECRET);
        if (id) {
          req.user = await getUserById(id);
          next();
        }
      } catch ({ name, message }) {
        next({ name, message });
      }
    } else {
      next({
        name: 'AuthorizationHeaderError',
        message: `Authorization token must start with ${ prefix }`
      });
    }
});

apiRouter.get('/health', async (req, res, next)=>{
    try {
        const message = {message: "Looks like it's working..."}
        res.send(message)
        next();
    } catch (error) {
        next(error);
    }
})

const routinesRouter = require('./routines');
const activitiesRouter = require('./activities');
const usersRouter = require('./users');
const routineActivitiesRouter = require('./routine_activities');

apiRouter.use('/users', usersRouter);
apiRouter.use('/activities', activitiesRouter);
apiRouter.use('/routines', routinesRouter);
apiRouter.use('/routine_activities', routineActivitiesRouter);

module.exports = apiRouter
