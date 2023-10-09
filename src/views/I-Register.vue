<template>
  <div class="container-class">
    <h2>SignUp</h2>
    <h5 v-if="errorText" class="error-class">{{ errorText }}</h5>
    <form @submit.prevent="registerUser">
      <BaseInput
        type="text"
        label="Inistitute Name"
        inputType="underlined"
        id="Inistitute-name"
        labelPosition="legend"
        v-model="InistituteName"
        :required="true"
      />
      <BaseInput
        type="text"
        label="Inistitute Code"
        inputType="underlined"
        id="InistituteCode"
        labelPosition="legend"
        v-model="InistituteCode"
        :required="true"
      />
      <!-- <BaseInput
        type="date"
        label="Established Date"
        inputType="underlined"
        id="Established-date"
        labelPosition="legend"
        v-model="Establisheddate"
        :required="true"
      /> -->
      <BaseInput
        type="tel"
        label="Inistitute Contact Number"
        inputType="underlined"
        id="mobile-number"
        labelPosition="legend"
        v-model="mobileNumber"
        :required="true"
      />
      <BaseInput
        label="Inistitute email"
        inputType="underlined"
        id="email"
        labelPosition="legend"
        v-model="emailAddress"
      />
      <BaseInput
        type="text"
        label="College Code"
        inputType="underlined"
        id="college-code"
        labelPosition="legend"
        v-model="collegeCode"
        :required="true"
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
export default {};
</script>

<style scoped>
.container-class {
  width: 100%;
  display: inline-grid;
  justify-content: center;
  justify-items: center;
  text-align: center;
}
.error-class {
  color: var(--error-text-color);
}
</style>
