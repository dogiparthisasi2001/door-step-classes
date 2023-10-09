<template>
  <div :id="id" class="slideshow">
    <div v-if="currentIndex !== null">
      <img :src="imageSrc" :alt="imageAltText" width="100%" height="400" />
    </div>
    <div class="dot-parent">
      <div v-for="(image, index) in images" :key="index" class>
        <span
          :class="['dot', index === currentIndex ? 'active' : '']"
          @click="changeImage(index)"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ""
    },
    images: {
      type: Array,
      default: () => []
    }
  },
  data: () => {
    return { imageSrc: "", imageAltText: "", currentIndex: null };
  },
  mounted() {
    if (this.images.length !== 0) {
      this.changeImage(0);
    }
  },
  methods: {
    changeImage(index) {
      this.currentIndex = index;
      this.imageSrc = this.images[index].imageSrc;
      this.imageAltText = this.images[index].imageAltText;
    }
  }
};
</script>

<style scoped>
.slideshow {
  max-width: 1000px;
  position: 0;
  margin: auto;
}
.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 100%;
  display: inline-block;
  transition: background-color 0.6s ease;
}
.active,
.dot:hover {
  background-color: #717171;
}
.dot-parent {
  display: inline-flex;
  justify-content: center;
  width: 100%;
}
</style>
