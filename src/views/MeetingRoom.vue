<template>
  <div>
    <ZoomMeet></ZoomMeet>
  </div>
</template>
<script>
import ZoomMeet from "@/components/ZoomMeet.vue";
export default {
  beforeMount() {
    if (!(this.$store.state.userData || {}).isAdmin) {
      this.$router.replace({ name: "Home" });
    }
  },
  components: { ZoomMeet },
  beforeCreate() {
    if (!this.$store.state.onlinesessions.currentMeetingData.meetingId) {
      this.$router.replace({ name: "Home" });
    }
  }
};
</script>
<style scoped></style>
