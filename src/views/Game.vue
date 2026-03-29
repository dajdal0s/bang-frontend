<template>
  <div class="room">
    <div class="room-content">
      <GameInfo />
      <RoomPlayers v-if="activeRoom && user" :users="activeRoom.users" :me="user" />

      <StartGameButton :id="activeRoom.id" v-if="showStart" :isRestart="activeRoom.state === '2'" />

      <template v-if="showDeck">
        <RoomDeck :id="activeRoom.id" :room="activeRoom" />
        <UnloadedCards :room="activeRoom" v-if="activeRoom.unloadedCards.length" />
      </template>
      <template v-if="!isFinished">
        <SelectedCard />
        <UserDying v-if="user && activeRoom" />
      </template>
      <div class="dv-alert">
        BANG! is a - registered – trademark of daVinci Editrice S.r.l
      </div>
    </div>
    <div class="mobile-alert">Please rotate your device to landscape mode</div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

import connection from '../lib/socket';

import RoomPlayers from "../components/room/RoomPlayers";
import StartGameButton from "../components/buttons/StartGameButton";
import RoomDeck from "../components/deck/RoomDeck";
import SelectedCard from "../components/card/SelectedCard";
import UnloadedCards from "../components/deck/UnloadedCards";
import GameInfo from "../components/info/GameInfo";
import UserDying from "../components/user/UserDying";

let subscription
let roomId

export default {
  mounted() {
    roomId = this.$route.params.id

    connection.connect();
    subscription = connection.subscribe(`room:${roomId}`, this.handleRoomUpdate);

    this.ROOM_FETCH(roomId).then().catch(() => {
      this.$router.replace('/')
    })
    this.USER_FETCH()

    window.scrollTo(0,1)
  },
  beforeDestroy() {
    this.handleRoomLeave()
  },
  methods: {
    ...mapActions([
      'ROOM_FETCH',
      'USER_FETCH'
    ]),
    ...mapMutations([
      'MESSAGE_ADD'
    ]),
    async handleRoomUpdate(message) {
      const { type, data } = message;

      switch (type) {
        case 'room:start':
          this.USER_FETCH()
          this.ROOM_FETCH(this.$route.params.id)
          break;
        case 'room:update':
          try {
            await this.ROOM_FETCH(this.$route.params.id)
          } catch (e) {
            this.$router.push({ name: 'home' })
          }
          break;
        case 'message:new':
          this.MESSAGE_ADD(data)
          if (data.user.id !== this.user.id) {
            this.$notify({
              title: data.user.username,
              text: data.message,
              type: 'warn'
            })
          }
          break;
        default:
      }
    },
    handleRoomLeave() {
      subscription.close()
    }
  },
  computed: {
    ...mapGetters([
      'activeRoom',
      'user'
    ]),
    isFinished() {
      const { activeRoom } = this
      return activeRoom && activeRoom.state === '2'
    },
    showStart() {
      const { user, activeRoom } = this
      if (!activeRoom || !user) return;
      const { state, users } = activeRoom
      return state !== '1' && users.length >= 3 && user.id === activeRoom.userId
    },
    showRestart() {
      const { user, activeRoom } = this
      if (!activeRoom || !user) return;
      const { state } = activeRoom
      return state === '2' && user.id === activeRoom.userId
    },
    showDeck() {
      const { user, activeRoom } = this
      return user && activeRoom && activeRoom.state === '1'
    }
  },
  components: { UserDying, UnloadedCards, SelectedCard, RoomPlayers, StartGameButton, RoomDeck, GameInfo }
}
</script>

<style scoped lang="scss">
.room-content {
  @media all and (max-width: 1024px) and (orientation: portrait) {
    display: none;
  }
}
</style>
