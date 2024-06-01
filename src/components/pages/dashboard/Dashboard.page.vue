<template>
    <DashboardTemplate :dataDashboardTemplate="dataDashboard"></DashboardTemplate>
</template>

<script setup lang="ts">

import { reactive, onMounted, ref } from 'vue'
import DashboardTemplate from '../../templates/dashboard/Dashboard.template.vue';
import DependenceService from '../../../services/DependenceServices';
import LoginService from '../../../services/testService';
const allDependences = ref()


const dataDashboard = reactive({
    dataTableCorrespondence: {
        dataTitle: {
            text: "correspondence",
            classTitle: "",
        },
        data: {
            className: 'list',
            lists: [
                {
                    id: 1,
                    subject: "Sachat Quintero",
                    remitter: "Luis",
                    radication: 1061821659,
                    type: "Natural",
                },
                {
                    id: 2,
                    subject: "Sachat Quintero",
                    remitter: "Luis",
                    radication: 1061821659,
                    type: "Natural",
                },
                {
                    id: 3,
                    subject: "Sachat Quintero",
                    remitter: "Luis",
                    radication: 1061821659,
                    type: "Natural",
                },
                {
                    id: 1,
                    subject: "Sachat Quintero",
                    remitter: "Luis",
                    radication: 1061821659,
                    type: "Natural",
                },
                {
                    id: 2,
                    subject: "Sachat Quintero",
                    remitter: "Luis",
                    radication: 1061821659,
                    type: "Natural",
                },
            ],
            onClick: () => {
            }

        },
        dataText: {
            text: 'last_radications',
            classText: "italic",

        }
    },


    dataColaborativeWork: {
        dataTitle: {
            text: "colaborative_work",
            classTitle: "",
        },
        dataText: {
            text: "start_colaborative_work",
            classText: "light",
        },
        dataButton: {
            text: "start",
            className: "blue",

        }
    },


    dataCalendarWidget: {
        dataTitle: {
            text: "calendar",
            classText: "",
        }
    },

    dataStatistic: {
        dataTitle: {
            text: "statistics",
            classText: "",
        },
        dataList: {
            className: 'list',
            lists: [
                {
                    id: 1,
                    text: 'statistics',
                    className: "",
                    path: "/home/dependences/",
                    number: 39

                },
                {
                    id: 2,
                    text: 'colaborative_work_request',
                    className: "",
                    path: '/home/dependences/',
                    number: 3

                },
                {
                    id: 3,
                    text: 'pending_processes',
                    className: "",
                    path: '/home/dependences/',
                    number: 13

                }, {
                    id: 4,
                    text: 'new_reports',
                    className: "",
                    path: '/home/dependences/',
                    number: 17

                }, {
                    id: 5,
                    text: 'unfinished_reports',
                    className: "",
                    path: '/home/dependences/',
                    number: 17

                },
            ],
            onClick: () => {
            }

        }


    }
}

)



</script>




<style scoped src="./Dashboard.page.scss"></style>