<script setup lang="ts">
import {
  type RequestFormData,
  type RequestFormErrors,
  REQUEST_CATEGORIES,
} from "@/entities/request/requestTypes";
import Button from "@/shared/ui/Button.vue";
import { ref } from "vue";

const { initialData, onSubmit } = defineProps<{
  initialData?: RequestFormData;
  submitLabel: string;
  onSubmit: (data: RequestFormData) => {
    success: boolean;
    errors?: RequestFormErrors;
  };
}>();

defineEmits<{
  (e: "cancel"): void;
}>();

const formData = ref<RequestFormData>(
  initialData ?? { title: "", description: "", category: REQUEST_CATEGORIES[0] }
);
const errors = ref<RequestFormErrors>({});

const handleSubmit = () => {
  errors.value = {};
  const result = onSubmit(formData.value);
  if (!result.success && result.errors) {
    errors.value = result.errors;
  }
};
</script>

<template>
  <div class="request-form">
    <div class="form-group">
      <label for="title">Заголовок</label>
      <input
        id="title"
        v-model="formData.title"
        type="text"
        placeholder="Введите заголовок"
        :class="{ 'input-error': errors.title }"
      />
      <span v-if="errors.title" class="error">{{ errors.title }}</span>
    </div>
    <div class="form-group">
      <label for="description">Описание</label>
      <textarea
        id="description"
        v-model="formData.description"
        placeholder="Введите описание"
        :class="{ 'input-error': errors.description }"
      ></textarea>
      <span v-if="errors.description" class="error">{{
        errors.description
      }}</span>
    </div>
    <div class="form-group">
      <label for="category">Категория</label>
      <select
        id="category"
        v-model="formData.category"
        :class="{ 'input-error': errors.category }"
      >
        <option
          v-for="category in REQUEST_CATEGORIES"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
      <span v-if="errors.category" class="error">{{ errors.category }}</span>
    </div>
    <div class="form-actions">
      <Button @click="handleSubmit">{{ submitLabel }}</Button>
      <Button @click="$emit('cancel')" variant="secondary">Отмена</Button>
    </div>
  </div>
</template>

<style scoped>
.request-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
label {
  font-weight: bold;
}
input,
textarea,
select {
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}
textarea {
  min-height: 100px;
  resize: vertical;
}
.input-error {
  border-color: #ff4d4f;
}
.error {
  color: #ff4d4f;
  font-size: 0.9rem;
}
.form-actions {
  display: flex;
  gap: 10px;
}
</style>
