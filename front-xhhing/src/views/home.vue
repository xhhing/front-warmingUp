<template>

    <el-form label-width="100px" :model="loginer" style="max-width: 460px" v-if="islogin">
        <el-form-item label="用户名：">
          <el-input v-model="loginer.name" />
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="loginer.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%;" @click="login">登录</el-button>
        </el-form-item>
        <el-form-item>
          <p style="width: 100%;">
            还没有注册账号？点此
            <span style="color: red; cursor :pointer" @click="islogin=false">注册</span>
          </p>
        </el-form-item>
    </el-form>
    
    
    <el-form label-width="100px" :model="registrant" style="max-width: 460px" v-else>
        <el-form-item label="用户名：">
          <el-input v-model="registrant.name" />
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="registrant.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%;" @click="register">注册</el-button>
        </el-form-item>
        <el-form-item>
          <p style="width: 100%;">
            已经注册账号？点此
            <span style="color: red; cursor :pointer" @click="islogin=true">登录</span>
          </p>
        </el-form-item>
    </el-form>
      
</template>
    
    
<script setup>
    
  import { reactive, ref } from 'vue';
  import { useRouter} from 'vue-router'
  import axios from 'axios'
  import querystring from 'querystring'
  import useUserStore from '../stores/userStore'
  
  const sLoginer = useUserStore()
  const router = useRouter()
  const islogin = ref(true)
  const loginer = reactive({
    name : "",
    password : "",
    token:""
  })
  const registrant = reactive({
    name : "",
    password : "",
  })
    
  function login (){
    axios({
      method: "POST",
      url:"http://8.130.119.35:8080/user/login",
      data:querystring.stringify({
        username:loginer.name,
        password:loginer.password,
      })
    }).then(response =>{
      console.log(response)
      console.log("response.data.data.token:"+response.data.data.token)
      sLoginer.logindata.token = response.data.data.token
      sLoginer.logindata.name = loginer.name
      sLoginer.logindata.password = loginer.password
      if (response.data.message === "成功"){
        router.push({name:"todolist"})
      }
      console.log(response.data.message)
    }).catch(error => {
      console.log(error);
    })
  }

  function register(){
    axios({
      method: "POST",
      url:"http://8.130.119.35:8080/user/register",
      data:querystring.stringify({
        username:registrant.name,
        password:registrant.password,
      })
    }).then(response =>{
      console.log(response)
    }).catch(error => {
      console.log(error);
    })
  }
    
</script>
    
    
    
<style scoped>
    
    
    
</style>