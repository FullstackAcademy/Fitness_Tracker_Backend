const express = require('express');
const routineActivitiesRouter = express.Router();

const {updateRoutineActivity, destroyRoutineActivity, canEditRoutineActivity} = require('../db/routine_activities')

// PATCH /api/routine_activities/:routineActivityId
routineActivitiesRouter.patch('/:routineActivityId', async(req, res, next)=>{
    try {
        const auth = req.headers.authorization
        if(auth !== undefined){
            const userId = req.user.id
            const routineActivityId = Number(req.params.routineActivityId)
            const userConfirmation = await canEditRoutineActivity(routineActivityId, userId)
            if(userConfirmation){
                const patchRequest = req.body
                patchRequest.id = routineActivityId
                const update = await updateRoutineActivity(patchRequest)
                res.send(update)
            }else{
                throw new Error
            }
        }else{
            throw new Error
        }

    } catch (error) {
        next(error)
    }
})

// DELETE /api/routine_activities/:routineActivityId
routineActivitiesRouter.delete('/:routineActivityId', async(req, res, next)=>{
    try {
        const auth = req.headers.authorization
        const requestId = Number(req.params.routineActivityId)
        const userId = req.user.id
        const userConfirmation = await canEditRoutineActivity(requestId, userId)

            if(userConfirmation){
                const toBeDeleted = await destroyRoutineActivity(requestId)
                res.send(toBeDeleted)
            }else{
                throw new Error
            }
    } catch (error) {
        next(error)
    }
})

module.exports = routineActivitiesRouter;