<template>
  <div class="home-container">
    <div class="home-content">
      <RoomList @onSelect="handleSelectRoom" :rooms="rooms" />
      <RoomPreview v-if="selectedRoom" :room="selectedRoom" @onSelect="handleSelectRoom" />
      <RoomCreate v-else-if="selectedRoom === 0" @onSelect="handleSelectRoom" />
    </div>
    <button class="about-button" @click="showAbout = true">About</button>
    <DvAlert />
    <About v-if="showAbout" @onClose="showAbout = false" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import connection from '../lib/socket'

import RoomList from '../components/room/RoomList'
import RoomPreview from '../components/room/RoomPreview'
import RoomCreate from '../components/room/RoomCreate'
import DvAlert from '../components/info/DvAlert'
import About from "../components/info/About";

let subscription

export default {
  data() {
    return {
      selectedRoomId: null,
      rooms: null,
      showAbout: false
    }
  },
  methods: {
    ...mapActions([
      'ROOMS_FETCH'
    ]),
    handleSelectRoom(room) {
      this.selectedRoomId = room.id
    },
    handleRoomsUpdate(message) {
      this.rooms = message.data
    }
  },
  computed: {
    selectedRoom() {
      return this.rooms.find(room => room.id === this.selectedRoomId) || 0
    }
  },
  components: { About, RoomList, RoomPreview, RoomCreate, DvAlert },
  async mounted() {
    this.ROOMS_FETCH().then(result => {
      this.rooms = result
    })

    connection.connect();
    subscription = connection.subscribe(`rooms:new`, this.handleRoomsUpdate);
  },
  beforeDestroy() {
    subscription.close()
  }
}
</script>

<style scoped lang="scss">
.home-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  flex-direction: column;
}

.home-content {
  display: flex;
  align-items: center;
}

.about-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

@media all and (max-width: 1024px) and (orientation: portrait) {
  .home-content {
    flex-direction: column;
  }
}
</style>