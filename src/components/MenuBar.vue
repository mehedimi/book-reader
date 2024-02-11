<script setup lang="ts">
import NavModal from "./NavModal.vue";
defineProps<{ title: string }>();
</script>

<template>
  <div class="flex justify-between items-center">
    <h2 class="text-2xl text-gray-700 my-2 font-semibold">{{ title }}</h2>
    <NavModal />
  </div>
</template>
