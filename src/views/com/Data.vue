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
          @click="dataSave()"
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
import data from '@/dao/sql/data'

export default {
  data () {
    return {
      search: '',
      headers: [
        { value: 'row_num', text: 'No' },
        { value: 'tbl_name', text: '테이블' },
        { value: 'import_cnt', text: '임포트 건수' },
        { value: 'import_date', text: '최근임포트 일시' },
        { value: 'added_cnt', text: '추가된 건수' },
        { value: 'last_update_date', text: '최근수정 일시' }
      ],
      items: []
    }
  },
  methods: {
    dataInit () {
      data.init()
    },
    fileImport () {
      data.import()
    },
    dataFind () {
      this.items = data.find()
    },
    dataSave () {
      // const insert = db.prepare('INSERT INTO langs VALUES ($lang )')
      // const insertMany = db.transaction((data) => {
      //   for (const obj of data) insert.run(obj)
      // })

      // insertMany([
      //   { lang: 'C' },
      //   { lang: 'JAVA' },
      //   { lang: 'PYTHON' },
      //   { lang: 'PYTHON' },
      //   { lang: 'PYTHON' },
      //   { lang: 'PYTHON' },
      //   { lang: 'PYTHON' },
      //   { lang: 'PYTHON' },
      //   { lang: 'PYTHON' },
      //   { lang: 'PYTHON' }
      // ])
    }
  }
}
</script>
