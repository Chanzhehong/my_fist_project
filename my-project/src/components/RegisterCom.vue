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
        <h2>用户注册</h2>
        <el-form-item
          label="用户名"
          prop="name"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <el-input v-model="form.name" placeholder="Please input name" />
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="phone"
          :rules="[
            { required: true, message: '请输入手机号' },
            { pattern: /^(13[0-9]|14[1|4|5|6|7|8|9]|15[0|1|2|3|5|6|7|8|9]|17[2|3|5|6|7|8]|18[0-9]|19[1|8|9])\d{8}$/, message: '手机号格式不正确' },
          ]"
        >
          <el-input
            width="30px"
            v-model.number="form.phone"
            placeholder="Please input phone"
            autocomplete="off"
            :validate-event="true"
          />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <el-input
            v-model="form.password"
            placeholder="Please input password"
          />
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="Rpassword"
          :rules="[{ required: true, message: '请再次输入密码' }]"
        >
          <el-input
            v-model="form.Rpassword"
            placeholder="Please input password again"
          />
        </el-form-item>
        <el-form-item>
          <el-switch
            v-model="isCheck"
            class="mt-2"
            style="margin-left: 24px"
            inline-prompt
            :active-icon="Check"
            :inactive-icon="Close"
            :loading="loading"
            :before-change="beforeChange"
            @change="demo"
          />
          <p @click="read_rule">请先阅读</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :disabled="disabled"
            >注册</el-button
          >
          <el-button>重置</el-button>
        </el-form-item>
        <el-form-item class="text">
          <div @click="goLogin">已有账号?点击前往登录</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, h } from "vue";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import { Check, Close } from "@element-plus/icons-vue";
import router from "@/router";
import axios from "axios";
const isCheck = ref(false);
const loading = ref(false);
const disabled = ref(true);

const demo = () => {
  ~isCheck.value;
  if (isCheck.value) {
    disabled.value= false
  }else{
    disabled.value = true
  }
  console.log(disabled.value);
};
const form = reactive({
  name: "",
  phone: "",
  password: "",
  Rpassword: "",
});
const read_rule = () => {
  ElMessageBox({
    title: "用户须知",
    message: h("p", null, [
      h("span", null, "注册用户必须 "),
      h("i", { style: "color: teal" }, "遵循用户规则"),
    ]),
    showCancelButton: true,
    confirmButtonText: "确定",
    cancelButtonText: "关闭",
    beforeClose: (action, instance, done) => {
      if (action === "confirm") {
        instance.confirmButtonLoading = true;
        instance.confirmButtonText = "Loading...";
        setTimeout(() => {
          done();
          setTimeout(() => {
            instance.confirmButtonLoading = false;
            disabled.value = false;
          }, 300);
        }, 300);
      } else {
        done();
      }
    },
  }).then(() => {
    isCheck.value = true;
    ElMessage({
      type: "success",
      message: `success`,
    });
  });
};
const beforeChange = () => {
  loading.value = true;
  return new Promise((resolve) => {
    setTimeout(() => {
      loading.value = false;
      disabled.value = false;
      ElMessage.success("Switch success");
      return resolve(true);
    }, 300);
  });
};
const onSubmit = () => {
  axios
    .post("/api/Register", {
      name: form.name,
      phone: form.phone,
      password: form.password,
    })
    .then((res) => {
      console.log(res);
      if (res.data.status === 200) {
        ElNotification({
          title: "注册成功",
          message: h("i", { style: "color: teal" }, "恭喜您！注册成功啦！"),
        });
      } else {
        res.status = 300;
        res.statusText = "faild";
        ElNotification({
          title: "注册失败",
          message: h("i", { style: "color: red" }, "很遗憾！注册失败！"),
        });
      }
    });
};
const goLogin = () => {
  router.replace("/LoginCom");
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
      cursor: pointer;
      margin-left: 20px;
    }
  }
  p:hover {
    color: blue;
  }
  .el-input {
    width: 250px;
  }
}
.text {
  div {
    cursor: pointer;
    font-size: 1px;
  }
  :hover {
    color: blue;
  }
}
</style>