<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="auto">
        <v-card
          width="460"
        >
          <v-card-text class="text-center px-12 py-8">
            <validation-observer
              ref="observer"
            >
              <v-alert
                class="mb-3"
                :value="isLoginError"
                type="error"
              >
                아이디와 비밀번호를 확인해 주세요.
              </v-alert>
              <v-alert
                class="mb-3"
                :value="isLogin"
                type="success"
              >
                로그인이 완료되었습니다.
              </v-alert>
              <v-form>
                <div class="text-h4 font-weight-black mb-10">
                  로그인
                </div>
                <validation-provider
                  v-slot="{ errors }"
                  name="아이디"
                  :rules="{ required: true }"
                >
                  <v-text-field
                    v-model="user"
                    label="아이디"
                    clearable
                    prepend-icon="mdi-account-outline"
                    :error-messages="errors"
                  />
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="비밀번호"
                  :rules="{ required: true }"
                >
                  <v-text-field
                    v-model="password"
                    label="비밀번호"
                    type="password"
                    clearable
                    prepend-icon="mdi-lock-outline"
                    :error-messages="errors"
                  />
                </validation-provider>
                <v-btn
                  class="mt-6"
                  block
                  x-large
                  rounded
                  color="primary"
                  @click="checkLogin"
                >
                  로그인
                </v-btn>
              </v-form>
            </validation-observer>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="test">
                  TEST
                </v-btn>
                <v-btn @click="read"> READ
                </v-btn>
                <v-btn @click="write"> WRITE
                </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { mapState, mapActions } from 'vuex'

const { dialog } = require('@electron/remote')

export default {
  name: 'LogIn',
  data: () => ({
    user: null,
    password: null
  }),
  computed: {
    ...mapState('login', ['isLogin', 'isLoginError'])
  },
  methods: {
    ...mapActions('login', ['login']),

    async checkLogin () {
      const result = await this.$refs.observer.validate()
      if (result) {
        this.login({
          user: this.user,
          password: this.password
        })

        // selected === null
        //   ? this.$dialog.error({
        //     text: '등록된 정보가 없습니다!!!',
        //     title: '로그인'
        //   })
        //   : selected.password !== loginObj.password
        //     ? this.$dialog.error({
        //       text: '비밀번호가 일치하지 않습니다!!!',
        //       title: '로그인'
        //     })
        //     : this.$dialog.warning({
        //       text: '로그인 성공'
        //     })
      }
    },
    test () {
      const path = require('path')
      const sqlite3 = require('sqlite3').verbose()
      const dbpath = path.join('D:/Project/kf21app/src', '/utils/data.db')
      console.log(dbpath)
      const db = new sqlite3.Database(dbpath, (err) => {
        if (err) {
          return console.log(err.message)
        }
        console.log('Connected to the in-memory SQlite database.')
      })
      db.close((err) => {
        if (err) {
          return console.error(err.message)
        }
        console.log('Close the database connection.')
      })
    },
    read () {
      const r = dialog.showOpenDialogSync()
      console.log(r)
    },
    write () {

    }
  }
}
</script>
