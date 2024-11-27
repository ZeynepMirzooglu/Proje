<template>

    <div class="signinContainer">
        <div  v-if="userStore.loading">
                  <v-progress-circular
                    color="primary"
                    indeterminate/>
        </div>
        <Form :validation-schema="formSchema" @submit="onSubmit" v-if="!userStore.loading">
            <h1 class="text-center">{{isLoggedScreen ? 'Eğitmen Girişi' : 'Kaydol'}}</h1>
          <div class="form-group">
            <Field name="email" v-slot="{field,errors,errorMessage}">
                <input type="email" class="form-control" placeholder="Lütfen email bilgilerinizi giriniz!" v-bind="field" :class="{'is-invalid':errors.length !==0}"/>
                <div class="input-alert" v-if="errors.length !==0">{{errorMessage}}</div>
                </Field>
          </div>
          <div class="form-group">
            <Field name="password" v-slot="{field,errors,errorMessage}">
                <input type="password" class="form-control" placeholder="Lütfen şifrenizi giriniz!" v-bind="field" :class="{'is-invalid':errors.length !==0}"/>
                <div class="input-alert" v-if="errors.length !==0">{{errorMessage}}</div>
                </Field>
          </div>
          <button class="btn btn-block mb-3">{{isLoggedScreen ? 'Giriş Yap' : 'Kaydol'}}</button>
          <div class="formChange"  @click="isLoggedScreen =!isLoggedScreen">
            <span v-if="isLoggedScreen">Kaydol</span>
            <span v-else>Giriş Yap</span>
          </div>
        </Form>

    </div>

</template>
<script setup>
import {Field,Form} from 'vee-validate'
import * as yup from 'yup';
import {ref} from 'vue'
import {useUserStore} from '@/stores/user.js'


const userStore= useUserStore();

const isLoggedScreen= ref(true);
const formSchema=yup.object({
    email:yup.string().required('Email alanı zorunludur!').email('Lütfen doğru formatta email giriniz!'),
    password:yup.string().required('Şifre girmek zorunludur!')
})
function onSubmit(values,{resetForm}){
//console.log(values)
if(isLoggedScreen.value){
   userStore.signIn(values)
}else{
    userStore.register(values);
}

}



</script>