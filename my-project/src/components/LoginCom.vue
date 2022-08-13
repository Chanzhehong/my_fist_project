<template>
  <div class="content">
    <div class="img_css">
      <img
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        alt=""
      />
    </div>
    <div class="form_css">
      <el-form :model="form" label-width="120px">
        <h2>登录</h2>
        <el-form-item
          label="用户名"
          prop="name"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <el-input
            width="30px"
            v-model="form.name"
            type="text"
            placeholder="Please input name"
            clearable
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <el-input
            v-model="form.password"
            type="password"
            placeholder="Please input password"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-switch
            v-model="value2"
            class="mt-2"
            style="margin-left: 24px"
            inline-prompt
            :active-icon="Check"
            :inactive-icon="Close"
          />
          <p @click="read_rule">保持登录状态</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import router from "@/router";
import axios from "axios";
import { ElMessage } from "element-plus";
import { Check, Close } from "@element-plus/icons-vue";
const value2 = ref(false);

const form = reactive({
  name: "",
  password: "",
  tag: false,
});
const login = () => {
  let data = new FormData();
  for (let key in form) {
    data.append(key, form[key]);
  }
  axios
    .post("/api/Login", {
      name: form.name,
      password: form.password,
    })
    .then((res) => {
      if (res.data.status === 200) {
        res.status = 200;
        res.statusText = "ok";
        console.log(res);
        console.log(res.data.name);
        localStorage.setItem("name", res.data.name);
        router.replace("/MyInfoCom");
        form.tag = true;
        // console.log(form.tag);
        ElMessage({
          message: "ok",
          type: "success",
        });
      } else {
        res.status = 300;
        res.statusText = "faild";
        console.log(res);
        ElMessage({
          message: "faild",
          type: "error",
        });
      }
    });
};
const register = () => {
  router.replace("/RegisterCom");
};
</script>
<style lang="scss" scoped>
.content {
  margin: 100px auto;
  width: 800px;
  height: 500px;
  border: 1px solid slategray;
  border-radius: 10px;
  box-shadow: 1px 2px 2px 1px #888888;
  position: relative;
  display: flex;
  justify-content: space-between;
  .img_css {
    position: absolute;
    justify-content: center;
    align-self: center;
    width: 400px;
    img {
      border-radius: 50px;
    }
  }
  div {
    display: inline-flex;
  }
  .form_css {
    width: 400px;
    margin-left: 350px;
    justify-content: center;
    align-self: center;
    h2 {
      text-align: center;
      margin-bottom: 20px;
    }
    p {
      margin-left: 20px;
    }
  }
  .el-input {
    width: 250px;
  }
}
</style>>