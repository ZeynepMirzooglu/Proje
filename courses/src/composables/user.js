import {useUserStore} from '@/stores/user'
import { ref } from 'vue';
import * as yup from 'yup';

export const updateProfile =()=>{
    const userStore=useUserStore();
    const loading = ref(false);
    const firstname = ref(userStore.user.firstname);
    const lastname=ref(userStore.user.lastname);

    function onSubmit(values,{resetForm}){
        loading.value =true;
        userStore.updateProfile(values).finally(()=>{
            loading.value = false;
        });
       
    }
    const formSchema=yup.object({
        firstname:yup.string().required('Bu alan zorunludur!'),
        lastname:yup.string().required('Bu alan zorunludur!')
    })
    return {onSubmit,loading,firstname,lastname,formSchema}
}