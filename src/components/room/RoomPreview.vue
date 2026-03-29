<template>
  <PaperCard :title="room.name" :titleRight="`Status: ${roomStatus}`">
    <ul>
      <li v-for="user in playingUsers" :key="user.id" :class="{ disconnected: user.isDisconnected }">
        {{ user.username }}
      </li>
    </ul>
    <Login :roomId="room.id">
      <button class="transparent pl-0" type="button" @click="$emit('onSelect', null)">
        Cancel
      </button>
    </Login>
  </PaperCard>
</template>

<script>
import Login from "../user/Login";
import PaperCard from "../ui/PaperCard";

export default {
  props: {
    room: Object
  },
  computed: {
    roomStatus() {
      return this.room.state === '1' ? 'Playing' : 'Open'
    },
    playingUsers () {
      return this.room.users.filter(u => !u.isSpectating)
    }
  },
  components: { PaperCard, Login }
}
</script>

<style scoped>
.disconnected {
  text-decoration: line-through;
  color: rgba(0, 0, 0, 0.3);
}
</style>