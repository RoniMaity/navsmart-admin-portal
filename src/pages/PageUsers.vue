<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="row justify-between">
              <div class="text-h6">Users</div>
              <div class="actions">
                <q-btn
                  color="primary"
                  label="Add User"
                  @click="addUser"
                  icon="eva-plus"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12">
        <q-table
          :rows="users"
          :columns="columns"
          row-key="id"
          :rows-per-page-options="[10, 20, 0]"
          @row-click="selectUser"
        >
          <template #body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                icon="edit"
                color="primary"
                round
                flat
                @click="editUser(props.row)"
              ></q-btn>
            </q-td>
          </template>
        </q-table>
      </div>
    </div>

    <q-dialog v-model="showUserDialog">
      <q-card v-if="selectedUser">
        <q-card-section>
          <div class="text-h6">
            {{ isEdit ? 'Edit User' : 'Add User' }}
            <q-btn
              flat
              round
              dense
              icon="close"
              aria-label="Close"
              v-close-popup
              class="float-right"
            />
          </div>
        </q-card-section>

        <q-separator></q-separator>

        <q-card-section>
          <div class="row q-col-gutter-sm">
            <div class="col-12">
              <q-input
                v-model="selectedUser.username"
                placeholder="Username"
                outlined
                dense
                clearable
                autofocus
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="selectedUser.password"
                placeholder="Password"
                type="password"
                outlined
                dense
                clearable
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="selectedUser.name"
                placeholder="Name"
                outlined
                dense
                clearable
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="selectedUser.email"
                placeholder="Email"
                outlined
                dense
                clearable
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="selectedUser.phone"
                placeholder="Phone"
                outlined
                dense
                clearable
              />
            </div>
            <div class="col-12">
              <q-select
                v-model="selectedUser.type"
                :options="userTypes"
                placeholder="Type"
                outlined
                dense
                clearable
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="selectedUser.coins"
                placeholder="Coins"
                outlined
                dense
                clearable
              />
            </div>

            <div class="col-auto" v-if="isEdit">
              <q-btn
                icon="delete"
                color="negative"
                round
                flat
                @click="deleteUser"
                v-close-popup
              ></q-btn>
            </div>

            <div class="col">
              <q-btn
                label="Save"
                color="primary"
                rounded
                class="full-width"
                @click="saveUser"
              ></q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios';
import { useQuasar } from "quasar";

const $q = useQuasar();

const users = ref([]);
const selectedUser = ref(null);
const isEdit = ref(false);
const showUserDialog = ref(false);

const API_URL = `${import.meta.env.VITE_API_URL}/users`;
const userTypes = [
  { label: "Admin", value: "admin" },
  { label: "Driver", value: "driver" },
  { label: "Conductor", value: "conductor" },
  { label: "Regular", value: "regular" }
];

const columns = [
  { name: "username", label: "Username", align: "left", field: "username" },
  { name: "name", label: "Name", align: "left", field: "name" },
  { name: "email", label: "Email", align: "left", field: "email" },
  { name: "phone", label: "Phone", align: "left", field: "phone" },
  { name: "type", label: "Type", align: "left", field: "type" },
  { name: "coins", label: "Coins", align: "left", field: "coins" },
  { name: "actions", label: "Actions", align: "center", field: "actions" },
];

onMounted(() => {
  fetchUsers();
});

function getAuthHeader() {
  return { headers: { 'x-auth-token': localStorage.getItem('token') } };
}

async function fetchUsers() {
  try {
    const response = await axios.get(API_URL, getAuthHeader());
    users.value = response.data;
  } catch (error) {
    console.error(error);
    $q.notify({ type: "negative", message: "Failed to fetch users" });
  }
}

function addUser() {
  selectedUser.value = {
    username: "",
    password: "",
    name: "",
    phone: "",
    type: "regular",
    email: "",
    coins: 0,
  };
  isEdit.value = false;
  showUserDialog.value = true;
}

function editUser(user) {
  selectedUser.value = { ...user };
  isEdit.value = true;
  showUserDialog.value = true;
}

function selectUser(evt, row, idx) {
  selectedUser.value = { ...row };
}

async function saveUser() {
  const userData = { ...selectedUser.value };

  if (userData.type && typeof userData.type === 'object') {
     userData.type = userData.type.value;
  }

  try {
    $q.loading.show();
    if (isEdit.value) {
      // update existing user
      await axios.put(`${API_URL}/${userData.id}`, userData, getAuthHeader());
      $q.notify({ type: "positive", message: "User updated!" });
    } else {
      // insert new user
      await axios.post(API_URL, userData, getAuthHeader());
      $q.notify({ type: "positive", message: "User created!" });
    }
    fetchUsers();
  } catch (error) {
    console.error(error);
    $q.notify({ type: "negative", message: error.response?.data?.message || "Error saving user" });
  } finally {
    $q.loading.hide();
    showUserDialog.value = false;
  }
}

function deleteUser() {
  $q.dialog({
    title: "Confirm",
    message: "Are you sure you want to delete this user?",
    cancel: true,
    persistent: true,
    ok: { label: "Delete", color: "negative", flat: true },
  }).onOk(async () => {
    try {
      $q.loading.show();
      await axios.delete(`${API_URL}/${selectedUser.value.id}`, getAuthHeader());
      $q.notify({ type: "positive", message: "User deleted" });
      fetchUsers();
      selectedUser.value = null;
    } catch (error) {
      console.error(error);
      $q.notify({ type: "negative", message: "Error deleting user" });
    } finally {
      $q.loading.hide();
    }
  });
}
</script>
