<script setup lang="ts">
defineProps<{
  isOpen: boolean;
}>();
defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal">
      <button class="close-button" @click="$emit('close')">×</button>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  position: relative;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>
