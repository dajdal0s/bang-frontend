<template>
  <div :class="className">
    <div class="name">
      {{ userData.username }}
      <span v-if="isAdmin" class="owner-text">
        (owner)
      </span>
    </div>
    <div :class="{ disconnected: userData.isDisconnected }">
      <UserBoardInner :userData="userData" :isMine="isMine" />
    </div>
    <ButtonKick v-if="showKick" :user="userData">x</ButtonKick>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import UserBoardInner from "./UserBoardInner";
import ButtonKick from "../buttons/ButtonKick";

export default {
  props: {
    userData: Object,
    index: Number
  },
  computed: {
    ...mapGetters([
      'activeRoom',
      'user'
    ]),
    className() {
      return [`card card-${this.index}`]
    },
    isMine() {
      return this.index === 0
    },
    isAdmin() {
      return this.activeRoom.userId === this.userData.id
    },
    showKick() {
      return this.user.id === this.activeRoom.userId &&
        !this.isMine &&
        this.userData.isDisconnected &&
        this.userData.lives !== 0 &&
        this.activeRoom.state === '1'
    }
  },
  components: { UserBoardInner, ButtonKick }
}
</script>

<style scoped lang="scss">
.card {
  width: 20vw;
  height: 24vh;
  position: absolute;
}

.card-0 {
  bottom: 12vh;
  left: 50%;
  transform: translateX(-50%) scale(1.4);
}

.card-1, .card-6 {
  bottom: 29%;
}

.card-2, .card-5 {
  top: 15%;
}

.card-3, .card-4 {
  top: 7%;
}

.card-3 {
  left: 27%;
}

.card-4 {
  right: 27%;
}

.card-1, .card-2 {
  left: 2%;
}

.card-5, .card-6 {
  right: 2%;
}

.disconnected {
  opacity: 0.5;
}

.name {
  padding: 0.5rem 0;
  font-weight: bold;
  position: absolute;
  z-index: 1;
  transform: translate(0.5rem, -2.5rem);
  max-width: 18vw;
  text-overflow: ellipsis;
  overflow: hidden;

  @media all and (max-width: 1024px) {
    font-size: 1.2rem;
    transform: translate(0.5rem, -2rem);
  }
}

.owner-text {
  font-weight: 200;
  font-size: 1rem;
}
</style>