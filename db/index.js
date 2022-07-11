// require and re-export all files in this db directory (users, activities...)
const {getAllActivities,
    getActivityById,
    getActivityByName,
    attachActivitiesToRoutines,
    createActivity,
    updateActivity,} = require('./activities')
  const {
    getRoutineById,
    getRoutinesWithoutActivities,
    getAllRoutines,
    getAllPublicRoutines,
    getAllRoutinesByUser,
    getPublicRoutinesByUser,
    getPublicRoutinesByActivity,
    createRoutine,
    updateRoutine,
    destroyRoutine,} =require('./routines')
  const { createUser,
    getUserByUsername,
    getUserById,
    getUser } = require('./users')
    const {getRoutineActivityById,
      addActivityToRoutine,
      getRoutineActivitiesByRoutine,
      updateRoutineActivity,
      destroyRoutineActivity,
      canEditRoutineActivity,} =require('./routine_activities')

      module.exports = {
        getAllActivities,
    getActivityById,
    getActivityByName,
    attachActivitiesToRoutines,
    createActivity,
    updateActivity,
    getRoutineById,
    getRoutinesWithoutActivities,
    getAllRoutines,
    getAllPublicRoutines,
    getAllRoutinesByUser,
    getPublicRoutinesByUser,
    getPublicRoutinesByActivity,
    createRoutine,
    updateRoutine,
    destroyRoutine,
    createUser,
    getUserByUsername,
    getUserById,
    getUser,
    getRoutineActivityById,
      addActivityToRoutine,
      getRoutineActivitiesByRoutine,
      updateRoutineActivity,
      destroyRoutineActivity,
      canEditRoutineActivity
      }