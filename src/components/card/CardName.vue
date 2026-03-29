<template>
  <em> {{ translatedName }} </em>
</template>

<script>
import { CARD_NAMES } from "../../const/translates";

export default {
  props: {
    name: String
  },
  computed: {
    translatedName() {
      const cardName = CARD_NAMES[this.name]
      if (!cardName) return this.name
      return cardName.en || cardName.it
    }
  }
}
</script>