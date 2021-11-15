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
          @click="dataSave()"
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
import fs from 'fs'
import { db } from '@/utils/db'

export default {
  data () {
    return {
      search: '',
      headers: [
        { value: 'row_num', text: 'No' },
        { value: 'table_name', text: '테이블' },
        { value: 'import_cnt', text: '임포트 건수' },
        { value: 'last_import_date', text: '최근임포트 일시' },
        { value: 'added_cnt', text: '추가된 건수' },
        { value: 'last_update_date', text: '최근수정 일시' }
      ],
      items: []
    }
  },
  methods: {
    fileImport () {
      const options = {
        filters: [
          {
            name: 'excel worksheet',
            extensions: ['xlsx', 'xls']
          }
        ]
      }
      const rf = dialog.showOpenDialogSync(options)
      if (!rf) return
      const text = fs.readFileSync(rf[0]).toString()
      console.log(text)
    },
    dataFind () {
      const stmt = db.prepare('SELECT user_id, user_name FROM user')
      const rows = stmt.all()
      this.items = rows
      console.log(rows)
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
