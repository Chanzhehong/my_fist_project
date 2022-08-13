import UserList from '../data/index'

const BannerData = () => {
    return UserList.PublicData.BannerData
}
const ContentImg = () => {
    return UserList.PublicData.ContentImg
}
const RecImg = () => {
    return UserList.PublicData.RecommendImg
}
const saleData = () => {
    return UserList.SaleData
}
//获取url中的参数
const getQuery = (url, name) => {
    // console.log(url, name);
    const index = url.indexOf('?')
    if (index != -1) {
        const queryStrArr = url.substr(index + 1).split('&')
        for (let i in queryStrArr) {
            const itemArr = queryStrArr[i].split('=');
            // console.log(itemArr);
            if (itemArr[0] === name) {
                return itemArr[1];
            }
        }
    }
    return null
}

//根据藏品名和级别获取数据
const getSaleData = (name, lvel) => {
    // console.log(name,lvel);
    const data = UserList.SaleData.filter(item => item.name === name & item.lvel === lvel)
    // da = UserList.SaleData.find(item => item.name === name|item.lvel === lvel)
    // console.log(data);
    if (data.length === 0) {
        return UserList.SaleData
    } else {
        return data
    }
}

//buy good
const buyCollection = (purchaser, owned, goodName, amount, No, name, category, lvel) => {
    console.log(purchaser, owned);
    let tempIndex, successTag;
    UserList.Listdata.find((item, index) => {
        if (item.name === purchaser) {
            tempIndex = index
            // console.log(item.name);  
        }

    })
    if (UserList.Listdata[tempIndex].balance >= amount & purchaser != owned) {
        console.log('足够');
        UserList.Listdata[tempIndex].balance -= amount
        UserList.Listdata[tempIndex].my_goods.goods.push({
            owned: purchaser,
            name: name,
            img: goodName,
            category: category,
            No: No,
            lvel: lvel,
            isSale: false,
            amount: ''
        })
        successTag = true
        tempIndex = 0;
        if (successTag) {
            UserList.Listdata.find((item, index) => {
                if (item.name === owned) {
                    tempIndex = index
                    // console.log(tempIndex);
                }
            })
            UserList.Listdata[tempIndex].my_goods.goods.filter((item, index) => {
                if (item.img === goodName & item.lvel === lvel & item.No === No, item.amount === amount) {
                    // console.log(index);
                    // console.log(UserList.Listdata[tempIndex].my_goods.goods[index]);
                    UserList.Listdata[tempIndex].my_goods.goods.splice(index, 1)
                }
            })
            UserList.SaleData.filter((item, index) => {
                if (item.img === goodName & item.lvel === lvel & item.No === No, item.amount === amount) {
                    // console.log(index);
                    // console.log(UserList.Listdata[tempIndex].my_goods.goods[index]);
                    UserList.SaleData.splice(index, 1)
                }
            })
            // console.log(data);
        }

        // return UserList.Listdata[tempIndex]
    } else {
        console.log('余额不足');
        return null
    }


    // console.log(UserList.Listdata[tempIndex]);
    // console.log(tempIndex);
    // console.log(tag);
}

//根据name获取数据
function getNameData(name) {
    // console.log(Name);
    // console.log(name);
    let ListData = UserList.Listdata.find(item => item.name === name)
    // console.log(ListData.my_goods.goods.length);
    console.log(ListData);
    return {
        name: ListData.name,
        id: ListData.id,
        balance: ListData.balance,
        goods: ListData.my_goods.goods,
        len: ListData.my_goods.goods.length
    }
}

//check from_data with username and password
function check(name, password) {
    let newArr = [];
    // console.log(name, password);
    for (let i = 0; i < UserList.Listdata.length; i++) {
        newArr[i] = UserList.Listdata[i];
    }
    // console.log(newArr);
    for (let i = 0; i < newArr.length; i++) {
        // console.log(newArr[i]);
        if (newArr[i] != null) {
            // console.log(newArr[i].name);
            if (newArr[i].name == name && newArr[i].password == password) {
                // console.log(newArr);
                return {
                    bool: true,
                    data: newArr[i].my_goods,
                    name: newArr[i].name
                }
            }
        } else {
            return false
        }
    }
}

//Modify Information (data result)
function setInformation(name, ...data) {
    let Lindex;
    // console.log(name);
    // console.log(data);
    UserList.Listdata.find((item, index) => {
        if (item.name === name) {
            Lindex = index
            // console.log(item.name);
            UserList.Listdata[index].name = data[0].newName;
            UserList.Listdata[index].sex = data[0].sex;
            UserList.Listdata[index].qq = data[0].qq;
            UserList.Listdata[index].address = data[0].address;
        }
    });
    return UserList.Listdata[Lindex]
}

//delete goods data 
function delData(name, index) {
    // console.log(name);
    let Nindex;
    let Tag;
    console.log(index);
    UserList.Listdata.find((item, Itemindex) => {
        if (item.name === name) {
            Nindex = Itemindex
            console.log(UserList.Listdata[Itemindex].my_goods);
            const len = UserList.Listdata[Itemindex].my_goods.goods.splice(index, 1);
            console.log(len);
            if (len.length === 1) {
                Tag = true
            } else {
                Tag = false
            }
        }
    });
    if (Tag) {
        console.log(Tag);
        return UserList.Listdata[Nindex]
    } else {
        console.log(Tag);
        return null;
    }
}
//register util
const addUserInList = (name, phone, password) => {
    console.log(name, phone, password);
    if (name === '' | phone === '' | password === '') {
        return null
    }
    const msg = UserList.Listdata.find((item) => { return (item.name === name) })
    if (msg === undefined) {
        UserList.Listdata.push({
            name: name,
            password: password,
            phone: phone,
            id: UserList.Listdata.length + 1
        })
        let index = UserList.Listdata.length - 1
        return UserList.Listdata[index]
    } else {
        return null
    }

}

//sale good method
const saleGood = (name, amount, index) => {
    // console.log(owned);
    let temp;
    // console.log(name,index);
    const info = UserList.Listdata.find((item) => {
        if (item.name === name) {
            temp = item.my_goods.goods[index];
            console.log(temp);
            if (temp) {
                item.my_goods.goods[index].isSale = true
                item.my_goods.goods[index].amount = amount
            }
            return item.my_goods.goods
        }
    })
    console.log(temp);
    if (info != undefined) {
        // temp.isSale = true
        UserList.SaleData.push({
            name: temp.name,
            lvel: temp.lvel,
            amount: temp.amount,
            category: temp.category,
            owned: temp.owned,
            img: temp.img,
            isSale: temp.isSale
        })
    }
    console.log(UserList.Listdata);
    console.log(UserList.SaleData);
}

export default {
    getQuery,
    getNameData,
    check,
    setInformation,
    delData,
    BannerData,
    ContentImg,
    RecImg,
    addUserInList,
    saleGood,
    saleData,
    getSaleData,
    buyCollection
}