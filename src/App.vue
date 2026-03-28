<template>
  <div id="app">
    <div class="hidden">
      <p>Play BANG! Online with your friends! Multi-platform, free to play. BANG! is a - registered – trademark of daVinci Editrice S.r.l</p>
    </div>
    <div class="content">
      <router-view />
      <notifications />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100%;
  position: relative;

  @media all and (max-width: 1024px) {
    font-size: 1.5rem;
  }
}

@media (max-width: 1024px) and (orientation: portrait) {
  .mobile-alert {
    display: flex;
  }
}

.hidden {
  display: none;
}
</style>
