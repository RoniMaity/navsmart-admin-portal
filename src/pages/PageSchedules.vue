<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">

      <!-- Stats Section -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="row justify-between items-center">
              <div class="text-h6">Schedules</div>
              <div>
                <q-btn color="primary" label="Add Schedule" icon="eva-plus" @click="addSchedule" />
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-3">
                <q-card flat bordered>
                  <q-card-section>
                    <div class="text-subtitle1">Total Schedules</div>
                    <div class="text-h5">{{ stats.totalSchedules }}</div>
                  </q-card-section>
                </q-card>
              </div>
              <div class="col-3">
                <q-card flat bordered>
                  <q-card-section>
                    <div class="text-subtitle1">Unique Vehicles</div>
                    <div class="text-h5">{{ stats.uniqueVehicles }}</div>
                  </q-card-section>
                </q-card>
              </div>
              <div class="col-3">
                <q-card flat bordered>
                  <q-card-section>
                    <div class="text-subtitle1">Unique drivers</div>
                    <div class="text-h5">{{ stats.uniqueDrivers }}</div>
                  </q-card-section>
                </q-card>
              </div>
              <div class="col-3">
                <q-card flat bordered>
                  <q-card-section>
                    <div class="text-subtitle1">Unique Conductors</div>
                    <div class="text-h5">{{ stats.uniqueConductors }}</div>
                  </q-card-section>
                </q-card>
              </div>
              <div class="col-3">
                <q-card flat bordered>
                  <q-card-section>
                    <div class="text-subtitle1">Earliest Start</div>
                    <div class="text-h5">{{ stats.earliestStart }}</div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Schedules Table -->
      <!-- Schedules / Trips Table -->
      <div class="col-12">
        <q-card>
            <q-tabs
                v-model="tab"
                dense
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                align="justify"
                narrow-indicator
            >
                <q-tab name="upcoming" label="Upcoming Resources (Schedules)" />
                <q-tab name="ongoing" label="Ongoing Trips" />
                <q-tab name="history" label="Trip History" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>
                <!-- Upcoming: Show defined Definitions (Schedules) or Scheduled Trips -->
                <q-tab-panel name="upcoming">
                    <q-table :rows="upcomingSchedules" :columns="columns" row-key="unique_key" :rows-per-page-options="[10, 20, 0]">
                        <template #body-cell-actions="props">
                            <q-td :props="props">
                                <q-btn icon="edit" color="primary" round flat @click="editSchedule(props.row)"></q-btn>
                                <q-btn icon="delete" color="negative" round flat @click="deleteSchedule(props.row)"></q-btn>
                            </q-td>
                        </template>
                    </q-table>
                </q-tab-panel>

                <!-- Ongoing: Show Active Trips -->
                <q-tab-panel name="ongoing">
                    <q-table :rows="ongoingTrips" :columns="tripColumns" row-key="id" />
                </q-tab-panel>

                <!-- History: Show Completed Trips -->
                <q-tab-panel name="history">
                    <q-table :rows="historyTrips" :columns="tripColumns" row-key="id" />
                </q-tab-panel>
            </q-tab-panels>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="showScheduleDialog">
      <q-card v-if="selectedSchedule">
        <q-card-section>
          <div class="text-h6">
            {{ isEdit ? 'Edit Schedule' : 'Add Schedule' }}
            <q-btn flat round dense icon="close" aria-label="Close" v-close-popup class="float-right" />
          </div>
        </q-card-section>

        <q-separator></q-separator>

        <q-card-section>
          <div class="row q-col-gutter-sm">
            <div class="col-12">
               <div class="text-subtitle2 q-mb-sm">Filter Resources by Area (Optional)</div>
               <q-select
                v-model="selectedDepot"
                :options="availableDepots"
                label="Select Depot"
                outlined
                dense
                clearable
                class="q-mb-md"
              />
            </div>

            <div class="col-12">
              <q-select
                v-model="selectedSchedule.route_id"
                :options="availableRoutes"
                label="Select Route"
                outlined
                dense
                emit-value
                map-options
                clearable
                :rules="[val => !!val || 'Route is required']"
              />
            </div>

            <div class="col-12">
              <q-select
                v-model="selectedSchedule.vehicle_id"
                :options="availableVehicles"
                label="Select Vehicle"
                outlined
                dense
                emit-value
                map-options
                clearable
              />
            </div>
            <div class="col-12">
              <q-select
                v-model="selectedSchedule.driver_id"
                :options="availableDrivers"
                label="Select Driver"
                outlined
                dense
                emit-value
                map-options
                clearable
              />
            </div>
            <div class="col-12">
              <q-select
                v-model="selectedSchedule.conductor_id"
                :options="availableConductors"
                label="Select Conductor"
                outlined
                dense
                emit-value
                map-options
                clearable
              />
            </div>
            <div class="col-12">
              <q-input v-model="selectedSchedule.time_start" type="datetime-local" placeholder="Start Time" outlined
                dense clearable />
            </div>
            <div class="col-6">
              <q-input v-model.number="selectedSchedule.trip_count" type="number" label="Trip Count (Laps)" outlined dense
                 :rules="[val => !!val || 'Must be at least 1']" />
            </div>
            <div class="col-6">
              <q-input v-model.number="selectedSchedule.interval_minutes" type="number" label="Gap (Mins)" outlined dense
                 hint="Rest time between trips" />
            </div>

            <div class="col-auto" v-if="isEdit">
              <q-btn icon="delete" color="negative" round flat @click="deleteSchedule(selectedSchedule)" v-close-popup></q-btn>
            </div>

            <div class="col">
              <q-btn label="Save" color="primary" rounded class="full-width" @click="saveSchedule"></q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from 'axios';
import { useQuasar } from "quasar";

const $q = useQuasar();

const schedules = ref([]);
const trips = ref([]);
const users = ref([]);
const vehicles = ref([]);
const routes = ref([]);

const selectedSchedule = ref(null);
const selectedDepot = ref(null);

const isEdit = ref(false);
const showScheduleDialog = ref(false);

const API_BASE_URL = import.meta.env.VITE_API_URL;

function getAuthHeader() {
  return { headers: { 'x-auth-token': localStorage.getItem('token') } };
}

const stats = ref({
  totalSchedules: 0,
  uniqueVehicles: 0,
  uniqueDrivers: 0,
  uniqueConductors: 0,
  earliestStart: "N/A",
});

const columns = [
  { name: "route_name", label: "Route", align: "left", field: row => row.route ? row.route.route_no : (row.route_id || 'N/A') },
  { name: "time_start", label: "Start Time", align: "left", field: row => new Date(row.time_start).toLocaleString() },
  { name: "trip_count", label: "Laps", align: "center", field: row => `${row.slot_index || 1}/${row.trip_count || 1}` },
  { name: "vehicle_id", label: "Vehicle", align: "left", field: row => row.vehicle ? row.vehicle.registration_no : row.vehicle_id },
  { name: "driver_name", label: "Driver", align: "left", field: row => row.driver ? row.driver.name : row.driver_name },
  { name: "conductor_name", label: "Conductor", align: "left", field: row => row.conductor ? row.conductor.name : row.conductor_name },
  { name: "actions", label: "Actions", align: "center", field: "actions" },
];

async function fetchResources() {
    try {
        const [usersRes, vehiclesRes, routesRes, tripsRes] = await Promise.all([
            axios.get(`${API_BASE_URL}/users`, getAuthHeader()),
            axios.get(`${API_BASE_URL}/vehicles`, getAuthHeader()),
            axios.get(`${API_BASE_URL}/routes`, getAuthHeader()),
            axios.get(`${API_BASE_URL}/trips`, getAuthHeader())
        ]);
        users.value = usersRes.data;
        vehicles.value = vehiclesRes.data;
        routes.value = routesRes.data;
        trips.value = tripsRes.data;
    } catch (e) {
        console.error("Error fetching resources", e);
    }
}

// ... Computed properties ...

onMounted(() => {
  fetchSchedules();
  fetchResources();
});

// Compute Busy IDs
const busyResources = computed(() => {
    const busyDrivers = new Set();
    const busyConductors = new Set();
    const busyVehicles = new Set();

    trips.value.forEach(t => {
        if (t.status === 'in_progress') {
            if (t.driver_id) busyDrivers.add(t.driver_id);
            if (t.conductor_id) busyConductors.add(t.conductor_id);
            if (t.vehicle_id) busyVehicles.add(t.vehicle_id);
        }
    });

    return { drivers: busyDrivers, conductors: busyConductors, vehicles: busyVehicles };
});


// Extract unique depots from resources
const availableDepots = computed(() => {
    // ... (unchanged)
    const depots = new Set();
    vehicles.value.forEach(v => { if(v.depot) depots.add(v.depot) });
    users.value.forEach(u => { if(u.depot) depots.add(u.depot) });
    return Array.from(depots).sort();
});

// Computed Options for Dropdowns (Updated with Filtering)
const tab = ref('upcoming');

const upcomingSchedules = computed(() => {
    // Expand Schedules into Laps (similar to Driver Portal)
    const expanded = [];

    schedules.value.forEach(s => {
        const limit = s.trip_count || 1;
        const interval = s.interval_minutes || 0;

        // Find trips for this schedule to check status/duplicates
        const relatedTrips = trips.value
            .filter(t => t.schedule_id === s.id)
            .sort((a,b) => new Date(a.created_at) - new Date(b.created_at));

        for (let i = 0; i < limit; i++) {
            const baseTime = new Date(s.time_start);
            const slotTime = new Date(baseTime.getTime() + (i * interval * 60000));
            const existingTrip = relatedTrips[i];

            // If trip exists and is completed/in_progress, we might show it in other tabs.
            // But user wants "scheduler see them in the upcoming... duplicate it according to lap count".
            // Let's show ALL slots here, maybe marking status?
            // "Upcoming" usually implies "Not Yet Done".
            // If I show "Completed" ones here, it overlaps with History.
            // I will exclude 'completed' ones to keep it clean, but show 'scheduled' or 'virtual'.

            if (existingTrip && existingTrip.status === 'completed') continue;

            expanded.push({
                ...s, // Base props
                unique_key: `${s.id}_lap_${i}`, // For table key
                display_trip_id: existingTrip ? existingTrip.display_id : `(Lap ${i+1})`,
                slot_index: i + 1,
                time_start: slotTime.toISOString(), // Override time
                status: existingTrip ? existingTrip.status : 'scheduled' // Virtual status
            });
        }
    });

    return expanded.sort((a,b) => new Date(a.time_start) - new Date(b.time_start));
});

const tripColumns = [
  { name: "display_id", label: "Trip ID", align: "left", field: "display_id" },
  { name: "route_id", label: "Route", align: "left", field: row => {
      // enriching manually if needed, or rely on backend enrichment
      const r = routes.value.find(x => x.id === row.route_id);
      return r ? r.name : row.route_id;
  }},
  { name: "driver", label: "Driver", align: "left", field: row => row.driver ? row.driver.name : row.driver_id },
  { name: "vehicle", label: "Vehicle", align: "left", field: row => row.vehicle ? row.vehicle.registration_no : row.vehicle_id },
  { name: "status", label: "Status", align: "center", field: "status" },
  { name: "expected_start_time", label: "Scheduled", align: "left", field: row => row.expected_start_time ? new Date(row.expected_start_time).toLocaleString() : '-' },
  { name: "start_time", label: "Actual Start", align: "left", field: row => row.actual_start_time ? new Date(row.actual_start_time).toLocaleString() : '-' },
];

const ongoingTrips = computed(() => {
    return trips.value.filter(t => t.status === 'in_progress');
});

const historyTrips = computed(() => {
    return trips.value.filter(t => t.status === 'completed');
});

const availableVehicles = computed(() => {
    return vehicles.value
        .filter(v => v.status === 'active')
        .filter(v => !selectedDepot.value || v.depot === selectedDepot.value)
        .filter(v => !busyResources.value.vehicles.has(v.id)) // Filter if busy
        .map(v => ({ label: `${v.registration_no} (${v.type}) - ${v.depot || 'No Depot'}`, value: v.id }));
});

const availableDrivers = computed(() => {
    return users.value
        .filter(u => u.type === 'driver')
        .filter(u => !selectedDepot.value || u.depot === selectedDepot.value)
        .filter(u => !busyResources.value.drivers.has(u.id)) // Filter if busy
        .map(u => ({ label: `${u.name} (${u.username}) - ${u.depot || 'No Depot'}`, value: u.id }));
});

const availableConductors = computed(() => {
    return users.value
        .filter(u => u.type === 'conductor')
        .filter(u => !selectedDepot.value || u.depot === selectedDepot.value)
        .filter(u => !busyResources.value.conductors.has(u.id)) // Filter if busy
        .map(u => ({ label: `${u.name} (${u.username}) - ${u.depot || 'No Depot'}`, value: u.id }));
});

const availableRoutes = computed(() => {
    return routes.value.map(r => ({ label: `${r.route_no} (${r.origin} - ${r.destination})`, value: r.id }));
});

async function fetchSchedules() {
  try {
    const response = await axios.get(`${API_BASE_URL}/schedules`, getAuthHeader());
    schedules.value = response.data;
    calculateStats(response.data);
  } catch (error) {
    console.error(error);
    $q.notify({ type: "negative", message: "Failed to fetch schedules" });
  }
}

function calculateStats(data) {
    if (!data || data.length === 0) {
        stats.value = {
            totalSchedules: 0,
            uniqueVehicles: 0,
            uniqueDrivers: 0,
            uniqueConductors: 0,
            earliestStart: "N/A",
        };
        return;
    }

    stats.value.totalSchedules = data.length;

    const vehicleSet = new Set(data.map(r => r.vehicle_id));
    stats.value.uniqueVehicles = vehicleSet.size;

    const driverSet = new Set(data.map(r => r.driver_id));
    stats.value.uniqueDrivers = driverSet.size;

    const conductorSet = new Set(data.map(r => r.conductor_id));
    stats.value.uniqueConductors = conductorSet.size;

    // Earliest start
    const sorted = [...data].sort((a, b) => new Date(a.time_start) - new Date(b.time_start));
    if (sorted.length > 0 && sorted[0].time_start) {
        stats.value.earliestStart = new Date(sorted[0].time_start).toLocaleString();
    }
}

function addSchedule() {
  selectedSchedule.value = {
    route_id: null,
    vehicle_id: null,
    driver_id: null,
    conductor_id: null,
    time_start: "",
    trip_count: 1,
    interval_minutes: 30,
  };
  selectedDepot.value = null; // Reset filter
  isEdit.value = false;
  showScheduleDialog.value = true;
}

function editSchedule(schedule) {
  selectedSchedule.value = { ...schedule };
  selectedDepot.value = null;
  isEdit.value = true;
  showScheduleDialog.value = true;
}

async function saveSchedule() {
  const scheduleData = { ...selectedSchedule.value };

  const driver = users.value.find(u => u.id === scheduleData.driver_id);
  if (driver) scheduleData.driver_name = driver.name;

  const conductor = users.value.find(u => u.id === scheduleData.conductor_id);
  if (conductor) scheduleData.conductor_name = conductor.name;

  try {
    $q.loading.show();
    if (isEdit.value) {
      await axios.put(`${API_BASE_URL}/schedules/${scheduleData.id}`, scheduleData, getAuthHeader());
      $q.notify({ type: "positive", message: "Schedule updated!" });
    } else {
      await axios.post(`${API_BASE_URL}/schedules`, scheduleData, getAuthHeader());
      $q.notify({ type: "positive", message: "Schedule created!" });
    }
    fetchSchedules();
  } catch (error) {
    console.error(error);
    $q.notify({ type: "negative", message: "Error saving schedule" });
  } finally {
    $q.loading.hide();
    showScheduleDialog.value = false;
  }
}

function deleteSchedule(schedule = null) {
  const targetId = schedule ? schedule.id : selectedSchedule.value?.id;
  if (!targetId) return;

  $q.dialog({
    title: "Confirm",
    message: "Are you sure you want to delete this schedule?",
    cancel: true,
    persistent: true,
    ok: { label: "Delete", color: "negative", flat: true },
  }).onOk(async () => {
    try {
      $q.loading.show();
      await axios.delete(`${API_BASE_URL}/schedules/${targetId}`, getAuthHeader());
      $q.notify({ type: "positive", message: "Schedule deleted" });
      fetchSchedules();
      if (selectedSchedule.value && selectedSchedule.value.id === targetId) {
          selectedSchedule.value = null;
      }
    } catch (error) {
      console.error(error);
      $q.notify({ type: "negative", message: "Error deleting schedule" });
    } finally {
      $q.loading.hide();
    }
  });
}
</script>
