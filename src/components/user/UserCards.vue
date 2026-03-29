<template>
  <div class="container">
    <transition-group name="card-vertical" tag="div" class="cards cards-top" mode="out-in">
      <UserCard v-for="userCard in equippedCards"
        :key="userCard.id"
        :userCard="userCard"
        :cardData="userCard.card"
        :userData="userData"
        :isMyTurn="isMyTurn"
      />
    </transition-group>
    <div>
      <transition-group name="card-vertical" tag="div" class="cards" mode="out-in">
        <UserCard v-for="userCard in hiddenCards"
          :key="userCard.id"
          :userCard="userCard"
          :cardData="userCard.card"
          :userData="userData"
          :isMyTurn="isMyTurn"
        />
      </transition-group>
    </div>
    <TakeCardButton :userData="userData" />

    <template v-if="userData.character">
      <DrawCardButton :userData="userData" />
      <DrawSpentCardButton :userData="userData" />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import TakeCardButton from "../buttons/TakeCardButton";
import DrawCardButton from "../buttons/DrawCardButton";
import DrawSpentCardButton from "../buttons/DrawSpentCardButton";
import UserCard from "./UserCard";

export default {
  props: {
    cards: Array,
    userId: Number,
    userData: Object
  },
  computed: {
    ...mapGetters([
      'focusedUserId',
      'user',
      'lastTurn',
      'lastAction',
      'activeRoom'
    ]),
    equippedCards() {
      return this.cards.filter(c => c.isEquipped)
    },
    hiddenCards() {
      return this.cards.filter(c => !c.isEquipped)
    },
    isMyTurn() {
      const { lastAction, lastTurn, user, activeRoom } = this
      if (activeRoom.state === '2' || !lastTurn) return false;

      const { actions } = lastTurn
      if (!actions.length) return lastTurn.userId === user.id

      const focusedTargetId = lastAction.focusedUserId
      return (focusedTargetId || lastTurn.userId) === user.id
    }
  },
  components: { UserCard, DrawSpentCardButton, DrawCardButton, TakeCardButton }
}
</script>

<style scoped>
.container {
  flex: 1
}

.cards {
  text-align: center;
  display: flex;
  position: relative;
  z-index: 3;
  height: 4vw;
  padding-right: 1vw;
  justify-content: center;
}

.cards-top {
  height: 4.5vw;
  margin-bottom: 1rem;
}
</style>
