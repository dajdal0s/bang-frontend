<template>
  <button class="button" @click="$emit('click')">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.button {
  position: absolute;
  z-index: 5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 120%);
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.4);
}
</style>
