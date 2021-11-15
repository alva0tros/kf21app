import Database from 'better-sqlite3'

export const db = new Database('./src/utils/data.db', { verbose: console.log })

// const sqlite3 = require('sqlite3').verbose()

// export const connector = () => {
//   const db = new sqlite3.Database('./data.db', sqlite3.OPEN_READWRITE, (err) => {
//     if (err) {
//       console.error(err.message)
//     } else {
//       console.log('Connected to the datadb database.')
//     }
//   })
//   db.close((err) => {
//     if (err) {
//       return console.error(err.message)
//     }
//     console.log('Close the database connection.')
//   })
// }

// export const conConsole = () => {
//   console.log(1234)
// }
