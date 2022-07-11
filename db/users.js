const client = require("./client")

const createUser = async ({username,password}) => {
    const { rows: [ user ] } = await client.query(`INSERT INTO users (username,password) VALUES ($1,$2) ON CONFLICT (username) DO NOTHING 
    RETURNING id, username;`, [username , password])
    return user
}
const getUser = async ({username, password}) => {
    const { rows: [ user ] } = await client.query(`SELECT username, id FROM users WHERE username = $1 AND password = $2`, [username , password])
    console.log("user returned by getuser" ,user)
    return user

}
const getUserById = async (id) => {
    const { rows: [ user ] } = await client.query(`SELECT * FROM users WHERE id = $1`, [id])
    return user

}
const getUserByUsername = async (username) => {
    const { rows: [ user ] } = await client.query(`SELECT * FROM users WHERE username = $1`, [username])
    return user
}

module.exports = {
    createUser,
    getUserByUsername,
    getUserById,
    getUser
}