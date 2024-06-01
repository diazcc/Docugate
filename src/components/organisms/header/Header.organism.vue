<template>
    <header class="header">
        <ol class="header__content">
            <li class="header__content__icon">
                <router-link to="/home">
                    <Img :dataImg="dataHeaderOrganism.dataImgLogo" />
                </router-link>
            </li>
            <template v-if="stateView">

                <li class="header__content__search">
                    <InputSearch :dataInputSearch="dataHeaderOrganism.dataInputSearch" />
                </li>
                <li class="header__content__nav">
                    <NavegationOptionsHeader
                        :dataNavegationOptionsHeader="dataHeaderOrganism.dataNavegationOptionsHeader" />
                    <MenuConfigHeader :dataMenuConfigHeader="dataHeaderOrganism.dataMenuConfigHeader" />
                </li>
            </template>
            <li class="header__content__user">
                <UserMenuHeader :dataUserMenuHeader="dataHeaderOrganism.dataUserMenuHeader" />
            </li>
        </ol>
    </header>
</template>
<script setup lang="ts">

import UserMenuHeader from '../../molecules/user-menu-header/UserMenuHeader.molecule.vue'
import MenuConfigHeader from '../../molecules/menu-config-header/MenuConfigHeader.molecule.vue'
import InputSearch from '../../molecules/input-search/InputSearch.molecule.vue'
import NavegationOptionsHeader from '../../molecules/navegation-options-header/NavegationOptionsheader.molecule.vue';
import Img from '../../atoms/img/Img.atom.vue';
import { useRoute, useRouter } from 'vue-router';
import { onBeforeMount, ref } from 'vue';
const router: any = useRouter();
const route = useRoute();
const stateView = ref(true);


onBeforeMount(() => {
    if (router.currentRoute._value.href == '/filing-correspondence') {
        stateView.value = false;
    }
})

defineProps(['dataHeaderOrganism'])
</script>
<style scoped src="./Header.organism.scss"></style>