<template>
  <v-container fluid>
    <v-card>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="items"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="success"
          @click="dataSave()"
        >
        가져오기
        </v-btn>
        <v-btn color="success"
          @click="dataSave()"
        >
        내보내기
        </v-btn>
        <v-btn
          color="success"
          @click="dataSave()"
        >
          <v-icon class="pr-2">
            mdi-content-save
          </v-icon>
          저장
        </v-btn>
        <v-btn
          color="primary"
          @click="dataFind()"
        >
          <v-icon class="pr-2">
            mdi-magnify
          </v-icon>
          조회
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
// const sqlite3 = require('sqlite3').verbose()
// const db = new sqlite3.Database('data.db')
import Database from 'better-sqlite3'
const db = new Database('data.db', { verbose: console.log })

export default {
  data () {
    return {
      headers: [
        { value: 'user_id', text: '사용자ID' },
        { value: 'user_name', text: '사용자' }
      ],
      items: []
    }
  },
  methods: {
    dataSave () {
      console.log('Save')
    },
    dataFind () {
      const stmt = db.prepare('SELECT user_id, user_name FROM user')
      const rows = stmt.all()
      this.items = rows
      console.log(rows)
    }
  }
  // mounted () {
  //   const db = new Database('foobar.db', { verbose: console.log })
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
