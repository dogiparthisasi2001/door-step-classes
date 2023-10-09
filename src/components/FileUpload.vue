<template>
  <div>
    <div>
      <input type="file" @change="previewImage" />
    </div>
    <div>
      <p>
        Progress: {{ uploadValue.toFixed() + "%" }}
        <progress id="progress" :value="uploadValue" max="100"></progress>
      </p>
    </div>
    <div v-if="imageData != null" class="upload-parent">
      <img class="preview" :src="picture" v-if="picture" />
      <br />
      <BaseButton label="Upload" @on_action="onUpload"></BaseButton>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";

export default {
  name: "Upload",
  data() {
    return {
      imageData: null,
      picture: null,
      uploadValue: 0
    };
  },
  methods: {
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },
    onUpload() {
      this.picture = null;
      const storageRef = firebase
        .storage()
        .ref(`questions/${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        snapshot => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        error => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          this.$emit("file_uploaded", `questions/${this.imageData.name}`);
          storageRef.snapshot.ref.getDownloadURL().then(url => {
            this.picture = url;
          });
        }
      );
    }
  }
};
</script>
<style scoped="">
img.preview {
  width: 100px;
}
.upload-parent {
  display: inline-flex;
  align-items: center;
}
</style>
