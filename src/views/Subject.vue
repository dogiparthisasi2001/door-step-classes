<template>
  <div class="Programme">
    <div v-for="index in 90" :key="index" class="day">
      <p>Day{{ index }}</p>
      <button id="subjbtn">learn</button>
      <button id="subjbtn">practice</button>
      <button id="subjbtn">errors</button>
      <button id="subjbtn">Doubt Box</button>
      <button id="subjbtn">Error test</button>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
#subjbtn :hover {
  background-color: rgb(89, 240, 240);
  box-shadow: 1px 2px 5px 0px rgb(82, 72, 83);
  transition: all 0.3s ease;
  cursor: pointer;
}
</style>
