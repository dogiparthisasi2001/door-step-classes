<template>
  <div>
    <h2>JEE</h2>
    <hr />
    <li class="subject">
      <router-link :to="{ name: 'Physics' }">Physics</router-link>
    </li>
    <li class="subject">
      <router-link :to="{ name: 'Chemistry' }">Chemistry</router-link>
    </li>
    <li class="subject">
      <router-link :to="{ name: 'Maths' }">Maths</router-link>
    </li>
    <Subjects />
  </div>
</template>

<script></script>

<style scoped>
h2 {
  text-align: center;
  height: 30%;
}
.subject {
  font-weight: 900;
  font-size: larger;
  background-color: darkkhaki;
  list-style-type: none;
  text-align: center;
  margin: auto;
  width: 50%;
  border: 3px solid rgb(220, 140, 252);
  padding: 10px;
  height: 30%;
}
.subject :hover {
  background-color: ivory;
  box-shadow: 1px 2px 5px 0px lightgrey;
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
}
</style>
