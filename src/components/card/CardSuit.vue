<template>
  <text :fill="color"
    x="90"
    y="70"
    font-size="100">
    <template v-if="suit === '1'">
      ♦
    </template>
    <template v-else-if="suit === '2'">
      ♣
    </template>
    <template v-else-if="suit === '3'">
      ♥
    </template>
    <template v-else-if="suit === '4'">
      ♠
    </template>
  </text>
</template>

<script>
export default {
  props: {
    suit: String
  },
  computed: {
    color() {
      const isEven = Number(this.suit) % 2 === 0
      return isEven ? '#000000' : '#ea084d'
    }
  }
}
</script>
