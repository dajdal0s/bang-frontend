<template>
  <button class="button-kick danger" @click="handleKick">
    Kick user
  </button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    user: Object
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    ...mapActions([
      'USER_KICK'
    ]),
    async handleKick() {
      this.loading = true
      await this.USER_KICK({ roomId: this.$route.params.id, userId: this.user.id })
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">
.button-kick {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
}
</style>