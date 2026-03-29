<template>
  <CardsButton v-if="showButton" @click="handleClick">
    Draw
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
      'CARD_DRAW_BLOCKER'
    ]),
    handleClick() {
      this.handleLuckyDraw()
    },
    handleLuckyDraw() {
      this.CARD_DRAW_BLOCKER({
        roomId: this.$route.params.id
      })
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'lastTurn',
      'lastAction'
    ]),
    showButton() {
      const { userData, lastAction, user } = this
      const isMe = user.id === userData.id
      if (!isMe) return false

      if (userData.character.name !== 'jourdonnais') return false

      const isFocused = lastAction && lastAction.focusedUserId === userData.id
      if (!isFocused) return false

      const lastCard = lastAction && lastAction.cardNameAs || lastAction.cardName
      const needsMancato = lastCard === 'bang' || lastCard === 'gatling' // can draw barile only on bang or gatling
      if (!needsMancato) return false

      const alreadyPlayed = lastAction.reactions.find(r => r.userId === this.userData.id && r.cardName === 'Unknown')
      return !alreadyPlayed
    }
  },
  components: { CardsButton }
}
</script>
