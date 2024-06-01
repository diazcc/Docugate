<template>
  <section :class="'create-user-form ' + (dataCreateUserForm.stateCreateUser ? '' : 'loading-component')">
    <p class="create-user-form__title">{{ $t('create_user') }}</p>
    <article class="create-user-form__content">
      <ul class="create-user-form__content__form">
        <li class="create-user-form__content__form__card">
          <input type="number" v-model="dataCreateUserForm.data.identification_number"
            :placeholder="$t('identification_number')" min="0" required />
        </li>

        <li class="create-user-form__content__form__card">
          <input type="text" v-model="dataCreateUserForm.data.first_name" :placeholder="$t('name')" required />
        </li>
        <li class="create-user-form__content__form__card">
          <input type="text" v-model="dataCreateUserForm.data.last_name" :placeholder="$t('last_name')" required />
        </li>
        <li class="create-user-form__content__form__card">
          <input type="email" v-model="dataCreateUserForm.data.email" :placeholder="$t('email')" required />
        </li>
    
        <li class="create-user-form__content__form__card">
          <select v-model="dataCreateUserForm.data.role" required>
            <option selected value="" disabled>
              {{ $t("select_role") }}
            </option>

            <option v-for="role in dataRoles" :key="role.id" :value=role.id> {{role.name }}</option>
          </select>
        </li>

        <li class="create-user-form__content__form__card">
          <select v-model="dataCreateUserForm.data.dependence" required>
            <option selected value="" disabled>
              {{ $t("select_dependence") }}
            </option>

            <option v-for="dependence in dataDependences" :key="dependence.code" :value=dependence.code> {{
              dependence.name }}</option>
          </select>
        </li>

        <li class="create-user-form__content__form__card">
          <input type="date" v-model="dataCreateUserForm.data.date_of_birth" :placeholder="$t('date_of_birth')"
            :max="maxDate" required />
        </li>

        <li class="create-user-form__content__form__card">
          <select v-model="dataCreateUserForm.data.is_staff" required>
            <option selected value="" disabled>
              {{ $t("is_staff") }}
            </option>
            <option :value="true">{{ $t("yes") }}</option>
            <option :value="false">{{ $t("no") }}</option>
          </select>
        </li>

        <li class="create-user-form__content__form__card">
          <select v-model="dataCreateUserForm.data.is_active" required>
            <option selected value="" disabled>
              {{ $t("state") }}
            </option>
            <option :value="true">{{ $t("active") }}</option>
            <option :value="false">{{ $t("inactive") }}</option>
          </select>
        </li>
      </ul>




    </article>
  </section>
</template>


<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import LoginService from "../../../services/testService";
import DependenceService from "../../../services/DependenceServices";
defineProps(["dataCreateUserForm", "dataDependences", "dataRoles"]);

const maxDate = new Date().toISOString().split('T')[0];



</script>
<style scoped src="./CreateUserForm.organism.scss"></style>