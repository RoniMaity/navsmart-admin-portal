<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-3">
        <q-card>
          <q-list>
            <q-item-label header>Routes</q-item-label>

            <q-item>
              <q-item-section>
                <q-btn @click="fetchStopsForSelectedRoutes">Apply</q-btn>
              </q-item-section>
            </q-item>

            <q-item v-for="route in routes" :key="route.id" clickable>
              <q-item-section side>
                <q-checkbox
                  v-model="selectedRoutes"
                  :val="route"
                  class="q-mr-sm"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  {{ route.name }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-icon name="circle" :color="route.color"></q-icon>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>

      <!-- ROUTE STOPS & MANAGEMENT -->
      <div class="col-9">
        <!-- Google Map Section -->
        <q-card class="q-mb-md">
          <q-item-label header>Map</q-item-label>
          <q-card-section>
            <div style="height: 700px; width: 100%">
              <l-map
                ref="map"
                v-model:zoom="zoom"
                :center="mapCenter"
                :use-global-leaflet="false"
              >
                <l-tile-layer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  layer-type="base"
                  name="OpenStreetMap"
                ></l-tile-layer>

                <l-polyline
                  v-for="(route, idx) in visibleRoutes"
                  :key="idx"
                  :lat-lngs="route.path"
                  :color="route.color"
                  :weight="4"
                  :opacity="0.8"
                />
              </l-map>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios';
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LPolyline } from "@vue-leaflet/vue-leaflet";

// const GMAP_API_KEY = import.meta.env.VITE_GMAP_API_KEY; // Not needed
const API_BASE_URL = import.meta.env.VITE_API_URL;

function getAuthHeader() {
  return { headers: { 'x-auth-token': localStorage.getItem('token') } };
}

const COLORS = [
  "red",
  "blue",
  "green",
  // "yellow",
  "purple",
  "orange",
  "pink",
  "black",
  "fuchsia",
  "gray",
  "lime",
  "maroon",
  "navy",
  "olive",
  "silver",
  "teal",
  "#e6194b", "#3cb44b", "#ffe119", "#4363d8", "#f58231", "#911eb4", "#46f0f0", "#f032e6", "#bcf60c", "#fabebe", "#008080", "#e6beff", "#9a6324", "#fffac8", "#800000", "#aaffc3", "#808000", "#ffd8b1", "#000075", "#808080", "#ffffff", "#000000"
];

const routes = ref([]);

const fetchRoutes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/routes`, getAuthHeader());
    const data = response.data;

    data.forEach((route, idx) => {
      route.color = COLORS[idx % COLORS.length];
    });

    routes.value = data;

    // select all by default
    selectedRoutes.value = data;

    fetchStopsForSelectedRoutes();
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchRoutes();
});

const selectedRoutes = ref([]);
const visibleRoutes = ref([]);

const fetchStopsForSelectedRoutes = async () => {
  const routeStops = await Promise.all(
    selectedRoutes.value.map(async (route) => {
      const stops = await fetchRouteStops(route.id);
      // Leaflet expects [lat, lng]
      return stops
        .filter(rs => rs.stop && rs.stop.latitude && rs.stop.longitude)
        .map((rs) => [
          parseFloat(rs.stop.latitude),
          parseFloat(rs.stop.longitude)
        ]);
    })
  );

  // We need to pair routes with their stops for rendering
  visibleRoutes.value = routeStops.map((stops, index) => ({
      path: stops,
      color: selectedRoutes.value[index].color
  }));
};

const mapCenter = [28.6139, 77.209]; // Leaflet format [lat, lng]
const zoom = ref(11);

const fetchRouteStops = async (routeId) => {
  try {
      const response = await axios.get(`${API_BASE_URL}/routes/${routeId}/stops`, getAuthHeader());
      return response.data || [];
  } catch (error) {
      console.error(error);
      return [];
  }
};
</script>
