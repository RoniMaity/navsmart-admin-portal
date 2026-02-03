<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Main Content Area -->
    <q-page-container class="bg-light-grey">
      <!-- Main Content Section -->
      <div class="q-pa-md" style="flex-grow: 1">
        <!-- Crew Details Table Section -->
        <div class="q-card bg-white shadow-2 rounded-xl q-pa-md">
          <h3 class="q-mb-md text-h6">Crew Details</h3>
          <q-table
            :rows="crewDetails"
            :columns="columns"
            row-key="id"
            :rows-per-page-options="[5, 10, 15]"
            class="q-mt-md"
            :loading="false"
          >
            <template #body-cell-status="props">
              <q-td :props="props">
                <span
                  :class="{
                    'text-green': props.row.status === 'Assigned',
                    'text-red': props.row.status === 'Not Assigned',
                  }"
                >
                  {{ props.row.status }}
                </span>
              </q-td>
            </template>
          </q-table>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "CrewDetails",
  data() {
    return {
      crewDetails: [
        {
          name: "Sumit",
          id: "12345",
          routeNo: "101",
          vehicleNo: "XYZ1234",
          signIn: "08:00 AM",
          signOff: "05:00 PM",
          source: "YOUR SPACE",
          destination: "NST",
          status: "Assigned",
          crewType: "Driver",
          hoursWorked: "9 hours",
        },
        {
          name: "Oats",
          id: "12346",
          routeNo: "B202",
          vehicleNo: "ABC5678",
          signIn: "09:00 AM",
          signOff: "06:00 PM",
          source: "ULC",
          destination: "NST",
          status: "Not Assigned",
          crewType: "Conductor",
          hoursWorked: "---",
        },
        // Add more crew members as needed
      ],
      columns: [
        {
          name: "name",
          label: "Employee Name",
          align: "left",
          field: (row) => row.name,
        },
        {
          name: "id",
          label: "Employee ID",
          align: "left",
          field: (row) => row.id,
        },
        {
          name: "routeNo",
          label: "Bus Route No.",
          align: "left",
          field: (row) => row.routeNo,
        },
        {
          name: "vehicleNo",
          label: "Vehicle No. Assigned",
          align: "left",
          field: (row) => row.vehicleNo,
        },
        {
          name: "signIn",
          label: "Sign In",
          align: "left",
          field: (row) => row.signIn,
        },
        {
          name: "signOff",
          label: "Sign Off",
          align: "left",
          field: (row) => row.signOff,
        },
        {
          name: "source",
          label: "Source",
          align: "left",
          field: (row) => row.source,
        },
        {
          name: "destination",
          label: "Destination",
          align: "left",
          field: (row) => row.destination,
        },
        {
          name: "hoursWorked",
          label: "Hours Worked",
          align: "left",
          field: (row) => row.hoursWorked,
        },
        {
          name: "status",
          label: "Status",
          align: "center",
          field: (row) => row.status,
        },
        {
          name: "crewType",
          label: "Crew Type",
          align: "left",
          field: (row) => row.crewType,
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Roboto", sans-serif;
  background-color: #f9fafb;
  color: #333;
}

/* Table Styling */
.q-table {
  border-radius: 12px;
}

.q-table .q-th {
  background-color: #f1f6f7;
  color: #333;
  font-weight: bold;
}

.q-table .q-td {
  padding: 12px;
  font-size: 0.9rem;
}

.q-table .q-td span.text-green {
  color: green;
}

.q-table .q-td span.text-red {
  color: red;
}

/* Hover effects for rows */
.q-table .q-tr:hover {
  background-color: #f0f8ff;
  cursor: pointer;
}

/* Footer */
.q-footer {
  background: linear-gradient(
    90deg,
    #009688,
    #00bcd4
  ); /* Teal to cyan gradient */
}

.q-footer p {
  margin: 0;
}

.q-footer .q-btn {
  color: white;
}

.q-footer .q-btn:hover {
  background-color: #009688;
}

/* Card Styling for Crew Details Section */
.q-card {
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

/* Overall Layout */
.q-page-container {
  padding: 20px;
}

/* Header removal styling: keeping layout clean */
.q-header {
  display: none;
}

/* Spacing adjustments */
.q-mb-md {
  margin-bottom: 16px;
}

.text-h6 {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
