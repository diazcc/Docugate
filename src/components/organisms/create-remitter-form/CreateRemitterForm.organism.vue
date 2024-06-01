<template>
    <section  :class="'create-remitter-form ' + (dataCreateRemitterForm.stateCreateRemmiter ? '' : 'loading-component')">
        <p class="create-remitter-form__title">Crear remitente</p>
        <div class="create-remitter-form__content">
            <p class="create-remitter-form__content__advice"
                v-if="dataCreateRemitterForm.data.person_typeRemitter == ''">
                Por favor selecciona el tipo de persona para crear el remitente.
            </p>
            <ul class="create-remitter-form__content__select-type">
                <p class="create-remitter-form__content__select-type__text">Tipo de
                    persona:</p>

                <input type="radio" id="option2" value="001"
                    v-model="dataCreateRemitterForm.data.person_typeRemitter">
                <p class="create-remitter-form__content__select-type__text">Persona
                </p>

                <input type="radio" id="option2" value="002"
                    v-model="dataCreateRemitterForm.data.person_typeRemitter">
                <p class="create-remitter-form__content__select-type__text">Negocio
                </p>

            </ul>
            
            <ul class="create-remitter-form__content__form"
                v-if="dataCreateRemitterForm.data.person_typeRemitter != ''">
                <li class="create-remitter-form__content__form__card"
                    v-if="dataCreateRemitterForm.data.person_typeRemitter == '001'">
                    <select v-model="dataCreateRemitterForm.data.person_typeNatural" required>
                        <option value="" selected disabled>Tipo de persona</option>
                        <option value="001">Persona</option>
                        <option value="003">Niño(a) / Adolescente</option>
                        <option value="004">Apoderado</option>
                    </select>
                </li>
                <li class="create-remitter-form__content__form__card"
                    v-if="dataCreateRemitterForm.data.person_typeRemitter == '001'">
                    <input type="text" v-model="dataCreateRemitterForm.data.first_name"
                        placeholder="Primer nombre" required>
                </li>
                <li class="create-remitter-form__content__form__card"
                    v-if="dataCreateRemitterForm.data.person_typeRemitter == '001'">
                    <input type="text" v-model="dataCreateRemitterForm.data.middle_name"
                        placeholder="Segundo nombre">
                </li>
                <li class="create-remitter-form__content__form__card"
                    v-if="dataCreateRemitterForm.data.person_typeRemitter == '001'">
                    <input type="text" v-model="dataCreateRemitterForm.data.last_name"
                        placeholder="Primer apellido" required>
                </li>
                <li class="create-remitter-form__content__form__card"
                    v-if="dataCreateRemitterForm.data.person_typeRemitter == '001'">
                    <input type="text" v-model="dataCreateRemitterForm.data.second_last_name"
                        placeholder="Segundo apellido">
                </li>
                <li class="create-remitter-form__content__form__card"
                    v-if="dataCreateRemitterForm.data.person_typeRemitter == '001'">
                    <select v-model="dataCreateRemitterForm.data.identification_typeNatural" required>
                        <option selected value="" disabled>
                            {{ dataCreateRemitterForm.data.person_typeNatural ? 'Tipo de identificación':'No has seleccionado tipo persona '}}</option>
                        <option v-if="dataCreateRemitterForm.data.person_typeNatural == '001' || dataCreateRemitterForm.data.person_typeNatural == '004'"
                            value="001">Cédula de Ciudadanía</option>
                        <option v-if="dataCreateRemitterForm.data.person_typeNatural == '001' || dataCreateRemitterForm.data.person_typeNatural == '004'"
                            value="002">Cédula de Extranjería</option>
                        <option v-if="dataCreateRemitterForm.data.person_typeNatural == '001' || dataCreateRemitterForm.data.person_typeNatural == '004'"
                            value="003">Tarjeta de Identidad</option>
                        <option v-if="dataCreateRemitterForm.data.person_typeNatural == '001' || dataCreateRemitterForm.data.person_typeNatural == '004'"
                            value="004">NUIP</option>
                        <option v-if="dataCreateRemitterForm.data.person_typeNatural == '001' || dataCreateRemitterForm.data.person_typeNatural == '004'"
                            value="006">Visa</option>
                        <option v-if="dataCreateRemitterForm.data.person_typeNatural == '001' || dataCreateRemitterForm.data.person_typeNatural == '004'"
                            value="007">Otro</option>
                        <option v-if="dataCreateRemitterForm.data.person_typeNatural == '003'"
                            value="003">Tarjeta de Identidad</option>
                        <option v-if="dataCreateRemitterForm.data.person_typeNatural == '003'"
                            value="004">NUIP</option>
                        <option v-if="dataCreateRemitterForm.data.person_typeNatural == '003'"
                            value="006">Visa</option>
                        <option v-if="dataCreateRemitterForm.data.person_typeNatural == '003'"
                            value="007 ">Otro </option>
                    </select>
                </li>
                <li class="create-remitter-form__content__form__card"
                    v-if="dataCreateRemitterForm.data.person_typeRemitter == '001'">
                    <input type="text" v-model="dataCreateRemitterForm.data.identification_number"
                        placeholder="Número de identificacion" required>
                </li>

                <li class="create-remitter-form__content__form__card"
                    v-if="dataCreateRemitterForm.data.person_typeRemitter == '002'">
                    <input type="text" v-model="dataCreateRemitterForm.data.contact_name"
                        placeholder="Nombre de contacto" required>

                </li>

                <li class="create-remitter-form__content__form__card"
                    v-if="dataCreateRemitterForm.data.person_typeRemitter == '002'">
                    <input type="text" v-model="dataCreateRemitterForm.data.social_reason"
                        placeholder="Razón social" required>

                </li>

                <li class="create-remitter-form__content__form__card"
                    v-if="dataCreateRemitterForm.data.person_typeRemitter == '002'">
                    <input type="text" v-model="dataCreateRemitterForm.data.nit_number"
                        placeholder="NIT" required>

                </li>

                <li class="create-remitter-form__content__form__card">
                    <Select :dataSelect="dataCreateRemitterForm.dataSelectCountry"/>
                </li>
                
                <li class="create-remitter-form__content__form__card">
                    <Select :dataSelect="dataCreateRemitterForm.dataSelectDepartament"/>
                </li>

                <li class="create-remitter-form__content__form__card">
                    <Select :dataSelect="dataCreateRemitterForm.dataSelectCity"/>
                </li>

                <li class="create-remitter-form__content__form__card">

                    <input type="text" v-model="dataCreateRemitterForm.data.address"
                        placeholder="Dirección" required>
                </li>
                <li class="create-remitter-form__content__form__card">
                    <input type="text" v-model="dataCreateRemitterForm.data.phone_number"
                        placeholder="Telefono" required>
                </li>

                <li class="create-remitter-form__content__form__card">
                    <input type="text" v-model="dataCreateRemitterForm.data.email"
                        placeholder="Correo electronico" required>
                </li>
            </ul>
        </div>
    </section>
</template>
<script setup lang="ts">
import Select from '../../atoms/select/Select.atom.vue'

defineProps(['dataCreateRemitterForm']);
</script>
<style scoped src="./CreateRemitterForm.organism.scss"></style>