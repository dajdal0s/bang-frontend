<template>
  <div class="deck">
    <div :class="['card', { highlight: isMyTurn }]">
      <CardImage cardName="back_playing" :clickable="isMyTurn" @click.native="handleDraw" disableScale />
    </div>
    <SpentCards :room="room" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import CardImage from "../card/CardImage";
import SpentCards from "./SpentCards";

export default {
  props: {
    room: Object
  },
  data() {
    return {
      hasDrawn: false
    }
  },
  methods: {
    ...mapActions(['ROOM_DRAW']),
    async handleDraw() {
      if (!this.isMyTurn) return;

      this.hasDrawn = true
      const roomId = this.$route.params.id
      await this.ROOM_DRAW({ roomId })
      this.loading = false
    }
  },
  computed: {
    ...mapGetters([
      'activeRoom',
      'lastTurn',
      'user'
    ]),
    isMyTurn() {
      const { user, lastTurn, activeRoom, hasDrawn } = this
      if (hasDrawn) return false

      const roomUser = activeRoom.users.find(u => u.id === user.id)
      if (!roomUser || roomUser.isDying || !lastTurn) return false

      const hasBlocker = roomUser.cards.find(c => c.card && c.card.details.isBlocker && c.isEquipped)
      if (hasBlocker) return;

      return !lastTurn.isStarted && lastTurn.userId === user.id
    }
  },
  watch: {
    hasDrawn() {
      if (!this.hasDrawn) return

      setTimeout(() => {
        this.hasDrawn = false
      }, 3000)
    }
  },
  components: { SpentCards, CardImage }
}
</script>

<style scoped lang="scss">
.deck {
  position: absolute;
  top: 42%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  height: 8vw;
}

.card {
  margin: 0 0.5rem;
  height: 100%;
  z-index: 5;
  border: 2px transparent solid;
  transition: 0.2s;

  img {
    position: relative;
  }

  &.highlight {
    border-color: red;
    border-radius: 0.5rem;

    &:hover {
      transform: scale(1.3);
    }
  }
}
</style>