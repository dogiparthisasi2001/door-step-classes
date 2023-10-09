<template>
  <div class="loading-parent">
    <div :id="id + '-parent'" class="progress-parent">
      <div :id="id + '-fiele-name'" class="mdc-typography--headline5">
        {{ label }}
      </div>
      <div
        :id="id + '-bar-parent'"
        role="progressbar"
        class="mdc-linear-progress"
        :aria-label="label"
      >
        <div :id="id + '-buffer'" class="mdc-linear-progress__buffering-dots" />
        <div
          :id="id + '-buffer-background'"
          class="mdc-linear-progress__buffer"
        />
        <div
          :id="id + '-primary-bar'"
          class="mdc-linear-progress__bar mdc-linear-progress__primary-bar"
        >
          <span
            :id="id + '-primary-bar-span'"
            class="mdc-linear-progress__bar-inner"
          ></span>
        </div>
        <div
          :id="id + '-secondary-bar'"
          class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar"
        >
          <span
            :id="id + '-secondary-bar-span'"
            class="mdc-linear-progress__bar-inner"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let mdc = require("@/assets/material-components-web.min");
export default {
  props: {
    label: String,
    id: { type: String, default: "check" }
  },
  mounted() {
    let instance = new mdc.linearProgress.MDCLinearProgress(this.$el);
    instance.determinate = false;
  }
};
</script>

<style scoped>
.loading-parent {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 4;
  background-color: var(--primary-surface-color);
  opacity: 0.9;
  display: table-cell;
  vertical-align: middle;
  justify-content: center;
}
.progress-parent {
  width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
