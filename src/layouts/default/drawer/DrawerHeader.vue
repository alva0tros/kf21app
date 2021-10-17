<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-img
        :src="require('@/assets/images/logo.svg')"
      />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title class="text-h6">
        KF21
      </v-list-item-title>
      <v-list-item-subtitle>
        (boramae)
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'DrawerHeader'
}
</script>
