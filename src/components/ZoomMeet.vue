<template>
  <div></div>
</template>

<script>
import zoomConfig from "@/services/ZoomConfig.js";
let interval = null;
export default {
  beforeDestroy() {
    if (interval != null) {
      clearInterval(interval);
    }
    document.getElementById("zmmtg-root").style.display = "none";
    document
      .getElementsByClassName("nav-bar-identifier")
      .forEach(el => (el.style.display = ""));
  },
  beforeCreate() {
    document.getElementById("zmmtg-root").style.display = "";
  },
  mounted() {
    const meetConfig = zoomConfig.meetConfig(
      this.$store.state.userData.firstName +
        " " +
        this.$store.state.userData.lastName,
      this.$store.state.userData.emailAddress,
      this.$store.state.onlinesessions.currentMeetingData.meetingId,
      this.$store.state.onlinesessions.currentMeetingData.password
    );
    this.$store.dispatch("clear_current_meeting_data");
    const ZoomMtg = zoomConfig.ZoomMtg;
    const signature = ZoomMtg.generateSignature({
      meetingNumber: meetConfig.meetingNumber,
      apiKey: meetConfig.apiKey,
      apiSecret: meetConfig.apiSecret,
      role: meetConfig.role,
      success: () => {
        console.log("Signature generated");
      }
    });

    ZoomMtg.init({
      leaveUrl: meetConfig.leaveUrl,
      isSupportAV: true,
      videoDrag: false,
      success: () => {
        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetConfig.meetingNumber,
          userName: meetConfig.userName,
          passWord: meetConfig.password,
          apiKey: meetConfig.apiKey,
          userEmail: meetConfig.userEmail,
          success: res => {
            ZoomMtg.showInviteFunction({
              show: false
            });
            ZoomMtg.showMeetingHeader({
              show: false
            });
            interval = setInterval(() => {
              if (
                document.getElementsByClassName(
                  "meeting-info-icon__icon-wrap"
                )[0]
              ) {
                document
                  .getElementsByClassName("meeting-info-icon__icon-wrap")[0]
                  .remove();
                clearInterval(interval);
              }
            }, 100);
            document
              .getElementsByClassName("nav-bar-identifier")
              .forEach(el => (el.style.display = "none"));
            console.log("join meeting success" + res);
          },
          error: res => {
            // eslint-disable-next-line
            console.log(res);
          }
        });
      },
      error: res => {
        console.log(res);
      }
    });
  }
};
</script>
<style scoped>
@import "https://source.zoom.us/1.7.9/css/react-select.css";
@import "https://source.zoom.us/1.7.9/css/bootstrap.css";
</style>
