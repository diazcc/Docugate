<template>
    <main class="wrapper-filing-public">
        <Header :dataHeaderOrganism="dataFilingPublic.dataHeaderOrganism" />
        <article class="wrapper-filing-public__container">
            <Menu @dataEmitMenu="getViewKey" :dataMenu="dataFilingPublic.dataMenu"/>
            <article class="wrapper-home__container__content">
                <router-view :key="viewKey"></router-view> 
            </article>
        </article>
    </main>
</template>
<script setup lang="ts">
import Header from '../../organisms/header/Header.organism.vue';
import { ref } from 'vue';
import Menu from '../../organisms/menu/Menu.organism.vue';
const viewKey :any = ref(0); //the way of viewKey end here, because <router-view></router-view> is here 
defineProps(['dataFilingPublic']);
function getViewKey(viewKeyData:any){
    viewKey.value=viewKeyData;
}
</script>
<style scoped src="./FilingPublic.template.scss"></style>