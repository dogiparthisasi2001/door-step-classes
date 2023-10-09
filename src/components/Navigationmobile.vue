<template>
  <nav class="navigation-mobile nav-bar-identifier">
    <div class="nav1">
      <ul>
        <li v-if="isAuthenticated">
          <router-link :to="{ name: 'Profile' }">
            <div class="nav-link mdc-ripple-surface">
              <i class="material-icons">insert_emoticon</i>Profile
            </div>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Home' }">
            <div class="nav-link"><i class="material-icons">home</i>Home</div>
          </router-link>
        </li>
        <li v-if="isAuthenticated">
          <router-link :to="{ name: 'OnlineExams' }">
            <div class="nav-link">
              <i class="material-icons">addchart</i>OnlineExams
            </div>
          </router-link>
        </li>
        <!-- <li>
          <router-link :to="{ name: 'About' }">
            <div class="nav-link">
              <i class="material-icons">account_box</i>About
            </div>
          </router-link>
        </li>-->
        <li v-if="isAdmin">
          <router-link :to="{ name: 'AdminPanel' }">
            <div class="nav-link">
              <i class="material-icons">alternate_email</i>Contact Us
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="nav2">
      <ul>
        <li v-if="!isAuthenticated">
          <router-link :to="{ name: 'Login' }">
            <div class="nav-link"><i class="material-icons">login</i>Login</div>
          </router-link>
        </li>
        <li v-if="isAuthenticated">
          <router-link :to="{ name: 'SignOut' }">
            <div class="nav-link">
              <i class="material-icons">exit_to_app</i>Sign Out
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["isAuthenticated", "isAdmin"])
  }
};
</script>

<style scoped>
.nav-link {
  padding-top: 5px;
  padding-bottom: 5px;
  display: inline-flex;
  align-items: center;
  color: white;
  width: 100%;
}
.navigation-mobile {
  height: 100%;
  background-color: teal;
  position: fixed;
  overflow: hidden;
  padding: 40px 0 0 0;
  z-index: 1;
}
.nav-link :hover {
  display: block;
  text-decoration: none;
}
ul {
  list-style: none;
  width: 180px;
  padding-inline-start: 0px;
  margin-block-end: 0px;
}
li {
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
}
li:hover {
  color: rgb(107, 196, 107);
}
.router-link-exact-active > .nav-link {
  background-color: white;
  color: teal;
}
.nav2 {
  position: absolute;
  bottom: 0px;
}
a:hover {
  text-decoration: none;
  color: white;
}
</style>
