<template>
  <section
    :class="'create-dependence-form ' + (dataCreateDependenceForm.stateCreateDependence ? '' : 'loading-component')">
    <p class="create-dependence-form__title">{{ $t('create_dependence') }}</p>
    <article class="create-dependence-form__content">
      <ul class="create-dependence-form__content__form">
        <li class="create-dependence-form__content__form__card">
          <input type="number" v-model="dataCreateDependenceForm.data.code" :placeholder="$t('code')" min="0"
            required />
        </li>
        <li class="create-dependence-form__content__form__card">
          <input type="text" v-model="dataCreateDependenceForm.data.name" :placeholder="$t('name')" required />
        </li>
        <li class="create-dependence-form__content__form__card">
          <select v-model="dataCreateDependenceForm.data.parent_dependency" required>
            <option selected value="" disabled>
              {{ $t("select_parent_dependence") }}
            </option>
            <option :value="null">{{ $t("not_belong") }}</option>

            <option v-for="dependence in dataDependence" :key="dependence.code" :value=dependence.code> {{
              dependence.name }}</option>
          </select>
        </li>
        <li class="create-dependence-form__content__form__card">
          <select v-model="dataCreateDependenceForm.data.state" required>
            <option selected value="" disabled>{{ $t("state") }}</option>
            <option :value="true">{{ $t("active") }}</option>
            <option :value="false">{{ $t("inactive") }}</option>
          </select>
        </li>
      </ul>
    </article>
  </section>
</template>


<script setup lang="ts">
import { onMounted, ref } from "vue";

defineProps(["dataCreateDependenceForm", "dataDependence"]);
</script>
<style scoped src="./CreateDependenceForm.organism.scss"></style>