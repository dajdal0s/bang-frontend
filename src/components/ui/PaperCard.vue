<template>
  <Paper :title="title" class="card" :titleRight="titleRight">
    <slot />
  </Paper>
</template>

<script>
import Paper from '../ui/Paper'

export default {
  props: {
    title: String,
    titleRight: String
  },
  components: { Paper }
}
</script>

<style scoped lang="scss">
.card {
  overflow: hidden;
  max-height: 70vh;
  overflow-y: auto;
  transform: scale(1.2) translateX(0rem);

  @media all and (max-width: 1024px) {
    transform: none;
  }

  @media all and (max-width: 1024px) and (orientation: portrait) {
    margin-top: 2rem;
  }
}
</style>