<template>
  <div class="card-parent-default">
    <div
      class="mdc-card card-default"
      v-for="cardData in cardList"
      :key="cardData.id"
      @click="emitCardClick($event, cardData.id)"
    >
      <div
        class="mdc-card__media mdc-card__media--16-9"
        :style="{
          background: `url(${cardData.imageUrl})`
        }"
        v-if="cardData.imageUrl"
      ></div>
      <div class="card-text-default">
        <div class="mdc-card-wrapper__text-section">
          <div class="mdc-typography--headline5">{{ cardData.title }}</div>
          <div class="mdc-typography--caption" v-show="cardData.subTitle">
            {{ cardData.subTitle }}
          </div>
        </div>
        <div
          class="mdc-card-wrapper__text-section"
          v-show="cardData.description"
        >
          <div class="mdc-typography--subtitle1">
            {{ cardData.description }}
          </div>
        </div>
        <div
          class="mdc-card__actions"
          v-for="operation in cardData.operations"
          :key="operation.id"
        >
          <button
            class="mdc-button mdc-card__action mdc-card__action--button mdc-ripple-upgraded"
            @click="emitCardAction($event, cardData.id, operation.id)"
          >
            <span class="mdc-button__label">{{ operation.label }}</span>
            <div class="mdc-button__ripple"></div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    emitCardAction(event, cardId, actionId) {
      this.$emit("card_action_click", { id: cardId, actionId: actionId });
    },
    emitCardClick(event, cardId) {
      this.$emit("card_click", { id: cardId });
    }
  }
};
</script>

<style scoped>
.card-parent-default {
  display: inline-flex;
  padding: 8px;
}
.card-default {
  width: 280px;
  height: 300px;
  margin: 8px;
}
.card-default:hover {
  box-shadow: 3px 3px 4px 3px #9e9e9e;
  transition: all 0.2s ease-in;
}
.card-text-default {
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 8px;
}
</style>
