<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="row justify-between">
              <div class="text-h6">Stops</div>

              <div class="actions">
                <q-btn
                  color="primary"
                  label="Add Stop"
                  @click="addStop"
                  icon="eva-plus"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-8">
        <q-table
          :rows="stops"
          :columns="columns"
          row-key="id"
          :rows-per-page-options="[10, 20, 0]"
          @row-click="selectStop"
        >
          <template #body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                icon="edit"
                color="primary"
                round
                flat
                @click="editStop(props.row)"
              ></q-btn>
            </q-td>
          </template>
        </q-table>
      </div>

      <div class="col-4">
        <q-card v-if="selectedStop">
          <l-map
            v-if="selectedStop"
            :zoom="15"
            :center="mapCenter"
            style="height: 300px"
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
        </q-card>
      </div>
    </div>

    <q-dialog v-model="showStopDialog">
      <q-card v-if="selectedStop">
        <q-card-section>
          <div class="text-h6">
            Edit Stop
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
              <q-input
                v-model="selectedStop.name"
                placeholder="Stop Name"
                outlined
                dense
                clearable
                autofocus
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="selectedStop.plus_code_address"
                placeholder="Plus Code Address"
                outlined
                dense
                clearable
              ></q-input>
            </div>
            <div class="col-6">
              <q-input
                v-model="selectedStop.lat"
                placeholder="Latitude"
                outlined
                dense
                clearable
              />
            </div>
            <div class="col-6">
              <q-input
                v-model="selectedStop.lng"
                placeholder="Longitude"
                outlined
                dense
                clearable
              ></q-input>
            </div>

            <div class="col-auto" v-if="isEdit">
              <q-btn
                icon="delete"
                color="negative"
                round
                flat
                @click="deleteStop"
                v-close-popup
              ></q-btn>
            </div>

            <div class="col">
              <q-btn
                label="Save"
                color="primary"
                rounded
                class="full-width"
                @click="saveStop"
              ></q-btn>
            </div>
          </div>

          <!-- TODO: map picker -->
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from 'axios';
import { useQuasar } from "quasar";

import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

const $q = useQuasar();

const stops = ref([]);
const API_URL = import.meta.env.VITE_API_URL + '/stops';

const columns = [
  { name: "stop_name", label: "Stop Name", align: "left", field: "name" },
  { name: "plus_code_address", label: "Plus Code Address", align: "left", field: "plus_code_address" },
  { name: "lat", label: "Latitude", align: "left", field: "lat" },
  { name: "lng", label: "Longitude", align: "left", field: "lng" },
  {
    name: "actions",
    label: "Actions",
    align: "center",
    field: "actions",
    format: (val, row) => [
      {
        name: "edit",
        icon: "eva-edit",
        color: "primary",
        size: "md",
        onClick: () => editStop(row),
      },
    ],
  },
];

function getAuthHeader() {
  return { headers: { 'x-auth-token': localStorage.getItem('token') } };
}

const fetchStops = async () => {
  try {
    const response = await axios.get(API_URL, getAuthHeader());
    stops.value = response.data;
  } catch (error) {
    console.error(error);
    $q.notify({ type: "negative", message: "Failed to fetch stops" });
  }
};

onMounted(() => {
  fetchStops();
});

const selectedStop = ref(null);

const mapCenter = computed(() => {
  if (!selectedStop.value) {
    return [28.6139, 77.209];
  }
  return [
    parseFloat(selectedStop.value.lat || 28.6139),
    parseFloat(selectedStop.value.lng || 77.209),
  ];
});

const selectStop = (evt, row, idx) => {
  selectedStop.value = { ...row };
};

const isEdit = ref(false);
const showStopDialog = ref(false);

function addStop() {
  selectedStop.value = {
    name: "",
    plus_code_address: "",
    plus_code_address: "",
    lat: "",
    lng: "",
  };
  isEdit.value = false;
  showStopDialog.value = true;
}

function editStop(stop) {
  selectedStop.value = { ...stop };
  isEdit.value = true;
  showStopDialog.value = true;
}

async function saveStop() {
  try {
    $q.loading.show();
    const stopData = { ...selectedStop.value };

    if (isEdit.value) {
      // update
      await axios.put(`${API_URL}/${stopData.id}`, stopData, getAuthHeader());
      $q.notify({ type: "positive", message: "Stop updated!" });
    } else {
      // insert
      await axios.post(API_URL, stopData, getAuthHeader());
      $q.notify({ type: "positive", message: "Stop created!" });
    }
    fetchStops();
  } catch (error) {
    console.error(error);
    $q.notify({ type: "negative", message: "Failed to save stop" });
  } finally {
    $q.loading.hide();
    showStopDialog.value = false;
  }
}

async function deleteStop() {
  $q.dialog({
    title: "Confirm",
    message: "Are you sure you want to delete this stop?",
    cancel: true,
    persistent: true,
    ok: { label: "Delete", color: "negative", flat: true },
  }).onOk(async () => {
    try {
      $q.loading.show();
      await axios.delete(`${API_URL}/${selectedStop.value.id}`, getAuthHeader());
      $q.notify({ type: "positive", message: "Stop deleted" });
      fetchStops();
      selectedStop.value = null;
    } catch (error) {
      console.error(error);
      $q.notify({ type: "negative", message: "Failed to delete stop" });
    } finally {
      $q.loading.hide();
    }
  });
}
</script>
