<template>
  <div class="card-role">
    <img :src="`/cards/${roleName}.png`" />
  </div>
</template>

<script>
import { ROLES } from "../../const/roles";

export default {
  props: {
    role: String
  },
  computed: {
    roleName() {
      return ROLES[this.role]
    }
  }
}
</script>

<style scoped lang="scss">
.card-role {
  text-align: center;
  position: relative;
  z-index: 70;

  img {
    width: 5vw;
    transition: 0.2s;
    transform-origin: bottom left;

    &:hover {
      transform: scale(2);
    }
  }
}
</style>
