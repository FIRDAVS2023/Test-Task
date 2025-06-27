<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <RouterLink to="/requests">Запросы</RouterLink>
  <RouterView />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>
