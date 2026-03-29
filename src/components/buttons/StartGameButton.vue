<template>
  <div>
    <button class="start-button gradient" @click="handleClick" :disabled="loading">
      {{ displayedText }}
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    id: Number,
    isRestart: Boolean,
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    displayedText() {
      return this.isRestart ? 'Restart game' : 'Start game'
    }
  },
  methods: {
    ...mapActions([
      'ROOM_START',
      'ROOM_RESTART'
    ]),
    async handleClick() {
      this.loading = true
      const promise = this.isRestart ? this.ROOM_RESTART : this.ROOM_START
      await promise(this.id)
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">
.start-button {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%) scale(2);
}
</style>