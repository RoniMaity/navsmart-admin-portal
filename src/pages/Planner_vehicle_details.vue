<template>
  <q-layout view="lHh Lpr lff">
    <!-- Page content -->
    <q-page-container>
      <q-page>
        <!-- Main Flex Container for Centering the Card -->
        <div class="flex-container">
          <!-- Vehicle Details Card -->
          <div class="vehicle-details-card">
            <!-- Card Title with Icon -->
            <h2 class="card-title">
              <q-icon name="directions_bus" size="3rem" /> DTC Bus Service Overview
            </h2>

            <!-- Table displaying vehicle details -->
            <q-table
              :rows="filteredBusData"
              :columns="columns"
              row-key="vehicleNo"
              :pagination="pagination"
              :rows-per-page-options="[5, 10, 15]"
              :filter="filter"
              class="vehicle-table"
            >
              <!-- Custom Table Header for Search Input -->
              <template v-slot:top-left>
                <div class="table-header-left">
                  <q-input
                    v-model="filter"
                    label="Search by Vehicle No. or Type"
                    debounce="300"
                    class="filter-input"
                    dense
                    autofocus
                    clearable
                    @focus="removePlaceholder"
                    @blur="restorePlaceholder"
                    @clear="clearSearch"
                  />
                </div>
              </template>

              <!-- Reload Button with Icon and Animation -->
              <template v-slot:top-right>
                <q-btn
                  :icon="isLoading ? 'spinner' : 'refresh'"
                  color="primary"
                  flat
                  dense
                  @click="refreshData"
                  class="refresh-btn"
                  :disable="isLoading"
                  :loading="isLoading"
                  loading-delay="0"
                  :loading-size="'20px'"
                  :tooltip="isLoading ? 'Refreshing data...' : 'Click to refresh'"
                />
              </template>
            </q-table>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'

// Define columns for the table
const columns = [
  { name: 'sNo', label: 'S No', align: 'left', field: 'sNo' },
  { name: 'vehicleNo', label: 'Vehicle No.', align: 'left', field: 'vehicleNo' },
  { name: 'type', label: 'Type', align: 'left', field: 'type' },
  { name: 'totalDistance', label: 'Total Distance Covered', align: 'left', field: 'totalDistance' },
  // { name: 'poc', label: 'POC (Point of Contact)', align: 'left', field: 'poc' },
  { name: 'registrationDate', label: 'Registration Date', align: 'left', field: 'registrationDate' },
  { name: 'insuranceExpiry', label: 'Insurance Expiry', align: 'left', field: 'insuranceExpiry' }
]

// Sample vehicle data (expanded with more rows)
const vehicleData = ref([
  {
    sNo: 1,
    vehicleNo: 'DTC001',
    type: 'AC',
    totalDistance: '150,000 km',
    poc: 'Ravi Kumar',
    registrationDate: '2015-01-01',
    insuranceExpiry: '2024-12-15'
  },
  {
    sNo: 2,
    vehicleNo: 'DTC002',
    type: 'NON_AC',
    totalDistance: '120,000 km',
    poc: 'Sanjay Singh',
    registrationDate: '2016-03-20',
    insuranceExpiry: '2024-12-20'
  },
  {
    sNo: 3,
    vehicleNo: 'DTC003',
    type: 'ELECTRIC',
    totalDistance: '180,000 km',
    poc: 'Meena Devi',
    registrationDate: '2014-07-10',
    insuranceExpiry: '2024-12-25'
  },
  {
    sNo: 4,
    vehicleNo: 'DTC004',
    type: 'NON_AC',
    totalDistance: '200,000 km',
    poc: 'Vikram Yadav',
    registrationDate: '2017-05-15',
    insuranceExpiry: '2024-12-18'
  },
  {
    sNo: 5,
    vehicleNo: 'DTC005',
    type: 'NON_AC',
    totalDistance: '250,000 km',
    poc: 'Pradeep Kumar',
    registrationDate: '2018-02-28',
    insuranceExpiry: '2024-12-22'
  },
  {
    sNo: 6,
    vehicleNo: 'DTC006',
    type: 'AC',
    totalDistance: '300,000 km',
    poc: 'Sushila Rani',
    registrationDate: '2015-09-11',
    insuranceExpiry: '2025-01-05'
  },

])

const pagination = ref({
  page: 1,
  rowsPerPage: 5
})

const isLoading = ref(false)
const filter = ref('')

// Computed property for filtered vehicle data based on the filter
const filteredBusData = computed(() => {
  if (!filter.value) {
    return vehicleData.value
  }

  const searchTerm = filter.value.toLowerCase()

  return vehicleData.value.filter(vehicle => {
    return (
      vehicle.vehicleNo.toLowerCase().includes(searchTerm) ||
      vehicle.type.toLowerCase().includes(searchTerm)
    )
  })
})

// Function to simulate refreshing of data
const refreshData = async () => {
  isLoading.value = true
  setTimeout(() => {
    vehicleData.value.push({
      sNo: vehicleData.value.length + 1,
      vehicleNo: `DTC00${vehicleData.value.length + 1}`,
      type: 'Bus',
      totalDistance: '100,000 km',
      poc: 'New Driver',
      registrationDate: '2025-01-01',
      insuranceExpiry: '2025-01-10'
    })
    isLoading.value = false
  }, 2000) // Simulate a 2-second refresh delay
}

// Function to clear the search input
const clearSearch = () => {
  filter.value = ''
}

// Remove the placeholder when the input is focused
const removePlaceholder = () => {
  filter.value = ''
}

// Restore the placeholder when the input loses focus
const restorePlaceholder = () => {
  if (!filter.value) {
    filter.value = ''
  }
}
</script>

<style scoped>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif; /* Custom font */
  background-color: #f5f5f5;
  color: #333;
}

/* Main Flex Container */
.flex-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 40px;
}

/* Vehicle Details Card */
.vehicle-details-card {
  background: #e1f5fe;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1200px;
  border: 1px solid #90caf9;
  transition: all 0.3s ease;
}

.vehicle-details-card:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  background-color: #b0dff4;
}

.card-title {
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  color: #0277bd;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
}

/* Table Styles */
.vehicle-table {
  border-radius: 12px;
  overflow: hidden;
  margin-top: 20px;
}

.q-table {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #dcdcdc;
  background-color: #ffffff;
}

.q-table__row {
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
}

.q-table__row:hover {
  background-color: #bbdefb;
}

.q-table__header {
  background-color: #0277bd;
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.q-table__cell {
  font-size: 1.1rem;
  padding: 16px;
  color: #333;
}

/* Reload Button Styling */
.refresh-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #0277bd;
  color: white;
  font-size: 1.2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.refresh-btn:hover {
  background-color: #03a9f4;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

.refresh-btn:active {
  transform: translateY(2px);
}

.refresh-btn .q-icon {
  animation: rotate 1.5s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
