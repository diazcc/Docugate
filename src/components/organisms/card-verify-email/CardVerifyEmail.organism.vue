<template>
    <section class="card-verifyemail-normal">
        <InputText :dataInput="dataCardVerifyEmail.dataInputEmail" />
        <Button :dataButton="dataCardVerifyEmail.dataButton" />
    </section>
</template>
<script setup lang="ts">
import InputText from '../../atoms/input/InputText.atom.vue';
import Button from '../../atoms/button/Button.atom.vue';

defineProps(['dataCardVerifyEmail']);
</script>
<style scoped src="./CardVerifyEmail.organism.scss"></style>