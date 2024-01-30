<template>

    <div class="todolist">
        <el-form label-width="100px">
            <el-form-item>
                <el-input v-model="textarea" :rows="2" type="textarea" placeholder="Please input"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width: 100%;" @click="create">创建</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tasks" style="width: 100%">
            <el-table-column label="内容" prop="content" width="100px"/>
            <el-table-column label="创建时间" prop="startTime" width="s00px"/>
            <el-table-column label="完成情况" prop="status" width="100px"/>
            <el-table-column width="200px" label="操作">
                <template #default="scope">
                    <!-- <el-button size="small" @click="handleCompelete(scope.$index)">完成</el-button> -->
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
                    <el-button size="small" @click="handleComplete(scope.$index)">完成</el-button>
                </template>
            </el-table-column>
        </el-table>            
    </div>

    <!-- 对话框 独立写 -->
    <!-- <el-dialog v-model="dialogVisible" title="请输入修改内容" width="30%">
        <el-input v-model="newContent" />
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="updateContent">确定</el-button>
            </span>
        </template>
    </el-dialog> -->

</template>



<script setup>

import { ref, reactive } from 'vue';
import useUserSotre from '@/stores/userStore';
import axios from 'axios';
import querystring from 'querystring';

const sLoginer = useUserSotre()
const textarea = ref("")
let tasks = ref([])
const dialogVisible = ref(false)

//axios-查询用户任务
update()

function update(){
    console.log(sLoginer.logindata.token)
    axios({
        method: "GET",
        url:"http://8.130.119.35:8080/task/query",
        headers: {
            token: sLoginer.logindata.token
        },
    }).then(response =>{
        console.log(response)
        console.log(response.data.data.items)
        console.log(tasks.value)
        tasks.value = response.data.data.items
        console.log(tasks.value)
    }).catch(error => {
        console.log(error);
    })
}


// 添加待办事项
function create (){
    //当前时间
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    const seconds = ('0' + now.getSeconds()).slice(-2);
    const formattedTime = year + '-' + month + '-' + day  + ' ' + hours + ':' + minutes + ':' + seconds;
    //axios-添加任务
    axios({
      method: "POST",
      url:"http://8.130.119.35:8080/task/add",
      params:{
        title: "",
        content:textarea.value,
        start_time:formattedTime,
        end_time:"2024-01-30 23:59:59",
        status: 0,
      },
      headers: {
            token: sLoginer.logindata.token
        },
    }).then(response =>{
        console.log(response)
        update()
    }).catch(error => {
        console.log(error);
    })
}

function handleDelete(index){
    //重新读取用户信息（因为新添加的任务无id）
    update()
    //axios-删除一个任务
    axios({
        method: "DELETE",
        url:"http://8.130.119.35:8080/task/del",
        params:{
            task_id:tasks.value[index].id,
        },
        headers: {
            token: sLoginer.logindata.token
        },
    }).then(response =>{
        console.log(response)
        update()
    }).catch(error => {
        console.log(error);
    })
    
}

function handleComplete(index){
    axios({
        method: "PUT",
        url:"http://8.130.119.35:8080/task/update",
        params:{
            task_id:tasks.value[index].id,
            status:1
        },
        headers: {
            token: sLoginer.logindata.token
        },
    }).then(response =>{
        console.log(response)
        update()
    }).catch(error => {
        console.log(error);
    })
}

// function handleCompelete(index){
//     //完成时间
//     const now = new Date();
//     const year = now.getFullYear();
//     const month = ('0' + (now.getMonth() + 1)).slice(-2);
//     const day = ('0' + now.getDate()).slice(-2);
//     const hours = ('0' + now.getHours()).slice(-2);
//     const minutes = ('0' + now.getMinutes()).slice(-2);
//     const formattedTime = year + '-' + month + '-' + day  + ' ' + hours + ':' + minutes;

//     tasks[index].status = 1;
// }

</script>

<style scoped>

.todolist{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 800px;
}

</style>