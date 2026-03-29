<template>
  <ul class="spectators-container" >
    <li v-if="!spectators.length">No spectators present</li>
    <template v-else>
      <li v-for="user in spectators" :key="user.id">
        {{ user.username }}
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  props: {
    room: Object
  },
  computed: {
    spectators () {
      return this.room.users.filter(u => u.isSpectating)
    }
  }
}
</script>

<style lang="scss">
.spectators-container {
  li {
    padding: 0.5rem 1.5rem;
  }
}
</style>
