import Mock from 'mockjs'
import utils from '../utils';
// Mock.setup({
//     timeout:'500-1500'
// })

//banner data 
Mock.mock('/api/getBannerImages', 'get', () => {
    const BannerList = utils.BannerData();
    console.log(BannerList);
    return {
        List: BannerList
    }
})

//contentImg data
Mock.mock('/api/getContentInages', 'get', () => {
    const ContentList = utils.ContentImg();
    console.log(ContentList);
    return {
        List: ContentList
    }
})

//recommend data
Mock.mock('/api/getRecImages', 'get', () => {
    const RecList = utils.RecImg();
    console.log(RecList);
    return {
        List: RecList
    }
})

//sale data
Mock.mock(/\/api\/saleData/, 'get', (options) => {
    const name = utils.getQuery(options.url, 'name')
    const lvel = utils.getQuery(options.url, 'lvel')
    // console.log(name,lvel);
    const saleList = utils.getSaleData(name, lvel);
    return {
        List: saleList
    }
})

//buy good
Mock.mock('/api/buyGood', 'post', (options) => {
    console.log(options);
    const { purchaser, owned, goodName, amount, No, name, category, lvel } = JSON.parse(options.body);
    const list = utils.buyCollection(purchaser, owned, goodName, amount, No, name, category, lvel);
    if(list){
        return{
            status:200,
            message:"ok"
        }
    }else{
        return {
            status:300,
            message:"error"
        }
    }
    // console.log(data);
})

//获取用户列表数据(Name)
Mock.mock(/\/api\/getUserList/, 'get', (options) => {
    // console.log(options);
    const name = utils.getQuery(options.url, 'name');
    const pageindex = utils.getQuery(options.url, 'pageindex');
    const pagesize = utils.getQuery(options.url, 'pagesize');
    // console.log(pageindex,pagesize);
    const start = (pageindex - 1) * pagesize;
    const end = pageindex * pagesize;

    const ListName = utils.getNameData(name);
    // console.log(ListName);
    console.log(ListName.len);


    const totalPage = Math.ceil(ListName.len / pagesize);
    console.log(totalPage);

    const list = pageindex > totalPage ? [] : ListName.goods.slice(start, end);
    // console.log(ListName);
    if (ListName != null) {
        return {
            status: 200,
            my_goods: list,
            name: ListName.name,
            id: ListName.id,
            balance: ListName.balance,
            length: ListName.len
        }
    } else {
        return {
            status: 304,
            msg: 'error'
        }
    }
})
//注册接口
Mock.mock('/api/Register', 'post', (options) => {
    const { name, phone, password } = JSON.parse(options.body);
    const msg = utils.addUserInList(name, phone, password);
    console.log(msg);
    if (msg) {
        return {
            status: 200,
            message: '注册成功',
            List: msg
        }
    } else {
        return {
            status: 300,
            message: '注册失败'
        }
    }

})
//登录接口
Mock.mock('/api/Login', 'post', (options) => {
    // console.log(options);
    const { name, password } = JSON.parse(options.body);
    // console.log(name,password);
    const check_data = utils.check(name, password);
    if (check_data) {
        // console.log(check_data.data);
        return {
            status: 200,
            msg: 'success',
            List: check_data.data,
            name: check_data.name
        }
    } else {
        return {
            status: 304
        }
    }
})

//修改数据接口
Mock.mock('/api/ModifyInformation', 'post', (options) => {
    console.log(options);
    const { name, ...data } = JSON.parse(options.body);
    const newList = utils.setInformation(name, data);
    console.log(newList);
    if (newList) {
        return {
            status: 200,
            message: 'success',
            List: newList
        }
    } else {
        return {
            status: 300,
            msessage: 'faild'
        }
    }

})

//del data
Mock.mock(/\/api\/delData/, 'delete', (options) => {
    const name = utils.getQuery(options.url, 'name')
    const index = utils.getQuery(options.url, 'index');
    const data = utils.delData(name, index)
    // console.log(data);
    if (data) {
        return {
            status: 200,
            List: data
        }
    } else {
        return {
            status: 300,
            message: 'faild'
        }
    }
})

Mock.mock(/\/api\/saleGood/, 'post', (options) => {
    console.log(options);
    const { name, amount, index } = JSON.parse(options.body)
    utils.saleGood(name, amount, index)
})