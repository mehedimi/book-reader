<template>
  <div class="p-5 font-fira mx-auto max-w-md bg-white min-h-screen">
    <h3 class="uppercase mt-3 text-gray-400 text-xs">
      {{ format(new Date(), "EEEE dd MMMM") }}
    </h3>
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import { format } from "date-fns";
</script>
