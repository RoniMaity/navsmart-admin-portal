<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="row justify-between items-center">
              <div class="text-h6">Routes</div>
              <div>
                <q-btn
                  color="primary"
                  label="Add Route"
                  icon="eva-plus"
                  @click="addRoute"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- ROUTE LIST -->
      <div class="col-6">
        <q-card>
          <q-list>
            <q-item-label header>Routes</q-item-label>
            <q-item
              v-for="route in routes"
              :key="route.id"
              clickable
              :class="{ 'bg-blue-3': selectedRouteId === route.id }"
            >
              <q-item-section @click.stop="selectRoute(route.id)">
                <q-item-label>{{ route.route_no }}</q-item-label>
                <q-item-label caption v-if="route.origin && route.destination">
                  {{ route.origin }} <q-icon name="arrow_forward" /> {{ route.destination }}
                </q-item-label>


              </q-item-section>
              <q-item-section side class="row">
                <div class="items-center q-gutter-sm">
                  <!-- Edit Route Button -->
                  <q-btn
                    icon="edit"
                    color="primary"
                    round
                    flat
                    dense
                    @click.stop="editRoute(route)"
                  />

                  <q-btn
                    icon="chevron_right"
                    round
                    flat
                    dense
                    @click.stop="selectRoute(route.id)"
                  />
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>

      <!-- ROUTE STOPS & MANAGEMENT -->
      <div class="col-6" v-if="selectedRouteId">
        <!-- Placeholder for map -->
        <q-card class="q-mb-md">
          <q-item-label header>Map</q-item-label>
          <q-card-section>
            <l-map
              :zoom="11"
              :center="mapCenter"
              style="height: 300px"
              :use-global-leaflet="false"
            >
              <l-tile-layer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                layer-type="base"
                name="OpenStreetMap"
              ></l-tile-layer>

              <l-marker
                v-for="routeStop in selectedRouteStops.filter(rs => rs.stop && rs.stop.lat && rs.stop.lng)"
                :lat-lng="[parseFloat(routeStop.stop.lat), parseFloat(routeStop.stop.lng)]"
                :key="routeStop.id"
              >
              </l-marker>

              <l-polyline
                :lat-lngs="detailedRoutePath.length > 0 ? detailedRoutePath : selectedRouteStops
                  .filter(rs => rs.stop && rs.stop.lat && rs.stop.lng)
                  .map((rs) => [parseFloat(rs.stop.lat), parseFloat(rs.stop.lng)])"
                :color="'#FF0000'"
                :weight="4"
                :opacity="0.8"
              />
            </l-map>
          </q-card-section>

          <q-separator></q-separator>

          <q-item-label header>Stops</q-item-label>
          <q-card-section>
            <!-- Add Stop Dropdown -->
            <div class="row q-col-gutter-sm items-center">
              <div class="col">
                <q-select
                  v-model="selectedStopToAdd"
                  :options="
                    allStops.map((s) => ({
                      label: s.name,
                      value: s.id || s.stop_id,
                      key: s.id || s.stop_id,
                    }))
                  "
                  emit-value
                  map-options
                  label="Select Stop"
                  dense
                  outlined
                  clearable
                />
              </div>
              <div class="col-auto">
                <q-btn
                  label="Add Stop"
                  color="primary"
                  @click="addStopToRoute"
                  :disable="!selectedStopToAdd"
                />
              </div>
            </div>
          </q-card-section>

          <q-item>
            <q-item-section>
              <q-item-label caption>
                <q-icon name="info"></q-icon>
                Drag to rearrange route stops below.
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-list>
            <!-- Draggable stops list -->
            <draggable
              v-model="selectedRouteStops"
              @end="updateRouteStopOrder"
              handle=".handle"
              :animation="200"
              item-key="id"
            >
              <template #item="{ element }">
                <q-item clickable>
                  <q-item-section side class="handle">
                    <q-icon name="drag_indicator" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ element.stop?.name || 'Unknown Stop' }}</q-item-label>
                    <q-item-label caption v-if="!element.stop" class="text-negative">Stop data missing</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <!-- Delete Route Stop Button -->
                    <q-btn
                      icon="delete"
                      color="negative"
                      round
                      flat
                      dense
                      @click.stop="deleteRouteStop(element.id)"
                    />
                  </q-item-section>
                </q-item>
              </template>
            </draggable>
          </q-list>
        </q-card>
      </div>

      <!-- NO ROUTE SELECTED -->
      <div v-else class="col-6">
        <q-card>
          <q-item-label header>Select a route to see details.</q-item-label>
        </q-card>
      </div>
    </div>

    <!-- Add/Edit Route Dialog -->
    <q-dialog v-model="showRouteDialog">
      <q-card v-if="selectedRoute">
        <q-card-section>
          <div class="text-h6">
            {{ isEditRoute ? "Edit Route" : "Add Route" }}
            <q-btn
              flat
              round
              dense
              icon="close"
              aria-label="Close"
              v-close-popup
              class="float-right"
            />
          </div>
        </q-card-section>

        <q-separator></q-separator>

        <q-card-section>
          <div class="row q-col-gutter-sm">
            <div class="col-12">
            <div class="col-12">
              <q-input
                v-model="selectedRoute.route_no"
                placeholder="Route No (e.g. R1)"
                outlined
                dense
                clearable
                autofocus
                label="Route Number"
              />
            </div>
            <div class="col-12">
              <q-select
                v-model="selectedRoute.origin"
                :options="delhiDepots"
                label="Start Location (Depot)"
                outlined
                dense
                clearable
              />
            </div>
            <div class="col-12">
              <q-select
                v-model="selectedRoute.destination"
                :options="delhiDepots"
                label="End Location (Depot)"
                outlined
                dense
                clearable
              />
            </div>
            </div>

            <div class="col-auto" v-if="isEditRoute">
              <q-btn
                icon="delete"
                color="negative"
                round
                flat
                @click="deleteRoute(selectedRoute)"
                v-close-popup
              ></q-btn>
            </div>

            <div class="col">
              <q-btn
                label="Save"
                color="primary"
                rounded
                class="full-width"
                @click="saveRoute"
              ></q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import axios from 'axios';
import Draggable from "vuedraggable";
import { useQuasar } from "quasar";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPolyline } from "@vue-leaflet/vue-leaflet";

const $q = useQuasar();

const routes = ref([]);
const selectedRouteId = ref(null);
const selectedRouteStops = ref([]);
const allStops = ref([]);
const selectedStopToAdd = ref(null);
const detailedRoutePath = ref([]);

const showRouteDialog = ref(false);
const selectedRoute = ref(null);
const isEditRoute = ref(false);

const API_BASE_URL = import.meta.env.VITE_API_URL;

const delhiDepots = [
  "Kashmere Gate ISBT",
  "Sarai Kale Khan ISBT",
  "Anand Vihar ISBT",
  "Dwarka Sector 21",
  "Nehru Place Terminal",
  "Old Delhi Railway Station",
  "Central Secretariat",
  "Noida Sector 37",
  "Gurgaon Bus Stand",
  "Azadpur Terminal",
  "Mehrauli Terminal",
  "Najafgarh Terminal"
];

function getAuthHeader() {
  return { headers: { 'x-auth-token': localStorage.getItem('token') } };
}

onMounted(() => {
  fetchRoutes();
  fetchAllStops();
});

const mapCenter = computed(() => {
  if (selectedRouteStops.value.length) {
    // find average lat/lng of all stops
    // find average lat/lng of all stops
    const validStops = selectedRouteStops.value.filter(rs => rs.stop && rs.stop.lat && rs.stop.lng);

    if (validStops.length === 0) {
        return [28.6139, 77.209];
    }

    const { lat, lng } = validStops.reduce(
      (acc, rs) => {
        acc.lat += parseFloat(rs.stop.lat);
        acc.lng += parseFloat(rs.stop.lng);
        return acc;
      },
      { lat: 0, lng: 0 }
    );

    return [
      lat / validStops.length,
      lng / validStops.length,
    ];
  } else {
    return [28.6139, 77.209];
  }
});

const fetchRoutes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/routes`, getAuthHeader());
    routes.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchAllStops = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/stops`, getAuthHeader());
    allStops.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const selectRoute = async (routeId) => {
  selectedRouteId.value = routeId;
  selectedRouteStops.value = await fetchRouteStops(routeId);
};

const fetchRouteStops = async (routeId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/routes/${routeId}/stops`, getAuthHeader());
    return response.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const fetchRoutePath = async () => {
    // Only fetch if we have at least 2 stops
    const validStops = selectedRouteStops.value.filter(rs => rs.stop && rs.stop.lat && rs.stop.lng);
    if (validStops.length < 2) {
        detailedRoutePath.value = [];
        return;
    }

    // OSRM expects coordinates in {lon},{lat};{lon},{lat}... format
    const coordinates = validStops
        .map(rs => `${parseFloat(rs.stop.lng)},${parseFloat(rs.stop.lat)}`)
        .join(';');

    try {
        const url = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`;
        const response = await axios.get(url);
        
        if (response.data.routes && response.data.routes.length > 0) {
            // OSRM returns [lon, lat], Leaflet needs [lat, lon]
            const geojsonCoords = response.data.routes[0].geometry.coordinates;
            detailedRoutePath.value = geojsonCoords.map(coord => [coord[1], coord[0]]);
        }
    } catch (error) {
        console.error("OSRM Fetch Error:", error);
        // Fallback to straight lines
        detailedRoutePath.value = []; 
    }
};

watch(selectedRouteStops, () => {
    fetchRoutePath();
}, { deep: true });

const addStopToRoute = async () => {
  if (!selectedStopToAdd.value || !selectedRouteId.value) return;

  const maxOrder = selectedRouteStops.value.reduce(
    (acc, rs) => Math.max(acc, rs.order),
    0
  );
  const newOrder = maxOrder + 1;

  const payload = {
      stop_id: selectedStopToAdd.value,
      order: newOrder
  };

  try {
    const response = await axios.post(`${API_BASE_URL}/routes/${selectedRouteId.value}/stops`, payload, getAuthHeader());

    // Backend returns an array from Supabase insert().select()
    let newRouteStop = Array.isArray(response.data) ? response.data[0] : response.data;

    // Check if backend returned full stop object or just id
    if (!newRouteStop.stop) {
        // Find stop in allStops and attach
        const stopObj = allStops.value.find(s => s.id === selectedStopToAdd.value || s.stop_id === selectedStopToAdd.value);
        newRouteStop.stop = stopObj;
    }

    selectedRouteStops.value.push(newRouteStop);
    selectedStopToAdd.value = null;
    $q.notify({ type: "positive", message: "Stop added to route!" });
  } catch (error) {
    console.error(error);
    $q.notify({ type: "negative", message: "Failed to add stop to route" });
  }
};

const deleteRouteStop = async (routeStopId) => {
  $q.dialog({
    title: "Confirm",
    message: "Are you sure you want to delete this stop from the route?",
    cancel: true,
    persistent: true,
    ok: { label: "Delete", color: "negative", flat: true },
  }).onOk(async () => {
    try {
      $q.loading.show();
      await axios.delete(`${API_BASE_URL}/routes/stops/${routeStopId}`, getAuthHeader());
      $q.notify({ type: "positive", message: "Stop deleted" });
      selectedRouteStops.value = selectedRouteStops.value.filter(
        (rs) => rs.id !== routeStopId
      );
    } catch (error) {
      console.error(error);
      $q.notify({ type: "negative", message: "Error deleting stop" });
    } finally {
      $q.loading.hide();
    }
  });
};

const updateRouteStopOrder = async (evt) => {
  // Ideally, backend should support batch updates or we call one by one
  // For simplicity, we loop. Optimisation: Backend endpoint for batch order update.
  for (let i = 0; i < selectedRouteStops.value.length; i++) {
    const rs = selectedRouteStops.value[i];
    rs.order = i;
    try {
        // Assuming PUT /routes/stops/:id
        await axios.put(`${API_BASE_URL}/routes/stops/${rs.id}`, { order: i }, getAuthHeader());
    } catch (error) {
        console.error(error);
        $q.notify({ type: "negative", message: "Failed to update order" });
    }
  }
};

function addRoute() {
  selectedRoute.value = { route_no: "", origin: "", destination: "" };
  isEditRoute.value = false;
  showRouteDialog.value = true;
}

function editRoute(route) {
  selectedRoute.value = { ...route };
  isEditRoute.value = true;
  showRouteDialog.value = true;
}

async function saveRoute() {
  const payload = {
      route_no: selectedRoute.value.route_no,
      origin: selectedRoute.value.origin,
      destination: selectedRoute.value.destination
  };

  try {
    $q.loading.show();
    if (isEditRoute.value) {
      await axios.put(`${API_BASE_URL}/routes/${selectedRoute.value.id}`, payload, getAuthHeader());
      $q.notify({ type: "positive", message: "Route updated!" });
    } else {
      await axios.post(`${API_BASE_URL}/routes`, payload, getAuthHeader());
      $q.notify({ type: "positive", message: "Route created!" });
    }
    fetchRoutes();
  } catch (error) {
    console.error(error);
    $q.notify({ type: "negative", message: "Error saving route" });
  } finally {
    $q.loading.hide();
    showRouteDialog.value = false;
  }
}

function deleteRoute(route) {
  $q.dialog({
    title: "Confirm",
    message: "Are you sure you want to delete this route?",
    cancel: true,
    persistent: true,
    ok: { label: "Delete", color: "negative", flat: true },
  }).onOk(async () => {
    try {
      $q.loading.show();
      await axios.delete(`${API_BASE_URL}/routes/${route.id}`, getAuthHeader());
      $q.notify({ type: "positive", message: "Route deleted" });
      fetchRoutes();
      if (selectedRouteId.value === route.id) {
        selectedRouteId.value = null;
        selectedRouteStops.value = [];
      }
    } catch (error) {
      console.error(error);
      $q.notify({ type: "negative", message: "Error deleting route" });
    } finally {
      $q.loading.hide();
    }
  });
}
</script>

<style scoped>
.dragging {
  opacity: 0.5;
}

.map-placeholder {
  height: 200px;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
