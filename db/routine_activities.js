const client = require('./client')

async function getRoutineActivityById(id){
  const {rows:[routine_activity]} = await client.query('SELECT * FROM routine_activity WHERE id=$1',[id])
  return routine_activity
}

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) { 
  const {rows:[activityToJoin]} = await client.query(`
      SELECT *
      FROM "routine_activities"
      WHERE "routineId"=$1 AND "activityId"=$2;
      `, [routineId, activityId])
      
    if(!activityToJoin){
      const {rows:[activityForRoutine]} = await client.query(`
      INSERT INTO "routine_activities"("routineId", "activityId", count, duration)
      VALUES($1, $2, $3, $4)
      RETURNING *;
      `, [routineId, activityId, count, duration]);
      return activityForRoutine;
    }
    
}

async function getRoutineActivitiesByRoutine(id) {
  const {rows: [routine_activity]} = await client.query('SELECT * FROM routine_activities WHERE "routineId"=$1',[id])
  return routine_activity
}

async function updateRoutineActivity ({id,count,duration}) {
  const {rows: [routine_activity]} = await client.query('UPDATE routine_activities SET duration = $1, count= $2 WHERE "routineId"=$3', [duration,count,id])
  return routine_activity

}

async function destroyRoutineActivity(id) {
  const {rows: [routineActivityToDelete]} = await client.query('DELETE FROM routine_activities WHERE id=$1 RETURNING *',[id])
  return routineActivityToDelete
}

async function canEditRoutineActivity(routineActivityId, userId) {
  const routineActivityToEdit = await getRoutineActivityById(routineActivityId)
    const {creatorId} = await getRoutineById(routineActivityToEdit.routineId)
    if(creatorId === userId){
      return true
    }else{
      return false
    }

}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
