<template>
  <ul v-if="room && room.turns" class="log-container" ref="container">
    <li v-for="turn in room.turns" :key="turn.id">
      <ul>
        <GameLogAction v-for="action in turn.actions" :key="action.id" :action="action" />
      </ul>
    </li>
  </ul>
</template>

<script>
import GameLogAction from "./GameLogAction";

export default {
  props: {
    room: Object
  },
  updated() {
    const elem = this.$refs.container
    elem.scrollTop = elem.scrollHeight;
  },
  components: { GameLogAction }
}
</script>

<style lang="scss">
.log-container {
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;

  ul {
    margin: 0 0 0 1.5rem;
  }
}
</style>
