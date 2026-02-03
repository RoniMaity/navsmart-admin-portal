<template>
  <div class="page-body">
    <h1 class="page-body-head">Assign Crew</h1>

    <!-- Crew Assignment Table -->
    <div class="assignment-table">
      <table>
        <thead>
          <tr>
            <th>Driver</th>
            <th>Conductor</th>
            <th>Bus Route No.</th>
            <th>Vehicle No.</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Schedule</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- Form Row for New Assignment -->
          <tr>
            <td>
              <select v-model="selectedDriver" class="select-input">
                <option
                  v-for="driver in drivers"
                  :key="driver.id"
                  :value="driver.id"
                >
                  {{ driver.name }} (ID: {{ driver.id }})
                </option>
              </select>
            </td>

            <td>
              <select v-model="selectedConductor" class="select-input">
                <option
                  v-for="conductor in conductors"
                  :key="conductor.id"
                  :value="conductor.id"
                >
                  {{ conductor.name }} (ID: {{ conductor.id }})
                </option>
              </select>
            </td>

            <td>
              <select v-model="selectedBusRouteNo" class="select-input">
                <option v-for="bus in buses" :key="bus.id" :value="bus.id">
                  {{ bus.bus_route_no }} (ID: {{ bus.id }})
                </option>
              </select>
            </td>

            <td>
              <select v-model="selectedVehicleNo" class="select-input">
                <option
                  v-for="bus in buses"
                  :key="bus.id"
                  :value="bus.vehicle_no"
                >
                  {{ bus.vehicle_no }}
                </option>
              </select>
            </td>

            <td>
              <input
                v-model="selectedSource"
                type="text"
                class="select-input"
              />
            </td>

            <td>
              <input
                v-model="selectedDestination"
                type="text"
                class="select-input"
              />
            </td>

            <td>
              <input
                v-model="selectedSchedule"
                type="datetime-local"
                class="select-input"
              />
            </td>

            <td>
              <button class="btn-assign" @click="assignCrew">
                Assign Crew
              </button>
            </td>
          </tr>

          <!-- Current Assignments -->
          <tr v-for="assignment in assignments" :key="assignment.id">
            <td>{{ assignment.driverName }}</td>
            <td>{{ assignment.conductorName }}</td>
            <td>{{ assignment.busRouteNo }}</td>
            <td>{{ assignment.vehicleNo }}</td>
            <td>{{ assignment.source }}</td>
            <td>{{ assignment.destination }}</td>
            <td>{{ assignment.schedule }}</td>
            <td>
              <button class="btn-edit" @click="openEditDialog(assignment)">
                Edit
              </button>
              <button
                class="btn-delete"
                @click="openDeleteDialog(assignment.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit Assignment Dialog -->
    <q-dialog v-model="editDialogVisible">
      <q-card>
        <q-card-section>
          <div class="text-h6">Edit Assignment</div>
          <div class="row">
            <div class="col-12">
              <label>Driver</label>
              <select v-model="editDriver" class="select-input">
                <option
                  v-for="driver in drivers"
                  :key="driver.id"
                  :value="driver.id"
                >
                  {{ driver.name }} (ID: {{ driver.id }})
                </option>
              </select>
            </div>
            <div class="col-12">
              <label>Conductor</label>
              <select v-model="editConductor" class="select-input">
                <option
                  v-for="conductor in conductors"
                  :key="conductor.id"
                  :value="conductor.id"
                >
                  {{ conductor.name }} (ID: {{ conductor.id }})
                </option>
              </select>
            </div>
            <div class="col-12">
              <label>Bus Route No.</label>
              <select v-model="editBusRouteNo" class="select-input">
                <option v-for="bus in buses" :key="bus.id" :value="bus.id">
                  {{ bus.bus_route_no }} (ID: {{ bus.id }})
                </option>
              </select>
            </div>
            <div class="col-12">
              <label>Vehicle No.</label>
              <select v-model="editVehicleNo" class="select-input">
                <option
                  v-for="bus in buses"
                  :key="bus.id"
                  :value="bus.vehicle_no"
                >
                  {{ bus.vehicle_no }}
                </option>
              </select>
            </div>
            <div class="col-12">
              <label>Source</label>
              <input v-model="editSource" type="text" class="select-input" />
            </div>
            <div class="col-12">
              <label>Destination</label>
              <input
                v-model="editDestination"
                type="text"
                class="select-input"
              />
            </div>
            <div class="col-12">
              <label>Schedule</label>
              <input
                v-model="editSchedule"
                type="datetime-local"
                class="select-input"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions>
          <q-btn
            label="Cancel"
            color="secondary"
            flat
            @click="editDialogVisible = false"
          />
          <q-btn
            label="Confirm Edit"
            color="primary"
            flat
            @click="confirmEdit"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Delete Confirmation Dialog -->
    <q-dialog v-model="deleteDialogVisible">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            Are you sure you want to delete this assignment?
          </div>
        </q-card-section>

        <q-card-actions>
          <q-btn
            label="Cancel"
            color="secondary"
            flat
            @click="deleteDialogVisible = false"
          />
          <q-btn
            label="Delete"
            color="negative"
            flat
            @click="deleteAssignment"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "AssignCrew",
  data() {
    return {
      drivers: [
        { id: 1, name: "Roni" },
        { id: 2, name: "Sumit" },
        { id: 3, name: "Mandal" },
      ],
      conductors: [
        { id: 1, name: "Deep" },
        { id: 2, name: "Oats" },
        { id: 3, name: "Arohi" },
      ],
      buses: [
        { id: 1, bus_route_no: "Route 101", vehicle_no: "VH001" },
        { id: 2, bus_route_no: "Route 102", vehicle_no: "VH002" },
        { id: 3, bus_route_no: "Route 103", vehicle_no: "VH003" },
      ],
      assignments: [
        {
          id: 1,
          driverName: "Sumit",
          conductorName: "Deep",
          busRouteNo: "Route 101",
          vehicleNo: "VH001",
          source: "City A",
          destination: "City B",
          schedule: "2024-11-22 10:00",
        },
        {
          id: 2,
          driverName: "Oats",
          conductorName: "Arohi",
          busRouteNo: "Route 102",
          vehicleNo: "VH002",
          source: "City C",
          destination: "City D",
          schedule: "2024-11-22 12:00",
        },
      ],
      selectedDriver: null,
      selectedConductor: null,
      selectedBusRouteNo: null,
      selectedVehicleNo: null,
      selectedSource: "",
      selectedDestination: "",
      selectedSchedule: null,
      editingAssignment: null,
      deleteDialogVisible: false, // Controls the visibility of the delete confirmation dialog
      deleteDialogAssignmentId: null, // ID of the assignment to be deleted
      editDialogVisible: false, // Controls the visibility of the edit dialog
      editDriver: null,
      editConductor: null,
      editBusRouteNo: null,
      editVehicleNo: null,
      editSource: "",
      editDestination: "",
      editSchedule: null,
    };
  },
  methods: {
    // Assign Crew or update assignment if editing
    assignCrew() {
      if (
        this.selectedDriver &&
        this.selectedConductor &&
        this.selectedBusRouteNo &&
        this.selectedSchedule
      ) {
        const newAssignment = {
          id: this.assignments.length + 1,
          driverName: this.drivers.find(
            (driver) => driver.id === this.selectedDriver
          ).name,
          conductorName: this.conductors.find(
            (conductor) => conductor.id === this.selectedConductor
          ).name,
          busRouteNo: this.buses.find(
            (bus) => bus.id === this.selectedBusRouteNo
          ).bus_route_no,
          vehicleNo: this.buses.find(
            (bus) => bus.id === this.selectedBusRouteNo
          ).vehicle_no,
          source: this.selectedSource,
          destination: this.selectedDestination,
          schedule: this.selectedSchedule,
        };
        this.assignments.push(newAssignment);
        this.clearForm();
      } else {
        alert("Please fill all fields!");
      }
    },

    // Edit Assignment
    openEditDialog(assignment) {
      this.editingAssignment = assignment;
      this.editDriver = this.drivers.find(
        (driver) => driver.name === assignment.driverName
      ).id;
      this.editConductor = this.conductors.find(
        (conductor) => conductor.name === assignment.conductorName
      ).id;
      this.editBusRouteNo = this.buses.find(
        (bus) => bus.bus_route_no === assignment.busRouteNo
      ).id;
      this.editVehicleNo = assignment.vehicleNo;
      this.editSource = assignment.source;
      this.editDestination = assignment.destination;
      this.editSchedule = assignment.schedule;
      this.editDialogVisible = true;
    },

    // Confirm Edit
    confirmEdit() {
      const updatedAssignment = {
        ...this.editingAssignment,
        driverName: this.drivers.find((driver) => driver.id === this.editDriver)
          .name,
        conductorName: this.conductors.find(
          (conductor) => conductor.id === this.editConductor
        ).name,
        busRouteNo: this.buses.find((bus) => bus.id === this.editBusRouteNo)
          .bus_route_no,
        vehicleNo: this.editVehicleNo,
        source: this.editSource,
        destination: this.editDestination,
        schedule: this.editSchedule,
      };
      const index = this.assignments.findIndex(
        (assignment) => assignment.id === this.editingAssignment.id
      );
      this.assignments.splice(index, 1, updatedAssignment);
      this.editDialogVisible = false;
      this.clearForm();
    },

    // Delete Assignment
    openDeleteDialog(assignmentId) {
      this.deleteDialogAssignmentId = assignmentId;
      this.deleteDialogVisible = true;
    },

    // Delete Assignment Confirmed
    deleteAssignment() {
      const index = this.assignments.findIndex(
        (assignment) => assignment.id === this.deleteDialogAssignmentId
      );
      this.assignments.splice(index, 1);
      this.deleteDialogVisible = false;
    },

    // Clear form fields
    clearForm() {
      this.selectedDriver = null;
      this.selectedConductor = null;
      this.selectedBusRouteNo = null;
      this.selectedVehicleNo = null;
      this.selectedSource = "";
      this.selectedDestination = "";
      this.selectedSchedule = null;
    },
  },
};
</script>
<style scoped>
.page-body {
  margin-left: 240px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Crew Assignment Table */
.assignment-table {
  margin-left: 240px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

table th,
table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
  font-size: 14px;
}

table th {
  background-color: #f1f1f1;
  color: #333;
}

table tr:nth-child(even) {
  background-color: #f9f9f9;
}

table td {
  font-size: 13px;
  color: #555;
}

table .select-input {
  width: 100%;
  padding: 8px;
  font-size: 13px;
  border-radius: 6px;
  border: 1px solid #ddd;
}

/* Button Styles */
.btn-assign,
.btn-edit,
.btn-delete {
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
}

.btn-assign {
  background-color: #4caf50;
  color: white;
  border: none;
}

.btn-assign:hover {
  background-color: #45a049;
}

.btn-edit {
  background-color: #ffa500;
  color: white;
  border: none;
}

.btn-edit:hover {
  background-color: #e68900;
}

.btn-delete {
  background-color: #f44336;
  color: white;
  border: none;
}

.btn-delete:hover {
  background-color: #e53935;
}

/* Edit Assignment Dialog */
.q-card {
  max-width: 600px;
  margin: auto;
}

.q-card-section {
  padding: 20px;
}

.q-card-actions {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.q-btn {
  font-size: 14px;
  border-radius: 6px;
}

.q-btn-primary {
  background-color: #4caf50;
  color: white;
}

.q-btn-secondary {
  background-color: #f1f1f1;
  color: #333;
}

.q-btn-negative {
  background-color: #f44336;
  color: white;
}

/* Dialog Background */
.q-dialog {
  background-color: rgba(0, 0, 0, 0.4);
  padding: 20px;
}

.q-dialog .q-card {
  background-color: white;
  border-radius: 8px;
}

/* Input Fields */
select.select-input,
input.select-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 14px;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .assignment-table {
    width: 100%;
    padding: 10px;
  }

  table {
    font-size: 12px;
  }

  .btn-assign,
  .btn-edit,
  .btn-delete {
    padding: 6px 12px;
    font-size: 12px;
  }
}
</style>
