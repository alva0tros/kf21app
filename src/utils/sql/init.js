import { db } from '@/utils/db'

const create = (obj) => {
  if (!obj.user.cnt) {
    const sql = `CREATE TABLE IF NOT EXISTS com_user (
                              id INTEGER PRIMARY KEY AUTOINCREMENT,
                              user_id TEXT,
                              user_name TEXT)`
    db.exec(sql)
  }
  if (!obj.org.cnt) {
    const sql = `CREATE TABLE IF NOT EXISTS com_organization (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      organization_id INTEGER,
      organization_name TEXT)`
    db.exec(sql)
  }
}

export default {
  run: () => {
    const tblObj = {}
    const stmt = db.prepare('SELECT COUNT(*) as cnt FROM sqlite_master WHERE name = ?')
    const comUser = stmt.get('com_user')
    const comOrg = stmt.get('com_organization')

    tblObj.user = comUser
    tblObj.org = comOrg

    create(tblObj)
  }
}
