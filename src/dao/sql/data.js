import { db } from '@/dao/db/db'
import { dialog } from '@electron/remote'
import fs from 'fs'
// import csv from 'csv-parser'
import { parse } from 'fast-csv'

const dataInit = () => {
  const tblObj = {}
  const stmt = db.prepare('SELECT COUNT(*) as cnt FROM sqlite_master WHERE name = ?')
  const comUser = stmt.get('com_user')
  const comOrg = stmt.get('com_organization')

  tblObj.user = comUser
  tblObj.org = comOrg

  if (!tblObj.user.cnt) {
    const sql = `
      CREATE TABLE IF NOT EXISTS com_user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT,
        user_name TEXT,
        import_date DATETIME DEFAULT (datetime('now', 'localtime')))
      `
    db.exec(sql)
  }
  if (!tblObj.org.cnt) {
    const sql = `
      CREATE TABLE IF NOT EXISTS com_organization (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        organization_id INTEGER,
        organization_name TEXT,
        import_date DATETIME DEFAULT (datetime('now', 'localtime')))
      `
    db.exec(sql)
  }
}

const dataFind = () => {
  const sql = `
    SELECT row_number() over(order by m.tbl_name) as row_num
          ,m.tbl_name
      FROM sqlite_master m
     WHERE m.type = 'table'
       AND m.tbl_name != 'sqlite_sequence'
     ORDER BY m.tbl_name
    `
  const stmt = db.prepare(sql)
  const rows = stmt.all()
  rows.forEach((row, index) => {
    const cntSql = `
      SELECT count(*) as cnt
            ,max(import_date) as import_date
        FROM ` + row.tbl_name + `
      `
    // const cntSql = `
    //     SELECT count(*) as cnt
    //           ,max(last_import_date) as last_import_date
    //       FROM ` + row.tbl_name + `
    //   `
    const cntRow = db.prepare(cntSql).get()
    rows[index].import_cnt = cntRow.cnt
    rows[index].import_date = cntRow.import_date
  })
  return rows
}

const dataImport = () => {
  let retVal = true
  return new Promise((resolve, reject) => {
    const options = {
      filters: [
        {
          name: 'CSV OR TXT (SEPARATED FOR COMMA)',
          extensions: ['csv', 'txt']
        }
      ]
    }
    const rf = dialog.showOpenDialogSync(options)
    if (!rf) return

    // const [resUser, resOrg] = [[], []]
    const result = []
    const stream = fs.createReadStream(rf[0])

    stream.pipe(parse({ headers: false }))
      .on('data', (data) => {
        result.push(data)
        console.log(data[1])
        // switch (data.table_name) {
        //   case 'com_user':
        //     if (data.index === '0') console.log('header1')
        //     resUser.push(data)
        //     break
        //   case 'com_organization':
        //     if (data.index === '0') console.log('header2')
        //     resOrg.push(data)
        //     break
        // }
      })
      .on('end', () => {
        console.log(result)
        // const insUser = db.prepare(
        //   `INSERT INTO com_user(user_id, user_name)
        //         VALUES ($user_id, $user_name)`
        // )
        // const insOrg = db.prepare(
        //   `INSERT INTO com_organization(organization_id, organization_name)
        //         VALUES ($user_id, $user_name)`
        // )
        // const trxUser = db.transaction((data) => {
        //   for (const obj of data) {
        //     insUser.run(obj)
        //   }
        // })
        // const trxOrg = db.transaction((data) => {
        //   for (const obj of data) {
        //     insOrg.run(obj)
        //   }
        // })
        // trxUser(resUser)
        // trxOrg(resOrg)
        resolve(retVal)
      })
      .on('error', (error) => {
        retVal = false
        console.log(error)
        reject(retVal)
      })
  })
}

export default {
  dataInit,
  dataFind,
  dataImport
}
