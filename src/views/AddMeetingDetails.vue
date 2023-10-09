<template>
  <div class="container-class">
    <h2>Add Meeting Data</h2>
    <hr />
    <h5 v-if="notificationText">{{ notificationText }}</h5>
    <form>
      <BaseInput
        type="text"
        label="Meeting Id"
        id="meeting-id"
        v-model="meetingId"
        :value="meetingId"
      />
      <BaseInput
        type="text"
        label="Password"
        id="meeting-password"
        v-model="password"
        :value="password"
      />
      <BaseInput
        type="text"
        label="Meeting Topic"
        id="meeting-topic"
        v-model="topic"
        :value="topic"
      />
      <BaseInput
        type="text"
        label="Title"
        id="title"
        v-model="title"
        :value="title"
      />
      <BaseInput
        type="text"
        label="Description"
        id="description"
        v-model="description"
        :value="description"
      />
      <BaseInput
        type="date"
        label="Date"
        id="date"
        v-model="date"
        :value="date"
      />

      <BaseInput
        type="time"
        label="Start Time"
        id="start-time"
        v-model="startTime"
        :value="startTime"
      />
      <BaseInput
        type="time"
        label="End Time"
        id="end-time"
        v-model="endTime"
        :value="endTime"
      />
      <BaseButton
        id="add-meeting"
        label="Add Meeting"
        @on_action="addMeeting"
      />
    </form>
  </div>
</template>

<script>
import firebaseUtils from "@/services/FirebaseUtils.js";
export default {
  data() {
    return {
      meetingId: "",
      password: "",
      topic: "",
      title: "",
      description: "",
      date: "",
      startTime: "",
      endTime: "",
      notificationText: null
    };
  },
  beforeMount() {
    if (!(this.$store.state.userData || {}).isAdmin) {
      this.$router.replace({ name: "Home" });
    }
  },
  methods: {
    addMeeting() {
      this.errorText = null;
      const meetingData = {
        meetingId: this.meetingId,
        password: this.password,
        topic: this.topic,
        title: this.title,
        description: this.description,
        date: this.date,
        startTime: this.startTime,
        endTime: this.endTime
      };
      firebaseUtils
        .firestore()
        .collection("meeting_info")
        .doc(meetingData.meetingId)
        .set(meetingData)
        .then(() => {
          this.notificationText = "Meeting added Successfully";
          this.resetData();
          setTimeout(() => {
            this.notificationText = null;
          }, 2000);
        });
    },
    resetData() {
      this.meetingId = "";
      this.password = "";
      this.topic = "";
      this.title = "";
      this.description = "";
      this.date = "";
      this.startTime = "";
      this.endTime = "";
    }
  }
};
</script>

<style scoped>
.container-class {
  width: 100%;
  text-align: center;
}
</style>
