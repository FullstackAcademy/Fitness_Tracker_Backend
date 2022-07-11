const express = require('express');
const activitiesRouter = express.Router();
const {getAllActivities, createActivity, updateActivity} = require('../db/activities')
const {getPublicRoutinesByActivity} = require('../db/routines')

// GET /api/activities/:activityId/routines
activitiesRouter.get('/:activityId/routines', async(req, res, next)=>{
    try {
        let activityId = {}
        activityId.id = req.params.activityId
        const routinesFromActivity = await getPublicRoutinesByActivity(activityId)
        res.send(routinesFromActivity)
    } catch (error) {
        next(error)
    }
})

// GET /api/activities
activitiesRouter.get('/', async (req, res, next)=>{
    try {
        const activities = await getAllActivities();
        res.send(activities)
    } catch (error) {
        next(error)
    }
})

// POST /api/activities
activitiesRouter.post('/', async(req, res, next)=>{
    try {
        const auth = req.headers.authorization
        if(auth){
            const activity = req.body
            const creatingActivity = await createActivity(activity)
            res.send(creatingActivity)
        }else{
            throw Error
        }
    } catch (error) {
        next(error)
    }
})

// PATCH /api/activities/:activityId
activitiesRouter.patch('/:activityId', async(req, res, next)=>{
    try {
        const activityToUpdate = req.body
        activityToUpdate.id = req.params.activityId
        const updatingActivity = await updateActivity(activityToUpdate)
        if(updatingActivity){
            res.send(updatingActivity)
        }
    } catch (error) {
        next(error)
    }
})


module.exports = activitiesRouter;