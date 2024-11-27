import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from 'firebase/auth';
import { Db,Auth } from '@/utils/firebase';
import {getDoc,doc,setDoc,updateDoc} from 'firebase/firestore';
import router from '@/router';
import {useToast} from 'vue-toast-notification'


const $toast=useToast();
const DEFAULT_USER={
   uid:null,
   email:null,
   firstname:null,
   lastname:null,
   isAdmin:null
}
export const useUserStore = defineStore('user', {
state:()=>({
    loading:false,
    user:DEFAULT_USER,
    auth:false,
}),
getters:{
    getUserData(state){
        return state.user;
    },
    getUserId(state){
        return state.user.uid;
    }

},
actions:{
    async updateProfile(userData){
        try {
            await updateDoc(doc(Db,'users',this.getUserId),{...userData});
            this.setUser(userData);
            $toast.success('Güncelleme başarılı!');
        } catch (error) {
            $toast.error('Güncelleme başarısız!');
            console.log(error);
        }
    },
    setUser(user){
        this.user = {...this.user,...user};
        this.auth =true;
    },
    async signOut(){
        await signOut(Auth);
        this.user = DEFAULT_USER;
        this.auth=false;
        router.push('/');
    },
    async register(formData){
        try {
          this.loading=true;
          const response =  await createUserWithEmailAndPassword(Auth,formData.email,formData.password);
          const newUser={
            uid:response.user.uid,
            email:response.user.email,
            isAdmin:false,
          }
          await setDoc(doc(Db,'users',response.user.uid),newUser);
          this.setUser(newUser);
          router.push('/user/dashboard');
          $toast.success('Hoşgeldiniz!');
        } catch (error) {
            console.error(error);
            $toast.error('Kayıt BAŞARISIZ!');
        }finally{
            this.loading = false;
        }
     
    },
    async getUserProfile(uid){
     try {
       const userRef= await getDoc(doc(Db,'users',uid))
       //console.log(userRef.data(),"userRef")
       return userRef.data();
     } catch (error) {
        console.error(error)
     }
    },
    async authSigIn(uid){
        try {
            const userData= await this.getUserProfile(uid);
            this.setUser(userData);
            return true;
        } catch (error) {
            console.error(error)
        }
     
    },
    async signIn(formData){
        try {
            this.loading=true;
            const response =  await signInWithEmailAndPassword(Auth,formData.email,formData.password);
            //console.log(response,"response");
           const userData= this.getUserProfile(response.user.uid);
           this.setUser(userData);
           router.push('/user/dashboard');
           $toast.success('Hoşgeldiniz!');
        } catch (error) {
            console.error(error);
            $toast.error('Hatalı Giriş Yaptınız!');
        }finally{
          this.loading =true;
        }

    }

}
})
