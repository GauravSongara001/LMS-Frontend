<script setup>
import { RouterView } from 'vue-router';
import NavBarVue from './components/NavBar.vue';
</script>

<template>
    <div>
        <NavBarVue />
        <RouterView />
    </div>
</template>

<style scoped>
</style>
