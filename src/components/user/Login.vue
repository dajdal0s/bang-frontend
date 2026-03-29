<template>
  <div class="login-form">
    <form @submit.prevent="handleSubmit">
      <div class="d-inline">
        <div class="input-container">
          <label>Username *</label>
          <input v-model="model.username" placeholder="Username *" class="mb-2" ref="input" />
        </div>
        <div class="input-container">
          <label>Password</label>
          <input v-model="model.password" placeholder="Password" class="mb-2" type="password" />
        </div>
      </div>
      <template v-if="showLink">
        <input v-model="model.code" placeholder="Code *" class="mb-2" />
        <br />
      </template>
      <div class="d-flex justify mt-1">
        <slot />
        <div>
          <button type="button" @click="handleSpectate" class="transparent">Spectate</button>
          <button type="submit" class="primary">Join room</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import { getUsername, setUsername } from "../../lib/localstorage";

export default {
  props: {
    roomId: Number,
    showLink: Boolean
  },
  data: () => ({
    model: {
      username: getUsername(),
      password: '',
      code: ''
    }
  }),
  mounted() {
    this.$refs.input.focus()
  },
  methods: {
    ...mapActions([
      'ROOM_JOIN'
    ]),
    handleSpectate() {
      this.handleSubmit(null, true)
    },
    async handleSubmit(e, spectate) {
      setUsername(this.model.username)

      if (this.showLink && !this.model.code) {
        this.$notify({
          title: 'Please fill the code',
          type: 'error'
        })
        return
      }

      const data = {
        ...this.model,
        link: this.$route.params.link,
        roomId: this.roomId,
        spectate
      }
      const room = await this.ROOM_JOIN(data)

      this.$router.push(`/rooms/${room.id}`)
    }
  }
}
</script>

<style scoped lang="scss">
.login-form {
  padding-top: 1rem;
}

input {
  width: 100%;
  box-sizing: border-box;
}

.input-container {
  max-width: 19rem;

  @media all and (max-width: 500px) {
    width: 100%
  }
}
</style>