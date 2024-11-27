<template>
    
    <div>
        <h1>Kurs Güncelle</h1>
        <hr/>
        <Form class="mb-4" :validation-schema="CourseSchema" @submit="onSubmit">
          <div class="mb-4">
            <Field name="category" v-model="course.category" v-slot="{field,errors,errorMessage}">
                <input type="text" class="form-control" placeholder="Lütfen Kategori Giriniz!" v-bind="field" :class="{'is-invalid':errors.length !==0}"/>
                <div class="input-alert" v-if="errors.length !==0">{{errorMessage}}</div>
                </Field>
          </div>
          <div class="mb-4">
            <Field name="title" v-model="course.title" v-slot="{field,errors,errorMessage}">
                <input type="text" class="form-control" placeholder="Lütfen Kurs adını giriniz!" v-bind="field" :class="{'is-invalid':errors.length !==0}"/>
                <div class="input-alert" v-if="errors.length !==0">{{errorMessage}}</div>
                </Field>
          </div>
          <div class="mb-4">
            <Field name="summary" v-model="course.summary" v-slot="{field,errors,errorMessage}">
                <textarea type="text" class="form-control" placeholder="Lütfen Kurs özetini giriniz!" v-bind="field" :class="{'is-invalid':errors.length !==0}"></textarea>
                <div class="input-alert" v-if="errors.length !==0">{{errorMessage}}</div>
                </Field>
          </div>
          <div class="mb-4">
            <Field name="rating" v-model="course.rating" v-slot="{field,errors,errorMessage}">
                <select v-bind="field" class="form-select" :class="{'is-invalid':errors.length !==0}">
                    <option value="Kurs Puanı Seçiniz">Kurs Puanı Seçiniz</option>
                    <option v-for="rating in ratingArray" :key="rating.id" :value="rating">{{rating}}</option>
                </select>
                <div class="input-alert" v-if="errors.length !==0">{{errorMessage}}</div>
                </Field>
          </div>
          <div class="mb-4">
            <Field name="img" v-model="course.img" v-slot="{field,errors,errorMessage}">
                <input type="text" class="form-control" placeholder="Lütfen Kurs resmi giriniz!" v-bind="field" :class="{'is-invalid':errors.length !==0}"/>
                <div class="input-alert" v-if="errors.length !==0">{{errorMessage}}</div>
                </Field>
          </div>
          <div class="mb-4">
            <Tiptap :content="course.description" @update="updateEditor"/>
            <Field v-model="veditor" name="description" v-slot="{field,errors,errorMessage}">
                <input type="hidden" class="form-control" placeholder="Lütfen Kurs resmi giriniz!" v-bind="field" :class="{'is-invalid':errors.length !==0}"/>
                <div class="input-alert" v-if="errors.length !==0">{{errorMessage}}</div>
                </Field>
        
          </div>
        <v-btn :loading="loading" type="submit" variant="outlined">Güncelle</v-btn>
       
        </Form>
    </div>
</template>
<script setup>
import {Field,Form} from 'vee-validate'
import * as yup from 'yup';
import CourseSchema from './schema.js';
import Tiptap from '@/utils/Tiptap.vue';
import { ref } from 'vue';
import {useCourseStore} from '@/stores/courses.js';
import {useToast} from 'vue-toast-notification'
import {useRoute,useRouter} from 'vue-router';

const $toast=useToast();

const route =useRoute();
const router =useRouter();
const courseStore=useCourseStore();
const ratingArray=[0,1,2,3,4,5];
const veditor= ref('');
const loading = ref(false);
const course=ref({});
courseStore.getCourseById(route.params.id).then((result) => {
    course.value = {...result};
}).catch((err) => {
    console.log(err);
});
function updateEditor(value){
    veditor.value = value;
}

function onSubmit(values,{resetForm}){
//console.log(values);
loading.value =true;
courseStore.updateCourse(route.params.id,values).then(()=>{
    $toast.success('Güncelleme başarılı');
router.push({name:'courses',query:{reload:true}});
}).catch(()=>{
    $toast.error('Güncelleme başarısız!');
}).finally(()=>{loading.value =false;});
}


</script>