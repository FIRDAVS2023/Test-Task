<script setup lang="ts">
import type { Request } from "@/entities/request/requestTypes";
import { useRequestsStore } from "@/entities/request/requestsStore";
import Button from "@/shared/ui/Button.vue";
import { formatDate } from "@/shared/utils/formatDate";
import { RouterLink } from "vue-router";

defineProps<{
  requests: Request[];
}>();

const requestsStore = useRequestsStore();
</script>

<template>
  <div class="request-list">
    <div v-if="requests.length" class="requests">
      <div v-for="request in requests" :key="request.id" class="request-item">
        <RouterLink :to="`/requests/${request.id}`">
          <h2>{{ request.title }}</h2>
          <p>Категория: {{ request.category }}</p>
          <p>Дата создания: {{ formatDate(request.createdAt) }}</p>
        </RouterLink>
        <Button
          @click="requestsStore.deleteRequest(request.id)"
          variant="secondary"
          >Удалить</Button
        >
      </div>
    </div>
    <p v-else class="no-data">Нет данных</p>
  </div>
</template>

<style scoped>
.request-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.requests {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.request-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}
.request-item a {
  text-decoration: none;
  color: #2c3e50;
}
.request-item h2 {
  margin: 0 0 10px;
  font-size: 1.5rem;
}
.request-item p {
  margin: 0;
  color: #666;
}
.no-data {
  text-align: center;
  color: #666;
}
</style>
