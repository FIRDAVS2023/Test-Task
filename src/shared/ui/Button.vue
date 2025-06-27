<script setup lang="ts">
defineProps<{
  variant?: "primary" | "secondary";
}>();
</script>

<template>
  <button :class="['button', { secondary: variant === 'secondary' }]">
    <slot />
  </button>
</template>

<style scoped>
.button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #42b983;
  color: white;
}
.button.secondary {
  background-color: #e0e0e0;
  color: #2c3e50;
}
.button:hover {
  opacity: 0.9;
}
</style>
