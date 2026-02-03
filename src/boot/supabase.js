import { boot } from "quasar/wrappers";
import { createClient } from "@supabase/supabase-js";
import { ref } from "vue";

// Get Supabase URL and Anon Key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Reactive session object
const session = ref(null);
let setPasswordRequested = false; // State for password setup

// Hack to process the #access_token and #error before vue-router cleans up
let indexSupabaseHash = window.location.hash.indexOf("#access_token");
if (indexSupabaseHash < 0) {
  indexSupabaseHash = window.location.hash.indexOf("#error");
}
const routerHash = window.location.hash.substring(
  0,
  indexSupabaseHash >= 0 ? indexSupabaseHash : undefined
);

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Listen to authentication state changes
supabase.auth.onAuthStateChange(async (_event, _session) => {
  session.value = _session;

  if (_event === "PASSWORD_RECOVERY") {
    setPasswordRequested = "reset";
  }

  const userMetaData = session.value?.user.user_metadata;
  if (!userMetaData?.passwordSetup) {
    setPasswordRequested = "initial";
  }
});

/**
 * Finalize Supabase initialization.
 * This function shall be called before router initialization and
 * will handle the hash cleanup for access tokens and errors.
 */
async function init() {
  const { error } = await supabase.auth.initialize();
  if (error) {
    window.alert(error.message);
  }

  // Restore the router hash part after Supabase initialization
  window.location.hash = routerHash;
}

// Vue Router navigation guard setup
export default boot(({ router }) => {
  // Before each route is loaded
  router.beforeEach((to) => {
    if (setPasswordRequested) {
      to.query.setPassword = setPasswordRequested;
      setPasswordRequested = false;
      return to;
    }
  });

  // After each route is loaded
  router.afterEach((to) => {
    if (to.query.setPassword) {
      // Implement password setup or reset logic if needed
      // Example: Trigger password change flow based on query parameter
      // You could redirect the user to a "set password" page or show a modal
    }
  });
});

// Export necessary variables
export { init, supabase, session };
