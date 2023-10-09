<template>
  <Cards :cardList="meetingList" @card_click="check"></Cards>
</template>

<script>
import Cards from "@/components/Cards.vue";
export default {
  components: { Cards },
  computed: {
    meetingList() {
      return this.$store.state.onlinesessions.meetingList;
    }
  },
  beforeCreate() {
    this.$store.dispatch("update_exam_data", this.$route.params.sessionType);
  },
  methods: {
    check(event) {
      console.log(event);
      this.$store.dispatch("update_current_meeting_data", event.cardId);
      this.$router.push({ name: "Meeting" });
    }
  }
};
</script>

<style></style>
