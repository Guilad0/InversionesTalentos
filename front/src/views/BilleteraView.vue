<template>
<div class="row">
  <div class="col-2">
    <SidebarProfile />
  </div>
  <div class="col-9">
    <Billetera />
    <InversionesRetiro /> 
  </div>
</div>

</template>

<script setup>
import Billetera from '@/components/Billetera.vue';
import InversionesRetiro from '@/components/InversionesRetiro.vue';
import SidebarProfile from "@/components/SidebarProfile.vue";
</script>