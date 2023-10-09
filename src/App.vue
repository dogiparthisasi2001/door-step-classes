<template>
  <div id="app" style="height: 100%;">
    <transition name="fade">
      <Navigationmobile v-show="shownav" v-if="mobileview" />
    </transition>
    <div
      class="nav-bar nav-bar-identifier"
      :class="{ 'fill-width': !mobileview }"
    >
      <div class="icon">
        <div
          id="navigation-icon"
          v-if="mobileview"
          :class="{ open: shownav }"
          @click="shownav = !shownav"
        >
          <i class="material-icons">menu</i>
        </div>
        <NavigationBar v-else />
      </div>
    </div>

    <div
      id="router-view"
      :class="{
        'router-view-margin-mobile': mobileview,
        'router-view-margin-desktop': !mobileview
      }"
    >
      <transition name="slide-fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>
<script>
import NavigationBar from "@/components/NavigationBar.vue";
import Navigationmobile from "@/components/Navigationmobile.vue";
// import firebaseUtils from "@/services/FirebaseUtils.js";
export default {
  data: () => {
    return {
      mobileview: true,
      shownav: false
    };
  },
  watch: {
    $route() {
      this.shownav = false;
    }
  },
  methods: {
    handleview() {
      this.mobileview = window.innerWidth <= 800;
    }
  },
  components: {
    NavigationBar,
    Navigationmobile
  },
  created() {
    this.handleview();
    window.addEventListener("resize", this.handleview);
  }
};
</script>
<style scoped>
#app {
  height: 100%;
}
.nav-bar {
  position: fixed;
  z-index: 3;
  width: 100%;
  height: 40px;
  background-color: white;
  /* box-shadow: 0px 4px 3px 0px lightgrey; */
}
/* .nav-bar:active {
  background-color: wheat;
} */
.fill-width {
  width: 100%;
}
#router-view {
  height: 100%;
  position: static;
  padding-top: 20px;
  background-color: var(--primary-surface-color);
}
.open {
  transform: all 0.5s cubic-bezier(0.68, 0.83, 0.76, 0.9);
}
.router-view-margin-mobile {
  padding-top: 49px !important;
}
.router-view-margin-desktop {
  padding-top: 68px !important;
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  opacity: 0;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
  opacity: 1;
  transition: all 0.2s ease;
}
#navigation-icon {
  padding: 10px;
  cursor: pointer;
}
.fade-leave-active,
.fade-enter {
  transform: translateX(-200px);
}

.fade-enter-active {
  transition: all 0.5s ease;
}
.fade-leave-to {
  transform: translateX(-200px);
}
.slide-fade-enter {
  transform: translateX(100px);
  opacity: 0;
}
.slide-fade-leave-active,
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave {
  transform: translateX(-100px);
  opacity: 0;
}
#navigation-icon:hover:before {
  transform: translateY(12px) rotate(135deg);
}

#navigation-icon:hover:after {
  transform: translateY(-12px) rotate(-135deg);
}
</style>
