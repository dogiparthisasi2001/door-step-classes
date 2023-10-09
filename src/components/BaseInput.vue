<template>
  <div>
    <label
      :id="id + '-text-input-parent'"
      class="input-parent"
      :class="[textFieldDefaultClass]"
    >
      <i
        v-if="helperLeadingIcon"
        :id="id + '-helper-leading-icon'"
        class="material-icons mdc-text-field__icon mdc-text-field__icon--leading"
        >{{ helperLeadingIcon }}</i
      >
      <input
        :id="id + '-input'"
        :type="type"
        :aria-labelledby="id + '-label'"
        :aria-controls="id + '-helper-text'"
        :aria-describedby="id + '-helper-text'"
        @input="$emit('input', $event.target.value)"
        :placeholder="hint"
        :disabled="disabled"
        :required="required"
        class="mdc-text-field__input"
        :maxlength="maxLength"
        :value="value"
        autocomplete="off"
      />
      <i
        v-if="helperTrailingIcon"
        :id="id + '-helper-trailing-icon'"
        class="material-icons mdc-text-field__icon mdc-text-field__icon--trailing"
        >{{ helperTrailingIcon }}</i
      >
      <span
        :id="id + '-outlined-parent'"
        v-if="inputType === 'outlined'"
        class="mdc-notched-outline"
      >
        <span
          :id="id + '-outlined-leading'"
          class="mdc-notched-outline__leading"
        ></span>
        <span
          :id="id + '-outlined-notch'"
          class="mdc-notched-outline__notch"
          v-if="labelPosition === 'legend'"
        >
          <span class="mdc-floating-label" :id="id + '-label'">
            {{ label }}
          </span>
        </span>
        <span class="mdc-notched-outline__trailing"></span>
      </span>
      <span
        v-else-if="labelPosition === 'legend'"
        :class="'mdc-floating-label'"
        :id="id + '-label'"
        >{{ label }}</span
      >
      <span
        v-if="inputType === 'underlined'"
        :id="id + '-underlined'"
        class="mdc-line-ripple"
      ></span>
    </label>
    <div
      :id="id + '-helper-parent'"
      class="mdc-text-field-helper-line helper-text-content"
    >
      <div
        v-if="helperText"
        :id="id + '-helper-text'"
        class="mdc-text-field-helper-text nn-helper-text"
        aria-hidden="true"
      >
        {{ helperText }}
      </div>
      <div
        :id="id + '-char-counted'"
        v-if="useCharCounter"
        class="mdc-text-field-character-counter"
      ></div>
    </div>
  </div>
</template>
<script>
var mdc = require("@/assets/material-components-web.min");

export default {
  props: {
    label: String,
    id: String,
    inputType: {
      type: String,
      default: "underlined"
    },
    value: String,
    hint: String,
    type: { type: String, default: "text" },
    required: Boolean,
    maxLength: String,
    disabled: String,
    helperText: String,
    labelPosition: { type: String, default: "legend" },
    helperLeadingIcon: String,
    helperTrailingIcon: String,
    useCharCounter: String
  },
  data() {
    return {
      textFieldDefaultClass: this.textFieldClassList()
    };
  },
  mounted() {
    mdc.textField.MDCTextField.attachTo(this.$el);
  },
  methods: {
    onInput(event) {
      this.$emit("input", event.target.value);
    },
    isRequired() {
      return this.required ? JSON.parse(this.required) : false;
    },
    textFieldClassList() {
      let classList = [];
      classList.push("mdc-text-field");
      if (this.inputType === "filled" || this.inputType === "underlined") {
        classList.push("mdc-text-field--filled");
      } else {
        classList.push("mdc-text-field--outlined");
      }
      if (this.disabled) {
        classList.push("mdc-text-field--disabled");
      }
      if (this.helperLeadingIcon) {
        classList.push("mdc-text-field--with-leading-icon");
      }
      if (this.helperTrailingIcon) {
        classList.push("mdc-text-field--with-trailing-icon");
      }
      return classList;
    }
  }
};
</script>
<style scoped>
.required {
  color: red;
}
.input-parent {
  width: 300px;
}
</style>
