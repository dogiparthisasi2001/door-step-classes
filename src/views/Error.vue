<template>
  <div class="container-class">
    <img src="../assets/shield.png" width="50%" v-if="error === 'invalid'" />
    <img src="../assets/block.png" width="40%" v-else />
    <div class="paragraph-text" v-if="error === 'invalid'">
      Provided College code does not exist. Please contact the institute for
      updated URL.
    </div>
    <div class="paragraph-text" v-else>
      This page is migrated. Please contact the institute for updated URL.
    </div>
  </div>
</template>
<script>
export default {
  props: ["error"],
  mounted() {
    console.log(this.error);
  }
};
</script>
<style>
.paragraph-text {
  font-size: 22px;
}
.container-class {
  width: 100%;
  display: inline-grid;
  justify-content: center;
  justify-items: center;
  padding: 32px;
}
</style>
