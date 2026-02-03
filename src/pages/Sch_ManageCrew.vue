<template>
  <q-page class="crew-management-page">
    <!-- Header Section -->
    <q-banner class="bg-gradient text-white shadow-2 rounded-xl q-mb-md">
      <h3>Manage Crew</h3>
    </q-banner>

    <!-- Crew Table -->
    <q-table
      :rows="crewList"
      :columns="columns"
      row-key="id"
      :loading="false"
      class="crew-table q-mb-md"
      :rows-per-page-options="[5, 10, 15]"
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

    <!-- Edit Crew Modal -->
    <div v-if="isEditing" class="modal-overlay">
      <div class="modal-content">
        <h4>Edit Crew Details</h4>
        <q-form @submit.prevent="updateCrew">
          <q-input
            v-model="currentCrew.name"
            filled
            label="Name"
            :rules="[(val) => (val && val.length > 0) || 'Name is required']"
            class="q-mb-md"
          />
          <q-input
            v-model="currentCrew.workHours"
            filled
            label="Work Hours"
            type="number"
            :rules="[
              (val) => val >= 0 || 'Work hours must be a positive number',
            ]"
            class="q-mb-md"
          />
          <q-input
            v-model="currentCrew.restHours"
            filled
            label="Rest Hours"
            type="number"
            :rules="[
              (val) => val >= 0 || 'Rest hours must be a positive number',
            ]"
            class="q-mb-md"
          />
          <div class="q-mt-md">
            <q-btn
              type="submit"
              label="Save Changes"
              color="primary"
              class="full-width"
            />
            <q-btn
              label="Cancel"
              color="secondary"
              class="full-width q-mt-xs"
              @click="isEditing = false"
            />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "CrewManagement",
  data() {
    return {
      crewList: [
        {
          id: 1,
          employeeId: "1001",
          name: "John Doe",
          workHours: 160,
          restHours: 40,
        },
        {
          id: 2,
          employeeId: "1002",
          name: "Jane Smith",
          workHours: 150,
          restHours: 50,
        },
        {
          id: 3,
          employeeId: "1003",
          name: "Samuel Lee",
          workHours: 170,
          restHours: 30,
        },
      ],
      isEditing: false,
      currentCrew: {},
      columns: [
        {
          name: "employeeId",
          label: "Employee ID",
          align: "left",
          field: "employeeId",
        },
        { name: "name", label: "Name", align: "left", field: "name" },
        {
          name: "workHours",
          label: "Work Hours",
          align: "left",
          field: "workHours",
        },
        {
          name: "restHours",
          label: "Rest Hours",
          align: "left",
          field: "restHours",
        },
        { name: "actions", label: "Actions", align: "center" },
      ],
    };
  },
  methods: {
    editCrew(crew) {
      this.currentCrew = { ...crew };
      this.isEditing = true;
    },
    updateCrew() {
      const index = this.crewList.findIndex(
        (crew) => crew.id === this.currentCrew.id
      );
      if (index !== -1) {
        this.$set(this.crewList, index, { ...this.currentCrew });
        this.isEditing = false;
      }
    },
    deleteCrew(id) {
      const index = this.crewList.findIndex((crew) => crew.id === id);
      if (index !== -1) {
        this.crewList.splice(index, 1);
      }
    },
  },
};
</script>

<style scoped>
/* Crew Management Page Styling */
.crew-management-page {
  padding: 20px;
  background-color: #f4f6f9;
}

/* Crew Table Styling */
.crew-table {
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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

.q-btn {
  padding: 8px 16px;
  border-radius: 30px;
  font-size: 0.875rem;
}

.q-btn:hover {
  background-color: #e1e1e1;
}

/* Modal Styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  width: 320px;
  animation: modal-appear 0.3s ease-in-out;
}

@keyframes modal-appear {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Banner Styling */
.q-banner {
  background: linear-gradient(90deg, #009688, #00bcd4);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.q-banner h3 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
}

/* Input Styling */
.q-input__control {
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.q-input__control:focus-within {
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.4);
}
</style>
