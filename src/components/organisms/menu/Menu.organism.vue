<!--
    todo COMPONENT MENU ORGANISM


    todo---------------------------------------------------------- THIS COMPONENT MUST BE IMPROVE, ALL FUNCIONALITIES MUST BE ON COMPONENT PAGE.----------------------------------------------------------------


    ?This componente has function and state/variable because is a unique component, had funcitonalities that just need him self. dont need send o get other data of another component.



    todo - - -- - -  must add key state on the strucuture  


-->

<template>
    <aside class="sidebar-menu">
        <h2 class="sidebar-menu__title">Radicacion</h2>
        <ul class="sidebar-menu__content-list">
            <li v-for="(path, index) in dataMenu.path" :key="index"
                :class="'sidebar-menu__content-list__card sidebar-menu__content-list__card--' + ((path.state)  ? 'focused' : '')"
                @click="setStateMenuAside(path, index)" :id="path.name">
                <div class="sidebar-menu__content-list__card__title">
                    <img src="/icon-arrow-item-menu-padre lateral-cerrado.svg" alt=""
                        :class="'sidebar-menu__content-list__card__title__img sidebar-menu__content-list__card__title__img--' + ((path.state)  ? 'focused' : '')">
                    <p class="sidebar-menu__content-list__card__title__text">
                        {{ $t(path.name) }}
                    </p>
                </div>
                <ol
                    :class="'sidebar-menu__content-list__card__submenu sidebar-menu__content-list__card__submenu--' + ((path.state)  ? 'focused' : '')">
                    <li v-for="(route, index) in path.paths" :key="index"
                        :class="'sidebar-menu__content-list__card__submenu__card sidebar-menu__content-list__card__submenu__card--' + (route.state ? 'focused' : '')"
                        @click="redirectToPath(index, route.path)">{{ $t(route.name) }}</li>
                </ol>
            </li>
        </ul>
    </aside>
</template>
<script setup lang="ts">

import { useRoute, useRouter } from 'vue-router';
import { ref, reactive, onMounted, watch, onUnmounted, onUpdated } from 'vue';

const router: any = useRouter();
const route = useRoute();
const props = defineProps(['dataMenu']);
const emit = defineEmits(['dataEmitMenu']);
const viewKey = ref(0);
const indexFather: any = ref(0);
const indexChild: any = ref(0);
const focusPathMenu: any = ref('');
function setStateMenuAside(path: any, index: any) {
    setUnfocusedMenu();
    props.dataMenu.path[index].state = true;
    indexFather.value = index;
    props.dataMenu.path.forEach((response: any, indexF: any) => {
            response.paths.forEach((value: any, indexC: any) => {
                const fullPath = '/home/' + value.path;
                if (fullPath == router.currentRoute._value.href) {
                    props.dataMenu.path[indexF].paths[indexC].state = true;
                }
            });
        })
}
function refreshComponent() {
    viewKey.value++;
    emit('dataEmitMenu', viewKey.value);
}
function redirectToPath(index: any, path: any) {
    refreshComponent();
    indexChild.value = index;
    focusPathMenu.value = '/home/' + path;
    router.push('/home/' + path);
}
onMounted(() => {
    document.addEventListener('click', handleClickOutside);
    
    setCurrentPath('onMounted');
})
onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
async function setCurrentPath(data:any) {
    console.log(data);
    if (await props.dataMenu.path.length > 0) {
        props.dataMenu.path.forEach((response: any, indexF: any) => {
            response.paths.forEach((value: any, indexC: any) => {
                const fullPath = '/home/' + value.path;
                console.log('ass');
                setUnfocusedMenu();
                if (fullPath == router.currentRoute._value.href) { //CHECK ALGORITM, HAS A BUG WHEN ENTRY IN ANOTHER ROUTE
                    console.log('aaaaass' );
                    props.dataMenu.path[indexF].paths[indexC].state = true;
                    props.dataMenu.path[indexF].state = true;
                } else {

                }
            });
        })
    }
}

watch(route, adjustMenuStateBasedOnRoute, { immediate: true });

function adjustMenuStateBasedOnRoute() {
    const state = route.path === focusPathMenu;
    
    setCurrentPath('adjustMenuStateBasedOnRoute');
}

const handleClickOutside = (event: any) => {
    const sidebarMenu: any = document.querySelector('.sidebar-menu');
    if (!sidebarMenu.contains(event.target)) {
        
        setCurrentPath('handleClickOutside');
    }
};


 function setUnfocusedMenu() {
    if (props.dataMenu.path.length > 0) {
        props.dataMenu.path =   props.dataMenu.path.map((data: any) => ({
            ...data,
            state: false
        }));
        props.dataMenu.path[indexFather.value].paths =  props.dataMenu.path[indexFather.value].paths.map((data: any) => ({
            ...data,
            state: false
        }));

        
    }
}

</script>
<style scoped src="./Menu.organism.scss"></style>