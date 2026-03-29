<template>
  <div :class="['card', size, { clickable }]">
    <CardImage :card="cardData"
      absolute
      :clickable="clickable"
      :disableScale="!cardData"
      :highlight="highlight" />
  </div>
</template>

<script>
import CardImage from "./CardImage";

export default {
  components: { CardImage },
  props: {
    size: String,
    cardData: Object,
    isMine: Boolean,
    clickable: Boolean,
    highlight: Boolean
  }
}
</script>

<style scoped lang="scss">
.card {
  display: inline-block;
  height: 100%;
  position: relative;
  flex: 1;
  max-width: 2vw;
  transition: 0.3s;

  &.clickable {
    img {
      cursor: pointer;
    }
  }

  img {
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
  }
}
</style>
