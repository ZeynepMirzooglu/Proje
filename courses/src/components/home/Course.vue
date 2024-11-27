<template>
    <div class="container courseTop">
    <div v-if="loading" class="text-center m-3">
        <v-progress-circular indeterminate color="primary"/>
    </div>
    <div v-else class="courseDiv">
       <div class="courseCategory">
        {{ course.category }}
       </div>
       <div class="courseImg" :style="{backgroundImage:`url(${course.img})`}"></div>
       <div class="courseContent">
        <div>Eğitmen <b>{{course.owner.firstname}}  {{course.owner.lastname}}</b></div>
        <hr/>
        <h1 class="courseTitle">{{course.title}}</h1>
        <div v-html="course.description"></div>
        <div class="courseRating">
            Kurs Puanı: <b>{{course.rating}}/5</b>
        </div>
       </div>
    </div>
</div>
</template>
<script setup>
import {useCourseStore} from'@/stores/courses'
import { useRoute } from 'vue-router';
import {ref} from 'vue';


const courseStore=useCourseStore();
const route = useRoute();
const course = ref('');
const loading=ref(true);
courseStore.getCourseById(route.params.id).then((response)=>{
    course.value =response;
}).finally(()=>{loading.value = false;});
console.log(course)
</script>