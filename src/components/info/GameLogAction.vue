<template>
  <li>
    <template v-if="!action.hidden">
      <strong>{{ action.user.username }} </strong>

      <template v-if="action.action === '3'">
        drew
        <template v-if="playedCardName"> for</template>
        <template v-else> cards</template>
      </template>
      <template v-else-if="action.action === '4'">discarded</template>
      <template v-else>played</template>
      <CardName :name="playedCardName" v-if="playedCardName" />

      <template v-if="action.targetUser">
        <template v-if="action.action === '3'"> from</template>
        <template v-else> on</template>
        <strong> {{ action.targetUser.username }}</strong>
      </template>

      <ul v-if="action.reactions.length">
        <li v-for="reaction in action.reactions" :key="reaction.id">
          <strong>{{ reaction.user.username }} </strong>
          <template v-if="!reaction.action">did not react</template>
          <template v-else-if="reaction.action === '3'">drew</template>
          <template v-else>responded with</template>
          <CardName :name="reaction.cardName || reaction.cardNameAs" v-if="reaction.cardName || reaction.cardNameAs" />
          <LogReactionDodge :reaction="reaction" :cardName="action.cardNameAs || action.cardName" />
        </li>
      </ul>
    </template>
  </li>
</template>

<script>
import CardName from "../card/CardName";
import LogReactionDodge from "./LogReactionDodge";

export default {
  components: { LogReactionDodge, CardName },
  props: {
    action: Object
  },
  computed: {
    playedCardName() {
      return this.action.cardName || this.action.cardNameAs
    }
  }
}
</script>
