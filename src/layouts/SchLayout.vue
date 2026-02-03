<template>
  <q-layout view="hHh Lpr lFf" style="background-color: #1e1e2f;">
    <!-- Drawer -->
    <q-drawer v-model="drawerOpen" show-if-above behavior="desktop" elevated>
      <q-list style="background-color: #1e1e2f; color: #ffffff;">
        <!-- App Logo Section -->
        <div class="column items-center q-pa-md text-center">
          <q-item-label class="text-h6 q-mt-sm">NavSmart</q-item-label>
          <q-item-label class="q-mt-xs text-positive" style="font-size: 12px; background: lime; border-radius: 4px; padding: 2px 8px;">
            PRO
          </q-item-label>
          <q-img
            src="/src/assets/bus_logo.png"
            alt="NavSmart Logo"
            style=" height: 70%; border-radius: 50%;"
          />
        </div>
        <q-separator spaced />

        <!-- Navigation -->
        <q-item clickable v-ripple to="/schedularDashboard" class="text-white">
              <q-item-section avatar>
              <q-icon name="person" color="lime" />
              </q-item-section>
              <q-item-section>Dashboard</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/schedularAssignCrew" class="text-white">
          <q-item-section avatar>
            <q-icon name="assignment_add" color="lime" />
          </q-item-section>
          <q-item-section>Crew Assign</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/schedularAvailableCrew" class="text-white">
              <q-item-section avatar>
              <q-icon name="event_available" color="lime" />
              </q-item-section>
              <q-item-section>Available Crew</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/Sch_Crew_Details" class="text-white">
              <q-item-section avatar>
              <q-icon name="info" color="lime" />
              </q-item-section>
              <q-item-section>Crew Details</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/Sch_Manage_crew" class="text-white">
              <q-item-section avatar>
              <q-icon name="group" color="lime" />
              </q-item-section>
              <q-item-section>Manage Crew</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Page Content -->
    <q-page-container>
      <q-page>
        <RouterView />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

defineOptions({
  name: "NavSmartLayout",
});

const drawerOpen = ref(false);
</script>

<style>
/* Drawer Styling */
.q-drawer {
  background-color: #1e1e2f;
  color: #ffffff;
}

.q-item-label {
  font-size: 14px;
}

.text-positive {
  font-weight: bold;
}
</style>
