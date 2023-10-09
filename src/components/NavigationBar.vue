<template>
  <nav class="nav nav-bar-identifier">
    <div class="nav2">
      <ul>
        <li>
          <router-link :to="{ name: 'Home' }">
            <div class="nav-link mdc-ripple-surface">
              <i class="material-icons">home</i>Home
            </div>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'OnlineExams' }" v-if="isAuthenticated">
            <div class="nav-link mdc-ripple-surface">
              <i class="material-icons">addchart</i>Online Exams
            </div>
          </router-link>
        </li>
        <!-- <li>
          <router-link :to="{ name: 'About' }">
            <div class="nav-link mdc-ripple-surface">
              <i class="material-icons">account_box</i>About
            </div>
          </router-link>
        </li> -->
        <li v-if="isAdmin">
          <router-link :to="{ name: 'AdminPanel' }">
            <div class="nav-link mdc-ripple-surface">
              <i class="material-icons">alternate_email</i>Admin
            </div>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Login' }" v-if="!isAuthenticated">
            <div class="nav-link mdc-ripple-surface">
              <i class="material-icons">login</i>Login
            </div>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Profile' }" v-if="isAuthenticated">
            <div class="nav-link mdc-ripple-surface">
              <i class="material-icons">sentiment_satisfied_alt</i>Profile
            </div>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'SignOut' }" v-if="isAuthenticated">
            <div class="nav-link mdc-ripple-surface">
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
.nav2 > ul > li {
  display: inline-flex;
  color: black;
}
.nav2 {
  width: 100%;
  padding: 10px;
  padding-right: 2em;
  float: right;
  text-align: right;
  justify-content: right;
}
.nav {
  background-color: white;
  font-weight: 600;
  width: 100%;
  height: 62px;
  box-shadow: 0px 4px 3px 0px lightgrey;
  overflow: hidden;
}
.nav-link:hover {
  background-color: white;
  color: rgb(184, 138, 79);
  box-shadow: 1px 2px 3px 0px lightgrey;
  transition: all 0.3s ease;
  cursor: pointer;
}
.nav-link {
  padding: 8px;
  margin-left: 2px;
  margin-right: 2px;
  border-radius: 3px;
  display: inline-flex;
  color: black;
}

.router-link-exact-active > .nav-link {
  background-color: ivory;
  color: rgb(184, 138, 79);
  box-shadow: 1px 2px 3px 0px lightgrey;
}

a:hover {
  text-decoration: none;
}
</style>
