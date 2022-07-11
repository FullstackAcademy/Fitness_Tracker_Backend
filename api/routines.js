const express = require('express');
const routinesRouter = express.Router();

const {getAllPublicRoutines, createRoutine, updateRoutine, destroyRoutine} = require('../db/routines')
const {addActivityToRoutine} = require('../db/routine_activities')

// GET /api/routines
routinesRouter.get('/', async( req, res, next)=>{
    try {
        const publicRoutines = await getAllPublicRoutines();
        res.send(publicRoutines)
    } catch (error) {
        next(error)
    }
})

// POST /api/routines
routinesRouter.post('/', async(req, res, next)=>{
    try {
        const auth = req.headers.authorization
        if(auth !== undefined){
            const routine = req.body
            routine.creatorId = req.user.id
            const routineToPost = await createRoutine(routine)
            res.send(routineToPost)
        }else{
            throw Error
        }
    } catch (error) {
        next(error)
    }
})
// PATCH /api/routines/:routineId
routinesRouter.patch('/:routineId', async(req, res, next)=>{
    try {
        const auth = req.headers.authorization
        if(auth !== undefined){
            const routineToBeUpdated = req.body
            routineToBeUpdated.id = req.params.routineId
            const updatingRoutine = await updateRoutine(routineToBeUpdated)
            res.send(updatingRoutine)
        }else{
            throw Error
        }
    } catch (error) {
        next(error)
    }
})

// DELETE /api/routines/:routineId
routinesRouter.delete('/:routineId', async(req, res, next)=>{
    try {
        const auth = req.headers.authorization
        if(auth !== undefined){
            const id = req.params.routineId
            const routineToDelete = await destroyRoutine(id)
            res.send(routineToDelete)
        }
    } catch (error) {
        next(error)
    }
})

// POST /api/routines/:routineId/activities
routinesRouter.post('/:routineId/activities', async(req, res, next)=>{
    try {
        const request = req.body
        request.routineId = req.params.routineId
        const addActivity = await addActivityToRoutine(request)
        if(addActivity){
            res.send(addActivity)
        }else{
            throw new Error
        }
    } catch (error) {
        next(error)
    }
})


module.exports = routinesRouter