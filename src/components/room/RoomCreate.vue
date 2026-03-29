<template>
  <PaperCard title="Create a room" class="preview">
    <form @submit.prevent="handleSubmit">
      <input v-model="model.name" placeholder="Room name *" type="text" ref="input" class="mb-2" />
      <br />
      <input v-model="model.username" placeholder="Username *" class="mb-1 mt-1" />
      <br />
      <input v-model="model.password" placeholder="User password" class="mb-2" type="password" />
      <br />
      <label class="d-block">
        <input v-model="model.inviteOnly" type="checkbox" />
        Invite only
      </label>
      <input v-model="model.code" placeholder="Optional code" class="mb-2 mt-1" />
      <br />
      <br />
      <div class="d-flex justify">
        <button type="button" class="transparent" @click="$emit('onSelect', null)">
          Cancel
        </button>
        <button type="submit" class="primary">Create room</button>
      </div>
    </form>
  </PaperCard>
</template>

<script>
import { mapActions } from 'vuex'

import { getUsername, setUsername } from "../../lib/localstorage";

import PaperCard from "../ui/PaperCard";

export default {
  data() {
    return {
      model: {
        name: '',
        username: getUsername(),
        password: '',
        inviteOnly: false,
        code: ''
      }
    }
  },
  mounted() {
    this.$refs.input.focus()
  },
  methods: {
    ...mapActions([
      'ROOM_CREATE'
    ]),
    async handleSubmit() {
      setUsername(this.model.username)
      const room = await this.ROOM_CREATE(this.model)

      this.$router.push(`/rooms/${room.id}`)
    }
  },
  components: { PaperCard }
}
</script>

<style scoped lang="scss">
.preview {
  overflow: hidden;
  min-width: 20rem;
}
</style>
