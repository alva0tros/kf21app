<template>
  <v-list-group
    :prepend-icon="item.icon"
    color="#ffffff"
  >
    <template v-slot:activator>
      <v-list-item-content>
        <v-list-item-title>
          {{ item.title }}
        </v-list-item-title>
      </v-list-item-content>
    </template>
    <template v-for="(child, index) in item.items">
      <drawer-list-group
        v-if="child.items"
        :key="`sub-group-${index}`"
        :item="child"
      />
      <drawer-list-item
        :key="`child-${index}`"
        :item="child"
        class="ml-8"
      />
    </template>
  </v-list-group>
</template>

<script>
import DrawerListGroup from './DrawerListGroup'
import DrawerListItem from './DrawerListItem'
export default {
  name: 'DrawerListGroup',
  components: {
    DrawerListGroup,
    DrawerListItem
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
