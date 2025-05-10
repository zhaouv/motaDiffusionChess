main.floors.MT1=
{
    "floorId": "MT1",
    "title": "魔塔扩散棋",
    "name": "魔塔扩散棋",
    "width": 13,
    "height": 13,
    "map": [
    [  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],
    [  1,211,214,227,226,228,249,247,246,220,219,208,  1],
    [  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],
    [  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1],
    [  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1],
    [  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1],
    [  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1],
    [  1,  1,  0,  0,121,  0, 87,  0,122,  0,  0,  1,  1],
    [  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1],
    [  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1],
    [  1,  1,  0,  0,  0,  0, 45,  0,  0,  0,  0,  1,  1],
    [  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1],
    [  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1]
],
    "canFlyTo": true,
    "canFlyFrom": true,
    "canUseQuickShop": true,
    "images": [],
    "ratio": 1,
    "defaultGround": "ground",
    "bgm": "section1.mp3",
    "firstArrive": [
        {
            "type": "tip",
            "text": "游戏已重启"
        },
        {
            "type": "function",
            "function": "function(){\n    core.status.hero.hero2={}   ;  core.status.hero.hero2.hp=44000 ;    core.status.hero.hero2.atk=440 ;    core.status.hero.hero2.def=440;\n}"
        }
    ],
    "eachArrive": [],
    "parallelDo": "",
    "events": {
        "4,7": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                "魔塔扩散棋\n\n两个玩家一同进入魔塔, 进行一个推塔竞赛\n\n9乘9的棋盘内布满了怪物和宝物,  \n宝物可以增加玩家的血量攻击或防御,  \n与怪物的战斗是传统魔塔的机制: 按照攻击减防御等于每轮伤害轮流出手, 玩家攻击第一次, 战斗直至一方血量归零\n\n双方轮流释放熔岩法术: 点击一个格子, 与格子内怪物战斗或者获取宝物, 而后放置熔岩",
                "每当相邻的熔岩大于等于4个时, 熔岩会进行扩散, 使得周围的格子变成墙, 那些物品或怪物也由该玩家获取,  \n那之后, 该玩家要继续释放一次熔岩\n\n当棋盘被填满时, 需要行动的玩家与boss战斗\n\n最后血量高的玩家获胜",
                "拿到怪物手册后, 左下显示的分别是自己和对手的战斗消耗血量\n\n对战AI: AI会忽视棋盘内血量的得失, 只执行尝试把boss推给玩家打的策略\n\n左右互搏: 本地练习\n\n网络对战: 设置房间进行匹配, 0代表公开的随机匹配池"
            ]
        },
        "8,7": {
            "trigger": "action",
            "enable": true,
            "noPass": null,
            "displayDamage": true,
            "opacity": 1,
            "filter": {
                "blur": 0,
                "hue": 0,
                "grayscale": 0,
                "invert": false,
                "shadow": 0
            },
            "data": [
                {
                    "type": "choices",
                    "text": "更改设定, 说明见左侧npc",
                    "choices": [
                        {
                            "text": "对战AI",
                            "action": []
                        },
                        {
                            "text": "左右互博",
                            "action": []
                        },
                        {
                            "text": "网络对战",
                            "action": []
                        },
                        {
                            "text": "设置种子",
                            "action": []
                        }
                    ]
                }
            ]
        }
    },
    "changeFloor": {
        "6,7": {
            "floorId": ":next",
            "loc": [
                1,
                1
            ],
            "direction": "down",
            "time": 0
        }
    },
    "afterBattle": {},
    "afterGetItem": {},
    "afterOpenDoor": {},
    "cannotMove": {},
    "bgmap": [
    [ 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17],
    [ 17,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 17],
    [ 17,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 17],
    [ 17,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 17],
    [ 17,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 17],
    [ 17,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 17],
    [ 17,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 17],
    [ 17,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 17],
    [ 17,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 17],
    [ 17,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 17],
    [ 17,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 17],
    [ 17,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 17],
    [ 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17]
],
    "fgmap": [

],
    "upFloor": [
        6,
        8
    ],
    "downFloor": [
        6,
        11
    ],
    "autoEvent": {},
    "beforeBattle": {},
    "cannotMoveIn": {}
}