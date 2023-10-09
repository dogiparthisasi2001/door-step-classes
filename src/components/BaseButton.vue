<template>
  <div
    class="mdc-button mdc-button--raised margin-bottom"
    @click.prevent="$emit('on_action', $event)"
    :id="id"
    tabindex="0"
  >
    <div class="mdc-button__ripple"></div>
    <i class="material-icons" aria-hidden="true" v-if="icon">
      {{ icon }}
    </i>
    <span class="mdc-button__label">{{ label }}</span>
  </div>
</template>

<script>
var mdc = require("@/assets/material-components-web.min");
export default {
  props: {
    id: String,
    label: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: null
    }
  },
  mounted() {
    mdc.ripple.MDCRipple.attachTo(this.$el);
  }
};
</script>

<style scoped>
.margin-bottom {
  margin-bottom: 8px;
}
</style>
