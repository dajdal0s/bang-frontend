<template>
  <em v-if="typeof reaction.hasDodged === 'number'">
    <template v-if="cardName === 'dinamite'">
      <span v-if="reaction.hasDodged">and hasn't exploded</span>
      <span v-else>and has exploded</span>
    </template>
    <template v-else-if="cardName === 'prigione'">
      <span v-if="reaction.hasDodged">and has escaped</span>
      <span v-else>and hasn't escaped</span>
    </template>
    <template v-else>
      <span v-if="reaction.hasDodged">and has dodged</span>
      <span v-else>and hasn't dodged</span>
    </template>
  </em>
</template>

<script>
export default {
  props: {
    reaction: Object,
    cardName: String
  }
}
</script>
