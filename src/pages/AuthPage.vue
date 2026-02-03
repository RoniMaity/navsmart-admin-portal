<template>
  <div class="auth-page">
    <div class="background-animation"></div>
    <div class="form-container">
      <q-card class="auth-card">
        <!-- Header Section with Background Color -->
        <q-card-section class="form-header">
          <div class="header-animation text-h3 text-center">NavSmart Admin</div>
          <div class="sub-header-animation text-center">Seamless Travel Management</div>
        </q-card-section>

        <!-- Informative Message -->
         <q-card-section>
            <div class="text-subtitle2 text-center text-grey-7 q-mb-md">
              Please log in using the credentials provided by your Administrator.
            </div>
         </q-card-section>

        <!-- Login Form -->
        <div class="email-form">
          <q-input
            filled
            label="Username"
            v-model="username"
            type="text"
            :rules="[val => val && val.length > 0 || 'Please enter your username']"
            class="q-mb-md"
          />
          <q-input
            filled
            label="Password"
            v-model="password"
            type="password"
            @keyup.enter="handleLogin"
            class="q-mb-md"
          />
          <q-btn
            label="Sign In"
            color="primary"
            @click="handleLogin"
            :loading="loading"
            class="full-width q-mb-md"
          />
        </div>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// import { supabase } from 'boot/supabase'; // Accessing backend directly now
import axios from 'axios';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const router = useRouter();

const username = ref('');
const password = ref('');
const loading = ref(false);

// Backend API URL (Hardcoded for now as per plan, can be moved to .env later if needed for frontend)
const API_BASE_URL = import.meta.env.VITE_API_URL;

const handleLogin = async () => {
  if (!username.value || !password.value) {
    $q.notify({ type: 'warning', message: 'Please enter both username and password' });
    return;
  }

  loading.value = true;
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username: username.value,
      password: password.value
    });

    const { token, user } = response.data;

    // Store token and user info
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    $q.notify({ type: 'positive', message: `Welcome back, ${user.name}!` });

    // Redirect to dashboard
    router.push('/dashboard');

  } catch (error) {
    console.error(error);
    const msg = error.response?.data?.message || 'Login failed';
    $q.notify({ type: 'negative', message: msg });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  background: linear-gradient(135deg, #6A1B9A, #3F51B5);
  overflow: hidden;
}

.background-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://www.transparenttextures.com/patterns/diamond.png');
  background-size: 50px;
  opacity: 0.1;
  animation: moveBackground 30s linear infinite;
  z-index: -1;
}

@keyframes moveBackground {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}

.form-container {
  z-index: 1;
  width: 100%;
  max-width: 480px;
  padding: 20px;
}

.auth-card {
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  padding: 40px;
}

.text-h3 {
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  font-family: 'Arial', sans-serif;
  margin-bottom: 20px; /* Added margin to give space for subheader */
}

.sub-header-animation {
  font-size: 18px;
  color: #ff5722; /* A nice contrast color for subheader */
  font-family: 'Arial', sans-serif;
  animation: fadeInSubHeader 2s ease-in-out;
}

@keyframes fadeInSubHeader {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Header Animation */
.header-animation {
  font-size: 36px;
  color: #ffffff;
  font-weight: 700;
  background-color: #1A237E; /* Darker background for header */
  padding: 20px;
  border-radius: 10px;
  animation: fadeInHeader 2s ease-in-out;
}

@keyframes fadeInHeader {
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Button and Toggle Styling */
.toggle-btns {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.toggle-btns .q-btn {
  margin: 0 10px;
  font-size: 16px;
  padding: 12px 20px;
  border-radius: 30px;  /* Round corners for buttons */
}

.active-toggle {
  background-color: #027be3;
  color: white;
}

.q-btn.primary {
  background-color: #027be3;
  color: white;
}

.q-btn.secondary {
  background-color: #757575;
  color: white;
}

.q-btn:hover {
  background-color: #0288d1;
}

.email-form, .phone-form {
  display: flex;
  flex-direction: column;
  border-radius: 10px; /* Rounded borders for the form containers */
  padding: 20px;
  background-color: #f7f7f7;
}

.full-width {
  width: 100%;
}

.q-btn {
  border-radius: 10px; /* Rounded corners for buttons */
}

.q-input {
  border-radius: 10px; /* Rounded corners for input fields */
}
</style>
