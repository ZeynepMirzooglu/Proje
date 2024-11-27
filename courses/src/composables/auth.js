import { ref } from "vue"
import { Auth } from "@/utils/firebase";
import {onAuthStateChanged} from 'firebase/auth';
import { useUserStore } from "@/stores/user";


export const firstLoad=()=>{
    const userStore=useUserStore();
    const loading=ref(true);
    onAuthStateChanged(Auth,async(user)=>{
        //console.log(user);
        if(user){
            await userStore.authSigIn(user.uid)
        }
     loading.value=false;

    })
    return{loading}
}

export const isAuth=()=>{
    let user = Auth.currentUser;
    if(!user) return '/signin';
    return true;
}
export const isLoggedIn=()=>{
    let user = Auth.currentUser;
    if(user) return '/user/dashboard';
    return true;
}