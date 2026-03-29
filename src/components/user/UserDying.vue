<template>
  <div v-if="currentUser && currentUser.isDying && currentUser.lives > 0" class="dying-message">
    Play a beer to save yourself!
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'activeRoom',
      'user'
    ]),
    currentUser() {
      return this.activeRoom.users.find(u => u.id === this.user.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.dying-message {
  position: absolute;
  left: 50%;
  bottom: 50%;
  transform: translate(-50%, -50%);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;

  @media all and (min-width: 1024px) {
    bottom: 0;
  }
}
</style>
