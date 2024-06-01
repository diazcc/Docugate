<!-- *##### COMPONENT INPUT ##### -->
<!--
    ? It's define by dataText for be se used on others components.
    -- This component could be improve but can't be modified about funcionality, it must be developed in component page. -- 
    
    :name="dataInput.name" -- data for identify component, necesary where someone use the decorator @input.
    :type="dataInput.type" -- set type of input, could be email, passwordd...
    :class="['input input--' + dataInput.classInput]" -- can modify the style that you want in the file ./thisnamecomponente.scss
    v-model="dataInput.model" -- can detect state some change about this component and get the value.
    @click="dataInput.onClick"-- get the event click and develop any functions from father component
    :placeholder="dataInput.placeholder" -- personalice the placeholder
    :disabled="dataInput.disabled" -- can disabled this component when you need.
    @input="handleInput -- you can get the listener about input of each work or character that you press and get data in a json.

    ?this component expects this structure :

    dataInput: {
                    id :'',
                    name:'password',
                    classInput: '',
                    model: '',
                    type: 'password',
                    placeholder: '',
                    disabled: false,
                    required: false,
                    onClick: () => { }
                }
    
-->
<template>
    <input 
    :id="dataInput.id" 
    :name="dataInput.name"  
    :class="['input input--' + dataInput.classInput]" v-model="dataInput.model" 
    :type="dataInput.type" 
    @input="handleInput" 
    :placeholder="$t(dataInput.placeholder)" 
    :disabled="dataInput.disabled" 
    @click="dataInput.onClick" 
    :required="dataInput?.required"
    >
</template>
<script setup lang="ts">

//IMPORTS
import { defineProps } from 'vue';//Import function 'reactive' for show on the DOM data.

// VARIABLES
const props =  defineProps(['dataInput']);//Use defineProps for can get data in another component.
const emits = defineEmits(['inputChange']);
/** 
*    ? - This component get a json structure data, you need construct the structure json from the las call about this component,
        for example: page.
*/

//     FUNCTIONS: 

//   ¡¡If you need add some function, you must to inform to lider or supervisor of this project before.!!
const  handleInput= (event:Event) => { // This function is for get listener about each input and become as json data.
  emits('inputChange', { [props.dataInput.name]: (event.target as HTMLInputElement).value });
};
/**
    FUNCTIONS: 
*    Todo: ¡This componente will not have more functions on this section, must be define on the structure variable json .!
*/
</script>

<style scoped src="./InputText.atom.scss"></style><!--Call the style in the same folder-->
<!--
    ? ADVICE FROM COMPONENT:

    If you need add some style or change, you must add to doc InputText.atom.scss and add code as :
    
    className {
    
        &--modifierName{
            defining the modifier you can change the style that you need. The default styles by className don't be modified if isn't necesary.
        }
    }

-->

