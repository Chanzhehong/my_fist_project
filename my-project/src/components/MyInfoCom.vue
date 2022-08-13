<template>
  <div class="content">
    <div class="info_img">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
      <div>{{ info.name }}</div>
      <div class="info_class">
        <div>ID:{{ info.id }}</div>
        <div>余额:{{ info.balance }}</div>
        <el-link href="" height="21px" @click="SetMyInfo">修改信息</el-link>
      </div>
      <div class="switch_goods">
        <el-button type="primary">藏品</el-button>
        <el-button type="primary">盲盒</el-button>
      </div>
    </div>

    <el-dialog v-model="dialogFormVisible" title="修改信息">
      <div>
        <el-avatar> {{ info.name }} </el-avatar>
        <el-form>
          <el-form-item label="Name">
            <el-input v-model="Ninfo.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="sex">
            <el-input v-model="Ninfo.sex"></el-input>
          </el-form-item>
          <el-form-item label="QQ">
            <el-input v-model="Ninfo.qq"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="Ninfo.address"></el-input>
          </el-form-item>
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="modify_information">确定</el-button>
        </el-form>
      </div>
    </el-dialog>

    <div class="MyGoods_List">
      <!-- <router-view></router-view> -->
      <el-row v-loading="loading">
        <el-col :span="4" v-for="(item, index) in info.Goods" :key="index">
          <img :src="item.img" alt="" @click="showGoods(index)" />
        </el-col>
        <el-dialog v-model="dialogTableVisible" :title="info.nick_name">
          <div>
            <img :src="info.dialog_img" alt="" />
          </div>
          <el-button type="primary" @click="dialogTableVisible = false"
            >取消</el-button
          >
          <el-button type="primary" @click="sale">寄售</el-button>
          <el-button type="primary" @click="destroy_Goods">销毁</el-button>
        </el-dialog>
        <el-pagination
          :class="{ display: isShow }"
          background
          small
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="20"
          layout="prev, pager, next"
          :total="info.total"
        />
      </el-row>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, watch, h } from "vue";
import axios from "axios";
import router from "@/router";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
export default {
  setup() {
    const loading = ref(true);
    const Goods_index = ref(0);
    let delTag = ref(true);
    const dialogTableVisible = ref(false);
    const dialogFormVisible = ref(false);
    const buttons = ref(["goods", "cook"]);
    const pageindex = ref(1);
    const isShow = ref(false);
    const info = reactive({
      name: localStorage.getItem("name"),
      id: "",
      Goods: "",
      total: 0,
      nick_name: "",
      dialog_img: "",
      balance:""
    });
    watch(
      () => info.Goods,
      (n, o) => {
        console.log(n, o);
        // creat_data();
      }
    );
    const Ninfo = reactive({
      name: "",
      sex: "",
      qq: "",
      address: "",
    });
    // const goto = () => {
    //   router.replace("/MyGoods");
    // };
    const creat_data = () => {
      axios
        .get("/api/getUserList", {
          params: {
            name: info.name,
            pageindex: pageindex.value,
            pagesize: 20,
          },
        })
        .then((res) => {
          console.log(res);
          info.id = res.data.id;
          info.Goods = res.data.my_goods;
          info.total = res.data.length;
          info.balance = res.data.balance
          console.log(info.total);
          if (info.total === 10) {
            isShow.value = true;
            // console.log(isShow.value);
          }
          // console.log(Goods.value);
          loading.value = false;
        })
        .catch((err) => console.log(err));
    };

    const modify_information = () => {
      axios
        .post("/api/ModifyInformation", {
          name: info.name,
          newName: Ninfo.name,
          sex: Ninfo.sex,
          qq: Ninfo.qq,
          address: Ninfo.address,
        })
        .then((res) => {
          // console.log(res);
          // console.log(res.data.List.name);
          if (res.status === 200) {
            // console.log(1);
            dialogFormVisible.value = false;
            // localStorage.setItem("name",res.data.List.name)
            info.name = res.data.List.name;
          }
        })
        .catch((err) => console.log(err));
    };
    onMounted(() => {
      creat_data();
    });
    const handleSizeChange = (val) => {
      pageindex.value = val;
      creat_data();
    };

    const handleCurrentChange = (val) => {
      pageindex.value = val;
      creat_data();
    };
    const showGoods = (val) => {
      dialogTableVisible.value = true;
      info.nick_name = info.Goods[val].name;
      info.dialog_img = info.Goods[val].img;
      Goods_index.value = val;
    };
    const SetMyInfo = () => {
      dialogFormVisible.value = true;
    };
    const delGoods = () => {
      axios
        .delete("/api/delData", {
          params: {
            name: info.name,
            index: Goods_index.value,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data.status === 200) {
            delTag.value = true;
            console.log(delTag.value);
            info.Goods = res.data.List.my_goods;
          } else {
            res.status = 300;
            res.statusText = "faild";
            delTag.value = false;
            console.log(delTag.value);
            console.log(res);
            ElMessage({
              type: "info",
              message: "删除失败",
            });
          }

          // console.log(info.Goods);
        })
        .then(() => {
          creat_data();
        })
        .catch((err) => console.log(err));
    };
    const destroy_Goods = () => {
      ElMessageBox.confirm("是否销毁?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          delGoods();
          // console.log(delTag.value);
        })
        .then(() => {
          if (delTag.value === true) {
            console.log(delTag.value);
            delTag.value = false;
            ElMessage({
              type: "success",
              message: "销毁成功",
            });
            dialogTableVisible.value = false;
          } else {
            console.log(delTag.value);
            delTag.value = true;
            ElMessage({
              type: "error",
              message: "销毁失败",
            });
          }
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消成功",
          });
        });
    };
    const saleGood = (Sindex, dollar) => {
      // console.log(index);
      axios
        .post("/api/saleGood", {
          name: info.name,
          amount: dollar,
          index: Sindex,
        })
        .then((res) => {
          console.log(res);
        })
        .catch(() => {});
    };
    const sale = () => {
      // console.log(Goods_index.value);
      ElMessageBox.prompt("请输入寄售金额", "寄售", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then((val) => {
          console.log(val.value);
          // console.log(Goods_index.value);
          saleGood(Goods_index.value, val.value);
          ElNotification({
            title: "Message",
            message: h("i", { style: "color: teal" }, "寄售成功"),
          });
        })
        .catch(() => {
          ElNotification({
            title: "Message",
            message: h("i", { style: "color: teal" }, "取消成功"),
          });
        });
    };
    return {
      info,
      Ninfo,
      buttons,
      isShow,
      loading,
      pageindex,
      handleSizeChange,
      handleCurrentChange,
      dialogTableVisible,
      dialogFormVisible,
      showGoods,
      creat_data,
      modify_information,
      SetMyInfo,
      destroy_Goods,
      sale,
    };
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("name")) {
      next();
    } else {
      router.push("/LoginCom");
    }
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  color: black;
  text-align: center;
  margin: 50px auto;
  .info_img {
    text-align: center;
    .switch_goods {
      margin-left: 380px;
      width: 300px;
      display: flex;
      // border: 1px solid black;
      justify-content: space-evenly;
      .el-button {
        width: 100px;
      }
    }
  }
}
.info_img {
  width: 100%;
  height: 30px;
  div {
    margin: 10px;
  }
  // position: relative;
  // :nth-child(1) {
  //   position: absolute;
  //   cursor: pointer;
  //   margin: auto;
  //   left: 0;
  //   right: 0;
  //   top: 50px;
  //   bottom: 0;
  // }
}
.el-avatar {
  width: 100px;
  height: 100px;
}
.demo-type > div:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}
.el-row {
  // display: flex;
  justify-content: center;
  // align-content: flex-start;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
  margin: 10px;
  height: 200px;
  border-radius: 50px;
  img {
    cursor: pointer;
    border-radius: 50px;
  }
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.MyGoods_List {
  margin: 0 auto;
  width: 1280px;
  margin-top: 260px;
  box-shadow: 1px 1px 3px 3px #888888;
  border-radius: 5px;
}
.display {
  display: none;
}
</style>