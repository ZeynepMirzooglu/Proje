<template>
    <div v-if="loading" class="text-center m-3">
        <v-progress-circular indeterminate color="primary"/>
    </div>
    <div v-else>
        <h1>Kurs Ekle</h1>
        <hr/>
        <Form class="mb-4" :validation-schema="CourseSchema" @submit="onSubmit">
          <div class="mb-4">
            <Field name="category" v-slot="{field,errors,errorMessage}">
                <input type="text" class="form-control" placeholder="Lütfen Kategori Giriniz!" v-bind="field" :class="{'is-invalid':errors.length !==0}"/>
                <div class="input-alert" v-if="errors.length !==0">{{errorMessage}}</div>
                </Field>
          </div>
          <div class="mb-4">
            <Field name="title" v-slot="{field,errors,errorMessage}">
                <input type="text" class="form-control" placeholder="Lütfen Kurs adını giriniz!" v-bind="field" :class="{'is-invalid':errors.length !==0}"/>
                <div class="input-alert" v-if="errors.length !==0">{{errorMessage}}</div>
                </Field>
          </div>
          <div class="mb-4">
            <Field name="summary" v-slot="{field,errors,errorMessage}">
                <textarea type="text" class="form-control" placeholder="Lütfen Kurs özetini giriniz!" v-bind="field" :class="{'is-invalid':errors.length !==0}"></textarea>
                <div class="input-alert" v-if="errors.length !==0">{{errorMessage}}</div>
                </Field>
          </div>
          <div class="mb-4">
            <Field name="rating" v-slot="{field,errors,errorMessage}">
                <select v-bind="field" class="form-select" :class="{'is-invalid':errors.length !==0}">
                    <option value="Kurs Puanı Seçiniz">Kurs Puanı Seçiniz</option>
                    <option v-for="rating in ratingArray" :key="rating.id" :value="rating">{{rating}}</option>
                </select>
                <div class="input-alert" v-if="errors.length !==0">{{errorMessage}}</div>
                </Field>
          </div>
          <div class="mb-4">
            <Field name="img" v-slot="{field,errors,errorMessage}">
                <input type="text" class="form-control" placeholder="Lütfen Kurs resmi giriniz!" v-bind="field" :class="{'is-invalid':errors.length !==0}"/>
                <div class="input-alert" v-if="errors.length !==0">{{errorMessage}}</div>
                </Field>
          </div>
          <div class="mb-4">
            <Tiptap @update="updateEditor"/>
            <Field v-model="veditor" name="description" v-slot="{field,errors,errorMessage}">
                <input type="hidden" class="form-control" placeholder="Lütfen Kurs resmi giriniz!" v-bind="field" :class="{'is-invalid':errors.length !==0}"/>
                <div class="input-alert" v-if="errors.length !==0">{{errorMessage}}</div>
                </Field>
        
          </div>
        <v-btn type="submit" variant="outlined">Kurs Ekle</v-btn>
       
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

const $toast=useToast();

const courseStore=useCourseStore();

const veditor= ref('');
const loading = ref(false);
const ratingArray=[0,1,2,3,4,5];

function onSubmit(values,{resetForm}){
   //console.log(values);
   loading.value = true;
   courseStore.addCourse(values).then(() => {
    $toast.success('Kurs Eklendi!')
   }).catch((err) => {
    $toast.error('Kurs Eklenirken Hata Oluştu!')
    console.error(err)
   }).finally(()=>{
    loading.value = false;
   });
}


function updateEditor(value){
    veditor.value = value;
}
</script>