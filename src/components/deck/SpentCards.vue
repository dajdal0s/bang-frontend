<template>
  <transition-group name="card-horizontal" tag="div" class="cards" mode="out-in">
    <div class="card" v-for="cardData in room.lastSpentCards" :key="cardData.id">
      <CardImage :card="cardData.card" absolute />
    </div>
  </transition-group>
</template>

<script>
import CardImage from "../card/CardImage";

export default {
  props: {
    room: Object
  },
  components: { CardImage }
}
</script>

<style scoped lang="scss">
.cards {
  height: 100%;
  position: relative;
}

.card {
  height: 100%;
  position: absolute;
  left: 0;
  transition: 0.3s;

  &:nth-of-type(2) {
    left: 2rem;
  }

  &:nth-of-type(3) {
    left: 4rem;
  }

  &:nth-of-type(4) {
    left: 6rem;
  }
}
</style>