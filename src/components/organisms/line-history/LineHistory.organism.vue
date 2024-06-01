<!-- 

    TODO ########################## COMPONENT LINE HISTORY ORGANISM ########################## 

    ?This component is a component personalized, just need a prop of type array []

    structure prop:

    dataLineHistory :[
        {
            date:'',
            description:''
        }
    ]

-->

<template>
    <ul class="line-history">
        <template v-if="dataLineHistory.length<1">
            <li class="line-history__card">
                <div class="line-history__card__line"></div>
                <p class="line-history__card__date loading-component"></p>
                <p class="line-history__card__description loading-component">
                </p>
            </li>
            <li class="line-history__card">
                <div class="line-history__card__line"></div>
                <p class="line-history__card__date loading-component"></p>
                <p class="line-history__card__description loading-component">
                </p>
            </li>
            
        </template>
        <template v-else>
            <li class="line-history__card" v-for="history in dataLineHistory">
                <div class="line-history__card__line"></div>
                <p class="line-history__card__date ">{{history.date}}</p>
                <p class="line-history__card__description ">
                    {{history.description}}
                </p>
            </li>
        </template>
      </ul>
</template>
<script setup lang="ts">
defineProps(['dataLineHistory']);

</script>
<style src="./LineHistory.organism.scss" scoped></style>