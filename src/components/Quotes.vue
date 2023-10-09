<template>
  <div class="quotes">
    <div v-for="quoteData in quotes" :key="quoteData.id">
      <img
        :src="quoteData.quoteImage"
        :alt="quoteData.imageAltText"
        width="30%"
        height="30%"
      />
      <p>
        {{ quoteData.quoteText }}
        <br />
        {{ quoteData.quoteBy }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    quotes: { type: Array, default: () => [] }
  }
};
</script>

<style>
.quotes p {
  border: 2px solid black;
  outline: #4caf50 solid 10px;
  margin: auto;
  padding: 20px;
}
</style>
