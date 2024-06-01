<template>
    <article :class="'modal-response-filing modal-response-filing--'+(dataModalResponseFiling.isActive?'show':'')">
        <section  class="modal-response-filing__content">
            <h1 class="modal-response-filing__content__title">{{ $t('response') }} </h1>
            <ul class="modal-response-filing__content__form">
                <li
                    class="modal-response-filing__content__form__card modal-response-filing__content__form__card__content-options">
                    <Select :dataSelect="dataModalResponseFiling.dataSelectRemitter" />
                    <Select :dataSelect="dataModalResponseFiling.dataSelectResponseMode" />
                </li>
                <li
                    class="modal-response-filing__content__form__card modal-response-filing__content__form__card__content-options">
                    <input v-model="dataModalResponseFiling.formData.emails_with_copy" type="text"
                        placeholder="Correo con copia">
                    <InputFiles :dataInputFiles="dataModalResponseFiling.dataInputFiles" />
                </li>
                <li
                    class="modal-response-filing__content__form__card modal-response-filing__content__form__card__content-options">
                    <Select :dataSelect="dataModalResponseFiling.dataSelectActions" />
                    <section class="modal-response-filing__content__form__card__content-options--flex_1">
                        <article>
                            <p>{{ dataModalResponseFiling.dataSelectActions.model }}</p>
                        </article>
                    </section>
                </li>
                <li
                    class="modal-response-filing__content__form__card modal-response-filing__content__form__card__content-options">
                    <Select :dataSelect="dataModalResponseFiling.dataSelectActions2" />
                    <section class="modal-response-filing__content__form__card__content-options--flex_1">
                        <article>
                            <p>{{ dataModalResponseFiling.dataSelectActions2.model }}</p>
                        </article>
                    </section>
                </li>
            </ul>

            <nav>
                <Button :dataButton="dataModalResponseFiling.dataButtonBack" />
                <Button :dataButton="dataModalResponseFiling.dataButtonNext" />
            </nav>
        </section>
    </article>
</template>
<script setup lang="ts">
import InputFiles from '../../../molecules/input-files/InputFiles.molecule.vue';
import Button from '../../../atoms/button/Button.atom.vue';
import Select from '../../../atoms/select/Select.atom.vue';

const props = defineProps(['dataModalResponseFiling']);


</script>
<style scoped src="./ModalResponseFiling.molecule.scss"></style>