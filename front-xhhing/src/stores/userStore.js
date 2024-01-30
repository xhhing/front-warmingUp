import { defineStore } from 'pinia'

const useUserSotre = defineStore('userStore',{
    state:()=>{
        return {
            logindata:{
                name : "",
                password : "",
                token:""
            }
        }
    },
    persist:true
})

export default useUserSotre