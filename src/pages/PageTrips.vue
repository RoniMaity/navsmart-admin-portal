<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- Stats Section -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="row justify-between items-center">
              <div class="text-h6">Trips</div>
              <div>
                <q-btn
                  color="primary"
                  label="Add Trip"
                  icon="eva-plus"
                  @click="addTrip"
                />
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-3">
                <q-card flat bordered>
                  <q-card-section>
                    <div class="text-subtitle1">Total Trips</div>
                    <div class="text-h5">{{ stats.totalTrips }}</div>
                  </q-card-section>
                </q-card>
              </div>
              <div class="col-3">
                <q-card flat bordered>
                  <q-card-section>
                    <div class="text-subtitle1">Trips Today</div>
                    <div class="text-h5">{{ stats.tripsToday }}</div>
                  </q-card-section>
                </q-card>
              </div>
              <div class="col-3">
                <q-card flat bordered>
                  <q-card-section>
                    <div class="text-subtitle1">Trips In Progress</div>
                    <div class="text-h5">{{ stats.tripsInProgress }}</div>
                  </q-card-section>
                </q-card>
              </div>
              <div class="col-3">
                <q-card flat bordered>
                  <q-card-section>
                    <div class="text-subtitle1">Completed Trips</div>
                    <div class="text-h5">{{ stats.completedTrips }}</div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Trips Table -->
      <div class="col-12">
        <q-table
          :rows="trips"
          :columns="columns"
          row-key="id"
          :rows-per-page-options="[10, 20, 0]"
        >
          <template #body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                icon="edit"
                color="primary"
                round
                flat
                @click="editTrip(props.row)"
                class="q-mr-sm"
              ></q-btn>
              <q-btn
                icon="info"
                color="secondary"
                round
                flat
                @click="viewTripDetails(props.row)"
              ></q-btn>
              <q-btn
                icon="delete"
                color="negative"
                round
                flat
                @click="deleteTrip(props.row)"
                class="q-ml-sm"
              ></q-btn>
            </q-td>
          </template>
        </q-table>
      </div>
    </div>

    <!-- Add/Edit Trip Dialog -->
    <q-dialog v-model="showTripDialog">
      <q-card v-if="selectedTrip">
        <q-card-section>
          <div class="text-h6">
            {{ isEdit ? "Edit Trip" : "Add Trip" }}
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
            <!-- Schedule Selection -->
            <div class="col-12">
              <q-select
                v-model="selectedTrip.schedule_id"
                :options="schedulesOptions"
                label="Schedule"
                outlined
                dense
                clearable
                emit-value
                map-options
              />
            </div>

            <!-- Driver Selection -->
            <div class="col-12">
              <q-select
                v-model="selectedTrip.driver_id"
                :options="driversOptions"
                label="Driver"
                outlined
                dense
                clearable
                emit-value
                map-options
              />
            </div>

            <!-- Conductor Selection -->
            <div class="col-12">
              <q-select
                v-model="selectedTrip.conductor_id"
                :options="conductorsOptions"
                label="Conductor"
                outlined
                dense
                clearable
                emit-value
                map-options
              />
            </div>

            <!-- Route Selection -->
            <div class="col-12">
              <q-select
                v-model="selectedTrip.route_id"
                :options="routesOptions"
                label="Route"
                outlined
                dense
                clearable
                emit-value
                map-options
              />
            </div>

            <!-- Vehicle Selection -->
            <div class="col-12">
              <q-select
                v-model="selectedTrip.vehicle_id"
                :options="vehiclesOptions"
                label="Vehicle"
                outlined
                dense
                clearable
                emit-value
                map-options
              />
            </div>

            <!-- Expected Start Time -->
            <div class="col-12">
              <q-input
                v-model="selectedTrip.expected_start_time"
                type="datetime-local"
                label="Expected Start Time"
                outlined
                dense
                clearable
              />
            </div>

            <!-- Expected End Time -->
            <div class="col-12" v-if="isEdit">
              <q-input
                v-model="selectedTrip.expected_end_time"
                type="datetime-local"
                label="Expected End Time"
                outlined
                dense
                clearable
              />
            </div>

            <!-- Actual Start Time -->
            <div class="col-12" v-if="isEdit">
              <q-input
                v-model="selectedTrip.actual_start_time"
                type="datetime-local"
                label="Actual Start Time"
                outlined
                dense
                clearable
              />
            </div>

            <!-- Actual End Time -->
            <div class="col-12" v-if="isEdit">
              <q-input
                v-model="selectedTrip.actual_end_time"
                type="datetime-local"
                label="Actual End Time"
                outlined
                dense
                clearable
              />
            </div>

            <!-- Last Stop -->
            <div class="col-12" v-if="isEdit">
              <q-input
                v-model="selectedTrip.last_stop"
                placeholder="Last Stop"
                label="Last Stop"
                outlined
                dense
                clearable
              />
            </div>

            <!-- Driver Enter Time -->
            <div class="col-12" v-if="isEdit">
              <q-input
                v-model="selectedTrip.driver_enter_time"
                type="datetime-local"
                label="Driver Enter Time"
                outlined
                dense
                clearable
              />
            </div>

            <!-- Driver Exit Time -->
            <div class="col-12" v-if="isEdit">
              <q-input
                v-model="selectedTrip.driver_exit_time"
                type="datetime-local"
                label="Driver Exit Time"
                outlined
                dense
                clearable
              />
            </div>

            <!-- Conductor Enter Time -->
            <div class="col-12" v-if="isEdit">
              <q-input
                v-model="selectedTrip.conductor_enter_time"
                type="datetime-local"
                label="Conductor Enter Time"
                outlined
                dense
                clearable
              />
            </div>

            <!-- Delete Button -->
            <div class="col-auto" v-if="isEdit">
              <q-btn
                icon="delete"
                color="negative"
                round
                flat
                @click="deleteTrip"
                v-close-popup
              ></q-btn>
            </div>

            <!-- Save Button -->
            <div class="col">
              <q-btn
                label="Save"
                color="primary"
                rounded
                class="full-width"
                @click="saveTrip"
              ></q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Trip Details Side Panel -->
    <q-drawer
      v-model="showTripDetails"
      side="right"
      :width="400"
      overlay
      class="bg-grey-2"
    >
      <q-card>
        <q-card-section>
          <div class="row justify-between items-center">
            <div class="text-h6">Trip Details</div>
            <q-btn
              flat
              round
              dense
              icon="close"
              aria-label="Close"
              @click="showTripDetails = false"
            />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div v-if="selectedTripDetails">
            <div class="q-mb-md">
              <strong>Registration No:</strong>
              {{ selectedTripDetails.vehicle.registration_no }}
            </div>
            <div class="q-mb-md">
              <strong>Driver:</strong> {{ selectedTripDetails.driver.name }}
            </div>
            <div class="q-mb-md">
              <strong>Conductor:</strong>
              {{ selectedTripDetails.conductor.name }}
            </div>
            <div class="q-mb-md">
              <strong>Route:</strong> {{ selectedTripDetails.route.route_no }}
            </div>
            <div class="q-mb-md">
              <strong>Schedule ID:</strong>
              {{ selectedTripDetails.schedule.id }}
            </div>
            <div class="q-mb-md">
              <strong>Expected Start Time:</strong>
              {{ formatTimestamp(selectedTripDetails.expected_start_time) }}
            </div>
            <div class="q-mb-md">
              <strong>Expected End Time:</strong>
              {{ formatTimestamp(selectedTripDetails.expected_end_time) }}
            </div>
            <div class="q-mb-md">
              <strong>Actual Start Time:</strong>
              {{ formatTimestamp(selectedTripDetails.actual_start_time) }}
            </div>
            <div class="q-mb-md">
              <strong>Actual End Time:</strong>
              {{ formatTimestamp(selectedTripDetails.actual_end_time) }}
            </div>
            <div class="q-mb-md">
              <strong>Last Stop:</strong> {{ selectedTripDetails.last_stop }}
            </div>
            <div class="q-mb-md">
              <strong>Driver Enter Time:</strong>
              {{ formatTimestamp(selectedTripDetails.driver_enter_time) }}
            </div>
            <div class="q-mb-md">
              <strong>Driver Exit Time:</strong>
              {{ formatTimestamp(selectedTripDetails.driver_exit_time) }}
            </div>
            <div class="q-mb-md">
              <strong>Conductor Enter Time:</strong>
              {{ formatTimestamp(selectedTripDetails.conductor_enter_time) }}
            </div>

            <q-separator />

            <!-- Map Section -->
            <div class="q-mb-md">
              <strong>Last Stop Location:</strong>
              <div v-if="mapCenter">
                <l-map
                  :zoom="12"
                  :center="mapCenter"
                  style="height: 200px; width: 100%"
                  :use-global-leaflet="false"
                >
                  <l-tile-layer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    layer-type="base"
                    name="OpenStreetMap"
                  ></l-tile-layer>
                  <l-marker :lat-lng="mapCenter">
                  </l-marker>
                </l-map>
              </div>
              <div v-else>
                <q-spinner-dots color="primary" />
              </div>
            </div>

            <q-separator />

            <div class="text-h6 q-mt-md">Ticket Sales</div>
            <div class="q-mb-md">
              <strong>Total Tickets Sold:</strong> {{ tripStats.totalTickets }}
            </div>
            <div class="q-mb-md">
              <strong>Total Revenue:</strong> ₹{{ tripStats.totalRevenue }}
            </div>
            <div class="q-mb-md">
              <strong>Unique Customers:</strong> {{ tripStats.uniqueCustomers }}
            </div>
            <div class="q-mb-md">
              <strong>Busy Stops:</strong>
              <ul>
                <li v-for="stop in tripStats.busyStops" :key="stop.stop_id">
                  {{ stop.name }} ({{ stop.ticketCount }} tickets)
                </li>
              </ul>
            </div>
          </div>
          <div v-else>
            <q-spinner-dots color="primary" />
          </div>
        </q-card-section>
      </q-card>
    </q-drawer>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from 'axios';
import { useQuasar } from "quasar";

import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

// Add this at the top of your <script setup> section
// const GMAP_API_KEY = import.meta.env.VITE_GMAP_API_KEY; // Ensure your .env has this key

const $q = useQuasar();

const API_BASE_URL = import.meta.env.VITE_API_URL;

function getAuthHeader() {
  return { headers: { 'x-auth-token': localStorage.getItem('token') } };
}

const trips = ref([]);
const selectedTrip = ref(null);
const isEdit = ref(false);
const showTripDialog = ref(false);

// Side Panel
const showTripDetails = ref(false);
const selectedTripDetails = ref(null);
const tripStats = ref({
  totalTickets: 0,
  totalRevenue: 0,
  uniqueCustomers: 0,
  busyStops: [],
});

// Stats object
const stats = ref({
  totalTrips: 0,
  tripsToday: 0,
  tripsInProgress: 0,
  completedTrips: 0,
});

// Related Data
const schedules = ref([]);
const drivers = ref([]);
const conductors = ref([]);
const routes = ref([]);
const vehicles = ref([]);

// Options for Selects
const schedulesOptions = computed(() =>
  schedules.value.map((s) => {
    const route = routes.value.find((r) => r.id === s.route_id);
    const routeName = route ? route.route_no : "Unknown Route";
    return {
      label: `Route ${routeName} @ ${s.time_start} (Bus: ${s.vehicle_id ? 'Yes' : 'No'})`,
      value: s.id,
    };
  })
);
const driversOptions = computed(() =>
  drivers.value.map((d) => ({ label: d.name, value: d.id }))
);
const conductorsOptions = computed(() =>
  conductors.value.map((c) => ({ label: c.name, value: c.id }))
);
const routesOptions = computed(() =>
  routes.value.map((r) => ({ label: `${r.route_no} (${r.origin} - ${r.destination})`, value: r.id }))
);
const vehiclesOptions = computed(() =>
  vehicles.value.map((v) => ({ label: v.registration_no, value: v.id }))
);

// Add a computed property or a reactive reference for mapCenter
const mapCenter = ref([28.6139, 77.209]); // Example: New Delhi [lat, lng]


onMounted(() => {
  fetchTrips();
  fetchRelatedData();
  fetchStats();
});

/**
trip = {
  "id": "cbd1604e-e29c-4a84-833f-29690d38fcf9",
  "schedule_id": "cfd2bb3b-bb5f-40f9-85da-95ca99330800",
  "driver_id": "e0049b01-e301-4739-8518-433caac5c550",
  "conductor_id": "e3448832-d618-4ad2-a038-286fdc00efac",
  "route_id": "ea811e39-176c-4116-ba0d-30c47d2c4c52",
  "vehicle_id": "e1450cce-9624-44b7-889f-9f6665dafa90",
  "expected_start_time": "2024-12-11T05:25:55+00:00",
  "expected_end_time": "2024-12-10T20:24:00+00:00",
  "actual_start_time": null,
  "actual_end_time": null,
  "last_stop": null,
  "driver_enter_time": null,
  "driver_exit_time": null,
  "conductor_enter_time": null,
  "driver": {
      "name": "Sumit"
  },
  "conductor": {
      "name": "Roni"
  },
  "route": {
      "name": "101"
  },
  "vehicle": {
      "registration_no": "DL012024"
  },
  "schedule": {
      "id": "cfd2bb3b-bb5f-40f9-85da-95ca99330800"
  }
} */

const columns = [
  {
    name: "route_id",
    label: "Route",
    align: "left",
    field: (row) => row.route ? `${row.route.route_no}` : (row.route_id || 'N/A'),
    sortable: true
  },
  {
    name: "vehicle_id",
    label: "Vehicle",
    align: "left",
    field: (row) => row.vehicle ? row.vehicle.registration_no : (row.vehicle_id || 'N/A'),
    sortable: true
  },
  {
    name: "driver_id",
    label: "Driver",
    align: "left",
    field: (row) => row.driver ? row.driver.name : (row.driver_id || 'N/A'),
    sortable: true
  },
  {
    name: "conductor_id",
    label: "Conductor",
    align: "left",
    field: (row) => row.conductor ? row.conductor.name : (row.conductor_id || 'N/A'),
    sortable: true
  },

  {
    name: "expected_start_time",
    label: "Scheduled Time",
    align: "left",
    field: "expected_start_time",
    format: (val) => formatDate(val),
    sortable: true
  },
  {
    name: "status", // Ensure status is shown if available in row
    label: "Status",
    align: "center",
    field: "status",
    format: (val) => val ? val.replace('_', ' ').toUpperCase() : 'N/A',
    sortable: true
  },
  {
    name: "actions",
    label: "Actions",
    align: "center",
    field: "actions",
  },
];

async function fetchTrips() {
  try {
    const response = await axios.get(`${API_BASE_URL}/trips`, getAuthHeader());
    trips.value = response.data;
  } catch (error) {
    console.error(error);
    $q.notify({ type: "negative", message: "Failed to fetch trips" });
  }
}

async function fetchRelatedData() {
  try {
    const [schedulesRes, usersRes, routesRes, vehiclesRes] = await Promise.all([
      axios.get(`${API_BASE_URL}/schedules`, getAuthHeader()),
      axios.get(`${API_BASE_URL}/users`, getAuthHeader()),
      axios.get(`${API_BASE_URL}/routes`, getAuthHeader()),
      axios.get(`${API_BASE_URL}/vehicles`, getAuthHeader())
    ]);

    schedules.value = schedulesRes.data;

    // Filter users by type
    const allUsers = usersRes.data;
    drivers.value = allUsers.filter(u => u.type === 'driver');
    conductors.value = allUsers.filter(u => u.type === 'conductor');

    routes.value = routesRes.data;
    vehicles.value = vehiclesRes.data;

  } catch (error) {
    console.error(error);
    $q.notify({ type: "negative", message: "Failed to fetch related data" });
  }
}

async function fetchStats() {
  // Stats are calculated locally from the trips data or handled by a backend endpoint if available
  // For now, we can calculate from the already fetched `trips.value` if this is called after fetchTrips,
  // OR we can make a dedicated stats call. Given the pattern, let's calculate locally from fetched trips to save bandwidth/complexity.
  // HOWEVER, fetchTrips updates trips.value.

  if (trips.value.length === 0) return;

  const data = trips.value;
  stats.value.totalTrips = data.length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

  stats.value.tripsToday = data.filter(t => {
      const d = new Date(t.expected_start_time);
      return d >= today && d < tomorrow;
  }).length;

  stats.value.tripsInProgress = data.filter(t => t.actual_start_time && !t.actual_end_time).length;
  stats.value.completedTrips = data.filter(t => t.actual_end_time).length;
}

function addTrip() {
  selectedTrip.value = {
    schedule_id: "",
    driver_id: "",
    conductor_id: "",
    route_id: "",
    vehicle_id: "",
    expected_start_time: "",
    expected_end_time: "",
    actual_start_time: "",
    actual_end_time: "",
    last_stop: "",
    driver_enter_time: "",
    driver_exit_time: "",
    conductor_enter_time: "",
  };
  isEdit.value = false;
  showTripDialog.value = true;
}

function editTrip(trip) {
  selectedTrip.value = { ...trip };
  isEdit.value = true;
  showTripDialog.value = true;
}

async function saveTrip() {
  // Sanitize payload to match database schema
  const payload = {
    schedule_id: selectedTrip.value.schedule_id || null,
    route_id: selectedTrip.value.route_id || null,
    vehicle_id: selectedTrip.value.vehicle_id || null,
    driver_id: selectedTrip.value.driver_id || null,
    conductor_id: selectedTrip.value.conductor_id || null,
    status: selectedTrip.value.status || 'scheduled',
    expected_start_time: selectedTrip.value.expected_start_time || null,
    actual_start_time: selectedTrip.value.actual_start_time || null,
    actual_end_time: selectedTrip.value.actual_end_time || null,
    // Add other valid fields if any. Exclude expected_end_time, last_stop, etc.
  };

  try {
    $q.loading.show();
    if (isEdit.value) {
      // Update existing trip
      await axios.put(`${API_BASE_URL}/trips/${selectedTrip.value.id}`, payload, getAuthHeader());
      $q.notify({ type: "positive", message: "Trip updated!" });
      fetchTrips();
      fetchStats();
    } else {
      // Insert new trip
      await axios.post(`${API_BASE_URL}/trips`, payload, getAuthHeader());
      $q.notify({ type: "positive", message: "Trip created!" });
      fetchTrips();
      fetchStats();
    }
  } catch (error) {
    console.error(error);
    $q.notify({ type: "negative", message: "Error saving trip" });
  } finally {
    $q.loading.hide();
    showTripDialog.value = false;
  }
}

function deleteTrip(trip) {
  // Handle both direct calls with a trip object and calls from the dialog (where trip might be an event or undefined)
  const tripToDelete = (trip && trip.id) ? trip : selectedTrip.value;

  if (!tripToDelete) return;

  $q.dialog({
    title: "Confirm",
    message: "Are you sure you want to delete this trip?",
    cancel: true,
    persistent: true,
    ok: { label: "Delete", color: "negative", flat: true },
  }).onOk(async () => {
    try {
      $q.loading.show();
      await axios.delete(`${API_BASE_URL}/trips/${tripToDelete.id}`, getAuthHeader());
      $q.notify({ type: "positive", message: "Trip deleted" });
      fetchTrips();
      fetchStats();
      if (selectedTrip.value && selectedTrip.value.id === tripToDelete.id) {
        selectedTrip.value = null;
      }
    } catch (error) {
      console.error(error);
      $q.notify({ type: "negative", message: "Error deleting trip" });
    } finally {
      $q.loading.hide();
    }
  });
}

// Side Panel: Fetch and Display Trip-wise Stats
async function viewTripDetails(trip) {
  selectedTripDetails.value = null;
  tripStats.value = {
    totalTickets: 0,
    totalRevenue: 0,
    uniqueCustomers: 0,
    busyStops: [],
  };
  showTripDetails.value = true;
  await fetchTripDetails(trip.id);
}

async function fetchTripDetails(tripId) {
  try {
    // Fetch trip details with related data
    const response = await axios.get(`${API_BASE_URL}/trips/${tripId}`, getAuthHeader());
    selectedTripDetails.value = response.data;

    // Fetch related ticket data for statistics (Tickets API fetch skipped for now)
    /*
    const { data: tickets, error: ticketError } = await supabase
      .from("ticket")
      .select("*")
      .eq("trip_id", tripId);
    */
    // Placeholder stats
    tripStats.value.totalTickets = 0;
    tripStats.value.totalRevenue = 0;
    // ...

    tripStats.value.uniqueCustomers = 0;
    tripStats.value.busyStops = [];
    mapCenter.value = null;
  } catch (error) {
    console.error(error);
    $q.notify({ type: "negative", message: "Failed to fetch trip details" });
  }
}

// Formatting Functions
function formatTimestamp(ts) {
  if (!ts) return "N/A";
  const d = new Date(ts);
  return d.toLocaleString();
}

function formatDate(dt) {
  if (!dt) return "N/A";
  const d = new Date(dt);
  return d.toLocaleDateString();
}
</script>

<style scoped>
.dragging {
  opacity: 0.5;
}
</style>
