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
            src="/src/assets/—Pngtree—doraemon pictures_7031645.png"
            alt="NavSmart Logo"
            style=" height: 70%; border-radius: 50%;"
          />
        </div>
        <q-separator spaced />

        <!-- Navigation -->
        <q-item clickable v-ripple to="/PlannerDashboard" class="text-white">
              <q-item-section avatar>
              <q-icon name="person" color="lime" />
              </q-item-section>
              <q-item-section>Dashboard</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/PlannerCreateNewRoutes" class="text-white">
          <q-item-section avatar>
            <q-icon name="route" color="lime" />
          </q-item-section>
          <q-item-section>Create New Routes</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/PlannerJourneyStats" class="text-white">
              <q-item-section avatar>
              <q-icon name="info" color="lime" />
              </q-item-section>
              <q-item-section>Journey Details</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/PlannerRoutesTrafficAnalysis" class="text-white">
              <q-item-section avatar>
              <q-icon name="query_stats" color="lime" />
              </q-item-section>
              <q-item-section>Traffic Analysis</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/PlannerVehicleDetails" class="text-white">
              <q-item-section avatar>
              <q-icon name="directions_bus" color="lime" />
              </q-item-section>
              <q-item-section>Vehicle Details</q-item-section>
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
