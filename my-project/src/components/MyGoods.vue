<template>
    <div>
        <el-row v-loading="loading">
            <el-col :span="4" v-for="(item, index) in info.Goods" :key="index">
                <img :src="item.img" alt="" @click="showGoods(index)" />
            </el-col>
            <el-dialog v-model="dialogTableVisible" :title="info.nick_name">
                <div>
                    <img :src="info.dialog_img" alt="" />
                </div>
                <el-button type="primary" @click="dialogTableVisible = false">取消</el-button>
                <el-button type="primary">寄售</el-button>
                <el-button type="primary" @click="destroy_Goods">销毁</el-button>
            </el-dialog>
            <el-pagination :class="{ display: isShow }" background small @size-change="handleSizeChange"
                @current-change="handleCurrentChange" layout="prev, pager, next" :total="info.total" />
        </el-row>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
// import router from "@/router";
import { ElMessage, ElMessageBox } from "element-plus";
const loading = ref(true);
const Goods_index = ref(0);
let delTag = ref(true);
const dialogTableVisible = ref(false);
const pageindex = ref(1);
const isShow = ref(false);
const info = reactive({
    name: localStorage.getItem("name"),
    id: "",
    Goods: "",
    total: 0,
    nick_name: "",
    dialog_img: "",
});
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
            // console.log(res);
            info.id = res.data.id;
            info.Goods = res.data.my_goods;
            info.total = res.data.length - 10;
            // console.log(info.total);
            if (info.total === 10) {
                isShow.value = true;
                // console.log(isShow.value);
            }
            // console.log(Goods.value);
            loading.value = false;
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
</script>

<style lang="scss" scoped>
.el-row {
  display: flex;
  justify-content: center;
  align-content: flex-start;
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

// .grid-content {
//   border-radius: 4px;
//   min-height: 36px;
// }
.MyGoods_List {
  margin: 150px auto;
  width: 1280px;
}
.display {
  display: none;
}
</style>