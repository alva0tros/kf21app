<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>{{ $route.title }}</v-toolbar-title>
      <v-spacer />

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            icon
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            router
            :to="{path: '/home'}"
          >
            <v-list-item-title>메인</v-list-item-title>
          </v-list-item>
          <v-list-item @click="$store.dispatch('login/logout')">
            <v-list-item-title>
              로그아웃
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <drawer />

    <v-main app>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Drawer from './drawer/Drawer'
import { mapState } from 'vuex'
export default {
  name: 'DefaultLayout',
  components: {
    Drawer
  },
  data: () => ({

  }),
  computed: {
    ...mapState('menu', {
      gradient: 'gradient',
      items: 'items'
    }),
    drawer: {
      get () {
        return this.$store.getters['menu/getDrawer']
      },
      set (value) {
        return this.$store.dispatch('menu/toggleDrawer', value)
      }
    }
  }
}
</script>
