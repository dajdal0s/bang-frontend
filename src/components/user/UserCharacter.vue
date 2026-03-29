<template>
  <div class="container">
    <img src="../../assets/img/cards/back-character.png" alt="Back" class="lives" />
    <img :src="characterImage" :alt="character" :class="['character', { isMine }]" :style="style" />
  </div>
</template>

<script>
export default {
  props: {
    lives: Number,
    character: String,
    isMine: Boolean
  },
  computed: {
    characterImage () {
      const { character } = this
      if (!character) return '/cards/back_role.png'
      return `/characters/${character}.png`;
    },
    style() {
      const { character } = this
      const lives = !character ? 100 : this.lives * 20
      return {
        top: `${lives}%`
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  position: relative;
  height: 6vw;
  width: 5vw;
  flex-shrink: 0;

  img {
    height: 100%;
    width: auto;
  }
}

.lives, .character {
  position: absolute;
  top: 0;
  left: 0;
}

.lives {
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.2);
}

.character {
  transform-origin: 0 70%;
  transition: 0.2s;
  z-index: 61;
  box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.4);
  border-radius: 0.6rem;

  &:hover {
    transform: scale(3.5);
  }

  &.isMine:hover {
    transform: scale(3);
  }
}
</style>
