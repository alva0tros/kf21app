<template>
  <v-list
    expand
    dense
    nav
  >
    <template
      v-for="(item, index) in items"
    >
      <drawer-list-group
        v-if="item.items"
        :key="`group-${index}`"
        :item="item"
      />
      <drawer-list-item
        v-else
        :key="index"
        :item="item"
      />
    </template>
  </v-list>
</template>

<script>
import DrawerListGroup from './DrawerListGroup.vue'
import DrawerListItem from './DrawerListItem'
export default {
  name: 'DrawerList',
  components: {
    DrawerListGroup,
    DrawerListItem
  },
  props: {
    items: {
      type: Array,
      default: () => ({})
    }
  }
}
</script>
