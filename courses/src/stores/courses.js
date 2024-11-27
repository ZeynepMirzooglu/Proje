import { defineStore } from 'pinia';
import router from '@/router';
import { Db } from '@/utils/firebase';
import {collection,getDoc,doc,setDoc,updateDoc,serverTimestamp,query,orderBy,getDocs,limit,startAfter,deleteDoc} from 'firebase/firestore';
import { useUserStore } from './user';
import { reload } from 'firebase/auth';


let coursesCollection = collection(Db,'courses');

export const useCourseStore=defineStore('course',{
    state:()=>({
        homeCourses:'',
        adminCourses:'',
        adminLastVisible:'',

    }),
    getters:{
       getHomeSlides(state){
        return state.homeCourses.slice(0,3);
       }
    },
    actions:{
        async getCourses(){
            const q = query(coursesCollection,orderBy('timestamp','desc'))
            const querySnapshot=await getDocs(q);
            const courses =querySnapshot.docs.map(doc=>({
                id:doc.id,
                ...doc.data()
            }));
            this.homeCourses=courses;
            return this.homeCourses;
        },
        async addCourse(formData){
            const userStore =useUserStore();
            const user=userStore.getUserData;
            
            const newCourse=doc(coursesCollection);

            await setDoc(newCourse,{
                timestamp:serverTimestamp(),
                owner:{
                    uid:user.uid,
                    firstname:user.firstname,
                    lastname:user.lastname
                },
                ...formData
            });
            router.push({name:'courses',query:{reload:true}});

        },
        async adminGetCourses(docLimit){
        const q= query(coursesCollection,orderBy('timestamp','desc'),limit(docLimit));
        const querySnapshot = await getDocs(q);
        //console.log(querySnapshot);
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
        const courses = querySnapshot.docs.map(doc=>({
            id:doc.id,
            ...doc.data()
        }));
        this.adminCourses = courses;
        this.adminLastVisible =lastVisible;
        //console.log(this.adminCourses);
        },
        async adminGetMoreCourses(docLimit){
            let oldCourses = this.adminCourses;
            const q= query(coursesCollection,orderBy('timestamp','desc'),startAfter(this.adminLastVisible),limit(docLimit));
            const querySnapshot = await getDocs(q);
            const lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
            const newCourses = querySnapshot.docs.map(doc=>({
                id:doc.id,
                ...doc.data()
            }));
            this.adminCourses = [
                ...oldCourses,
                ...newCourses
            ];
            this.adminLastVisible =lastVisible;
        },
        async removeById(courseId){
           await deleteDoc(doc(Db,'courses',courseId));
           const newList = this.adminCourses.filter(course=>{
            return course.id != courseId
           });
           this.adminCourses = newList;
        },
        async getCourseById(id){
            try {
                const docRef = await getDoc(doc(Db,'courses',id))
                //console.log(docRef.data())
                return docRef.data();
            } catch (error) {
                console.error(error);
            }
        },
        async updateCourse(id,formData){
            const docRef= doc(Db,'courses',id);
            await updateDoc(docRef,{...formData});
        }
    }
})