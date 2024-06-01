<template>
  <ul :class="'menu-configuration-header menu-configuration-header--' + (dataMenuConfigHeader.isActive ? 'show' : '')"
    ref="menuRef">
    <li class="menu-configuration-header__card" @click="dataMenuConfigHeader.onClickDependences">{{$t('dependences')}}</li>
    <li class="menu-configuration-header__card" @click="dataMenuConfigHeader.onClickUsers">{{$t('users')}}</li>
    <li class="menu-configuration-header__card" @click="dataMenuConfigHeader.onClickRoles">{{ $t('roles') }}</li>
    <li class="menu-configuration-header__card" @click="dataMenuConfigHeader.onClickTrd">
     
      {{ $t('trd') }}
      <ol :class="'menu-configuration-header__card__submenu menu-configuration-header__card__submenu--'+(dataMenuConfigHeader?.isActiveTRD? 'show':'')">
        <li class="menu-configuration-header__card__submenu__card" @click=" redirectTRD('/home/series');">Series</li>
        <li class="menu-configuration-header__card__submenu__card" @click=" redirectTRD('/home/subseries');">Subseries</li>
        <li class="menu-configuration-header__card__submenu__card" @click=" redirectTRD('/home/type-documental');">Tipo de documento</li>
        <li class="menu-configuration-header__card__submenu__card" @click=" redirectTRD('/home/matrix-relation');">Matriz de relacion</li>
        <li class="menu-configuration-header__card__submenu__card" @click=" redirectTRD('/home/trd');">Listado de TRD</li>
      </ol>
    </li>

  </ul>
</template>
  
  <script setup lang="ts">
  import { defineProps, onMounted, onUnmounted,ref } from 'vue';
  import { useRouter } from "vue-router";
const router = useRouter();
  const prop = defineProps(['dataMenuConfigHeader']);
  
  const menuRef = ref<HTMLElement | null>(null);
  
  // Function to handle clicks outside the menu and outside the specified element
  const handleClickOutside = (event: MouseEvent) => {
    const clickedElement = event.target as HTMLElement;
  
    // Check if the clicked element is outside the menu or outside the specified element
    if (
      (menuRef.value && !menuRef.value.contains(clickedElement)) &&
      (!document.getElementById('cardNotificationsConfig') || !document.getElementById('cardNotificationsConfig')?.contains(clickedElement))
    ) {
      // Click occurred outside the menu and outside the specified element
      // Here you can perform any action needed
      prop.dataMenuConfigHeader.isActive = false;
      prop.dataMenuConfigHeader.isActiveTRD = false;
    }
  };
  
  // Add event listener when the component is mounted
  onMounted(() => {
    window.addEventListener('click', handleClickOutside);
  });
  
  // Remove event listener when the component is unmounted to prevent memory leaks
  onUnmounted(() => {
    window.removeEventListener('click', handleClickOutside);
  });

  function redirectTRD(path:any){
    router.push(path);
    hiddeSubmenu();
  }

  function hiddeSubmenu(){// Add all states for submenus added to be hidden.
    prop.dataMenuConfigHeader.isActive=false
    prop.dataMenuConfigHeader.isActiveTRD=false;
  }
  </script>
  <style scoped src="./MenuConfigHeader.molecule..scss"></style>
  