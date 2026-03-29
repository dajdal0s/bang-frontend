<template>
  <div class="container">
    <div class="login">
      <Login :showLink="!$route.params.link" class="mb-1">
        <button @click="$router.push({ name: 'home' })" class="transparent pl-0" type="button">
          Back to menu
        </button>
      </Login>
    </div>
  </div>
</template>

<script>
import Login from "../components/user/Login";

export default {
  components: { Login }
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.login {
  padding: 2rem;
  background: var(--paper);
  border-radius: 1rem;
  box-shadow: 0 0.3rem 1.6rem rgba(107, 65, 16, 0.6);
}
</style>
