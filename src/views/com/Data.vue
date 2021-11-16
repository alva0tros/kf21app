<template>
  <v-container fluid>
    <v-card>
      <v-card-text>
        <v-toolbar
          flat
          dark
        >
          <v-toolbar-title>테이블 목록</v-toolbar-title>
          <v-spacer />
          <v-text-field
            v-model="search"
            flat
            hide-details
            prepend-inner-icon="mdi-text"
            label="Search"
            class="pr-4"
          />
          <v-btn
            color="secondary"
            @click="dataFind()"
          >
            <v-icon class="pr-2">
              mdi-magnify
            </v-icon>
            조회
          </v-btn>
        </v-toolbar>
        <v-data-table
          :headers="headers"
          :items="items"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="error"
          @click="dataInit()"
        >
          <v-icon class="pr-2">
            mdi-refresh
          </v-icon>
          초기화
        </v-btn>
        <v-btn
          color="primary"
          @click="fileImport()"
        >
          <v-icon class="pr-2">
            mdi-database-import
          </v-icon>
          가져오기
        </v-btn>
        <v-btn
          color="primary"
          @click="fileExport()"
        >
          <v-icon class="pr-2">
            mdi-database-export
          </v-icon>
          내보내기
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>

import { dialog } from '@electron/remote'
// import fs from 'fs'
// import path from 'path'
import { db } from '@/utils/db'
import init from '@/utils/sql/init'
import xlsx from 'xlsx'

export default {
  data () {
    return {
      search: '',
      headers: [
        { value: 'row_num', text: 'No' },
        { value: 'tbl_name', text: '테이블' },
        { value: 'import_cnt', text: '임포트 건수' },
        { value: 'last_import_date', text: '최근임포트 일시' },
        { value: 'added_cnt', text: '추가된 건수' },
        { value: 'last_update_date', text: '최근수정 일시' }
      ],
      items: []
    }
  },
  methods: {
    dataInit () {
      init.run()
    },
    fileImport () {
      const options = {
        filters: [
          {
            name: 'Excel Worksheet',
            extensions: ['xlsx']
          }
        ]
      }
      const rf = dialog.showOpenDialogSync(options)
      if (!rf) return
      // const text = fs.readFileSync(rf[0]).toString()
      // console.log(rf[0])
      // const fileName = fs.readFileSync(rf[0])

      // const file = path.join(rf[0], fileName)
      const xlsxFile = xlsx.readFile(rf[0])
      const sheetName = xlsxFile.SheetNames[0]
      const firstSheet = xlsxFile.Sheets[sheetName]

      const jsonData = xlsx.utils.sheet_to_json(firstSheet, { defval: '' })

      console.log(sheetName)
      console.log(firstSheet)
      console.log(jsonData)
    },
    dataFind () {
      const sql = `
        SELECT row_number() over(order by m.tbl_name) as row_num
              ,m.tbl_name
              ,(SELECT count(*) FROM ` + 'com_user' + `) as import_cnt
          FROM sqlite_master m
         WHERE m.type = 'table'
      `
      const stmt = db.prepare(sql)
      const rows = stmt.all()
      this.items = rows
    },
    dataSave () {
      console.log('Save')
    }
  }
  // mounted () {
  //   const db = new Database('data.db', { verbose: console.log })
  //   const insert = db.prepare('insert into user(user_id, user_name) values(@user_id, @user_name)')
  //   const insertMany = db.transaction((users) => {
  //     for (const user of users) insert.run(user)
  //   })

  //   insertMany([
  //     { user_id: '1', user_name: 'a' },
  //     { user_id: '2', user_name: 'b' },
  //     { user_id: '3', user_name: 'c' }
  //   ])
  // }
}
</script>
