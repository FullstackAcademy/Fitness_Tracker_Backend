const client = require('./client');

async function getRoutineById(id){
  const {rows:[routine]} = await client.query('SELECT * FROM routines WHERE id=$1',[id])
  return routine
}

async function getRoutinesWithoutActivities(){
  try{
    const { rows: routine} = await client.query(`
    SELECT u.id, u.username AS "creatorName", r.*
    FROM users u
    JOIN routines r ON r."creatorId" = u.id;
    `);
    return routine
  }catch(error){
    throw error;
  }
}
async function attachActivitiesToRoutines(routines) {
  try {
    const {rows} = await client.query(`
    SELECT 
    a.*, 
    ra.duration, 
    ra.count, 
    ra.id AS "routineActivityId", 
    ra."routineId"
    FROM activities a
    JOIN "routine_activities" ra ON a.id = ra."activityId"; 
    `);
    let allRoutines = [];
    for(let i = 0; i < routines.length; i++){
      let currentRoutine = routines[i];
      currentRoutine.activities = rows.filter((activity)=> activity.routineId === currentRoutine.id);
      allRoutines.push(currentRoutine);
    }
    return allRoutines;
  } catch (error) {
    throw error;
  }
}

async function getAllRoutines() {
  try{
    const routines = await getRoutinesWithoutActivities();
    const attachedActivities = await attachActivitiesToRoutines(routines);
    return attachedActivities;
  }catch(error){
    throw error;
  }
}

async function getAllRoutinesByUser({username}) {
  const routines = await getAllRoutines()
  
  const usersRoutines = routines.filter(routine=>{
    if (routine.creatorName === username ){
      return routine
    }
  })
  return usersRoutines
}

async function getPublicRoutinesByUser({username}) {
  const routines = await getAllRoutines()
  
  const usersRoutines = routines.filter(routine=>{
    if ( routine.isPublic && routine.creatorName === username ){
      return routine
    }
  })
  return usersRoutines
}

async function getAllPublicRoutines() {
  const routines = await getAllRoutines()
  const publicRoutines = routines.filter(routine => {
    if (routine.isPublic){
      return routine
    }
    })
    return publicRoutines
}

async function getPublicRoutinesByActivity({id}) {
  const routines = await getAllRoutines();
  let allRoutines = []
  const publicRoutineByActivity = routines.filter(routine =>{
    if(routine.isPublic){
      for(let i = 0; i < routine.activities.length; i++){
        if(routine.activities[i].id === id){
          allRoutines.push(routine)
        }
      }
      return allRoutines
    }
  })
  return publicRoutineByActivity;
}

async function createRoutine({creatorId, isPublic, name, goal}) {
    const {rows: [routine]} = await client.query(`INSERT INTO routines ("creatorId", "isPublic", name, goal) VALUES ($1,$2,$3,$4) RETURNING *`, [creatorId,isPublic, name, goal])
    return routine
}

async function updateRoutine({id, isPublic,name,goal}) {
  const {rows:[routine]} = await client.query('UPDATE routines SET "isPublic" = $1, name = $2, goal = $3 WHERE id=$4 RETURNING *',[isPublic,name,goal,id])
  return routine
  
}

async function destroyRoutine(id) {
  await client.query('DELETE FROM "routine_activities" WHERE "routineId"=$1',[id])//destroys routine activity first this is somehow getting an error for inoput syntax for type integer... looks like id is a number tho...
  const {rows:[deletedRoutine]} = await client.query ('DELETE FROM routines WHERE id=$1  RETURNING *',[id])
  return deletedRoutine
}

module.exports = {
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
}