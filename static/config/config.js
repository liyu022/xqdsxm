var config = {
  baseUrl: 'http://124.70.144.177:8888',
  service: {
    user: {
      userList: '/user/userList'
    }
  },
  baseUrlSBGL: 'http://124.70.144.177:8888/XQDS-WEB/',
  AppUrlSBGL: 'http://124.70.144.177:8801/',
  mks:[
    {
      "id": "01",
      "gnms": null,
      "parent": null,
      "xthftype": "启用",
      "children": [
        {
          "id": "0101",
          "gnms": null,
          "parent": "01",
          "xthftype": "启用",
          "children":[
            {
            "id": "010101",
            "gnms": null,
            "parent": "0101",
            "xthftype": "启用",
            "children": [],
            "name": "采购计划管理",
            "url": "/cgjhgl"
          },{
            "id": "010102",
            "gnms": null,
            "parent": "0101",
            "xthftype": "启用",
            "children": [],
            "name": "采购订单管理",
            "url": "/cgddgl"
          },{
            "id": "010103",
            "gnms": null,
            "parent": "0101",
            "xthftype": "启用",
            "children": [],
            "name": "采购配额管理",
            "url": "/cgpegl"
          },{
            "id": "010104",
            "gnms": null,
            "parent": "0101",
            "xthftype": "启用",
            "children": [],
            "name": "采购价格管理",
            "url": "/cgjggl"
          },{
            "id": "010105",
            "gnms": null,
            "parent": "0101",
            "xthftype": "启用",
            "children": [],
            "name": "采购报表管理",
            "url": "/cgbbgl"
          },{
            "id": "010106",
            "gnms": null,
            "parent": "0101",
            "xthftype": "启用",
            "children": [],
            "name": "质量控制管理",
            "url": "/zlkzgl"
          },{
            "id": "010107",
            "gnms": null,
            "parent": "0101",
            "xthftype": "启用",
            "children": [],
            "name": "采购入库管理",
            "url": "/cgrkgl"
          }],
          "name": "采购管理",
          "url": "/cggl"
        },
        {
          "id": "0102",
          "gnms": null,
          "parent": "01",
          "xthftype": "启用",
          "children": [
            {
              "id": "010201",
              "gnms": null,
              "parent": "0102",
              "xthftype": "启用",
              "children": [],
              "name": "路段信息管理",
              "url": "/ldxxgl"
            },
            {
              "id": "010202",
              "gnms": null,
              "parent": "0102",
              "xthftype": "启用",
              "children": [],
              "name": "设备生产商管理",
              "url": "/sbscsgl"
            },
            {
              "id": "010203",
              "gnms": null,
              "parent": "0102",
              "xthftype": "启用",
              "children": [],
              "name": "供应商管理",
              "url": "/gysgl"
            },
            {
              "id": "010204",
              "gnms": null,
              "parent": "0102",
              "xthftype": "启用",
              "children": [],
              "name": "承包商管理",
              "url": "/cbsgl"
            },
            {
              "id": "010205",
              "gnms": null,
              "parent": "0102",
              "xthftype": "启用",
              "children": [],
              "name": "仓库信息管理",
              "url": "/ckxxgl"
            },
            {
              "id": "010206",
              "gnms": null,
              "parent": "0102",
              "xthftype": "启用",
              "children": [],
              "name": "设备种类管理",
              "url": "/sbzlgl"
            },
            {
              "id": "010207",
              "gnms": null,
              "parent": "0102",
              "xthftype": "启用",
              "children": [],
              "name": "系统划分管理",
              "url": "/xthfgl"
            },
            {
              "id": "010208",
              "gnms": null,
              "parent": "0102",
              "xthftype": "启用",
              "children": [],
              "name": "系统运行管理",
              "url": "/xtyxgl"
            },
            {
              "id": "010209",
              "gnms": null,
              "parent": "0102",
              "xthftype": "启用",
              "children": [],
              "name": "参数配置管理",
              "url": "/cspzgl"
            }
          ],
          "name": "基础数据",
          "url": "/jcsj"
        },
        {
          "id": "0103",
          "gnms": null,
          "parent": "01",
          "xthftype": "启用",
          "children": [{
            "id": "010301",
            "gnms": null,
            "parent": "0103",
            "xthftype": "启用",
            "children": [],
            "name": "现存量管理",
            "url": "/xclgl"
          },{
            "id": "010302",
            "gnms": null,
            "parent": "0103",
            "xthftype": "启用",
            "children": [],
            "name": "盘点作业处理",
            "url": "/pdzycl"
          },{
            "id": "010303",
            "gnms": null,
            "parent": "0103",
            "xthftype": "启用",
            "children": [],
            "name": "特殊仓库管理",
            "url": "/tsckgl"
          },{
            "id": "010304",
            "gnms": null,
            "parent": "0103",
            "xthftype": "启用",
            "children": [],
            "name": "批次管理",
            "url": "/pcgl"
          },{
            "id": "010305",
            "gnms": null,
            "parent": "0103",
            "xthftype": "启用",
            "children": [],
            "name": "保质期管理",
            "url": "/bzqgl"
          },{
            "id": "010306",
            "gnms": null,
            "parent": "0103",
            "xthftype": "启用",
            "children": [],
            "name": "呆滞物料分析",
            "url": "/dzwlfx"
          },{
            "id": "010307",
            "gnms": null,
            "parent": "0103",
            "xthftype": "启用",
            "children": [],
            "name": "收发存汇总查询",
            "url": "/sfchzcx"
          },{
            "id": "010308",
            "gnms": null,
            "parent": "0103",
            "xthftype": "启用",
            "children": [],
            "name": "调拨业务处理",
            "url": "/tbywcl"
          },{
            "id": "010309",
            "gnms": null,
            "parent": "0103",
            "xthftype": "启用",
            "children": [],
            "name": "成套件查询",
            "url": "/ctjcx"
          },{
            "id": "010310",
            "gnms": null,
            "parent": "0103",
            "xthftype": "启用",
            "children": [],
            "name": "出库管理",
            "url": "/ckgl"
          },{
            "id": "010311",
            "gnms": null,
            "parent": "0103",
            "xthftype": "启用",
            "children": [],
            "name": "报废管理",
            "url": "/bfgl"
          }],
          "name": "仓存业务",
          "url": "/ccyw"
        },
        {
          "id": "0104",
          "gnms": null,
          "parent": "01",
          "xthftype": "启用",
          "children": [{
            "id": "010401",
            "gnms": null,
            "parent": "0104",
            "xthftype": "启用",
            "children": [],
            "name": "调运单管理",
            "url": "/dydgl"
          },{
              "id": "010402",
              "gnms": null,
              "parent": "0104",
              "xthftype": "启用",
              "children": [],
              "name": "调运单评估",
              "url": "/dydpg"
          },{
              "id": "010403",
              "gnms": null,
              "parent": "0104",
              "xthftype": "启用",
              "children": [],
              "name": "订单管理",
              "url": "/ddgl"
          },{
              "id": "010404",
              "gnms": null,
              "parent": "0104",
              "xthftype": "启用",
              "children": [],
              "name": "可视化跟踪",
              "url": "/kshgz"
          },{
              "id": "010405",
              "gnms": null,
              "parent": "0104",
              "xthftype": "启用",
              "children": [],
              "name": "订单报表",
              "url": "/ddbb"
          }],
          "name": "调运业务",
          "url": "/dyyw"
        },
      ],
      "name": "应急物资管理子系统",
      "url": "/emgres"
    },
    {
      "id":"02",
      "name":"应急车辆调度与展示子系统",
      "xthftype":"启用",
      "gnms":null,
      "parent":null,
      "url":"/vehicle",
      "children":[
        {
          "id": "0207",
          "gnms": null,
          "parent": "02",
          "xthftype": "启用",
          "children":[
            {
              "id":"020701",
              "gnms":null,
              "parent":"0207",
              "xthftype": "启用",
              "name": "事故接报",
              "url": "/sgjb"
            },
            {
              "id":"020702",
              "gnms":null,
              "parent":"0207",
              "xthftype": "启用",
              "name": "应急事件管理",
              "url": "/yjsjgl"
            },
            {
              "id":"020703",
              "gnms":null,
              "parent":"0207",
              "xthftype": "启用",
              "name": "应急事件详情",
              "url": "/yjsjxq"
            },
            {
              "id":"020705",
              "gnms":null,
              "parent":"0207",
              "xthftype": "启用",
              "name": "应急事件记录",
              "url": "/yjsjjl"
            },
            {
              "id":"020704",
              "gnms":null,
              "parent":"0207",
              "xthftype": "启用",
              "name": "应急事件分析",
              "url": "/yjsjfx"
            },
  
          ],
          "name": "应急事件",
          "url": "/accident"
        },
        {
          "id": "0206",
          "gnms": null,
          "parent": "02",
          "xthftype": "启用",
          "children":[
            {
              "id":"020601",
              "gnms":null,
              "parent":"0205",
              "xthftype": "启用",
              "name": "实时定位追踪",
              "url": "/GpsTrack"
            }
          ],
          "name": "应急车辆监控",
          "url": "/vehicleMonitor"
        },
        {
          "id": "0205",
          "gnms": null,
          "parent": "02",
          "xthftype": "启用",
          "children":[
              {
                  "id":"020501",
                  "gnms":null,
                  "parent":"0205",
                  "xthftype": "启用",
                  "name": "应急车辆管理",
                  "url": "/yjcgl"
              },
              {
              "id":"020502",
              "gnms":null,
              "parent":"0205",
              "xthftype": "启用",
              "name": "通信管理",
              "url": "/txgl"
            },
            {
              "id":"020503",
              "gnms":null,
              "parent":"0205",
              "xthftype": "启用",
              "name": "指挥调度",
              "url": "/zhdd"
            }
          ],
          "name": "应急车辆调度",
          "url": "/yjcldd"
        },
        {
          "id": "0204",
          "gnms": null,
          "parent": "02",
          "xthftype": "启用",
          "children":[
            {
              "id":"020402",
              "gnms":null,
              "parent":"0204",
              "xthftype": "启用",
              "name": "预案管理",
              "url": "/yagl"
            },
            {
              "id":"020403",
              "gnms":null,
              "parent":"0204",
              "xthftype": "启用",
              "name": "应急调度",
              "url": "/yjdd"
            },
            {
              "id":"020405",
              "gnms":null,
              "parent":"0204",
              "xthftype": "启用",
              "name": "调度处理",
              "url": "/yjddList"
            },
            {
              "id":"020406",
              "gnms":null,
              "parent":"0204",
              "xthftype": "启用",
              "name": "联动处理",
              "url": "/ldczList"
            },
            {
              "id":"020404",
              "gnms":null,
              "parent":"0204",
              "xthftype": "启用",
              "name": "联动处置",
              "url": "/ldcz"
            }
          ],
          "name": "应急预案演示",
          "url": "/yjyays"
        },
        {
          "id": "0203",
          "gnms": null,
          "parent": "02",
          "xthftype": "启用",
          "children":[
            {
              "id":"020301",
              "gnms":null,
              "parent":"0203",
              "xthftype": "启用",
              "name": "云台控制",
              "url": "/ytkz"
            },
            {
              "id":"020302",
              "gnms":null,
              "parent":"0203",
              "xthftype": "启用",
              "name": "视频查询",
              "url": "/spcx"
            },
            {
              "id":"020303",
              "gnms":null,
              "parent":"0203",
              "xthftype": "启用",
              "name": "分布查询",
              "url": "/fbcx"
            }
          ],
          "name": "应急库区展示",
          "url": "/yjkqzs"
        },
        {
          "id": "0202",
          "gnms": null,
          "parent": "02",
          "xthftype": "启用",
          "children":[
            {
              "id":"020201",
              "gnms":null,
              "parent":"0202",
              "xthftype": "启用",
              "name": "录音与播放",
              "url": "/tjfx"
            },
            {
              "id":"020202",
              "gnms":null,
              "parent":"0202",
              "xthftype": "启用",
              "name": "设备信息管理",
              "url": "/tjfx"
            },
            {
              "id":"020203",
              "gnms":null,
              "parent":"0202",
              "xthftype": "启用",
              "name": "监测信息管理",
              "url": "/tjfx"
            }
          ],
          "name": "应急电话录音",
          "url": "/yjdhly"
        },
        {
          "id": "0201",
          "gnms": null,
          "parent": "02",
          "xthftype": "启用",
          "children":[
            {
              "id":"020103",
              "gnms":null,
              "parent":"0201",
              "xthftype": "启用",
              "name": "地图要素编辑",
              "url": "/FeatureEdit"
            },
            {
              "id":"020104",
              "gnms":null,
              "parent":"0201",
              "xthftype": "启用",
              "name": "专题地图制作",
              "url": "/ThematicMap"
            },
            {
              "id":"020106",
              "gnms":null,
              "parent":"0201",
              "xthftype": "启用",
              "name": "路径分析",
              "url": "/RouteAnalyse"
            }
          ],
          "name": "应急GIS应用",
          "url": "/GISApply"
        },
      ]
    },
    {
      "id": "03",
      "gnms": null,
      "parent": null,
      "xthftype": "启用",
      "children": [{
        "id": "0301",
        "gnms": null,
        "parent": "03",
        "xthftype": "启用",
        "children":[
          {
            "id":"030101",
            "gnms":null,
            "parent":"0301",
            "xthftype": "启用",
            "name": "日常工作",
            "url": "/rcgz"
          },
          {
            "id":"030102",
            "gnms":null,
            "parent":"0301",
            "xthftype": "启用",
            "name": "消息公告",
            "url": "/xxgg"
          }
        ],
        "name": "工作管理",
        "url": "/gzgl"
      },{
          "id": "0302",
          "gnms": null,
          "parent": "03",
          "xthftype": "启用",
          "children":[
            {
              "id":"030201",
              "gnms":null,
              "parent":"0302",
              "xthftype": "启用",
              "name": "员工管理",
              "url": "/yggl"
            },
            {
              "id":"030202",
              "gnms":null,
              "parent":"0302",
              "xthftype": "启用",
              "name": "职位管理",
              "url": "/zwgl"
            },
            {
              "id":"030203",
              "gnms":null,
              "parent":"0302",
              "xthftype": "启用",
              "name": "部门管理",
              "url": "/bmgl"
          }],
          "name": "人员管理",
          "url": "/rygl"
      },{
        "id": "0303",
        "gnms": null,
        "parent": "03",
        "xthftype": "启用",
        "children":[
          {
            "id":"030301",
            "gnms":null,
            "parent":"0303",
            "xthftype": "启用",
            "name": "活动经验",
            "url": "/hdjy"
          },
          {
            "id":"030302",
            "gnms":null,
            "parent":"0303",
            "xthftype": "启用",
            "name": "应急经验",
            "url": "/yjjy"
          },
          {
            "id":"030303",
            "gnms":null,
            "parent":"0303",
            "xthftype": "启用",
            "name": "培训经验",
            "url": "/pxjy"
          }
        ],
        "name": "活动管理",
        "url": "/hdgl"
      }],
      "name": "人员管理子系统",
      "url": "/business"
    },
    {
      "id": "04",
      "gnms": null,
      "parent": null,
      "xthftype": "启用",
      "children": [],
      "name": "应急库区综合安全监控子系统",
      "url": ""
    },
    {
      "id": "05",
      "gnms": null,
      "parent": null,
      "xthftype": "启用",
      "children": [],
      "name": "应急视频会商子系统",
      "url": ""
    },
      {
        "id": "06",
        "gnms": null,
        "parent": null,
        "xthftype": "启用",
        "children": [{
            "id": "0601",
            "gnms": null,
            "parent": "06",
            "xthftype": "启用",
            "children":[
              {
                "id":"060101",
                "gnms":null,
                "parent":"0601",
                "xthftype": "启用",
                "name": "组织机构管理",
                "url": "/zzjggl"
              },
              {
                "id":"060102",
                "gnms":null,
                "parent":"0601",
                "xthftype": "启用",
                "name": "用户管理",
                "url": "/yhgl"
              },
              {
                "id":"060103",
                "gnms":null,
                "parent":"0601",
                "xthftype": "启用",
                "name": "权限管理",
                "url": "/qxgl"
              },
              {
                "id":"060104",
                "gnms":null,
                "parent":"0601",
                "xthftype": "启用",
                "name": "角色管理",
                "url": "/jsgl"
              },
              {
                "id":"060105",
                "gnms":null,
                "parent":"0601",
                "xthftype": "启用",
                "name": "事务管理",
                "url": "/swgl"
              },
              {
                "id":"060106",
                "gnms":null,
                "parent":"0601",
                "xthftype": "启用",
                "name": "协调联动",
                "url": "/xtld"
              }
            ],
            "name": "业务综合",
            "url": "/ywzhgl"
        },{
          "id": "0602",
          "gnms": null,
          "parent": "06",
          "xthftype": "启用",
          "children":[
            {
              "id":"060201",
              "gnms":null,
              "parent":"0602",
              "xthftype": "启用",
              "name": "统计分析",
              "url": "/tjfx"
            },
            {
              "id":"060202",
              "gnms":null,
              "parent":"0602",
              "xthftype": "启用",
              "name": "综合查询",
              "url": "/zhcx"
            }
          ],
          "name": "综合查询",
          "url": "/zhcxzs"
        }],
        "name": "业务综合管理子系统",
        "url": "/system"
      }
  ]
}
