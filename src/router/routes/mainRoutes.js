export default [
  {
    path: "/charts",
    name: "charts",
    component: () => import("@/views/apps/charts/ChartsPage.vue"),
    children: [
      // {
      //   path: 'tanks/:deviceKey',
      //   name: 'tanks',
      //   component: () => import('@/views/apps/charts/tanks/ChartsPage.vue'),
      // },
      {
        path: 'tanks',
        name: 'tanks',
        component: () => import('@/views/apps/charts/tanks/ChartsPage.vue'),
      },
      {
        path: 'flow-meters',
        name: 'flow-meters',
        component: () => import('@/views/apps/charts/flow-meters/ChartsPage.vue'),
      },
      {
        path: '',
        redirect: 'tanks',
      },
    ],
  },
  {
    path: "/summary",
    name: "summary",
    component: () => import("@/views/apps/summary/SummaryPage.vue"),
  },
];
