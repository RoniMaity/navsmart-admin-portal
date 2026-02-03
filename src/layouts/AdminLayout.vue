<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> NavSmart Admin </q-toolbar-title>
        <q-btn flat round dense icon="logout" @click="logout" title="Logout" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import EssentialLink from "components/EssentialLink.vue";

const router = useRouter();
const $q = useQuasar();

const linksList = [
  {
    title: "Dashboard",
    icon: "dashboard",
    link: "/",
  },
  {
    title: "Trips",
    icon: "event",
    link: "/trips",
  },
  {
    title: "Tickets",
    icon: "receipt",
    link: "/tickets",
  },
  {
    title: "Schedules",
    icon: "schedule",
    link: "/schedules",
  },
  {
    title: "Stops",
    icon: "pin_drop",
    link: "/stops",
  },
  {
    title: "Routes",
    icon: "directions",
    link: "/routes",
  },
  {
    title: "Map",
    icon: "map",
    link: "/routes/map",
  },
  {
    title: "Vehicles",
    icon: "directions_bus",
    link: "/vehicles",
  },
  {
    title: "Users",
    icon: "person",
    link: "/users",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  $q.notify({ type: 'positive', message: 'Logged out successfully' });
  router.push('/login');
}
</script>
