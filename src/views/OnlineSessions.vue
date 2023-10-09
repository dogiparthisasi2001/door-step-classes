<template>
  <div>
    <Cards :cardList="cardList" @card_click="cardClick"></Cards>
  </div>
</template>
<script>
import Cards from "@/components/Cards.vue";
export default {
  components: { Cards },
  data() {
    return {
      cardList: [
        {
          imageUrl: "https://image.flaticon.com/teams/slug/google.jpg",
          title: "On-going sessions",
          subTitle: null,
          description: null,
          id: "ongoingSessions",
          operations: []
        },
        {
          imageUrl: "https://image.flaticon.com/teams/slug/google.jpg",
          title: "Scheduled sessions",
          subTitle: null,
          description: null,
          id: "scheduledSessions",
          operations: []
        }
      ]
    };
  },
  methods: {
    cardClick(event) {
      if (event.cardId === "ongoingSessions") {
        this.$router.push({
          name: "SessionsInfo",
          params: { sessionType: event.id }
        });
      } else if (event.cardId === "scheduledSessions") {
        this.$router.push({
          name: "SessionsInfo",
          params: { sessionType: event.id }
        });
      }
    }
  }
};
</script>
<style scoped></style>
