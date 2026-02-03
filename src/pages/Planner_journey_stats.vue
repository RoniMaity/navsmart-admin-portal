<template>
  <q-page padding>
    <!-- Outer Wrapper with Gradient -->
    <div class="dashboard-wrapper">
      <!-- Table Section -->
      <div class="table-section">
        <div class="q-mb-md">
          <q-table
            :rows="filteredTableData"
            :columns="columns"
            row-key="id"
            :pagination="pagination"
            class="my-table"
          >
            <template #top-right>
              <q-input
                v-model="filter"
                placeholder="Search"
                dense
                debounce="300"
                class="q-mr-md"
                round
                filled
                color="primary"
              />
            </template>

            <template #body="props">
              <q-tr
                :props="props"
                :class="{
                  'highlighted-row': isRowHighlighted(props.row.id),
                }"
                @mouseover="hoverRow(props.row.id)"
                @mouseleave="resetRowHover"
              >
                <q-td auto-width>
                  <div class="table-cell-content">{{ props.row.sno }}</div>
                </q-td>
                <q-td>{{ props.row.busRouteNo }}</q-td>
                <q-td>{{ props.row.vehicleNo }}</q-td>
                <q-td>{{ props.row.src }}</q-td>
                <q-td>{{ props.row.destination }}</q-td>
                <q-td>{{ props.row.signInTime }}</q-td>
                <q-td>{{ props.row.signOffTime }}</q-td>
                <q-td>{{ props.row.driverAssigned }}</q-td>
                <q-td>{{ props.row.conductorAssigned }}</q-td>
                <q-td>
                  <q-btn
                    color="primary"
                    label="More Details"
                    round
                    dense
                    flat
                    class="details-btn"
                    @click="showDetails(props.row)"
                  />
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>

      <!-- More Details Dialog -->
      <q-dialog
        v-model="showDialog"
        transition-show="scale"
        transition-hide="scale"
      >
        <q-card class="dialog-card">
          <q-card-section>
            <div class="dialog-header text-h6">More Details</div>
            <div class="dialog-content">
              <div>
                <strong>No. of Customers:</strong>
                {{ selectedRow?.noOfCustomers }}
              </div>
              <div>
                <strong>Vehicle Type Operated:</strong>
                {{ selectedRow?.vehicleTypeOperated }}
              </div>
            </div>
          </q-card-section>

          <q-card-actions>
            <q-btn
              flat
              label="Close"
              color="white"
              class="close-btn"
              @click="showDialog = false"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  name: "BusDetailsPage",
  setup() {
    // Table data
    const tableData = ref([
      {
        id: 1,
        sno: 1,
        busRouteNo: "101",
        vehicleNo: "DL 1P 1234",
        src: "Mehrauli Terminal",
        destination: "Nizamuddin Railway Station",
        signInTime: "2024-12-01 07:00",
        signOffTime: "2024-12-01 19:00",
        driverAssigned: "John Doe",
        conductorAssigned: "Jane Smith",
        noOfCustomers: 150,
        vehicleTypeOperated: "AC Bus",
      },
      {
        id: 2,
        sno: 2,
        busRouteNo: "102",
        vehicleNo: "DL 2P 5678",
        src: "Ambedkar Nagar",
        destination: "Inderpuri (Krishikunj)",
        signInTime: "2024-12-01 08:00",
        signOffTime: "2024-12-01 20:00",
        driverAssigned: "Alice Brown",
        conductorAssigned: "Bob White",
        noOfCustomers: 200,
        vehicleTypeOperated: "Non-AC Bus",
      },
    ]);

    // Table Columns
    const columns = [
      {
        name: "sno",
        label: "S.No.",
        align: "left",
        field: "sno",
        required: true,
      },
      {
        name: "busRouteNo",
        label: "Bus Route No",
        align: "left",
        field: "busRouteNo",
      },
      {
        name: "vehicleNo",
        label: "Vehicle No",
        align: "left",
        field: "vehicleNo",
      },
      { name: "src", label: "Source", align: "left", field: "src" },
      {
        name: "destination",
        label: "Destination",
        align: "left",
        field: "destination",
      },
      {
        name: "signInTime",
        label: "Sign In Time",
        align: "left",
        field: "signInTime",
      },
      {
        name: "signOffTime",
        label: "Sign Off Time",
        align: "left",
        field: "signOffTime",
      },
      {
        name: "driverAssigned",
        label: "Driver Assigned",
        align: "left",
        field: "driverAssigned",
      },
      {
        name: "conductorAssigned",
        label: "Conductor Assigned",
        align: "left",
        field: "conductorAssigned",
      },
      { name: "actions", label: "", align: "center" },
    ];

    // For search filter
    const filter = ref("");

    // Pagination settings
    const pagination = ref({
      rowsPerPage: 5,
      page: 1,
    });

    // For showing dialog
    const showDialog = ref(false);
    const selectedRow = ref(null);

    // For hover effect
    const hoveredRow = ref(null);

    // Filter the table data based on the search query
    const filteredTableData = computed(() => {
      const searchTerm = filter.value.toLowerCase();
      return tableData.value.filter((row) => {
        return Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchTerm)
        );
      });
    });

    // Show More Details Dialog
    const showDetails = (row) => {
      selectedRow.value = row;
      showDialog.value = true;
    };

    // Hover effect for table row
    const hoverRow = (rowId) => {
      hoveredRow.value = rowId;
    };

    const resetRowHover = () => {
      hoveredRow.value = null;
    };

    // Check if the row should be highlighted based on the search term and hover state
    const isRowHighlighted = (rowId) => {
      return hoveredRow.value === rowId && filter.value !== "";
    };

    return {
      tableData,
      columns,
      filter,
      pagination,
      showDialog,
      selectedRow,
      showDetails,
      hoverRow,
      resetRowHover,
      hoveredRow,
      filteredTableData,
      isRowHighlighted,
    };
  },
});
</script>

<style scoped>
/* Outer Wrapper with Gradient */
.dashboard-wrapper {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

/* Table Section Styling */
.table-section {
  margin-bottom: 40px;
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.my-table {
  width: 100%;
  border-radius: 10px;
  transition: transform 0.2s ease;
}

.details-btn {
  background-color: #007bff;
  color: #fff;
  border-radius: 15px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.details-btn:hover {
  background-color: #0056b3;
  transform: translateY(-3px);
}

.q-input__control {
  background-color: #fff;
}

/* Dialog Styling */
.dialog-card {
  width: 400px;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #f7f7f7;
}

.dialog-header {
  padding-bottom: 10px;
  border-bottom: 2px solid #007bff;
  color: #007bff;
  text-align: center;
}

.dialog-content {
  padding-top: 10px;
  font-size: 16px;
  color: #333;
}

.dialog-content strong {
  color: #007bff;
}

/* Close Button Styling */
.close-btn {
  width: 100%;
  background-color: #007bff;
  color: white;
  border-radius: 10px;
}

.close-btn:hover {
  background-color: #0056b3;
  color: white;
}

.q-card-actions {
  padding-top: 10px;
  display: flex;
  justify-content: center;
}

/* Hover effect for highlighted row */
.highlighted-row {
  background-color: #f0f8ff; /* Light blue background */
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
}
</style>
