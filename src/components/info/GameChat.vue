<template>
  <div class="message-container">
    <ul ref="container">
      <li v-for="messageData in messages" :key="messageData.id">
        <strong>{{ messageData.user.username }}</strong>:
        {{ messageData.message }}
      </li>
    </ul>
    <div class="input-message">
      <input type="text" placeholder="Write a message" v-on:keyup.enter="handleSubmit" v-model="message" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      message: ''
    }
  },
  methods: {
    ...mapActions([
      'MESSAGE_SUBMIT'
    ]),
    handleSubmit() {
      if (!this.message) return

      this.MESSAGE_SUBMIT({
        message: this.message
      })
      this.message = ''
    },
    handleScroll() {
      const elem = this.$refs.container
      elem.scrollTop = elem.scrollHeight;
    }
  },
  computed: {
    ...mapGetters([
      'messages'
    ])
  },
  watch: {
    'messages'() {
      this.$nextTick(() => {
        this.handleScroll()
      })
    }
  },
  mounted () {
    this.handleScroll()
  }
}
</script>

<style lang="scss" scoped>
.message-container {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;

  li {
    padding: 0 1.5rem;
  }

  ul {
    overflow-y: auto;
    flex: 1;
    padding-top: 0.5rem;
  }
}

.input-message {
  width: 100%;
  padding: 0.5rem 1.5rem 1rem 1.5rem;
  box-sizing: border-box;

  input {
    width: 100%;
    box-sizing: border-box;
  }

  @media all and (max-width: 1024px) {
    padding: 0 1rem 0.5rem 1rem;

    input {
      font-size: 1.1rem;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }
  }
}
</style>
