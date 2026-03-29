<template>
  <div class="unloaded-cards">
    <div class="card"
      v-for="cardData in room.unloadedCards"
      :key="cardData.id"
      @click="handleClick(cardData.id)">
      <CardImage :card="cardData.card" :clickable="isClickable" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import CardImage from "../card/CardImage";

export default {
  components: { CardImage },
  props: {
    room: Object
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    ...mapActions(['CARD_UNLOADED_TAKE']),
    async handleClick(cardId) {
      if (this.loading || !this.isClickable) return
      this.loading = true

      try {
        await this.CARD_UNLOADED_TAKE({
          roomId: this.$route.params.id,
          actionId: this.lastAction.id,
          cardId
        })
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    }
  },
  computed: {
    ...mapGetters([
      'roomUser',
      'lastAction'
    ]),
    isClickable() {
      const { loading, lastAction, roomUser, room } = this
      if (loading) return false

      const cardName = lastAction.cardNameAs || lastAction.cardName

      switch (cardName) {
        case 'bang':
        case 'gatling':
        case 'prigione':
        case 'dinamite':
          if (room.unloadedCards.length === 1) {
            return false
          }
          break
        // TODO case emporiox
        default:
      }

      return lastAction.focusedUserId === roomUser.id
    }
  }
}
</script>

<style lang="scss" scoped>
.unloaded-cards {
  display: flex;
  background: yellow;
  justify-content: center;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.4);
  padding: 1rem;
  border-radius: 1rem;
  z-index: 11;
}

.card {
  height: 18vh;
  margin: 0 0.5rem;
}
</style>
