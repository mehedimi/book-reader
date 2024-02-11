<template>
  <div class="my-3 flex items-center relative">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6 absolute left-3 text-gray-400 animate-spin"
      v-if="isLoading && search"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6 absolute left-3 text-gray-400"
      v-else
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>

    <input
      type="search"
      v-model="search"
      class="w-full placeholder-gray-400 border border-gray-300 rounded-3xl py-3 pl-12 focus:ring-emerald-300 focus:border-emerald-300 text-gray-500"
      placeholder="Search books..."
      v-bind="$attrs"
    />
  </div>
</template>

<script lang="ts" setup>
defineProps<{ isLoading: boolean }>();
const search = defineModel<string>();
</script>
