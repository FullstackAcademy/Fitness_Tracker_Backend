const client = require("./client")

// database functions
async function getAllActivities() {
  const {rows: activities} = await client.query('SELECT * FROM activities')
  return activities

}

async function getActivityById(id) {
  const {rows: activities} = await client.query('SELECT * FROM activities WHERE id=$1',[id])
  return activities
}

async function getActivityByName(name) {
  const {rows: activity} = await client.query('SELECT * FROM activities WHERE name=$1',[name])
  return activity

}

async function attachActivitiesToRoutines(routines) {
}

// select and return an array of all activities
async function createActivity({ name, description }) {
    const {rows: [activities]} = await client.query(`INSERT INTO activities (name,description) VALUES ($1, $2) RETURNING *`, [name, description])
    return activities
}

// return the new activity
async function updateActivity({ id, ...fields }) {
  const {rows:[activity]} = await client.query('UPDATE activities SET name=$1, description=$2 WHERE id=$3 RETURNING *',[fields.name,fields.description,id])
  return activity
}

// don't try to update the id
// do update the name and description
// return the updated activity
module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
}
