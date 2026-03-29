<template>
  <Paper :rotation="-2" title="Join a room?">
    <ul class="room-list">
      <template v-if="rooms">
        <li v-for="room in rooms" :key="room.id" @click="handleSelect(room)">
          {{ room.name }}
          <RoomOpen v-if="room.state === '0'" />
        </li>
      </template>
      <li v-else>Loading rooms...</li>
    </ul>
    <div class="d-flex justify">
      <button @click="handleRedirect" class="transparent mr-2">Find room by code</button>
      <button @click="handleCreate" class="primary">Create a room</button>
    </div>
  </Paper>
</template>

<script>
import Paper from '../ui/Paper'
import RoomOpen from '../room/RoomOpen'

export default {
  props: {
    rooms: Array
  },
  methods: {
    handleSelect(room) {
      this.$emit('onSelect', room)
    },
    handleCreate() {
      this.$emit('onSelect', 0)
    },
    handleRedirect() {
      this.$router.push({ name: 'enterCode' })
    }
  },
  components: {
    Paper,
    RoomOpen
  }
}
</script>

<style scoped lang="scss">
.room-list {
  font-size: 2.4rem;
  margin-bottom: 2rem;
  max-height: 45vh;
  overflow-y: auto;

  li {
    transition: 0.2s;
    cursor: pointer;
    font-family: 'Caveat', cursive;

    &:hover {
      border-color: #9f7449;
    }
  }

  @media all and (max-width: 1024px) {
    font-size: 1.5rem;
  }
}
</style>