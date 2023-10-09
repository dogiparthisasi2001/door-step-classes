<template>
  <ul class="">
    <li
      v-for="item in items"
      :key="item.id"
      class="mdc-ripple-surface list-item-class"
      tabindex="0"
      @click="emitItemClicked(item.id)"
    >
      <div class="exam-list-title">
        <div class="exam-list-status-icon">
          <i
            class="material-icons"
            v-if="item.status === 'notSubmitted'"
            style="color: gray;"
            title="Not attended"
          >
            schedule
          </i>
          <i
            class="material-icons"
            v-if="item.status === 'reconducting'"
            style="color: blue;"
            title="Re-write"
          >
            settings_backup_restore
          </i>
          <i
            class="material-icons"
            v-if="item.status === 'submitted'"
            style="color: green;"
            title="Submitted"
          >
            check_circle_outline
          </i>
        </div>
        <div style="width: 100%;">{{ item.title }}</div>
        <div class="exam-list-status-icon exam-list-syllabus-icon-div">
          <i
            class="material-icons exam-list-syllabus-icon"
            title="Show syllabus"
            v-if="currentItemId === item.id"
            @click="toggleSyllabus(item.id, $event)"
          >
            remove
          </i>
          <i
            class="material-icons exam-list-syllabus-icon"
            title="Show syllabus"
            v-else
            @click="toggleSyllabus(item.id, $event)"
          >
            add
          </i>
        </div>
      </div>
      <div v-if="currentItemId === item.id" class="syllabus-parent-div">
        <div
          v-for="subject in Object.keys(
            (item.examData || {}).syllabusData || {}
          )"
          :key="subject"
          class="syllabus-div"
        >
          <div v-html="item.examData.syllabusData[subject]" />
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: { items: { type: Array, default: () => [] } },
  data() {
    return { toggleIndex: {}, currentItemId: null };
  },
  methods: {
    emitItemClicked(id) {
      this.$emit("item_click", { id });
    },
    toggleSyllabus(id, event) {
      event.stopPropagation();
      if (this.currentItemId === id) this.currentItemId = null;
      else this.currentItemId = id;
    }
  }
};
</script>

<style scoped>
.list-item-class {
  width: 90%;
  box-shadow: 1px 1px 2px 1px #9e9e9e;
  margin: 8px;
  padding: 10px;
  cursor: pointer;
}
.exam-list-title {
  font-size: 20px;
  display: inline-flex;
  width: 100%;
}
.exam-list-status-icon {
  margin-top: 4px;
  padding-right: 8px;
}
.exam-list-syllabus-icon-div {
  width: -webkit-fill-available;
  z-index: 3;
}
.exam-list-syllabus-icon {
  float: right;
  color: gray;
}
.exam-list-syllabus-icon:hover {
  box-shadow: 1px 1px 2px 1px #9e9e9e;
  border-radius: 50%;
}
.syllabus-parent-div {
  padding: 8px;
  display: inline-flex;
}
.syllabus-div {
  padding: 8px;
}
</style>
