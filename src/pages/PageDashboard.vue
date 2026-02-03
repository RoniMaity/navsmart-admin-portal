<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-md">

      <!-- Top Metrics Section -->
      <div class="row q-col-gutter-md">
        <!-- Total Users -->
        <q-card class="col-3">
          <q-card-section>
            <div class="text-h6">Total Users</div>
            <div class="text-h4">{{ stats.totalUsers }}</div>
          </q-card-section>
        </q-card>

        <!-- Active Vehicles -->
        <q-card class="col-3">
          <q-card-section>
            <div class="text-h6">Active Vehicles</div>
            <div class="text-h4">{{ stats.activeVehicles }}</div>
          </q-card-section>
        </q-card>

        <!-- Total Trips -->
        <q-card class="col-3">
          <q-card-section>
            <div class="text-h6">Total Trips</div>
            <div class="text-h4">{{ stats.totalTrips }}</div>
          </q-card-section>
        </q-card>

        <!-- Tickets Sold Today -->
        <q-card class="col-3">
          <q-card-section>
            <div class="text-h6">Tickets Sold Today</div>
            <div class="text-h4">{{ stats.ticketsSoldToday }}</div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Revenue Today -->
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-h6">Revenue Today</div>
          <div class="text-h4">₹{{ stats.revenueToday }}</div>
        </q-card-section>
      </q-card>

      <!-- Charts Section -->
      <div class="row q-col-gutter-md">
        <!-- Trips Overview - Line Chart -->
        <q-card class="col-6">
          <q-card-section>
            <div class="text-h6">Trips Overview (Monthly)</div>
            <canvas ref="tripsOverviewChart" class="chart-canvas"></canvas>
          </q-card-section>
        </q-card>

        <!-- Tickets Sales - Bar Chart -->
        <q-card class="col-6">
          <q-card-section>
            <div class="text-h6">Tickets Sales (Weekly)</div>
            <canvas ref="ticketsSalesChart" class="chart-canvas"></canvas>
          </q-card-section>
        </q-card>

        <!-- Monthly Revenue - Pie Chart -->
        <q-card class="col-6">
          <q-card-section>
            <div class="text-h6">Monthly Revenue Distribution</div>
            <canvas ref="monthlyRevenueChart" class="chart-canvas"></canvas>
          </q-card-section>
        </q-card>

        <!-- User Distribution by Type - Doughnut Chart -->
        <q-card class="col-6">
          <q-card-section>
            <div class="text-h6">User Distribution by Type</div>
            <canvas ref="userDistributionChart" class="chart-canvas"></canvas>
          </q-card-section>
        </q-card>

        <!-- Vehicle Utilization - Bar Chart -->
        <q-card class="col-6">
          <q-card-section>
            <div class="text-h6">Vehicle Utilization (Top 5)</div>
            <canvas ref="vehicleUtilizationChart" class="chart-canvas"></canvas>
          </q-card-section>
        </q-card>

        <!-- Top Routes by Trips - Bar Chart -->
        <q-card class="col-6">
          <q-card-section>
            <div class="text-h6">Top 5 Routes by Trips</div>
            <canvas ref="topRoutesChart" class="chart-canvas"></canvas>
          </q-card-section>
        </q-card>

        <!-- Top Stops by Ticket Sales - Horizontal Bar Chart -->
        <q-card class="col-6">
          <q-card-section>
            <div class="text-h6">Top 5 Stops by Ticket Sales</div>
            <canvas ref="topStopsChart" class="chart-canvas"></canvas>
          </q-card-section>
        </q-card>

        <!-- Active Trips - Line Chart -->
        <q-card class="col-6">
          <q-card-section>
            <div class="text-h6">Active Trips (Daily)</div>
            <canvas ref="activeTripsChart" class="chart-canvas"></canvas>
          </q-card-section>
        </q-card>

        <!-- Trips by Vehicle - Bar Chart -->
        <q-card class="col-6">
          <q-card-section>
            <div class="text-h6">Trips by Vehicle</div>
            <canvas ref="tripsByVehicleChart" class="chart-canvas"></canvas>
          </q-card-section>
        </q-card>

        <!-- Tickets by Conductor - Horizontal Bar Chart -->
        <q-card class="col-6">
          <q-card-section>
            <div class="text-h6">Tickets by Conductor (Top 5)</div>
            <canvas ref="ticketsByConductorChart" class="chart-canvas"></canvas>
          </q-card-section>
        </q-card>

        <!-- Schedules Today - Doughnut Chart -->
        <q-card class="col-6">
          <q-card-section>
            <div class="text-h6">Schedules Today</div>
            <canvas ref="schedulesTodayChart" class="chart-canvas"></canvas>
          </q-card-section>
        </q-card>

        <!-- Average Trip Duration - Line Chart -->
        <q-card class="col-6">
          <q-card-section>
            <div class="text-h6">Average Trip Duration (Weekly)</div>
            <canvas ref="avgTripDurationChart" class="chart-canvas"></canvas>
          </q-card-section>
        </q-card>

        <!-- Daily Active Users - Line Chart -->
        <q-card class="col-6">
          <q-card-section>
            <div class="text-h6">Daily Active Users (Last 7 Days)</div>
            <canvas ref="dailyActiveUsersChart" class="chart-canvas"></canvas>
          </q-card-section>
        </q-card>

        <!-- Monthly Active Users - Line Chart -->
        <q-card class="col-6">
          <q-card-section>
            <div class="text-h6">Monthly Active Users (Last 6 Months)</div>
            <canvas ref="monthlyActiveUsersChart" class="chart-canvas"></canvas>
          </q-card-section>
        </q-card>

        <!-- Average Fare - Numerical Widget -->
        <q-card class="col-4">
          <q-card-section>
            <div class="text-h6">Average Fare</div>
            <div class="text-h4">₹{{ stats.averageFare }}</div>
          </q-card-section>
        </q-card>

        <!-- Additional Insights Placeholders -->
        <!-- You can add more charts or widgets here to reach 20 insights -->
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useQuasar } from 'quasar';
import Chart from 'chart.js/auto';
import { supabase } from 'boot/supabase';

// Quasar instance for notifications
const $q = useQuasar();

// Refs for Chart.js canvases
const tripsOverviewChart = ref(null);
const ticketsSalesChart = ref(null);
const monthlyRevenueChart = ref(null);
const userDistributionChart = ref(null);
const vehicleUtilizationChart = ref(null);
const topRoutesChart = ref(null);
const topStopsChart = ref(null);
const activeTripsChart = ref(null);
const tripsByVehicleChart = ref(null);
const ticketsByConductorChart = ref(null);
const schedulesTodayChart = ref(null);
const avgTripDurationChart = ref(null);
const dailyActiveUsersChart = ref(null);
const monthlyActiveUsersChart = ref(null);

// Chart instances to manage lifecycle
const chartInstances = ref([]);

// Stats object
const stats = ref({
  totalUsers: 0,
  activeVehicles: 0,
  totalTrips: 0,
  ticketsSoldToday: 0,
  revenueToday: 0,
  tripsInProgress: 0,
  completedTrips: 0,
  averageFare: 0,
});

// Charts data placeholders
const charts = ref({
  tripsOverview: {},
  ticketsSales: {},
  monthlyRevenue: {},
  userDistribution: {},
  vehicleUtilization: {},
  topRoutes: {},
  topStops: {},
  activeTrips: {},
  tripsByVehicle: {},
  ticketsByConductor: {},
  schedulesToday: {},
  avgTripDuration: {},
  dailyActiveUsers: {},
  monthlyActiveUsers: {},
});

// Chart options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart Title',
    },
  },
};

// Initialize all charts
function initializeCharts() {
  // Trips Overview - Line Chart (Monthly Trips)
  const tripsOverviewCtx = tripsOverviewChart.value.getContext('2d');
  const tripsOverview = new Chart(tripsOverviewCtx, {
    type: 'line',
    data: charts.value.tripsOverview,
    options: chartOptions,
  });
  chartInstances.value.push(tripsOverview);

  // Tickets Sales - Bar Chart (Weekly)
  const ticketsSalesCtx = ticketsSalesChart.value.getContext('2d');
  const ticketsSales = new Chart(ticketsSalesCtx, {
    type: 'bar',
    data: charts.value.ticketsSales,
    options: chartOptions,
  });
  chartInstances.value.push(ticketsSales);

  // Monthly Revenue - Pie Chart
  const monthlyRevenueCtx = monthlyRevenueChart.value.getContext('2d');
  const monthlyRevenue = new Chart(monthlyRevenueCtx, {
    type: 'pie',
    data: charts.value.monthlyRevenue,
    options: chartOptions,
  });
  chartInstances.value.push(monthlyRevenue);

  // User Distribution by Type - Doughnut Chart
  const userDistributionCtx = userDistributionChart.value.getContext('2d');
  const userDistribution = new Chart(userDistributionCtx, {
    type: 'doughnut',
    data: charts.value.userDistribution,
    options: chartOptions,
  });
  chartInstances.value.push(userDistribution);

  // Vehicle Utilization - Bar Chart (Top 5)
  const vehicleUtilizationCtx = vehicleUtilizationChart.value.getContext('2d');
  const vehicleUtilization = new Chart(vehicleUtilizationCtx, {
    type: 'bar',
    data: charts.value.vehicleUtilization,
    options: chartOptions,
  });
  chartInstances.value.push(vehicleUtilization);

  // Top Routes by Trips - Bar Chart
  const topRoutesCtx = topRoutesChart.value.getContext('2d');
  const topRoutes = new Chart(topRoutesCtx, {
    type: 'bar',
    data: charts.value.topRoutes,
    options: chartOptions,
  });
  chartInstances.value.push(topRoutes);

  // Top Stops by Ticket Sales - Horizontal Bar Chart
  const topStopsCtx = topStopsChart.value.getContext('2d');
  const topStops = new Chart(topStopsCtx, {
    type: 'bar',
    data: charts.value.topStops,
    options: {
      ...chartOptions,
      indexAxis: 'y',
    },
  });
  chartInstances.value.push(topStops);

  // Active Trips - Line Chart (Daily)
  const activeTripsCtx = activeTripsChart.value.getContext('2d');
  const activeTrips = new Chart(activeTripsCtx, {
    type: 'line',
    data: charts.value.activeTrips,
    options: chartOptions,
  });
  chartInstances.value.push(activeTrips);

  // Trips by Vehicle - Bar Chart
  const tripsByVehicleCtx = tripsByVehicleChart.value.getContext('2d');
  const tripsByVehicle = new Chart(tripsByVehicleCtx, {
    type: 'bar',
    data: charts.value.tripsByVehicle,
    options: chartOptions,
  });
  chartInstances.value.push(tripsByVehicle);

  /*
  // Tickets by Conductor - Horizontal Bar Chart
  const ticketsByConductorCtx = ticketsByConductorChart.value.getContext('2d');
  const ticketsByConductor = new Chart(ticketsByConductorCtx, {
    type: 'bar',
    data: charts.value.ticketsByConductor,
    options: {
      ...chartOptions,
      indexAxis: 'y',
    },
  });
  chartInstances.value.push(ticketsByConductor);
  */

  // Schedules Today - Doughnut Chart
  const schedulesTodayCtx = schedulesTodayChart.value.getContext('2d');
  const schedulesToday = new Chart(schedulesTodayCtx, {
    type: 'doughnut',
    data: charts.value.schedulesToday,
    options: chartOptions,
  });
  chartInstances.value.push(schedulesToday);

  // Average Trip Duration - Line Chart (Weekly)
  const avgTripDurationCtx = avgTripDurationChart.value.getContext('2d');
  const avgTripDuration = new Chart(avgTripDurationCtx, {
    type: 'line',
    data: charts.value.avgTripDuration,
    options: chartOptions,
  });
  chartInstances.value.push(avgTripDuration);

  /*
  // Daily Active Users - Line Chart (Last 7 Days)
  const dailyActiveUsersCtx = dailyActiveUsersChart.value.getContext('2d');
  const dailyActiveUsers = new Chart(dailyActiveUsersCtx, {
    type: 'line',
    data: charts.value.dailyActiveUsers,
    options: chartOptions,
  });
  chartInstances.value.push(dailyActiveUsers);

  // Monthly Active Users - Line Chart (Last 6 Months)
  const monthlyActiveUsersCtx = monthlyActiveUsersChart.value.getContext('2d');
  const monthlyActiveUsers = new Chart(monthlyActiveUsersCtx, {
    type: 'line',
    data: charts.value.monthlyActiveUsers,
    options: chartOptions,
  });
  chartInstances.value.push(monthlyActiveUsers);
  */
}

// Destroy all chart instances to prevent memory leaks
function destroyCharts() {
  chartInstances.value.forEach(chart => {
    chart.destroy();
  });
  chartInstances.value = [];
}

// Fetch data and prepare charts
async function fetchDataAndPrepareCharts() {
  try {
    // 1. Total Users
    const { count: totalUsers, error: totalUsersError } = await supabase
      .from('user')
      .select('*', { count: 'exact', head: true });
    if (totalUsersError) throw totalUsersError;
    stats.value.totalUsers = totalUsers || 0;

    // 2. Active Vehicles (assuming 'current_location' is non-null implies active)
    const { count: activeVehicles, error: activeVehiclesError } = await supabase
      .from('vehicle')
      .select('*', { count: 'exact', head: true })
      .not('current_location', 'is', null);
    if (activeVehiclesError) throw activeVehiclesError;
    stats.value.activeVehicles = activeVehicles || 0;

    // 3. Total Trips
    const { count: totalTrips, error: totalTripsError } = await supabase
      .from('trip')
      .select('*', { count: 'exact', head: true });
    if (totalTripsError) throw totalTripsError;
    stats.value.totalTrips = totalTrips || 0;

    // 4. Tickets Sold Today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    const { count: ticketsSoldToday, error: ticketsSoldTodayError } = await supabase
      .from('ticket')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today.toISOString())
      .lt('created_at', tomorrow.toISOString());
    if (ticketsSoldTodayError) throw ticketsSoldTodayError;
    stats.value.ticketsSoldToday = ticketsSoldToday || 0;

    // 5. Revenue Today
    const { data: ticketsToday, error: ticketsTodayError } = await supabase
      .from('ticket')
      .select('fare')
      .gte('created_at', today.toISOString())
      .lt('created_at', tomorrow.toISOString());
    if (ticketsTodayError) throw ticketsTodayError;
    const totalRevenue = ticketsToday.reduce((acc, ticket) => acc + parseFloat(ticket.fare || 0), 0);
    stats.value.revenueToday = totalRevenue.toFixed(2);

    // 6. Trips In Progress
    const { count: tripsInProgress, error: tripsInProgressError } = await supabase
      .from('trip')
      .select('*', { count: 'exact', head: true })
      .not('actual_start_time', 'is', null)
      .is('actual_end_time', null);
    if (tripsInProgressError) throw tripsInProgressError;
    stats.value.tripsInProgress = tripsInProgress || 0;

    // 7. Completed Trips
    const { count: completedTrips, error: completedTripsError } = await supabase
      .from('trip')
      .select('*', { count: 'exact', head: true })
      .not('actual_end_time', 'is', null);
    if (completedTripsError) throw completedTripsError;
    stats.value.completedTrips = completedTrips || 0;

    // 8. Top 5 Routes by Trips
    const { data: tripsByRoute, error: tripsByRouteError } = await supabase
      .from('trip')
      .select('route_id', { count: 'exact', head: false });
    if (tripsByRouteError) throw tripsByRouteError;
    const routeCountMap = {};
    tripsByRoute.forEach(trip => {
      const rid = trip.route_id;
      if (rid) routeCountMap[rid] = (routeCountMap[rid] || 0) + 1;
    });
    const sortedRoutes = Object.entries(routeCountMap).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const routeLabels = sortedRoutes.map(entry => entry[0]);
    const routeData = sortedRoutes.map(entry => entry[1]);


    // Fetch route names
    let routeNameMap = {};
    if (routeLabels.length > 0) {
      const { data: routeNames, error: routeNamesError } = await supabase
        .from('route')
        .select('id, route_no')
        .in('id', routeLabels);
      if (routeNamesError) throw routeNamesError;
      
      routeNames.forEach(route => {
        routeNameMap[route.id] = route.route_no;
      });
    }
    const routeLabelsNames = routeLabels.map(id => routeNameMap[id] || id);

    // Prepare Top Routes Chart Data
    charts.value.topRoutes = {
      labels: routeLabelsNames,
      datasets: [{
        label: 'Trips',
        data: routeData,
        backgroundColor: '#26A69A',
      }]
    };

    // 9. Monthly Revenue
    const { data: revenueMonthly, error: revenueMonthlyError } = await supabase
      .from('ticket')
      .select('fare, created_at')
      .gte('created_at', new Date(new Date().getFullYear(), 0, 1).toISOString());
    if (revenueMonthlyError) throw revenueMonthlyError;
    const revenueByMonth = Array(12).fill(0);
    revenueMonthly.forEach(ticket => {
      const month = new Date(ticket.created_at).getMonth();
      revenueByMonth[month] += parseFloat(ticket.fare) || 0;
    });
    charts.value.monthlyRevenue = {
      labels: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      datasets: [{
        label: 'Revenue (₹)',
        data: revenueByMonth.map(amount => amount.toFixed(2)),
        backgroundColor: '#FFA726',
      }]
    };

    // 10. Tickets Sales - Weekly Bar Chart
    const { data: ticketsWeekly, error: ticketsWeeklyError } = await supabase
      .from('ticket')
      .select('created_at')
      .gte('created_at', new Date(new Date().setDate(new Date().getDate() - 7)).toISOString());
    if (ticketsWeeklyError) throw ticketsWeeklyError;
    const ticketsByDay = Array(7).fill(0);
    ticketsWeekly.forEach(ticket => {
      const day = new Date(ticket.created_at).getDay(); // 0 (Sunday) to 6 (Saturday)
      ticketsByDay[day]++;
    });
    charts.value.ticketsSales = {
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      datasets: [{
        label: 'Tickets Sold',
        data: ticketsByDay,
        backgroundColor: '#66BB6A',
      }]
    };

    // 11. User Distribution by Type - Doughnut Chart
    const { data: usersByType, error: usersByTypeError } = await supabase
      .from('user')
      .select('type', { count: 'exact', head: false });
    if (usersByTypeError) throw usersByTypeError;
    const userTypesCount = {
      admin: 0,
      regular: 0,
      driver: 0,
      conductor: 0,
      other: 0,
    };
    usersByType.forEach(user => {
      if (user.type && userTypesCount.hasOwnProperty(user.type)) {
        userTypesCount[user.type]++;
      } else {
        userTypesCount.other++;
      }
    });
    charts.value.userDistribution = {
      labels: Object.keys(userTypesCount),
      datasets: [{
        label: 'Users',
        data: Object.values(userTypesCount),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      }]
    };

    // 12. Vehicle Utilization - Top 5 Vehicles by Trips
    const { data: tripsByVehicle, error: tripsByVehicleError } = await supabase
      .from('trip')
      .select('vehicle_id', { count: 'exact', head: false });
    if (tripsByVehicleError) throw tripsByVehicleError;
    const vehicleCountMap = {};
    tripsByVehicle.forEach(trip => {
      const vid = trip.vehicle_id;
      if (vid) vehicleCountMap[vid] = (vehicleCountMap[vid] || 0) + 1;
    });
    const sortedVehicles = Object.entries(vehicleCountMap).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const vehicleLabels = sortedVehicles.map(entry => entry[0]);
    const vehicleData = sortedVehicles.map(entry => entry[1]);

    // Fetch vehicle registration numbers
    let vehicleNameMap = {};
    if (vehicleLabels.length > 0) {
        const { data: vehicleNames, error: vehicleNamesError } = await supabase
        .from('vehicle')
        .select('id, registration_no')
        .in('id', vehicleLabels);
        if (vehicleNamesError) throw vehicleNamesError;
        vehicleNames.forEach(vehicle => {
            vehicleNameMap[vehicle.id] = vehicle.registration_no;
        });
    }
    const vehicleLabelsNames = vehicleLabels.map(id => vehicleNameMap[id] || id);

    charts.value.vehicleUtilization = {
      labels: vehicleLabelsNames,
      datasets: [{
        label: 'Trips',
        data: vehicleData,
        backgroundColor: '#AB47BC',
      }]
    };

    // 13. Top 5 Stops by Ticket Sales - Horizontal Bar Chart
    const { data: ticketsByStop, error: ticketsByStopError } = await supabase
      .from('ticket')
      .select('source_stop_id, destination_stop_id');
    if (ticketsByStopError) throw ticketsByStopError;
    const stopCountMap = {};
    ticketsByStop.forEach(ticket => {
      const source = ticket.source_stop_id;
      const destination = ticket.destination_stop_id;
      if (source) {
        stopCountMap[source] = (stopCountMap[source] || 0) + 1;
      }
      if (destination) {
        stopCountMap[destination] = (stopCountMap[destination] || 0) + 1;
      }
    });
    const sortedStops = Object.entries(stopCountMap).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const stopLabels = sortedStops.map(entry => entry[0]);
    const stopData = sortedStops.map(entry => entry[1]);

    // Fetch stop names
    let stopNameMap = {};
    if (stopLabels.length > 0) {
        const { data: stopNames, error: stopNamesError } = await supabase
        .from('stop')
        .select('id, name')
        .in('id', stopLabels);
        if (stopNamesError) throw stopNamesError;
        stopNames.forEach(stop => {
            stopNameMap[stop.id] = stop.name;
        });
    }
    const stopLabelsNames = stopLabels.map(id => stopNameMap[id] || id);

    charts.value.topStops = {
      labels: stopLabelsNames,
      datasets: [{
        label: 'Tickets Sold',
        data: stopData,
        backgroundColor: '#EC407A',
      }]
    };

    // 14. Active Trips - Line Chart (Daily)
    const { data: activeTrips, error: activeTripsError } = await supabase
      .from('trip')
      .select('actual_start_time, actual_end_time')
      .gte('actual_start_time', today.toISOString());
    if (activeTripsError) throw activeTripsError;
    const activeTripsByDay = Array(7).fill(0);
    activeTrips.forEach(trip => {
      const day = new Date(trip.actual_start_time).getDay(); // 0-6
      activeTripsByDay[day]++;
    });
    charts.value.activeTrips = {
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      datasets: [{
        label: 'Active Trips',
        data: activeTripsByDay,
        backgroundColor: '#FF7043',
      }]
    };

    // 15. Trips by Vehicle - Bar Chart
    const { data: tripsByVehicleData, error: tripsByVehicleDataError } = await supabase
      .from('trip')
      .select('vehicle_id', { count: 'exact', head: false });
    if (tripsByVehicleDataError) throw tripsByVehicleDataError;
    const tripsVehicleMap = {};
    tripsByVehicleData.forEach(trip => {
      const vid = trip.vehicle_id;
      if (vid) tripsVehicleMap[vid] = (tripsVehicleMap[vid] || 0) + 1;
    });
    const sortedTripsByVehicle = Object.entries(tripsVehicleMap).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const tripsByVehicleLabels = sortedTripsByVehicle.map(entry => entry[0]);
    const tripsByVehicleCounts = sortedTripsByVehicle.map(entry => entry[1]);

    // Fetch vehicle registration numbers
    let tripsByVehicleNameMap = {};
    if (tripsByVehicleLabels.length > 0) {
        const { data: tripsByVehicleNames, error: tripsByVehicleNamesError } = await supabase
        .from('vehicle')
        .select('id, registration_no')
        .in('id', tripsByVehicleLabels);
        if (tripsByVehicleNamesError) throw tripsByVehicleNamesError;
        tripsByVehicleNames.forEach(vehicle => {
            tripsByVehicleNameMap[vehicle.id] = vehicle.registration_no;
        });
    }
    const tripsByVehicleLabelsNames = tripsByVehicleLabels.map(id => tripsByVehicleNameMap[id] || id);

    charts.value.tripsByVehicle = {
      labels: tripsByVehicleLabelsNames,
      datasets: [{
        label: 'Trips',
        data: tripsByVehicleCounts,
        backgroundColor: '#42A5F5',
      }]
    };

    // 16. Tickets by Conductor - Horizontal Bar Chart (Removed due to schema mismatch)
    charts.value.ticketsByConductor = {
      labels: [],
      datasets: []
    };

    // 17. Schedules Today - Doughnut Chart
    // Assuming schedules are daily recurring, so we count all active schedules
    const { data: schedulesToday, error: schedulesTodayError } = await supabase
      .from('schedule')
      .select('*');
    if (schedulesTodayError) throw schedulesTodayError;
    charts.value.schedulesToday = {
      labels: ['Total Schedules', 'Other'],
      datasets: [{
        label: 'Schedules',
        data: [schedulesToday.length, 0], 
        backgroundColor: ['#26C6DA', '#B0BEC5'],
      }]
    };

    // 18. Average Trip Duration - Line Chart (Weekly)
    const { data: tripsDuration, error: tripsDurationError } = await supabase
      .from('trip')
      .select('actual_start_time, actual_end_time')
      .gte('actual_start_time', new Date(new Date().setDate(new Date().getDate() - 7)).toISOString())
      .not('actual_end_time', 'is', null);
    if (tripsDurationError) throw tripsDurationError;
    const durationByDay = Array(7).fill(0);
    const tripCountsByDay = Array(7).fill(0);
    tripsDuration.forEach(trip => {
      const day = new Date(trip.actual_start_time).getDay();
      const start = new Date(trip.actual_start_time);
      const end = new Date(trip.actual_end_time);
      const duration = (end - start) / (1000 * 60 * 60); // duration in hours
      durationByDay[day] += duration;
      tripCountsByDay[day]++;
    });
    const avgDurationByDay = durationByDay.map((total, index) => tripCountsByDay[index] ? (total / tripCountsByDay[index]).toFixed(2) : 0);
    charts.value.avgTripDuration = {
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      datasets: [{
        label: 'Avg Duration (hrs)',
        data: avgDurationByDay,
        backgroundColor: '#FF5252',
        fill: false,
        borderColor: '#FF5252',
        tension: 0.1,
      }]
    };

    // 19. Daily Active Users - Line Chart (Last 7 Days) - REMOVED due to missing table
    charts.value.dailyActiveUsers = {
      labels: [],
      datasets: []
    };

    // 20. Monthly Active Users - Line Chart (Last 6 Months) - REMOVED due to missing table
    charts.value.monthlyActiveUsers = {
        labels: [],
        datasets: []
    };

    // 21. Average Fare
    const { data: fares, error: faresError } = await supabase
      .from('ticket')
      .select('fare');
    if (faresError) throw faresError;
    const numericFares = fares.map(ticket => parseFloat(ticket.fare)).filter(fare => !isNaN(fare));
    const averageFare = numericFares.length > 0 ? (numericFares.reduce((acc, fare) => acc + fare, 0) / numericFares.length).toFixed(2) : 0;
    stats.value.averageFare = averageFare;

  } catch (error) {
    console.error(error);
    $q.notify({ type: 'negative', message: 'Failed to fetch dashboard data' });
  }
}

// Lifecycle Hooks
onMounted(async () => {
  await fetchDataAndPrepareCharts();
  initializeCharts();
});

onBeforeUnmount(() => {
  destroyCharts();
});

// Initialize charts after data is fetched
// All chart data is stored in the `charts` ref and used to create Chart.js instances
</script>

<style scoped>
.chart-canvas {
  width: 100%;
  height: 200px;
}
</style>
