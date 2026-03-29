<template>
  <div class="container">
    <CardImage :card="selectedCard.card" v-if="selectedCard" disableScale />
    <CardImage :card="selectedUserCard.card" v-if="selectedUserCard" disableScale />
    <div class="buttons" v-if="isUserPlaying || isFocused">
      <template v-if="selectedCard">
        <button @click="handlePlay" v-if="isUserPlaying" class="primary" :disabled="loading">
          <template v-if="isUserBlocked">Draw</template>
          <template v-else>Play</template>
        </button>
        <button @click="handleLuckyDraw" v-else-if="isUserDrawingLucky" class="primary" :disabled="loading">
          Draw
        </button>
        <button @click="handleReact" :disabled="loading" v-else>React</button>
        <button @click="handleDiscard(false)"
          v-if="showDiscard"
          :disabled="disableDiscard || loading">
          Discard
        </button>
        <button @click="handleDiscard(true)" v-if="showDiscardAndHeal" :disabled="loading">
          Discard and heal
        </button>
        <button @click="handleCardCancel" class="mt-2">Cancel</button>
      </template>
      <button v-else-if="(isUserPlaying || isFocused) && lastTurn.isStarted" @click="handleTurn" :disabled="loading">
        Turn
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

import CardImage from "./CardImage";

export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    ...mapActions([
      'CARD_PLAY',
      'CARD_DRAW_BLOCKER',
      'USER_TURN_ACTION',
      'USER_DISCARD',
      'CARD_REACT'
    ]),
    ...mapMutations([
      'SELECTED_CARD_SET',
      'SELECTED_USER_SET'
    ]),
    handlePlay() {
      const { selectedCard, selectedUser, selectedUserCard, lastTurn } = this
      const { requiresTarget, requiresTargetCard } = selectedCard.card.details

      // played only when a person draws the card
      if (selectedCard.card.details.isBlocker && !lastTurn.isStarted) {
        this.handleLuckyDraw()
        return
      }

      try {
        if (requiresTarget && !selectedUser) {
          throw new Error('No player selected')
        }

        if (requiresTargetCard && !selectedUserCard) {
          throw new Error('No card selected')
        }

        this.handlePromise(
          this.CARD_PLAY({
            roomId: this.$route.params.id,
            cardId: this.selectedCard.id,
            targetUserId: selectedUser && selectedUser.id,
            targetCardId: selectedUserCard && selectedUserCard.id
          })
        )
      } catch (e) {
        this.$notify({
          title: e.message,
          type: 'error'
        })
      }
    },
    async handlePromise(promise) {
      this.loading = true
      try {
        await promise
        this.loading = false
      } catch(e) {
        this.loading = false
      }
    },
    handleLuckyDraw() {
      this.handlePromise(
        this.CARD_DRAW_BLOCKER({
          roomId: this.$route.params.id,
          cardId: this.selectedCard.id
        })
      )
    },
    handleReact() {
      this.handlePromise(
        this.CARD_REACT({
          roomId: this.$route.params.id,
          cardId: this.selectedCard.id
        })
      )
    },
    handleDiscard(heal = false) {
      this.handlePromise(
        this.USER_DISCARD({ roomId: this.$route.params.id, cardId: this.selectedCard.id, heal })
      )
    },
    handleTurn() {
      const { lastAction } = this
      const actionId = lastAction && lastAction.focusedUserId && lastAction.id
      this.handlePromise(
        this.USER_TURN_ACTION({ roomId: this.$route.params.id, actionId })
      )
    },
    handleCardCancel() {
      this.SELECTED_CARD_SET(null)
      this.SELECTED_USER_SET(null)
    }
  },
  computed: {
    ...mapGetters([
      'activeRoom',
      'selectedCard',
      'selectedUserCard',
      'selectedUser',
      'lastTurn',
      'lastAction',
      'focusedUserId',
      'user'
    ]),
    roomUser() {
      const { activeRoom, user } = this
      return activeRoom.users.find(u => u.id === user.id)
    },
    isUserPlaying() {
      const { user, lastTurn } = this
      return user && lastTurn && lastTurn.userId === user.id && !this.focusedUserId
    },
    isUserDrawingLucky() {
      const { selectedCard } = this
      const name = selectedCard.card.details.name
      return selectedCard && selectedCard.isEquipped && name === 'barile'
    },
    isUserBlocked() {
      const { lastTurn, selectedCard, roomUser } = this
      if (lastTurn.isStarted) return false

      const hasBlocker = roomUser.cards.find(c => c.isEquipped && c.card.details.isBlocker)

      return hasBlocker && selectedCard.isEquipped
    },
    isFocused() {
      const { user, focusedUserId } = this
      return user && user.id === focusedUserId
    },
    showDiscard() {
      const { selectedCard, isFocused } = this
      return !isFocused && !selectedCard.isEquipped
    },
    showDiscardAndHeal() {
      return this.showDiscard && this.user.character.name === 'sid_ketchum'
    },
    unequippedCards() {
      return this.roomUser.cards.filter(c => !c.isEquipped)
    },
    disableDiscard() {
      const { unequippedCards, roomUser, selectedUserCard } = this
      return (unequippedCards.length <= roomUser.lives && !selectedUserCard)
    }
  },
  components: { CardImage }
}
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  bottom: 5vw;
  left: 60%;
  height: 12vw;
  display: flex;
  z-index: 10;
}

.buttons {
  margin-left: 1rem;

  button {
    display: block;
    margin-bottom: 0.5rem;
    box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.3);
  }
}
</style>
