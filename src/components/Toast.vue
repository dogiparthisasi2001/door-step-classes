<template>
  <div class="mdc-snackbar mdc-snackbar--leading" :id="id">
    <div class="mdc-snackbar__surface" role="status" aria-relevant="additions">
      <div class="mdc-snackbar__label" aria-atomic="false">
        {{ label }}
      </div>
      <div class="mdc-snackbar__actions" aria-atomic="true">
        <button
          type="button"
          class="mdc-button mdc-snackbar__action"
          style="color:white;"
          @click="$emit('input', false)"
        >
          <i class="material-icons">close</i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
let mdc = require("@/assets/material-components-web.min");
export default {
  props: {
    label: String,
    id: { type: String, default: "toast" },
    value: { type: Boolean, default: false }
  },
  data() {
    return {
      instance: null
    };
  },
  mounted() {
    this.instance = new mdc.snackbar.MDCSnackbar(this.$el);
  },
  watch: {
    value: function(newValue) {
      if (newValue) {
        this.instance.open();
      } else {
        this.instance.close();
      }
    }
  }
};
</script>
