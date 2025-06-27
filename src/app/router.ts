import { createRouter, createWebHistory } from 'vue-router';
// import RequestsPage from '@/pages/RequestsPage.vue';
import RequestDetailPage from '@/pages/RequestDetailPage.vue';
import RequestNewPage from '@/pages/RequestNewPage.vue';
import RequestsPage from '@/pages/RequestsPage.vue';

const routes = [
  { path: '/requests', name: 'Requests', component: RequestsPage },
  { path: '/requests/:id', name: 'RequestDetail', component: RequestDetailPage },
  { path: '/requests/new', name: 'RequestNew', component: RequestNewPage },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});