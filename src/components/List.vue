<template>
  <ul class="mdc-list mdc-list--two-line">
    <li
      v-for="item in items"
      :key="item.id"
      class="mdc-list-item list-item-class"
      tabindex="0"
      @click="emitItemClicked(item.id)"
    >
      <span class="mdc-list-item__text">
        <span class="mdc-list-item__primary-text remove-margine">{{
          item.title
        }}</span>
        <span class="mdc-list-item__secondary-text" v-if="item.subTitle">{{
          item.subTitle
        }}</span>
        <span class="mdc-list-item__secondary-text" v-if="item.description">
          {{ item.description }}
        </span>
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  props: { items: { type: Array, default: () => [] } },
  methods: {
    emitItemClicked(id) {
      this.$emit("item_click", { id });
    }
  }
};
</script>

<style scoped>
.list-item-class {
  width: 70%;
  box-shadow: 1px 1px 2px 1px #9e9e9e;
  margin: 8px;
}
.remove-margine {
  margin-bottom: 0px;
}
</style>
