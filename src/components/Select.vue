<template>
  <div class="mdc-select  mdc-select--outlined">
    <div class="mdc-select__anchor">
      <span class="mdc-select__ripple"></span>
      <span class="mdc-select__selected-text"></span>
      <span class="mdc-select__dropdown-icon"></span>
      <span class="mdc-line-ripple"></span>
      <span class="mdc-notched-outline">
        <span class="mdc-notched-outline__leading"></span>
        <span class="mdc-notched-outline__trailing"></span>
      </span>
    </div>
    <div class="mdc-select__menu mdc-menu mdc-menu-surface">
      <ul class="mdc-list">
        <li
          class="mdc-list-item"
          :data-value="item"
          v-for="item in list"
          :key="item"
        >
          <span class="mdc-list-item__ripple"></span>
          <span class="mdc-list-item__text">{{ item }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
var mdc = require("@/assets/material-components-web.min");
export default {
  props: {
    id: String,
    list: { type: Array, default: () => [] }
  },
  mounted() {
    mdc.select.MDCSelect.attachTo(this.$el);
  }
};
</script>

<style></style>
