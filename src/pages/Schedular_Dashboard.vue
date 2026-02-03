<template>
  <q-page padding>
      <!-- Dashboard Wrapper with Light Theme -->
      <div class="dashboard-wrapper">

          <!-- Combined Profile and Performance Section -->

          <div class="row q-col-gutter-md q-mt-md">
              <div class="col-4">
                  <q-card bordered class="rounded-card light-theme-card">
                      <q-card-section>
                          <!-- Profile Section -->
                          <div class="row items-center no-wrap">
                              <q-avatar size="64px">
                                  <img src="src/assets/Screenshot 2024-12-08 at 05.52.42.png" alt="Worker Avatar" />
                              </q-avatar>
                              <div class="q-ml-md">
                                  <div class="text-weight-bold text-h6">Ginger</div>
                                  <div class="text-grey">Planner</div>
                              </div>
                          </div>
                      </q-card-section>
                      <q-separator />
                      <q-card-section>
                          <div class="text-body1 q-mt-md">Email: ginger@kitkat.com</div>
                          <div class="text-body1 q-mt-sm">Phone: +91 1234567890</div>
                      </q-card-section>
                  </q-card>
                  <q-card bordered class="rounded-card light-theme-card q-mt-md">
                      <!-- Performance Section -->
                      <q-card-section class="Performance">
                          <div class="text-h6">Performance Metrics</div>
                          <div class="q-mt-md">
                              <div class="row items-center justify-between">
                                  <div>discuss with sir </div>
                                  <div class="text-positive">discuss</div>
                              </div>
                              <div class="row items-center justify-between q-mt-sm">
                                  <div>discuss with sir</div>
                                  <div class="text-positive">discuss</div>
                              </div>
                          </div>
                      </q-card-section>
                  </q-card>
              </div>
              <!-- Activity Section with Graph -->
              <div class="col-8">
                  <q-card bordered class="rounded-card light-theme-card">
                      <q-card-section>
                          <div class="text-h6">Tickets Booked</div>
                          <div class="q-mt-md">
                              <canvas id="ticketsChart"></canvas>
                          </div>
                      </q-card-section>
                  </q-card>
              </div>
          </div>
          <!-- Stats Cards -->
          <div class="row q-col-gutter-md q-mt-md">
              <div class="col-3" v-for="(stat, index) in stats" :key="index">
                  <q-card bordered class="rounded-card light-theme-card">
                      <q-card-section>
                          <div class="text-h6">{{ stat.title }}</div>
                          <div class="text-h4 q-mt-md">{{ stat.value }}</div>
                      </q-card-section>
                  </q-card>
              </div>
          </div>
          <!-- Hot News Section -->
          <div class="row q-col-gutter-md q-mt-md">
              <div class="col-12">
                  <q-card bordered class="rounded-card light-theme-card">
                      <q-card-section>
                          <div class="row items-center q-gutter-sm">
                              <div class="text-h6">Announcements</div>
                          </div>
                          <ul class="q-mt-md">
                              <li v-for="(news, index) in newsList" :key="index" class="text-body1">
                                  {{ news }}
                              </li>
                          </ul>
                      </q-card-section>
                  </q-card>
              </div>
          </div>
      </div>
  </q-page>
  </template>

  <script>
  import {
      defineComponent,
      onMounted,
      ref
  } from "vue";
  import Chart from "chart.js/auto";

  export default defineComponent({
      name: "DashBoard",
      setup() {
          const stats = [{
                  title: "Daily",
                  value: 120
              },
              {
                  title: "Weekly",
                  value: 850
              },
              {
                  title: "Monthly",
                  value: 3400
              },
              {
                  title: "Yearly",
                  value: 40200
              },
          ];

          const newsList = [
              "Employee of the Month: Roni Maity",
              "System Maintenance Scheduled for Dec 15.",
              "Record-breaking ticket sales yesterday!",
          ];

          onMounted(() => {
              const ctx = document.getElementById("ticketsChart").getContext("2d");
              new Chart(ctx, {
                  type: "line",
                  data: {
                      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                      datasets: [{
                          label: "Tickets Booked",
                          data: [50, 75, 100, 150, 200, 175, 225],
                          backgroundColor: "rgba(75, 192, 192, 0.2)",
                          borderColor: "rgba(75, 192, 192, 1)",
                          borderWidth: 2,
                          fill: true,
                          tension: 0.3,
                      }, ],
                  },
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
          });

          return {
              stats,
              newsList,
          };
      },
  });
  </script>

  <style>
  .Performance {
    margin-bottom: 40px;
  }
  .dashboard-wrapper {
      background-color: #f0ecec;
      padding: 16px;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(210, 48, 48, 0.1);
  }

  .light-theme-card {
      background-color: #f9f9f9;
      border: 1px solid #e0e0e0;
  }

  .rounded-card {
      border-radius: 12px;
  }

  /* Optional: Customize Icon size or styling */
  .q-icon {
      font-size: 24px;
  }
  </style>
