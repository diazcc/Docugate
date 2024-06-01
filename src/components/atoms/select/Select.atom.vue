<!-- *##### COMPONENT SELECT ##### -->
    <!--
        ?It's define by dataText for be se used on others components.
        -- This component could be improve but can't be modified about funcionality, it must be developed in component page. -- 

        :name="dataSelect.name" -- data for identify component, necesary where someone use the decorator @input.
        :type="dataSelect.type" -- set type of input, could be email, passwordd...
        :class="['input input--' + dataSelect.classInput]" -- can modify the style that you want in the file ./thisnamecomponente.scss
        !v-model="dataSelect.model" -- don't found on this structure json.
        @click="dataSelect.onClick"-- get the event click and develop any functions from father component
        :disabled="dataSelect.disabled" -- can disabled this component when you need.
        @input="handleInput -- you can get the listener about input of each work or character that you press and get data in a json.

        ?this component expects this structure :
        
        dataSelect: {
                        id:'',
                        name:'',
                        className: '',
                        disabled: false,
                        onChange: (data:any) => { 
                            /**
                            * you can use the data variable to obtain the value of the select: data.target.value
                            * and you can also use it to get the value of the label: data.target.options[data.target.selectedIndex].label
                            * or simply not using it is not mandatory
                            */
                        },
                        onClick: () => { },
                        placeholder : '',
                        model : '',
                        options : [
                        {
                            value : '',
                            label :''
                        }
                        ]
                    }
        Todo: copy this structure where you gonna send data to this component.
    -->
    <!--
            TODO: If you need add some text, you must add it to field from /locales/lang.js and set text es and en.    
        -->
<template>
    <select 
        :id="dataSelect.id" 
        :name="dataSelect.name" 
        :class="['select select--' + dataSelect.className  + ' ' + (dataSelect.options.length<1 ? 'loading-component' : '')]"
        @click="dataSelect.onClick" 
        :disabled="dataSelect.disabled" 
        @change="dataSelect.onChange"
        v-model="dataSelect.model"
    >
        <option v-if="dataSelect.model == ''" selected disabled value=''>
            {{ $t(dataSelect.placeholder) }} 
        </option> 
        <option v-if="dataSelect.options.length >= 1" v-for="option in dataSelect.options" :selected="option.value === dataSelect.model" :key="option.value" :value="option.value" class="select__option">{{ option.label }}</option>
    </select>
</template>
<script setup lang="ts">

//IMPORTS
import { defineProps } from 'vue';//Import function 'reactive' for show on the DOM data.

// VARIABLES
const props = defineProps(['dataSelect']);//Use defineProps for can get data in another component.

/** 
    *?- This component get a json structure data, you need construct the structure json from the las call about this component,
        for example: page.

*    TODO FUNCTIONS 


    **FUNCTIONS: 
    ¡This componente will not have more functions on this section, must be define on the structure variable json .!
*/
</script>

<style scoped src="./Select.atom.scss"></style><!--Call the style in the same folder-->
<!--
    *ADVICE FROM COMPONENT:

    If you need add some style or change, you must add to doc InputText.atom.scss and add code as :
    
    className {
    
        &--modifierName{
            defining the modifier you can change the style that you need. The default styles by className don't be modified if isn't necesary.
        }
    }

-->

