<template>
  <div id="app">
    <router-view></router-view>
  </div>  
</template>

<script setup>
import axios from 'axios';
import { accessStore } from './store/index.ts'; // Importa el store como un export nombrado
import LoginService from './services/testService'; // Importa el servicio de inicio de sesió
import constants from '/src/constants/index.js'

const access = accessStore();
access.initializeStore();
LoginService.getAccess();
setInterval(() => { 
      LoginService.getAccess();
      console.log('interval');
      const access = accessStore();
      access.initializeStore();
     }, constants['REFRESH_TOKEN_INTERVAL_MS'])
</script>

<style scoped></style>
