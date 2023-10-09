<template>
  <div class="container-class">
    <Loading id="registering" :label="loadLabel" v-if="loading" />
    <h3>{{ collegeName }}</h3>
    <h4>Sign Up</h4>
    <h5 v-if="errorText" class="error-class">{{ errorText }}</h5>
    <form class="form-container-class">
      <BaseInput
        type="text"
        label="First Name"
        inputType="underlined"
        id="first-name"
        labelPosition="legend"
        v-model="firstName"
        :required="true"
      />
      <BaseInput
        type="text"
        label="Last Name"
        inputType="underlined"
        id="last-name"
        labelPosition="legend"
        v-model="lastName"
        :required="true"
      />
      <RadioGroup
        label="Gender:"
        :options="['Male', 'Female', 'Other']"
        v-model="gender"
        :required="true"
      />
      <BaseInput
        type="date"
        label="Date Of Birth"
        inputType="underlined"
        id="date-of-birth"
        labelPosition="legend"
        v-model="dateOfBirth"
        :required="true"
      />
      <BaseInput
        type="tel"
        label="Mobile Number"
        inputType="underlined"
        id="mobile-number"
        labelPosition="legend"
        v-model="mobileNumber"
        :required="true"
      />
      <BaseInput
        type="email"
        label="Email Address"
        inputType="underlined"
        id="email"
        labelPosition="legend"
        v-model="emailAddress"
      />
      <BaseInput
        type="password"
        label="Password"
        inputType="underlined"
        id="password"
        labelPosition="legend"
        v-model="password"
        :required="true"
      />
      <BaseInput
        type="password"
        label="Re-enter Password"
        inputType="underlined"
        id="re-enter-password"
        labelPosition="legend"
        v-model="repeatPassword"
        :required="true"
      />
      <BaseButton label="Register" @on_action="registerUser"></BaseButton>
    </form>
  </div>
</template>

<script>
import firebaseUtils from "@/services/FirebaseUtils.js";
import RadioGroup from "@/components/RadioGroup.vue";
import Loading from "@/components/Loading.vue";
export default {
  components: { RadioGroup, Loading },
  data() {
    return {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
      repeatPassword: "",
      mobileNumber: "",
      errorText: null,
      gender: null,
      dateOfBirth: null,
      collegeCode: "",
      collegeName: "",
      loading: true,
      loadLabel: "Loading..."
    };
  },
  mounted() {
    firebaseUtils
      .firestore()
      .collection("institution_data")
      .doc(this.$route.query.collegeCode)
      .get()
      .then(doc => {
        this.collegeCode = doc.data().collegeCode;
        this.collegeName = doc.data().collegeName || "";
        this.loading = false;
      });
  },
  methods: {
    registerUser() {
      this.errorText = null;
      this.loadLabel = "Registering...";
      this.loading = true;
      let emptyCheckData = [
        this.firstName,
        this.lastName,
        this.gender,
        this.emailAddress,
        this.mobileNumber,
        this.password
      ];
      if (
        emptyCheckData.indexOf("") != -1 ||
        emptyCheckData.indexOf(null) != -1
      ) {
        this.errorText = "Please fill the required fields";
        this.loading = false;
      } else {
        if (this.password === this.repeatPassword) {
          const registerUserData = {
            firstName: this.firstName,
            lastName: this.lastName,
            emailAddress: this.emailAddress.trim(),
            password: this.password,
            mobileNumber: this.mobileNumber.trim(),
            userName: this.firstName + " " + this.lastName,
            gender: this.gender,
            dateOfBirth: this.dateOfBirth,
            collegeCode: this.collegeCode
          };
          firebaseUtils
            .auth()
            .createUserWithEmailAndPassword(
              registerUserData.emailAddress,
              registerUserData.password
            )
            .then(() => {
              firebaseUtils.auth().signOut();
              firebaseUtils
                .firestore()
                .collection("users_info")
                .doc(registerUserData.emailAddress)
                .set(registerUserData)
                .then(() => {
                  this.loading = false;
                  this.$router.push({ name: "Login" });
                });
            })
            .catch(err => {
              this.loading = false;
              this.errorText = err.message;
            });
        } else {
          this.loading = false;
          this.errorText = "Password doesn't match";
        }
      }
    }
  }
};
</script>

<style scoped>
.container-class {
  width: 100%;
  display: inline-grid;
  justify-content: center;
  justify-items: center;
}
.form-container-class {
  width: 100%;
  display: inline-grid;
  justify-content: center;
  justify-items: center;
}
.error-class {
  color: var(--error-text-color);
}
</style>
