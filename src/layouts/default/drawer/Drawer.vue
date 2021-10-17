<template>
  <v-navigation-drawer
    v-model="drawer"
    v-bind="$attrs"
    dark
    app
    :src="require('@/assets/images/sidebar.jpg')"
  >
    <template #img="props">
      <v-img
        :gradient="gradient"
        v-bind="props"
      />
    </template>
    <drawer-header />

    <v-divider />

    <drawer-list :items="items" />
  </v-navigation-drawer>
</template>

<script>
import DrawerHeader from './DrawerHeader.vue'
import DrawerList from './DrawerList.vue'
import { mapState } from 'vuex'
export default {
  name: 'Drawer',
  components: {
    DrawerHeader,
    DrawerList
  },
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
