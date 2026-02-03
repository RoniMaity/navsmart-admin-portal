// const routes = [
//   // {
//   //   path:'/',
//   //   component:()=>import('layouts/LoginLayout.vue'),
//   //   children:[
//   //     {path:'',component:()=>import('src/pages/AuthPage.vue')},
//   //   ]
//   // },
//   // {
//     {path: '/',
//     component: () => import('src/layouts/PlannerLayout.vue'),
//     children: [
//       { path: '/PlannerDashboard', component: () => import('src/pages/Planner_DashBoard.vue') },
//       { path: '/PlannerCreateNewRoutes', component: () => import('src/pages/Planner_create_new_routes.vue') },
//       { path: '/PlannerJourneyStats', component: () => import('src/pages/Planner_journey_stats.vue') },
//       { path: '/PlannerRoutesTrafficAnalysis', component: () => import('src/pages/Planner_RouteTraffic_Analysis.vue') },
//       { path: '/PlannerVehicleDetails', component: () => import('src/pages/Planner_vehicle_details.vue') },
//     ]
//   },

//   // Always leave this as last one,
//   // but you can also remove it
//   {
//     path: '/:catchAll(.*)*',
//     component: () => import('pages/ErrorNotFound.vue')
//   }
// ]

// export default routes

const routes = [
  {
    path: "/login",
    component: () => import("layouts/LoginLayout.vue"),
    children: [{ path: "", component: () => import("src/pages/AuthPage.vue") }],
  },

  {
    path: "/Planner",
    component: () => import("src/layouts/PlannerLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      { path: "", redirect: "/PlannerDashboard" },
      {
        path: "PlannerDashboard",
        component: () => import("src/pages/Planner_DashBoard.vue"),
      },
      {
        path: "PlannerJourneyStats",
        component: () => import("src/pages/Planner_journey_stats.vue"),
      },
      {
        path: "PlannerRoutesTrafficAnalysis",
        component: () => import("src/pages/Planner_RouteTraffic_Analysis.vue"),
      },
      {
        path: "PlannerVehicleDetails",
        component: () => import("src/pages/Planner_vehicle_details.vue"),
      },
    ],
  },

  {
    path: "/schedular",
    component: () => import("src/layouts/SchLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        component: () => import("src/pages/Schedular_Dashboard.vue"),
      },
      {
        path: "schedularAssignCrew",
        component: () => import("src/pages/Sch_AssignCrew.vue"),
      },
      {
        path: "schedularAvailableCrew",
        component: () => import("src/pages/Sch_AvailableCrew.vue"),
      },
      {
        path: "Sch_Crew_Details",
        component: () => import("src/pages/Sch_crewDetails.vue"),
      },
      {
        path: "Sch_Manage_crew",
        component: () => import("src/pages/Sch_ManageCrew.vue"),
      },
    ],
  },

  {
    path: "/",
    component: () => import("layouts/AdminLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        redirect: "/dashboard",
      },
      {
        path: "dashboard",
        component: () => import("src/pages/PageDashboard.vue"),
      },
      {
        path: 'users',
        component: () => import('src/pages/PageUsers.vue')
      },
      {
        path: "stops",
        component: () => import("src/pages/PageStops.vue"),
      },
      {
        path: "routes",
        component: () => import("src/pages/PageRoutes.vue"),
      },
      {
        path: "routes/map",
        component: () => import("src/pages/PageRoutesMap.vue"),
      },
      {
        path: "vehicles",
        component: () => import("src/pages/PageVehicles.vue"),
      },
      {
        path: 'tickets',
        component: () => import('src/pages/PageTickets.vue')
      },
      {
        path: 'schedules',
        component: () => import('src/pages/PageSchedules.vue')
      },
      {
        path: 'trips',
        component: () => import('src/pages/PageTrips.vue')
      }
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// // Navigation guard
// router.beforeEach((to, from, next) => {
//   if (to.path !== "/login" && !isLoggedIn()) {
//     // If not logged in and trying to access a restricted page, redirect to login
//     next("/login");
//   } else if (to.path === "/login" && isLoggedIn()) {
//     // If logged in and trying to access login page, redirect to planner dashboard
//     next("/PlannerDashboard");
//   } else {
//     // Otherwise, proceed to the route
//     next();
//   }
// });

// export default router;
