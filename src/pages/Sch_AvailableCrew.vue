<template>
  <!-- Crew Management Section -->
  <div class="crew-management">
    <h3>Manage Crew</h3>

    <!-- Filter Dropdown -->
    <div class="q-mb-md">
      <q-select
        v-model="availabilityFilter"
        filled
        :options="filterOptions"
        label="Filter by Availability"
        @input="filterCrew"
      />
    </div>

    <!-- Crew Table -->
    <q-table
      :rows="filteredCrewList"
      :columns="columns"
      row-key="id"
      :loading="false"
      class="q-mb-md"
    >
      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            label="Edit"
            color="primary"
            class="q-mr-sm rounded-full"
            @click.stop="editCrew(props.row)"
          />
          <q-btn
            flat
            label="Delete"
            color="negative"
            class="rounded-full"
            @click.stop="deleteCrew(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  name: "SchedularAvailability",
  data() {
    return {
      employeeName: "Sumit", // Replace with dynamic data
      availabilityFilter: "all", // filter options: all, available, not-available
      crewList: [
        {
          id: 1,
          employeeId: "001",
          name: "Sumit",
          crewType: "Driver",
          status: "Available",
          remainingHours: 40,
        },
        {
          id: 2,
          employeeId: "002",
          name: "Oats",
          crewType: "Conductor",
          status: "Not Available",
          remainingHours: 30,
        },
        {
          id: 3,
          employeeId: "003",
          name: "Roni",
          crewType: "Driver",
          status: "Available",
          remainingHours: 35,
        },
        {
          id: 4,
          employeeId: "004",
          name: "Deep",
          crewType: "Conductor",
          status: "Not Available",
          remainingHours: 25,
        },
        {
          id: 5,
          employeeId: "005",
          name: "Yuvraj",
          crewType: "Conductor",
          status: "Available",
          remainingHours: 29,
        },
        {
          id: 6,
          employeeId: "006",
          name: "Arohi",
          crewType: "Driver",
          status: "Not Available",
          remainingHours: 32,
        },
      ],
      filteredCrewList: [], // Store the filtered crew list
      filterOptions: [
        { label: "All", value: "all" },
        { label: "Available", value: "available" },
        { label: "Not Available", value: "not-available" },
      ],
      columns: [
        {
          name: "employeeId",
          label: "Employee ID",
          align: "left",
          field: "employeeId",
        },
        { name: "name", label: "Name", align: "left", field: "name" },
        {
          name: "crewType",
          label: "Crew Type",
          align: "left",
          field: "crewType",
        },
        { name: "status", label: "Status", align: "center", field: "status" },
        {
          name: "remainingHours",
          label: "Remaining Working Hours",
          align: "center",
          field: "remainingHours",
        },
        { name: "actions", label: "Actions", align: "center" },
      ],
    };
  },
  watch: {
    // Watch for changes to availabilityFilter and update filteredCrewList
    availabilityFilter() {
      this.filterCrew();
    },
  },
  mounted() {
    this.filterCrew(); // Initialize the filtered list on mount
  },
  methods: {
    // Filter crew list based on the selected filter
    filterCrew() {
      if (this.availabilityFilter === "all") {
        this.filteredCrewList = this.crewList;
      } else {
        this.filteredCrewList = this.crewList.filter(
          (crew) => crew.status.toLowerCase() === this.availabilityFilter
        );
      }
    },
    editCrew(crew) {
      console.log("Editing crew:", crew);
      // Add your edit logic here (e.g., show a modal to update crew details)
    },
    deleteCrew(crewId) {
      this.crewList = this.crewList.filter((crew) => crew.id !== crewId);
      this.filterCrew(); // Reapply the filter after deletion
      console.log("Deleted crew with ID:", crewId);
    },
  },
};
</script>

<style scoped>
/* Crew Management Page Styling */
.page-body {
  padding: 20px;
  background-color: #f4f6f9;
}

/* Crew Table Styling */
.crew-management table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 12px;
}

.q-table__th {
  background-color: #ff8f8f;
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.q-table__td {
  padding: 12px;
  font-size: 0.95rem;
  color: #555;
  border-bottom: 1px solid #eee;
}

.q-table__row:hover {
  background-color: #f1f1f1;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* Button Styling */
.q-btn {
  padding: 8px 16px;
  border-radius: 30px;
  font-size: 0.875rem;
}

.q-btn:hover {
  background-color: #e1e1e1;
}

/* Filter Dropdown Styling */
.q-select {
  max-width: 250px;
  margin-bottom: 16px;
}

/* Status Classes */
.available {
  color: green;
}

.not-available {
  color: red;
}
/* Table Actions Styling */
.q-btn-flat {
  font-size: 0.875rem;
  padding: 6px 12px;
  border-radius: 16px;
  margin: 0 4px;
}

.q-btn-flat:hover {
  background-color: #f0f0f0;
}
</style>
