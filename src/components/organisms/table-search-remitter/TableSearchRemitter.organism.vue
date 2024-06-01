<template>
    <section class="table-search">
        <nav class="table-search__header">
            <!-- <input type="text" class="table-search__header__input-search" placeholder="Buscar" v-model="searchTerm"> -->
            <InputSearch :dataInputSearch="dataTableRemitters.dataInputSearch"/>
            <p class="table-search__header__text">No encuentra el remitente?</p>

            <Button :dataButton="dataTableRemitters.dataButton"/>

        </nav>
        <div class="table-search__table">
            <TransitionGroup tag="ul" :css="false" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave" class="table-search__table__list-user" >
                <li v-if="filteredUsers.length === 0" class="table-search__table__list-user__card">No se encontraron resultados</li>
                <li v-for="user in filteredUsers" class="table-search__table__list-user__card" @click="getUser(user)" :key="user.email">
                    <div>
                        {{ user.first_name != null ? user.first_name : user.contact_name
                        }}
                    </div>
                    <div>
                        {{ user.email }}
                    </div>
                    <div>
                        {{ user.person_type.label }}
                    </div>
                </li>
            </TransitionGroup>
        </div>
    </section>
</template>
<script setup lang="ts">
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import gsap from 'gsap';
import InputSearch from '../../molecules/input-search/InputSearch.molecule.vue';
import Button from '../../atoms/button/Button.atom.vue';
const userList: any = ref([]);
const searchTerm = ref('');
const props = defineProps(['dataTableRemitters']);
const emits = defineEmits(['user']);
onMounted(() => {
    getUsers();
});
function getUser(user:any){
    emits('user', user);
}
async function getUsers() {
    const response = await axios.get('/api/correspondence/remitters/');
    userList.value = response.data;
}
function onBeforeEnter(el:any) {
    el.style.opacity = 0
    el.style.height = 0
}
function onEnter(el:any, done:any) {
    gsap.to(el, {
        opacity: 1,
        height: '2.5rem',
        delay: el.dataset.index * 0.15,
        onComplete: done
    })
}
function onLeave(el:any, done:any) {
    gsap.to(el, {
        opacity: 0,
        height: 0,
        delay: el.dataset.index * 0.15,
        onComplete: done
    })
}
const removeAccents = (str: any) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
const filteredUsers: any = computed(() => {
    if (props.dataTableRemitters.data!=null) {
        searchTerm.value = props.dataTableRemitters.dataInputSearch.dataInput.model
        return props.dataTableRemitters.data.filter((user: any) => {
            const searchField = user.first_name || user.contact_name || ''; 
            const searchValue = removeAccents(searchField.toLowerCase());
            const searchTermValue = removeAccents(searchTerm.value.toLowerCase());
            return searchValue.includes(searchTermValue);
        });
    }else{
        return [];
    }
});
</script>
<style scoped src="./TableSearchRemitter.organism.scss"></style>