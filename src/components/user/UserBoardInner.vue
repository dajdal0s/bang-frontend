<template>
  <div :class="className" @click="handleSelect">
    <UserRole v-if="isMine && userData.role" :role="userData.role" class="role" />
    <UserCharacter :lives="userData.lives" :character="userData.character && userData.character.name" :isMine="isMine" />
    <UserBoardCards v-if="activeRoom" :userData="userData" />
    <SheriffBadge v-if="isSheriff" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import UserCharacter from './UserCharacter'
import SheriffBadge from './SheriffBadge'
import UserBoardCards from "./UserBoardCards";
import UserRole from "./UserRole";

export default {
  props: {
    userData: Object,
    index: Number,
    isMine: Boolean
  },
  methods: {
    ...mapMutations(['SELECTED_USER_SET']),
    handleSelect() {
      if (!this.isSelectable || this.isMine) return;
      this.SELECTED_USER_SET(this.userData)
    }
  },
  computed: {
    ...mapGetters([
      'activeRoom',
      'lastTurn',
      'focusedUserId',
      'selectedCard',
      'selectedUser',
      'user'
    ]),
    className() {
      return ['card', {
        active: this.isActive,
        focused: this.isFocused,
        selectable: this.isSelectable,
        selected: this.isSelected,
        mine: this.isMine,
        playing: this.isPlaying
      }]
    },
    isGameFinished () {
      return this.activeRoom.state === '2'
    },
    isPlaying() {
      if (this.isGameFinished) return false
      const { isActive, focusedUserId, isMine, isFocused } = this
      if (focusedUserId) {
        return isFocused && isMine
      }
      return isActive && isMine && !focusedUserId
    },
    isSheriff() {
      return this.userData.role === "1"
    },
    isActive() {
      return this.lastTurn && this.lastTurn.userId === this.userData.id
    },
    isFocused() {
      return this.focusedUserId === this.userData.id
    },
    isSelectable() {
      const { selectedCard, isMine, user, userData } = this
      if (userData.lives < 1 || isMine) return false

      let canTargetWithCard = selectedCard && selectedCard.card.details.requiresTarget
      if (!canTargetWithCard && selectedCard) {
        if (selectedCard.card.details.name === 'mancato' && user.character.name === 'calamity_janet') {
          canTargetWithCard = true
        }
      }
      return canTargetWithCard
    },
    isSelected() {
      return this.selectedUser && this.selectedUser.id === this.userData.id
    },
    showRole() {
      return this.activeRoom.state !== '0' && !this.userData.lives
    }
  },
  components: { UserRole, UserBoardCards, UserCharacter, SheriffBadge }
}
</script>

<style scoped lang="scss">
.card {
  background: rgba(76, 39, 6, 0.5);
  border-radius: 0.5rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.4);
  color: #ffffff;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  border: 2px transparent solid;
  transition: 0.2s;
  z-index: 2;

  @media all and (max-width: 1000px) {
    padding: 0.7rem;
  }

  &.playing {
    transform: translateX(-20%);
  }

  &.selectable {
    cursor: pointer;

    &:hover {
      background: rgba(56, 28, 3, 0.7);
    }
  }

  &.active {
    border-color: #ffd31a;
  }

  &.focused, &.selected {
    border-color: red;
  }
}

.board-inner {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.username {
  text-align: center;
}

.role {
  position: absolute;
  left: 50%;
  transform: translateX(-310%);
  bottom: -1rem;
}
</style>