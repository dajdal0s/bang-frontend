<template>
  <div :class="['card-inner', { absolute, disableScale, clickable, highlight }]">
    <img :src="`/cards/${cardName}.png`" :class="{ clickable }" :alt="cardName" />
    <div class="details" v-if="card" :class="{ clickable }">
      <svg
        class="details-text"
        width="100%"
        height="100%"
        viewBox="0 0 500 75"
        dominant-baseline="central"
        preserveAspectRatio="xMinYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <text
          x="0"
          y="70"
          font-size="100"
          fill="black"
        >
          {{ card.rank }}
        </text>
        <CardSuit :suit="card.suit" />
      </svg>
    </div>
  </div>
</template>

<script>
import CardSuit from "./CardSuit";

export default {
  components: { CardSuit },
  props: {
    card: Object,
    clickable: Boolean,
    absolute: Boolean,
    disableScale: Boolean,
    highlight: Boolean
  },
  computed: {
    cardName() {
      const { card } = this
      if (card && card.details) return card.details.name
      return 'back_playing'
    }
  }
}
</script>

<style scoped lang="scss">
.card-inner {
  position: relative;
  height: 100%;
  transition: 0.2s;
  transform-origin: bottom left;

  &.highlight {
    img {
      border: 2px red solid;
    }
  }

  &.absolute {
    position: absolute;
  }

  &:hover {
    transform: scale(2.5);
  }

  @media all and (max-width: 1024px) {
    &.clickable {
      &:hover {
        transform: none;
      }
    }
  }

  &.disableScale {
    &:hover {
      transform: none;
    }
  }
}

img {
  height: 100%;
  box-sizing: border-box;
  border-radius: 0.3rem;

  &.clickable {
    cursor: pointer;
    transition: 0.2s;

    @media all and (min-width: 1024px) {
      &:hover {
        filter: brightness(1.1);
      }
    }
  }
}

.details {
  position: absolute;
  color: #000000;
  line-height: 0.5;
  letter-spacing: -0.05rem;
  font-weight: bold;

  left: 0;
  bottom: 0.2rem;
  padding: 0 0.4rem;
  width: 100%;
  height: 20%;
  box-sizing: border-box;

  &.clickable {
    cursor: pointer;
  }
}
</style>
