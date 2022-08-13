import Mock from 'mockjs'
const { Listdata } = Mock.mock({
    "Listdata": [
        {
            "name": 'zhehong',
            "sex": '男',
            "address": "",
            "qq": "",
            "password": 123456,
            "balance": 300.2,
            "id": 1,
            "my_goods": {
                "goods|45": [
                    {
                        "owned": "zhehong",
                        "name": "YUAN",
                        "lvel": "R",
                        "amount": '',
                        "No": function () {
                            return '#' + Math.floor(Math.random() * 10000)
                        },
                        "category": "版权品",
                        "img": "@image('213x200', '#50B347', '#FFF', '@ip')",
                        "isSale": false
                    }
                ]
            }
        },
        {
            "name": 'zhangsan',
            "password": 147258,
            "id": 2,
            "my_goods": {
                "goods|25": [
                    {
                        "img": "@image('213x200', '#50B347', '#FFF', 'Southeast University')"
                    }
                ]
            }
        },
        {
            "name": 'test',
            "password": 369258,
            "id": 3,
            "my_goods": {
                "goods|20": [
                    {
                        "img": "@image('213x200', '#50B347', '#FFF', 'Southeast University')"
                    }
                ]
            }
        },
        {
            "name": 'good',
            "password": 789456,
            "id": 4,
            "my_goods": {
                "goods|30": [
                    {
                        "img": "@image('213x200', '#50B347', '#FFF', 'Southeast University')"
                    }
                ]
            }
        },
    ],
})
const { PublicData } = Mock.mock({
    "PublicData": {
        BannerData: {
            "img|5": ["@image('1280x300', '#fff', '#ccc', 'Southeast University')"]
        },
        ContentImg: {
            "img|20": ["@image('400x400', '#fff', '#ccc', 'Southeast University')"]
        },
        RecommendImg: {
            "img|20": ["@image('200x200', '#fff', '#ccc', '@ip')"]
        }

    }
})

const { SaleData } = Mock.mock({
    "SaleData": [
        // { "category": "版权品", "owned": "zhehong", "name": "TUO", "lvel": "SR", "img": "@image('213x200', '#50B347', '#FFF', 'R')", "amount": 500, "No": '#0001' },
        // { "category": "版权品", "owned": "test", "name": "YUAN", "lvel": "R", "img": "@image('213x200', '#50B347', '#FFF', 'R')", "amount": 222, "No": '#0002' },
        // { "category": "版权品", "owned": "zhehong", "name": "YUAN", "lvel": "SSR", "img": "@image('213x200', '#50B347', '#FFF', 'R')", "amount": 35, "No": '#0003' },
        // { "category": "版权品", "owned": "zhehong", "name": "YUAN", "lvel": "R", "img": "@image('213x200', '#50B347', '#FFF', 'R')", "amount": 14, "No": '#0004' },
        // { "category": "版权品", "owned": "test", "name": "TUO", "lvel": "R", "img": "@image('213x200', '#50B347', '#FFF', 'R')", "amount": 2, "No": '#0005' },
        // { "category": "版权品", "owned": "zhangsan", "name": "YUAN", "lvel": "SSR", "img": "@image('213x200', '#50B347', '#FFF', 'R')", "amount": 200, "No": '#0006' },
        // { "category": "版权品", "owned": "zhehong", "name": "YUAN", "lvel": "SSR", "img": "@image('213x200', '#50B347', '#FFF', 'R')", "amount": 500, "No": '#0008' },
        // { "category": "版权品", "owned": "zhehong", "name": "YUAN", "lvel": "R", "img": "@image('213x200', '#50B347', '#FFF', 'R')", "amount": 50110, "No": '#0008' },
        // { "category": "版权品", "owned": "test", "name": "TUO", "lvel": "R", "img": "@image('213x200', '#50B347', '#FFF', 'R')", "amount": 500, "No": '#0009' },
        // { "category": "版权品", "owned": "zhangsan", "name": "YUAN", "lvel": "SSR", "img": "@image('213x200', '#50B347', '#FFF', 'R')", "amount": 5020, "No": '#0010' },
        // { "category": "版权品", "owned": "zhehong", "name": "YUAN", "lvel": "SSR", "img": "@image('213x200', '#50B347', '#FFF', 'R')", "amount": 378, "No": '#0011' },
        // { "category": "版权品", "owned": "zhehong", "name": "TUO", "lvel": "R", "img": "@image('213x200', '#50B347', '#FFF', 'R')", "amount": 500, "No": '#0012' },
        // { "category": "版权品", "owned": "test", "name": "TUO", "lvel": "SR", "img": "@image('213x200', '#50B347', '#FFF', 'R')", "amount": 1235, "No": '#0013' },
        // { "category": "版权品", "owned": "zhangsan", "name": "TUO", "lvel": "R", "img": "@image('213x200', '#50B347', '#FFF', 'R')", "amount": 500, "No": '#0014' },
        // { "category": "版权品", "owned": "zhehong", "name": "YUAN", "lvel": "SSR", "img": "@image('213x200', '#50B347', '#FFF', 'R')", "amount": 500, "No": '#0015' },
        // { "category": "版权品", "owned": "zhehong", "name": "YUAN", "lvel": "R", "img": "@image('213x200', '#50B347', '#FFF', 'R')", "amount": 548500, "No": '#0016' },
        // { "category": "版权品", "owned": "zhehong", "name": "TUO", "lvel": "R", "img": "@image('213x200', '#50B347', '#FFF', 'R')", "amount": 500, "No": '#0017' },
        // { "category": "版权品", "owned": "zhehong", "name": "YUAN", "lvel": "SR", "img": "@image('213x200', '#50B347', '#FFF', 'R')", "amount": 5878, "No": '#0081' },
        // { "category": "版权品", "owned": "test", "name": "YUAN", "lvel": "R", "img": "@image('213x200', '#50B347', '#FFF', 'R')", "amount": 500, "No": '#0061' },
        // { "category": "版权品", "owned": "zhehong", "name": "TUO", "lvel": "SR", "img": "@image('213x200', '#50B347', '#FFF', 'R')", "amount": 888, "No": '#0111' },
        // { "category": "版权品", "owned": "zhangsan", "name": "YUAN", "lvel": "R", "img": "@image('213x200', '#50B347', '#FFF', 'R')", "amount": 777, "No": '#0661' },
        // { "category": "版权品", "owned": "test", "name": "YUAN", "lvel": "SSR", "img": "@image('213x200', '#50B347', '#FFF', 'R')", "amount": 500, "No": '#0151' },
        // { "category": "版权品", "owned": "zhehong", "name": "TUO", "lvel": "R", "img": "@image('213x200', '#50B347', '#FFF', 'R')", "amount": 500, "No": '#1201' },
        // { "category": "版权品", "owned": "zhangsan", "name": "YUAN", "lvel": "SR", "img": "@image('213x200', '#50B347', '#FFF', 'R')", "amount": 500, "No": '#1001' },
        // { "category": "版权品", "owned": "zhehong", "name": "YUAN", "lvel": "R", "img": "@image('213x200', '#50B347', '#FFF', 'R')", "amount": 500, "No": '#0501' },
        // { "category": "版权品", "owned": "zhehong", "name": "TUO", "lvel": "R", "img": "@image('213x200', '#50B347', '#FFF', 'R')", "amount": 500, "No": '#0101' },
        // { "category": "版权品", "owned": "zhehong", "name": "YUAN", "lvel": "SR", "img": "@image('213x200', '#50B347', '#FFF', 'R')", "amount": 500, "No": '#6001' },
        // { "category": "版权品", "owned": "test", "name": "YUAN", "lvel": "R", "img": "@image('213x200', '#50B347', '#FFF', 'R')", "amount": 500, "No": '#0401' },
        // { "category": "版权品", "owned": "zhehong", "name": "YUAN", "lvel": "SR", "img": "@image('213x200', '#50B347', '#FFF', 'R')", "amount": 500, "No": '#0301' },
        // { "category": "版权品", "owned": "zhangsan", "name": "TUO", "lvel": "SR", "img": "@image('213x200', '#50B347', '#FFF', 'R')", "amount": 500, "No": '#0100' },
        // { "category": "版权品", "owned": "test", "name": "TUO", "lvel": "SSR", "img": "@image('213x200', '#50B347', '#FFF', 'R')", "amount": 500, "No": '#5555' }
    ]
})

export default {
    Listdata,
    PublicData,
    SaleData
}