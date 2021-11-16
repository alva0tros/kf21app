import { db } from '@/utils/db'

const create = (obj) => {
  if (!obj.user.cnt) {
    console.log('111')
  }
  if (!obj.org.cnt) {
    console.log('222')
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
