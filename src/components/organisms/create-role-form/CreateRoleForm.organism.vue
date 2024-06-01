<template>
  <section :class="'create-role-form ' + (dataCreateRoleForm.stateCreateRole ? '' : 'loading-component')">
    <p class="create-role-form__title">{{ $t('create_role') }}</p>
    <article class="create-role-form__content">
      <ul class="create-role-form__content__form">
        <li class="create-role-form__content__form__card">
          <input type="text" v-model="dataCreateRoleForm.data.name"
            :placeholder="$t('name')"  required />
        </li>
      </ul>
    </article>
  </section>
</template>


<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
defineProps(["dataCreateRoleForm"]);

</script>

<style scoped src="./CreateRoleForm.organism.scss"></style>