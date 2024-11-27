<template>
    <div>
        <Form class="col-md-6" :validation-schema="formSchema"  @submit="onSubmit">
            <h1 class="text-center">Eğitmen Bilgileri</h1>
          <div class="mb-4">
            <Field name="firstname" v-model="firstname" v-slot="{field,errors,errorMessage}">
                <input type="text" class="form-control" placeholder="Lütfen Adınızı giriniz!" v-bind="field" :class="{'is-invalid':errors.length !==0}"/>
                <div class="input-alert" v-if="errors.length !==0">{{errorMessage}}</div>
                </Field>
          </div>
          <div class="mb-4">
            <Field name="lastname" v-model="lastname" v-slot="{field,errors,errorMessage}">
                <input type="text" class="form-control" placeholder="Lütfen Soyadınızı giriniz!" v-bind="field" :class="{'is-invalid':errors.length !==0}"/>
                <div class="input-alert" v-if="errors.length !==0">{{errorMessage}}</div>
                </Field>
          </div>
        <v-btn :loading="loading"  type="submit" variant="outlined" >Güncelle</v-btn>
        </Form>
    </div>
</template>
<script setup>
import {Form,Field} from 'vee-validate';
import {updateProfile} from '@/composables/user.js';

const {onSubmit,loading,firstname,lastname,formSchema}=updateProfile();
</script>