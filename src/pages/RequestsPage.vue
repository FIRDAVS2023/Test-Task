<script setup lang="ts">
import { useRequestsStore } from "@/features/requests/requestsStore";
import Button from "@/shared/ui/Button.vue";
import RequestList from "@/widgets/RequestList.vue";
import { RouterLink } from "vue-router";

const requestsStore = useRequestsStore();
</script>

<template>
  <div class="requests-page">
    <h1>Список заявок</h1>
    <RouterLink to="/requests/new">
      <Button>Создать заявку</Button>
    </RouterLink>
    <RequestList :requests="requestsStore.requests" />
  </div>
</template>

<style scoped>
.requests-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>
