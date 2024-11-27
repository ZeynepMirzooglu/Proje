<template>
    <div>
        <div v-if="loading" class="text-center m-3">
            <v-progress-circular indeterminate color="primary"/>
        </div>
        <div v-else>
            <v-table  style="background:darkblue;color:white;">
              <thead>
                <tr>
                  <th class="text-left">
                    Kategori
                  </th>
                  <th class="text-left">
                    Eğitmen
                  </th>
                  <th class="text-left">
                    Kurs Adı
                  </th>
                  <th class="text-left">
                    Kurs Puanı
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="course in courseStore.adminCourses"
                  :key="course.id"
                >
                  <td>{{ course.category}}</td>
                  <td>{{ course.owner.firstname }} {{ course.owner.lastname }}</td>
                  <td>{{ course.title }}</td>
                  <td>{{ course.rating }}</td>
                  <td> <v-btn variant="outlined" color="red" size="small" @click="deleteCourse(course.id)">Sil</v-btn></td>
                  <td><v-btn variant="outlined" color="blue" size="small" @click="router.push({name:'editcourse',params:{id:course.id}})">Güncelle</v-btn></td>
                </tr>
              </tbody>
            </v-table>
            <div v-if="btnLoad" class="text-center m-3">
                <v-progress-circular indeterminate color="primary"/>
            </div>
          <v-btn v-else variant="outlined" class="mt-3" @click="loadMore()">Daha Fazla Kurs Yükle</v-btn>
        </div>
    </div>
</template>
<script setup>
import {useCourseStore} from '@/stores/courses';
import {ref} from 'vue';
import {useRoute,useRouter} from 'vue-router'
import {useToast} from 'vue-toast-notification'


const $toast=useToast();

const route=useRoute();
const router = useRouter();

const courseStore=useCourseStore();

const btnLoad = ref(false);

const loading=ref(false);

if(!courseStore.adminCourses || route.query.reload){
    loading.value =true;
    courseStore.adminGetCourses(3).finally(()=>{
        loading.value = false;
    });
}


const loadMore = ()=>{
    btnLoad.value = true;
    courseStore.adminGetMoreCourses(3).finally(()=>{
        btnLoad.value = false;
    });
}


const deleteCourse=(courseId)=>{
    loading.value=true;
courseStore.removeById(courseId).then(()=>{
$toast.success('Kayıt başarılı bir şekilde silindi!')
}).catch(()=>{
$toast.error('Kayıt silinemedi!');
}).finally(()=>{loading.value =false;});
}
</script>