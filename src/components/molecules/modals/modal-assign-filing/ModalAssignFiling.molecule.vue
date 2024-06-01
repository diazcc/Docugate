<!--
    Todo: COMPONENT MODAL PDF VIEWER REUSABLE
    ?To use this component, read carefully what it requires in order to handle the correct data and structure.

    dataModalAssignFiling: {
        isActive: false,
        dataEditorText: {
            dataEditor: { // properties for the editor
                setData: () => { },
                content: '',
            },
        },
        dataButtonCancel: {
            className: '',
            text: 'Cancelar',
            disabled: false,
            onClick: () => {
                closeModalAssignFiling()
            }
        },
        dataButtonSend: {
            className: 'blue',
            text: 'Enviar',
            disabled: false,
            onClick: () => {
                dataCorrespondenceReceived.dataModalAssignFiling.dataEditorText.dataEditor.setData(); // sendDataEditorModalAssignFiling must be  called in component template o where finalized de calls for be usen the boton send of this modal 
            }
        },
        dataSelectDependence: {
            id: '',
            name: 'dependece',
            className: '',
            disabled: false,
            onClick: () => { },
            placeholder: 'Seleccionar dependencia',
            model: '',
            options: [
                {
                    value: '',
                    label: ''
                }
            ]
        },
        dataSelectUser: {
            id: '',
            name: 'userDependece',
            className: '',
            disabled: true, //disabled temporaly
            onClick: () => { },
            placeholder: 'Seleccionar Usuario',
            model: '',
            options: [
                {
                    value: '',
                    label: ''
                }

            ]
        }
    },

-->
<template>
    <article :class="'modal-assign-filing modal-assign-filing--' + (dataModalAssignFiling.isActive ? 'show' : 'hidde')">
        <ul  :class="'modal-assign-filing__content modal-assign-filing__content--' + (dataModalAssignFiling.isActive ? 'show' : 'hidde')">

            <h1 class="modal-assign-filing__content__title">{{$t('assign')}}</h1>

            <li class="modal-assign-filing__content__form">
                <SelectDependence :dataSelect="dataModalAssignFiling.dataSelectDependence"  required/>
                <SelectUser :dataSelect="dataModalAssignFiling.dataSelectUser" required />
                <input type="text" placeholder="Correos con copia">
            </li>

            <li class="modal-assign-filing__content__editor">
                <EditorText :dataEditorText="dataModalAssignFiling.dataEditorText" @sendDataEditor="getSendDataEditor"/>
            </li>

            <li class="modal-assign-filing__content__footer">
                <input type="file" placeholder="Escribir">
                <input type="file" placeholder="Escribir">
                <nav class="modal-assign-filing__content__footer__buttons">
                    <Button :dataButton="dataModalAssignFiling.dataButtonCancel" />
                    <Button :dataButton="dataModalAssignFiling.dataButtonSend" />
                </nav>
            </li>
        </ul>
    </article>
</template>
<script setup lang="ts">
import EditorText from "../../editor-text/EditorText.molecule.vue";
import Button from "../../../atoms/button/Button.atom.vue";
import SelectDependence from "../../../atoms/select/Select.atom.vue";
import SelectUser from "../../../atoms/select/Select.atom.vue";

const props = defineProps(['dataModalAssignFiling']);
const emits = defineEmits(['dataEditor', 'sendDataEditorModalAssignFiling'])


function getSendDataEditor(data: any) {  
    emits('sendDataEditorModalAssignFiling', data)
}


</script>
<style scoped src="./ModalAssignFiling.molecule.scss"></style>