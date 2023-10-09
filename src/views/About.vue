<template>
  <div>
    <CheckboxGroup :options="options" :values="['val1']" />
    <RadioGroup :options="options" v-model="value" :isVertical="true" />
    <FileUpload />
  </div>
</template>

<script>
import CheckboxGroup from "@/components/CheckboxGroup.vue";
import RadioGroup from "@/components/RadioGroup.vue";
import FileUpload from "@/components/FileUpload.vue";
export default {
  components: { CheckboxGroup, RadioGroup, FileUpload },
  data() {
    return {
      options: ["val1", "val2"],
      value: "val2"
    };
  }
};
</script>

<style scoped></style>
