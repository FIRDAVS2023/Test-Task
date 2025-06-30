<script setup lang="ts">
import type { RequestFormData } from "@/entities/request/requestTypes";
import RequestForm from "@/features/requests/components/RequestForm.vue";
import { useRequestsStore } from "@/entities/request/requestsStore";
import { useRouter } from "vue-router";

const router = useRouter();
const requestsStore = useRequestsStore();

const handleSubmit = (data: RequestFormData) => {
  const result = requestsStore.addRequest(data);
  if (result.success) {
    router.push("/requests");
  }
  return result;
};
</script>

<template>
  <div class="request-new-page">
    <h1>Создать заявку</h1>
    <RequestForm
      submit-label="Создать"
      :on-submit="handleSubmit"
      @cancel="router.push('/requests')"
    />
  </div>
</template>

<style scoped>
.request-new-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>
