<template lang="">
    <main class="wrapper-home">
        <Header :dataHeaderOrganism="dataHomeTemplate.dataHeaderOrganism"/>
        <article class="wrapper-home__container">
            <Menu @dataEmitMenu="getViewKey" :dataMenu="dataHomeTemplate.dataMenu"/>
            <article class="wrapper-home__container__content">
                <router-view :key="viewKey"></router-view> 
            </article>
        </article>
    </main>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Header from '../../organisms/header/Header.organism.vue'
import Menu from '../../organisms/menu/Menu.organism.vue'
defineProps(['dataHomeTemplate']);
const viewKey :any = ref(0); //the way of viewKey end here, because <router-view></router-view> is here 
function getViewKey(viewKeyData:any){
    viewKey.value=viewKeyData;
}
</script>
<style src="./Home.template.scss"></style>