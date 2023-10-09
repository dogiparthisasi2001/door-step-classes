<template>
  <transition name="fade">
    <div class="modal-parent" v-if="value">
      <div :id="id + '-parent'" class="model-inner-parent">
        <div
          :id="id + '-header-container'"
          v-if="header"
          class="mdc-typography--headline5 modal-header-container"
        >
          <!-- <i class="material-icons modal-header-confirmation-icon" v-if="modalType==='confirmation'" >info</i>
        <i class="material-icons modal-header-error-icon" v-if="modalType==='error'">cancel</i> -->
          {{ header }}
        </div>
        <hr v-if="header" />
        <div
          :id="id + '-content-container'"
          class="modal-content-container mdc-typography--body1"
        >
          {{ message }}
        </div>
        <div :id="id + '-footer-container'" class="modal-footer-container">
          <BaseButton
            :id="id + '-cancel-button'"
            label="Cancel"
            v-if="showCancel"
            @on_action="onCancelClick"
          />
          <BaseButton
            :id="id + '-ok-button'"
            label="Ok"
            v-if="showOk"
            @on_action="onOkClick"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    message: { type: String, default: "Do you want to confirm the action?" },
    header: { type: String, default: "Confirmation" },
    id: { type: String, default: "modal" },
    showCancel: { type: Boolean, default: true },
    showOk: { type: Boolean, default: true },
    modalType: { type: String, default: "confirmation" },
    value: { type: Boolean, default: false }
  },
  methods: {
    onCancelClick() {
      this.$emit("on_cancel", event);
      this.$emit("input", false);
      this.showModal = false;
    },
    onOkClick() {
      this.$emit("on_ok", event);
      this.$emit("input", false);
      this.showModal = false;
    }
  }
};
</script>

<style scoped>
.modal-parent {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 4;
  background-color: #4a4a4acc;
  opacity: 1;
  display: table-cell;
  vertical-align: middle;
  justify-content: center;
}
.model-inner-parent {
  width: 50%;
  height: 50%;
  border: 1px solid #1f1f1f;
  box-shadow: 3px 3px 3px 1px #3c3c3c;
  border-radius: 4px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
  background-color: var(--primary-surface-color);
}
.modal-header-container {
  margin-top: 8px;
  margin-left: 16px;
  margin-bottom: -4px;
}
.modal-header-confirmation-icon {
  color: #007eff;
  font-size: 26px;
}
.modal-header-error-icon {
  color: red;
  font-size: 26px;
}
.modal-content-container {
  padding: 16px;
}
.modal-footer-container {
  float: right;
  padding-right: 16px;
  padding-bottom: 8px;
  position: absolute;
  bottom: 0;
  right: 0;
}
.modal-footer-container > * {
  margin-left: 6px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
