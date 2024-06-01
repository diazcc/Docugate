<template>
    <article class="filing">
        <header class="filing__header">
            <h1 class="filing__header__title">Datos de la radicacion</h1>
            <SelectActions :dataSelect="dataFiling.dataSelectActions" class="filing__header__actions" />
        </header>
        <section class="filing__info" v-if="dataFiling.data.subject != null && dataFiling.data.subject != ''">
            <ul class="filing__info__content">
                <l1 class="filing__info__content__card">
                    <p class="filing__info__content__card__subtitle">
                        Asunto:
                        <span>
                            {{ dataFiling.data.subject }}
                        </span>
                    </p>
                </l1>
                <l1 class="filing__info__content__card">
                    <p class="filing__info__content__card__subtitle">
                        No. radicado:
                        <span>
                            {{ dataFiling.data.filing_code }}
                        </span>
                    </p>
                </l1>
                <l1 class="filing__info__content__card">
                    <p class="filing__info__content__card__subtitle">
                        Remitente:
                        <span>
                            {{ dataFiling.data.remitter }}
                        </span>
                    </p>
                </l1>
                <l1 class="filing__info__content__card">
                    <p class="filing__info__content__card__subtitle">
                        Tipo persona:
                        <span>
                            {{ dataFiling.data.person_type }}
                        </span>
                    </p>
                </l1>
            </ul>
            <ul class="filing__info__content">
                <l1 class="filing__info__content__card">
                    <p class="filing__info__content__card__subtitle">
                        Correo electronico:
                        <span>
                            {{ dataFiling.data.email }}
                        </span>
                    </p>
                </l1>
                <l1 class="filing__info__content__card">
                    <p class="filing__info__content__card__subtitle">
                        Fecha de radicacion:
                        <span>
                            {{ dataFiling.data.filing_date }}
                        </span>
                    </p>
                </l1>
                <l1 class="filing__info__content__card">
                    <p class="filing__info__content__card__subtitle">
                        Estado:
                        <span>
                            {{ $t(dataFiling.data.status) }}
                        </span>
                    </p>
                </l1>
            </ul>
        </section>
        <section class="filing__info" v-else>
            <ul class="filing__info__content">
                <l1 class="filing__info__content__card">
                    <p
                        class="filing__info__content__card__subtitle loading-component filing__info__content__card__subtitle--load">
                    </p>
                </l1>
                <l1 class="filing__info__content__card">
                    <p
                        class="filing__info__content__card__subtitle loading-component filing__info__content__card__subtitle--load">
                    </p>
                </l1>
                <l1 class="filing__info__content__card">
                    <p
                        class="filing__info__content__card__subtitle loading-component filing__info__content__card__subtitle--load">
                    </p>
                </l1>
                <l1 class="filing__info__content__card">
                    <p
                        class="filing__info__content__card__subtitle loading-component filing__info__content__card__subtitle--load">
                    </p>
                </l1>
            </ul>
            <ul class="filing__info__content">
                <l1 class="filing__info__content__card">
                    <p
                        class="filing__info__content__card__subtitle loading-component filing__info__content__card__subtitle--load">
                    </p>
                </l1>
                <l1 class="filing__info__content__card">
                    <p
                        class="filing__info__content__card__subtitle loading-component filing__info__content__card__subtitle--load">
                    </p>
                </l1>
                <l1 class="filing__info__content__card">
                    <p
                        class="filing__info__content__card__subtitle loading-component filing__info__content__card__subtitle--load">
                    </p>
                </l1>
            </ul>
        </section>
        <section class="filing__wrapper" v-if="dataFiling.data.subject != null && dataFiling.data.subject != ''">
            <ul class="filing__wrapper__navegation">
                <li :class="'filing__wrapper__navegation__card filing__wrapper__navegation__card--' + (dataFiling.stateViewTrazability ? 'focused' : '')"
                    @click="dataFiling.redirectTrazability">Datos trazabilidad</li>
                <li :class="'filing__wrapper__navegation__card filing__wrapper__navegation__card--' + (dataFiling.stateViewAlerts ? 'focused' : '')"
                    @click="dataFiling.redirectAlerts">Alertas</li>
                <li :class="'filing__wrapper__navegation__card filing__wrapper__navegation__card--' + (dataFiling.stateViewDocuments ? 'focused' : '')"
                    @click="dataFiling.redirectDocuments">Documentos</li>
            </ul>
            <div class="filing__wrapper__container">
                <LineHistory v-if="dataFiling.stateViewTrazability" :dataLineHistory="dataFiling.dataLineHistory" />
                <ul class="filing__wrapper__container__documents" v-if="dataFiling.stateViewDocuments">
                    <template v-if="dataFiling.data.documents < 1">
                        <li
                            class="filing__wrapper__container__documents__card filing__wrapper__container__documents__card--load loading-component">
                        </li>
                        <li
                            class="filing__wrapper__container__documents__card filing__wrapper__container__documents__card--load loading-component">
                        </li>
                        <li
                            class="filing__wrapper__container__documents__card filing__wrapper__container__documents__card--load loading-component">
                        </li>
                    </template>
                    <template v-else>

                        <li class="filing__wrapper__container__documents__card"
                            v-for="document in dataFiling.data.documents">

                            <p>{{ document.name }}</p>
                            <nav>
                                <button @click="dataFiling.onClickDocument(document.url)">Ver</button>
                            </nav>
                        </li>
                    </template>

                </ul>
                <ul class="filing__wrapper__container__line-history" v-if="dataFiling.stateViewAlerts">
                    <li>Alertas</li>
                </ul>
            </div>
        </section>
        <ModalAssignFiling :dataModalAssignFiling="dataFiling.dataModalAssignFiling" @sendDataEditorModalAssignFiling="sendDataEditorModalAssignFiling" />
    </article>
    <ModalPdfViewer :dataModalPdfViewer="dataFiling.dataModalPdfViewer" />

</template>
<script setup lang="ts">
import LineHistory from '../../organisms/line-history/LineHistory.organism.vue';
import SelectActions from '../../atoms/select/Select.atom.vue';
import ModalPdfViewer from '../../molecules/modals/modal-pdf-viewer/ModalPdfViewer.molecule.vue';
import ModalAssignFiling from '../../molecules/modals/modal-assign-filing/ModalAssignFiling.molecule.vue';
defineProps(['dataFiling']);
const emits = defineEmits(['sendDataEditorModalAssignFiling']);

function sendDataEditorModalAssignFiling(data: any) {
    emits('sendDataEditorModalAssignFiling', data)
}
</script>
<style scoped src="./Filing.template.scss"></style>