<template>
  <div class="container" :style="style">
    <div v-if="title" class="title d-flex justify">
      <strong>{{ title }}</strong>
      <em v-if="titleRight">{{ titleRight }}</em>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rotation: Number,
    title: String,
    titleRight: String
  },
  computed: {
    style() {
      return `transform: rotate(${this.rotation}deg);`
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  background: var(--paper);
  text-align: left;
  position: relative;
  box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.5);
  height: fit-content;
  border-radius: 0.5rem;

  ul {
    li {
      padding: 0.3rem 1rem;
      border-bottom: 1px rgba(0, 0, 0, 0.1) solid;
    }
  }
}

.content {
  padding: 1rem 2rem 2rem;
}

.title {
  padding: 1rem 2rem;
  border-bottom: 1px rgba(0, 0, 0, 0.1) solid;
}
</style>