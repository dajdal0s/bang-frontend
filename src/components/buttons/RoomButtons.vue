<template>
  <div class="room-buttons">
    <button class="button-leave shadow mb-2 primary" @click="handleCopyLink">Copy share link</button>
    <br />
    <template v-if="activeRoom.code">
      <button class="button-leave shadow mb-2" @click="handleCopy">
        Copy code
      </button>
      <br />
    </template>

    <template v-if="showButton">
      <button class="button-leave shadow" @click="handleClick">Leave room</button>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'USER_LEAVE'
    ]),
    handleClick() {
      this.USER_LEAVE(this.$route.params.id)
      this.$router.push({ name: 'home' })
    },
    handleCopy() {
      const code = this.activeRoom.code

      this.$copyText(code).then(() => {
        this.$notify({
          title: 'Successfully copied',
          text: code,
          type: 'success'
        })
      }, function () {
        this.$notify({
          title: 'Could not copy the link',
          type: 'error'
        })
      })
    },
    handleCopyLink() {
      const link = this.activeRoom.link
      const url = `${window.location.origin}/code/${link}`

      this.$copyText(url).then(() => {
        this.$notify({
          title: 'Successfully copied',
          text: url,
          type: 'success'
        })
      }, function () {
        this.$notify({
          title: 'Could not copy the link',
          type: 'error'
        })
      })
    }
  },
  computed: {
    ...mapGetters([
      'activeRoom',
      'user'
    ]),
    showButton() {
      return this.activeRoom.state !== '1'
    }
  }
}
</script>

<style scoped lang="scss">
.room-buttons {
  position: absolute;
  bottom: 6%;
  left: 2%;

  @media all and (max-width: 1024px) {
    bottom: 2%;
  }
}
</style>