<template>
  <q-page padding>
    <div class="dashboard-wrapper">
      <!-- Route 101 Section (Mehrauli Terminal to Nizamuddin Railway Station) -->
      <div class="route-section border-wrapper">
        <div class="row q-col-gutter-md q-mt-md">
          <div class="col-4">
            <q-card bordered class="rounded-card light-theme-card">
              <q-card-section>
                <div class="text-h6">Route 101 Information</div>

                <!-- Route No -->
                <div class="q-mt-md">
                  <q-input
                    v-model="routeNo1"
                    filled
                    label="Route No"
                    readonly
                  />
                </div>

                <!-- Source -->
                <div class="q-mt-md">
                  <q-input v-model="source1" filled label="Source" readonly />
                </div>

                <!-- Destination -->
                <div class="q-mt-md">
                  <q-input
                    v-model="destination1"
                    filled
                    label="Destination"
                    readonly
                  />
                </div>
              </q-card-section>
            </q-card>
          </div>

          <!-- Traffic Chart Section for Route 101 -->
          <div class="col-8">
            <q-card bordered class="rounded-card light-theme-card larger-card">
              <q-card-section>
                <div class="text-h6">Route 101 Traffic & Bus Operations</div>

                <!-- Chart Container -->
                <div class="q-mt-md" @click="toggleGraph1">
                  <!-- Customer Traffic Chart -->
                  <div
                    v-show="currentGraph1 === 'customer'"
                    class="chart-container"
                    :class="{ 'chart-active': currentGraph1 === 'customer' }"
                  >
                    <canvas id="trafficChartCustomer1"></canvas>
                  </div>

                  <!-- Buses Operated Chart -->
                  <div
                    v-show="currentGraph1 === 'bus'"
                    class="chart-container"
                    :class="{ 'chart-active': currentGraph1 === 'bus' }"
                  >
                    <canvas id="trafficChartBus1"></canvas>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <!-- Route 102 Section (Ambedkar Nagar to Inderpuri (Krishikunj)) -->
      <div class="route-section border-wrapper">
        <div class="row q-col-gutter-md q-mt-md">
          <div class="col-4">
            <q-card bordered class="rounded-card light-theme-card">
              <q-card-section>
                <div class="text-h6">Route 102 Information</div>

                <!-- Route No -->
                <div class="q-mt-md">
                  <q-input
                    v-model="routeNo2"
                    filled
                    label="Route No"
                    readonly
                  />
                </div>

                <!-- Source -->
                <div class="q-mt-md">
                  <q-input v-model="source2" filled label="Source" readonly />
                </div>

                <!-- Destination -->
                <div class="q-mt-md">
                  <q-input
                    v-model="destination2"
                    filled
                    label="Destination"
                    readonly
                  />
                </div>
              </q-card-section>
            </q-card>
          </div>

          <!-- Traffic Chart Section for Route 102 -->
          <div class="col-8">
            <q-card bordered class="rounded-card light-theme-card larger-card">
              <q-card-section>
                <div class="text-h6">Route 102 Traffic & Bus Operations</div>

                <!-- Chart Container -->
                <div class="q-mt-md" @click="toggleGraph2">
                  <!-- Customer Traffic Chart -->
                  <div
                    v-show="currentGraph2 === 'customer'"
                    class="chart-container"
                    :class="{ 'chart-active': currentGraph2 === 'customer' }"
                  >
                    <canvas id="trafficChartCustomer2"></canvas>
                  </div>

                  <!-- Buses Operated Chart -->
                  <div
                    v-show="currentGraph2 === 'bus'"
                    class="chart-container"
                    :class="{ 'chart-active': currentGraph2 === 'bus' }"
                  >
                    <canvas id="trafficChartBus2"></canvas>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import Chart from "chart.js/auto";

export default defineComponent({
  name: "RouteTrafficAnalysis",
  setup() {
    // Route 101 Info (Mehrauli Terminal to Nizamuddin Railway Station)
    const routeNo1 = ref("101");
    const source1 = ref("Mehrauli Terminal");
    const destination1 = ref("Nizamuddin Railway Station");
    const currentGraph1 = ref("customer");

    // Route 102 Info (Ambedkar Nagar to Inderpuri (Krishikunj))
    const routeNo2 = ref("102");
    const source2 = ref("Ambedkar Nagar");
    const destination2 = ref("Inderpuri (Krishikunj)Oashe");
    const currentGraph2 = ref("customer");

    // Data for charts (same data used for both routes for simplicity)
    const customerTrafficData = ref({
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Customer Traffic",
          data: [100, 120, 150, 180, 200, 190, 250],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          fill: true,
        },
      ],
    });

    const busData = ref({
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Buses Operated",
          data: [5, 6, 7, 8, 9, 7, 6],
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          fill: true,
        },
      ],
    });

    const chartInstances = ref({});

    // Create chart instance for customer traffic
    const createChart = (canvasId, chartData) => {
      return new Chart(document.getElementById(canvasId).getContext("2d"), {
        type: "line",
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };

    // Create charts for both routes when mounted
    onMounted(() => {
      chartInstances.value.route101Customer = createChart(
        "trafficChartCustomer1",
        customerTrafficData.value
      );
      chartInstances.value.route101Bus = createChart(
        "trafficChartBus1",
        busData.value
      );
      chartInstances.value.route102Customer = createChart(
        "trafficChartCustomer2",
        customerTrafficData.value
      );
      chartInstances.value.route102Bus = createChart(
        "trafficChartBus2",
        busData.value
      );
    });

    // Toggle between graphs for Route 101
    const toggleGraph1 = () => {
      currentGraph1.value =
        currentGraph1.value === "customer" ? "bus" : "customer";
    };

    // Toggle between graphs for Route 102
    const toggleGraph2 = () => {
      currentGraph2.value =
        currentGraph2.value === "customer" ? "bus" : "customer";
    };

    return {
      routeNo1,
      source1,
      destination1,
      currentGraph1,
      toggleGraph1,
      routeNo2,
      source2,
      destination2,
      currentGraph2,
      toggleGraph2,
    };
  },
});
</script>

<style scoped>
.dashboard-wrapper {
  background-color: #f0ecec;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(210, 48, 48, 0.1);
}

.route-section {
  margin-bottom: 40px;
  border: 2px solid #e0e0e0; /* Add border to each route section */
  border-radius: 12px;
  padding: 20px;
  background-color: #fff;
}

.border-wrapper {
  border: 2px solid #007bff; /* Border for each route section */
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
}

.light-theme-card {
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
}

.rounded-card {
  border-radius: 12px;
}

.q-card-section {
  padding: 20px;
  padding-left: 0;
  margin-left: 0;
}

/* Increased height for the traffic card */
.larger-card {
  min-height: 475px;
  padding: 10px;
}

/* Chart Container Styling */
.chart-container {
  position: absolute;
  width: 95%;
  height: 350px;
  transition: opacity 0.7s ease-in-out, visibility 0s linear 0.7s;
  opacity: 0;
  visibility: hidden;
}

.chart-active {
  opacity: 1;
  visibility: visible;
}

canvas {
  width: 100% !important;
  height: 350px !important;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Optional: Style for the labels and inputs on the left side */
.q-input__control {
  background-color: #fff !important;
}

.q-mt-md {
  margin-top: 12px !important;
}
</style>
