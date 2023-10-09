<template>
  <label class="label">{{ timerLabel }}</label>
</template>

<script>
export default {
  props: ["duration"],
  data() {
    return {
      timerLabel: getTimerLabel(this.duration * 60 * 1000),
      totalTime: this.duration * 60 * 1000
    };
  },
  mounted() {
    let timeLeft = this.totalTime;
    const timer = setInterval(() => {
      this.timerLabel = getTimerLabel(timeLeft);
      timeLeft = timeLeft - 1000;
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      this.$emit("timer_ended");
    }, this.totalTime);
  }
};

const getTimerLabel = function(timeLeft) {
  var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  var label = "";
  if (hours < 10 && hours > 0) {
    label = "0" + hours + ":";
  } else if (hours !== 0) {
    label = hours + ":";
  }
  if (minutes < 10) {
    label = label + "0" + minutes + ":";
  } else {
    label = label + minutes + ":";
  }
  if (seconds < 10) {
    label = label + "0" + seconds;
  } else {
    label = label + seconds;
  }
  return label;
};
</script>

<style scoped></style>
