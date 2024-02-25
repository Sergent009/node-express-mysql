// importing the libruaries for using mysql
import mysql from 'mysql'
import util from 'util'
// using .env to hide the sensitive information like password etc
import dotenv from 'dotenv'
dotenv.config()

// connecting to the desired database
const pool = mysql.createPool({
    host: process.env.mysql_host,
    user: process.env.mysql_user,
    password: process.env.mysql_password,
    database: process.env.mysql_database
});

const query = util.promisify(pool.query).bind(pool);

export async function fetchData() {
    const result = await query('SELECT * FROM notes');
    return result
}

// const notes = await fetchData()
// console.log(notes)


// function to get a single node
export async function fetchNote(id){
    // this syntax is called a prepared statement, were sending the sql and the values to the database completely seperately
    const result = await query(`SELECT * FROM notes where id = ?`, [id])
    return result[0]
}

// const note = await fetchNote(1)
// console.log(note)


// function to create a note
export async function createNote(title, contents){
    const result = await query(`INSERT INTO notes(title, contents) VALUES (?,?)`, [title, contents])
    const id = result.insertId
    return fetchNote(id)
}

// const result = createNote('My third Note', 'This is a test note')
// console.log(result)