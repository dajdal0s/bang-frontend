<template>
  <CardsButton v-if="showButton" @click="handleClick">
    Draw spent card
  </CardsButton>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import CardsButton from './CardsButton'

export default {
  props: {
    userData: Object
  },
  methods: {
    ...mapActions([
      'ROOM_DRAW'
    ]),
    handleClick() {
      const roomId = this.$route.params.id
      this.ROOM_DRAW({ roomId, drawSpentCard: true })
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'activeRoom',
      'lastTurn',
      'lastAction',
      'roomUser'
    ]),
    showButton() {
      const { userData, lastTurn, roomUser, activeRoom } = this
      const isMe = roomUser.id === userData.id
      if (!isMe) return false

      const hasSpentCards = activeRoom.spentCards.length
      if (!hasSpentCards) return false;

      const hasUser = userData.character.name === 'pedro_ramirez'
      if (!hasUser) return false

      const hasBlocker = userData.cards.find(c => c.card.details.isBlocker && c.isEquipped)
      if (hasBlocker) return false

      const canDraw = lastTurn.userId === roomUser.id && !lastTurn.isStarted
      return canDraw
    }
  },
  components: { CardsButton }
}
</script>
