const express = require('express');
const usersRouter = express.Router();

const jwt = require('jsonwebtoken');

const {getUser, getUserById, getUserByUsername, createUser} = require('../db/users')
const {getPublicRoutinesByUser} = require('../db/routines')

usersRouter.use((req, res, next)=>{
    console.log("A request is being made to /users");
    next();
});

usersRouter.post('/login', async (req, res, next)=>{//logs in the user, 
    const {username, password} = req.body
    try {
    if(!username || !password){
        throw Error
    }
    const user = await getUser({username, password})
    console.log(user)
    const token = jwt.sign({id:user.id, username:user.username}, process.env.JWT_SECRET)
        res.send({
            message: "Login Success!",
            token: token
        })

    } catch (error) {
        next(error)
    }
})


// POST /api/users/register
usersRouter.post('/register', async (req, res, next)=>{
    const {username, password} = req.body
    try {
    if(!username || !password){
        throw Error
    };
    if(password.length < 8){
        throw Error
    };
    
    const _user = await getUserByUsername(username);
    
    if(_user){
        throw Error
    };
    
    const newUser = await createUser({username, password})

    res.send(
        {
        user : newUser,
        message: `Thank you for registering ${username}`
        }
    )

    } catch (error) {
        next(error)
    }
})

// GET /api/users/me
usersRouter.get('/me', async(req, res, next)=>{
    try{
        const auth = req.headers.authorization
        if(auth !== undefined){
            const userId = req.user.id
            const user = await getUserById(userId)
            res.send(user)
        }else{
            throw Error
        }
    } catch(error){
        next(error)
    }
})

// GET /api/users/:username/routines
usersRouter.get('/:username/routines', async(req, res, next)=>{
    try {
        const username = req.params
        const publicRoutines = await getPublicRoutinesByUser(username)
        res.send(publicRoutines)
    } catch (error) {
        next(error)
    }
})

module.exports = usersRouter;