<template>
  <div>
    <div class="options-div">
      <div class="mdc-form-field">
        <div class="mdc-checkbox">
          <input
            type="checkbox"
            class="mdc-checkbox__native-control"
            :value="value"
            :id="value + '-id'"
            :checked="isChecked"
            @input="handleInput($event)"
          />
          <div class="mdc-checkbox__background">
            <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
              <path
                class="mdc-checkbox__checkmark-path"
                fill="none"
                d="M1.73,12.91 8.1,19.28 22.79,4.59"
              />
            </svg>
            <div class="mdc-checkbox__mixedmark"></div>
          </div>
          <div class="mdc-checkbox__ripple"></div>
        </div>
        <label :for="label + '-id'" class="remove-margin-bottom">{{
          label
        }}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isChecked: { type: Boolean, default: false },
    label: String,
    value: String
  },
  data() {
    return { selectedList: this.values };
  },
  methods: {
    handleInput(event) {
      if (event.target.checked) {
        this.$emit("checked", event.target.value);
      } else {
        this.$emit("unchecked", event.target.value);
      }
    }
  }
};
</script>

<style scoped>
.options-div {
  display: inline-grid;
  justify-items: left;
}
.remove-margin-bottom {
  margin-bottom: 0px;
}
</style>
