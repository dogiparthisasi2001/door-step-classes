<template>
  <div>
    <div class="container">
      <slide-show id="slide-show" :images="images" />
    </div>
    <div class="about-div">
      <h3>Vision</h3>
      <p>
        The Current scenario is drastically changing the education-system and
        that too at an alarming fast rate. It is in a transforming state from
        offline to online it is the conventined modes.
      </p>
      <p>
        students see themselves as smart hardworking and even more innovative
        than past generations. they are also native technology users which gives
        them the competitive edge for thriving in a future work force that
        relies increasingly on technology.
      </p>
      <p>
        But as educators, all of us seeking to prepare students for their future
        cannot afford overlook the value of creativity. That where we step
        in.... our Team focuses on Blended Learning. We predominantly focus on
        making studies emphasize.
      </p>
    </div>
  </div>
</template>
<script>
import slideShow from "@/components/SlideShow.vue";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: { slideShow },
  computed: { ...mapState(["isAuthenticated", "quotes", "images"]) },
  methods: {
    navigateTo(pageName) {
      this.$router.push({ name: pageName });
    }
  }
};
</script>
<style scoped>
.container {
  width: 100%;
}
.about-div > p {
  margin: 0 20px 20px 20px;
  height: auto;
  font-style: oblique;
  font-size: x-large;
  font-family: "Times New Roman", Times, serif;
  word-break: keep-all;
}
h3 {
  font-style: oblique;
  text-decoration: underline;
  font-family: "Times New Roman", Times, serif;
}
.about-div {
  margin: auto;
  background-color: whitesmoke;
  color: rgb(184, 138, 79);
  box-shadow: 3px solid burlywood;
  text-transform: capitalize;
  padding: 15px;
  width: 90%;
  text-align: center;
  justify-content: center;
}
</style>
