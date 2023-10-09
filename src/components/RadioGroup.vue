<template>
  <div>
    <label>{{ label }}</label>
    <div class="options-div" :class="{ horizontal: !isVertical }">
      <div v-for="option in options" :key="option">
        <div class="mdc-form-field">
          <div class="mdc-radio">
            <input
              type="radio"
              class="mdc-radio__native-control"
              :id="option"
              name="option"
              :value="option"
              v-model="value"
              @input="$emit('input', option)"
            />
            <div class="mdc-radio__background">
              <div class="mdc-radio__outer-circle"></div>
              <div class="mdc-radio__inner-circle"></div>
            </div>
            <div class="mdc-radio__ripple"></div>
          </div>
          <label :for="option" class="remove-margin-bottom">{{ option }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      default: null
    },
    isVertical: {
      type: Boolean,
      default: false
    },
    label: String
  }
};
</script>

<style scoped>
.remove-margin-bottom {
  margin-bottom: 0px;
}
.horizontal {
  display: inline-flex;
}
</style>
