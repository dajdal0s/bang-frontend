<template>
  <div class="board-inner">
    <UserCards :cards="userData.cards" :userId="userData.id" :userData="userData" v-if="!showRole" />
    <UserRole :role="userData.role" v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import UserRole from './UserRole'
import UserCards from './UserCards'

export default {
  props: {
    userData: Object,
  },
  computed: {
    ...mapGetters([
      'activeRoom'
    ]),
    showRole() {
      const { activeRoom, userData } = this
      return (userData.role && (!userData.lives || activeRoom.state === '2'))
    }
  },
  components: { UserCards, UserRole }
}
</script>

<style scoped lang="scss">
.board-inner {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>