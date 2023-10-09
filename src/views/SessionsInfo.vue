<template>
  <div>
    <Cards :cardList="meetingList" @card_click="check"></Cards>
  </div>
</template>
<script>
import Cards from "@/components/Cards.vue";
export default {
  beforeMount() {
    if (!(this.$store.state.userData || {}).isAdmin) {
      this.$router.replace({ name: "Home" });
    }
  },
  components: { Cards },
  computed: {
    meetingList() {
      return this.$store.state.onlinesessions.meetingList;
    }
  },
  beforeCreate() {
    this.$store.dispatch("update_meeting_data", this.$route.params.sessionType);
  },
  methods: {
    check(event) {
      console.log(event);
      this.$store.dispatch("update_current_meeting_data", event.id);
      this.$router.push({ name: "Meeting" });
    }
  }
};
</script>
<style scoped></style>
