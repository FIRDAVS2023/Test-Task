<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
// import { useRequestsStore } from "@/features/requests/stores/requestsStore";
import RequestForm from "@/features/requests/components/RequestForm.vue";
import { useRequestsStore } from "@/features/requests/requestsStore";
import Button from "@/shared/ui/Button.vue";
import Modal from "@/shared/ui/Modal.vue";
import { formatDate } from "@/shared/utils/formatDate";

const route = useRoute();
const router = useRouter();
const requestsStore = useRequestsStore();
const request = computed(() =>
  requestsStore.getRequestById(Number(route.params.id))
);
const isModalOpen = ref(false);

const handleSubmit = (
  data: import("@/entities/request/requestTypes").RequestFormData
) => {
  const result = requestsStore.updateRequest(Number(route.params.id), data);
  if (result.success) {
    isModalOpen.value = false;
  }
  return result;
};

const handleDelete = () => {
  if (confirm("Вы уверены, что хотите удалить заявку?")) {
    requestsStore.deleteRequest(Number(route.params.id));
    router.push("/requests");
  }
};
</script>

<template>
  <div class="request-detail-page">
    <h1>Детали заявки</h1>
    <div v-if="request">
      <h2>{{ request.title }}</h2>
      <p><strong>Описание:</strong> {{ request.description }}</p>
      <p><strong>Категория:</strong> {{ request.category }}</p>
      <p><strong>Дата создания:</strong> {{ formatDate(request.createdAt) }}</p>
      <div class="actions">
        <Button @click="isModalOpen = true">Редактировать заявку</Button>
        <Button @click="handleDelete" variant="secondary"
          >Удалить заявку</Button
        >
      </div>
      <Modal :is-open="isModalOpen" @close="isModalOpen = false">
        <h3>Редактировать заявку</h3>
        <RequestForm
          :initial-data="{
            title: request.title,
            description: request.description,
            category: request.category,
          }"
          submit-label="Сохранить"
          :on-submit="handleSubmit"
          @cancel="isModalOpen = false"
        />
      </Modal>
    </div>
    <p v-else>Заявка не найдена</p>
  </div>
</template>

<style scoped>
.request-detail-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
</style>
