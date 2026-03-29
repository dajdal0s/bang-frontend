<template>
  <div class="info-container">
    <button :class="['link', { active: tab === 'log' }]" type="button" @click="tab = 'log'">
      Log
    </button>
    <button :class="['link', { active: tab === 'chat' }]" type="button" @click="tab = 'chat'">
      Chat
    </button>
    <button :class="['link', { active: tab === 'spectators' }]" type="button" @click="tab = 'spectators'">
      Spectators
    </button>

    <div class="info-content">
      <GameLog :room="activeRoom" v-if="tab === 'log'" />
      <GameChat :room="activeRoom" v-else-if="tab === 'chat'" />
      <Spectators :room="activeRoom" v-else />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import GameLog from "./GameLog";
import Spectators from "./Spectators";
import GameChat from "./GameChat";

export default {
  data() {
    return {
      tab: 'log'
    }
  },
  computed: {
    ...mapGetters([
      'activeRoom'
    ])
  },
  components: { GameChat, Spectators, GameLog }
}
</script>

<style lang="scss">
.info-container {
  position: absolute;
  bottom: 1rem;
  right: 1rem;

  @media all and (max-width: 1024px) {
    button {
      font-size: 1rem;
    }
  }
}

.info-content {
  background: rgba(255, 232, 195, 0.6);
  border-radius: 1rem;
  width: 25vw;
  height: 20vh;
  line-height: 1.2;
  overflow-y: auto;

  > ul {
    padding: 1rem 1.5rem 1rem 0;
  }

  @media all and (max-width: 1024px) {
    font-size: 1rem;
    height: 17vh;

    > ul {
      padding: 0.5rem 1rem 0.5rem 0;
    }
  }
}
</style>
