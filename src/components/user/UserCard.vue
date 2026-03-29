<template>
  <Card :cardData="userCard.card"
    :clickable="isClickable"
    @click.native="handleSelect"
    :highlight="isHighlighted"
  />
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import Card from "../card/Card";

export default {
  props: {
    userCard: Object,
    handleClick: Function,
    userData: Object,
    isMyTurn: Boolean
  },
  methods: {
    ...mapMutations([
      'SELECTED_CARD_SET',
      'SELECTED_USER_CARD_SET',
      'SELECTED_USER_SET'
    ]),
    handleSelect() {
      if (!this.isClickable) return false

      const { userCard } = this

      if (this.isMine) {
        this.SELECTED_CARD_SET(userCard)
        this.SELECTED_USER_CARD_SET(null)
        this.SELECTED_USER_SET(null)
      } else {
        this.SELECTED_USER_CARD_SET(userCard)
      }
    }
  },
  computed: {
    ...mapGetters([
      'selectedCard',
      'lastTurn',
      'user',
      'lastAction'
    ]),
    hasDynamite() {
      return this.userData.cards.find(c => c.card?.details.name === 'dinamite' && c.isEquipped)
    },
    hasPrison() {
      return this.userData.cards.find(c => c.card?.details.name === 'dinamite' && c.isEquipped)
    },
    cardName() {
      return this.userCard.card?.details.name
    },
    isHighlighted() {
      const { lastTurn, userData } = this
      if (
        !this.isMine ||
        lastTurn.userId !== userData.id
      ) return false

      const cardName = this.cardName
      const isDying = userData.isDying
      if (isDying) {
        return cardName === 'birra'
      }

      if (lastTurn.isStarted || !this.userCard.isEquipped) return false

      const isDynamite = cardName === 'dinamite'
      if (isDynamite) return true

      const isPrison = cardName === 'prigione'
      if (isPrison) {
        return !this.hasDynamite
      }
      return false
    },
    isMine() {
      return this.userCard.userId === this.user.id
    },
    isBlocked() {
      const hasBlocker = this.userData.cards.some(c => c.isEquipped && c.card?.details.isBlocker)
      return hasBlocker && !this.lastTurn.isStarted
    },
    isClickable() {
      if (!this.isMyTurn) return false
      const { isMine, selectedCard, lastAction, userData } = this

      if (this.isHighlighted) return true

      if (isMine) {
        const canPlayMyTurn = !this.isBlocked && !!this.lastTurn.isStarted
        return canPlayMyTurn || lastAction?.focusedUserId === userData.id
      }

      const canSelect = (selectedCard && !!selectedCard.card.details.requiresTargetCard)
      return canSelect
    },
  },
  components: { Card }
}
</script>