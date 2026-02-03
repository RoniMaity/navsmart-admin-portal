<template>
  <q-page class="q-pa-md">
    <!-- Top Metrics Section -->
    <div class="row q-col-gutter-md">
      <!-- Total Users -->
      <div class="col-3">
        <q-card>
          <q-card-section>
            <div class="text-h6">Total Users</div>
            <div class="text-h4">{{ stats.totalUsers }}</div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Active Vehicles -->
      <div class="col-3">
        <q-card>
          <q-card-section>
            <div class="text-h6">Active Vehicles</div>
            <div class="text-h4">{{ stats.activeVehicles }}</div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Total Trips -->
      <div class="col-3">
        <q-card>
          <q-card-section>
            <div class="text-h6">Total Trips</div>
            <div class="text-h4">{{ stats.totalTrips }}</div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Tickets Sold Today -->
      <div class="col-3">
        <q-card>
          <q-card-section>
            <div class="text-h6">Tickets Sold Today</div>
            <div class="text-h4">{{ stats.ticketsSoldToday }}</div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Revenue Today -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">Revenue Today</div>
            <div class="text-h4">{{ stats.revenueToday }}</div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Charts Section -->

      <!-- Trips Overview - Line Chart -->
      <div class="col-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">Trips Overview (Monthly)</div>
            <!-- <canvas ref="tripsOverviewChart" class="chart-canvas"></canvas> -->
            <Chart
              :size="{ width: 500, height: 400 }"
              :data="data"
              :margin="margin"
              :direction="direction"
            >
              <template #layers>
                <Grid strokeDasharray="2,2" />
                <Line :dataKeys="['name', 'pl']" />
              </template>
            </Chart>
          </q-card-section>
        </q-card>
      </div>

      <!-- Tickets Sales - Bar Chart -->
      <div class="col-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">Tickets Sales (Weekly)</div>
            <!-- <canvas ref="ticketsSalesChart" class="chart-canvas"></canvas> -->
          </q-card-section>
        </q-card>
      </div>

      <!-- Monthly Revenue - Pie Chart -->
      <div class="col-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">Monthly Revenue Distribution</div>
            <!-- <canvas ref="monthlyRevenueChart" class="chart-canvas"></canvas> -->
          </q-card-section>
        </q-card>
      </div>

      <!-- User Distribution by Type - Doughnut Chart -->
      <div class="col-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">User Distribution by Type</div>
            <!-- <canvas ref="userDistributionChart" class="chart-canvas"></canvas> -->
          </q-card-section>
        </q-card>
      </div>

      <!-- Vehicle Utilization - Bar Chart -->
      <div class="col-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">Vehicle Utilization (Top 5)</div>
            <!-- <canvas ref="vehicleUtilizationChart" class="chart-canvas"></canvas> -->
          </q-card-section>
        </q-card>
      </div>

      <!-- Top Routes by Trips - Bar Chart -->
      <div class="col-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">Top 5 Routes by Trips</div>
            <!-- <canvas ref="topRoutesChart" class="chart-canvas"></canvas> -->
          </q-card-section>
        </q-card>
      </div>

      <!-- Top Stops by Ticket Sales - Horizontal Bar Chart -->
      <div class="col-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">Top 5 Stops by Ticket Sales</div>
            <!-- <canvas ref="topStopsChart" class="chart-canvas"></canvas> -->
          </q-card-section>
        </q-card>
      </div>

      <!-- Active Trips - Line Chart -->
      <div class="col-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">Active Trips (Daily)</div>
            <!-- <canvas ref="activeTripsChart" class="chart-canvas"></canvas> -->
          </q-card-section>
        </q-card>
      </div>

      <!-- Trips by Vehicle - Bar Chart -->
      <div class="col-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">Trips by Vehicle</div>
            <!-- <canvas ref="tripsByVehicleChart" class="chart-canvas"></canvas> -->
          </q-card-section>
        </q-card>
      </div>

      <!-- Tickets by Conductor - Horizontal Bar Chart -->
      <div class="col-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">Tickets by Conductor (Top 5)</div>
            <!-- <canvas ref="ticketsByConductorChart" class="chart-canvas"></canvas> -->
          </q-card-section>
        </q-card>
      </div>

      <!-- Schedules Today - Doughnut Chart -->
      <div class="col-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">Schedules Today</div>
            <!-- <canvas ref="schedulesTodayChart" class="chart-canvas"></canvas> -->
          </q-card-section>
        </q-card>
      </div>

      <!-- Average Trip Duration - Line Chart -->
      <div class="col-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">Average Trip Duration (Weekly)</div>
            <!-- <canvas ref="avgTripDurationChart" class="chart-canvas"></canvas> -->
          </q-card-section>
        </q-card>
      </div>

      <!-- Daily Active Users - Line Chart -->
      <div class="col-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">Daily Active Users (Last 7 Days)</div>
            <!-- <canvas ref="dailyActiveUsersChart" class="chart-canvas"></canvas> -->
          </q-card-section>
        </q-card>
      </div>

      <!-- Monthly Active Users - Line Chart -->
      <div class="col-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">Monthly Active Users (Last 6 Months)</div>
            <!-- <canvas ref="monthlyActiveUsersChart" class="chart-canvas"></canvas> -->
          </q-card-section>
        </q-card>
      </div>

      <!-- Average Fare - Numerical Widget -->
      <div class="col-4">
        <q-card>
          <q-card-section>
            <div class="text-h6">Average Fare</div>
            <div class="text-h4">{{ stats.averageFare }}</div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Additional Insights Placeholders -->
      <!-- You can add more charts or widgets here to reach 20 insights -->
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import axios from 'axios';
import { Chart, Grid, Line } from "vue3-charts";

// Quasar instance for notifications
const $q = useQuasar();

// Stats object
const stats = ref({
  totalUsers: 0,
  activeVehicles: 0,
  totalTrips: 0,
  ticketsSoldToday: 0, // Placeholder for now
  revenueToday: "₹0", // Placeholder
  averageFare: "₹0"
});

// Chart Configuration
const data = ref([
  { name: 'Jan', pl: 1000 },
  { name: 'Feb', pl: 2000 },
  { name: 'Mar', pl: 1500 },
  { name: 'Apr', pl: 3000 },
  { name: 'May', pl: 2500 },
  { name: 'Jun', pl: 4000 },
  { name: 'Jul', pl: 3500 },
]);
const direction = ref('horizontal');
const margin = ref({
  left: 0,
  top: 20,
  right: 20,
  bottom: 0
});

const API_URL = import.meta.env.VITE_API_URL;

const fetchDashboardStats = async () => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: { 'x-auth-token': token }
    };

    // Parallel requests for efficiency
    const [usersRes, vehiclesRes, tripsRes] = await Promise.all([
      axios.get(`${API_URL}/users`, config),
      axios.get(`${API_URL}/vehicles`, config),
      axios.get(`${API_URL}/trips`, config)
    ]);

    stats.value.totalUsers = usersRes.data.length;
    stats.value.activeVehicles = vehiclesRes.data.length;
    stats.value.totalTrips = tripsRes.data.length;

    // We can add more logic here to calculate tickets sold today, revenue etc. if endpoints existed for aggregations.
    // For now we keep placeholders for charts but real counts for cards.

  } catch (error) {
    console.error("Dashboard fetch error:", error);
    if (error.response?.status === 401 || error.response?.status === 403) {
       $q.notify({ type: 'negative', message: 'Session expired. Please login again.' });
    } else {
       // $q.notify({ type: "negative", message: "Failed to load real dashboard stats" });
    }
  }
};

// Lifecycle Hooks
onMounted(() => {
  fetchDashboardStats();
});
</script>

<style scoped>
.chart-canvas {
  width: 100%;
  height: 200px;
}
</style>
