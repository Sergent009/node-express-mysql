// importing the libruaries for using mysql
import mysql from 'mysql'
import util from 'util'

// connecting to the desired database
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'knysys123',
    database: 'notes_app'
});

const query = util.promisify(pool.query).bind(pool);

async function fetchData() {
    const result = await query('SELECT * FROM notes');
    return result
}

const notes = await fetchData()
console.log(notes)