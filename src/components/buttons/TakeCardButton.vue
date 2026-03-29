<template>
  <button v-if="showButton" class="button" @click="handleClick">
    Take card
  </button>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { canTargetWithJesseJones } from '../../helpers/user';

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
      this.ROOM_DRAW({ userId: this.userData.id, roomId })
    }
  },
  computed: {
    ...mapGetters([
      'activeRoom',
      'roomUser',
      'lastTurn'
    ]),
    showButton() {
      const { roomUser, userData, lastTurn } = this
      if (roomUser.id === userData.id) return false // is mine

      const cantarget = canTargetWithJesseJones({ turn: lastTurn, user: roomUser })
      if (!cantarget) return false

      const unequippedCards = userData.cards.filter(c => !c.isEquipped)
      if (!unequippedCards.length) return false

      const myBlockerCards = roomUser.cards.filter(c => c.isEquipped & c.card?.details.isBlocker)

      return !myBlockerCards.length
    }
  }
}
</script>

<style scoped lang="scss">
.button {
  position: absolute;
  z-index: 5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.3);
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.4);
}
</style>