<template>
  <div class="about-container">
    <div class="about-content">
      <p>
        The author (Dana Janoskova) doesn't receive any kind of financial support from operating the site. It's a hobby project to
        unite friends from all around the world. The author doesn't own neither the gameplay mechanics, nor the graphics.
      </p>
      <p>
        We apologize for any bugs you encounter during your gameplay. The site is constantly being maintained
        by its author. We care about your playing experience and try to improve it constantly.
      </p>
      <p>
        For any feedback or bug reports, feel free to reach us at <u>info@danajanoskova.sk</u>
      </p>
      <p>
        Thank you for being a part of this project!
        <br />Dana
      </p>
      <button class="transparent pl-0" @click="$emit('onClose')">Close</button>
    </div>
  </div>
</template>

<script>

export default {}
</script>

<style scoped lang="scss">
.about-container {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;

  @media all and (max-width: 1024px) {
    font-size: 1.1rem;
  }
}

.about-content {
  max-width: 60rem;
  padding: 2rem;
}
</style>
