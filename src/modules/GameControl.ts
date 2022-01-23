/*
 * @Explain: 
 * @version: 
 * @Author: SuperLy
 * @Date: 2022-01-22 21:05:57
 * @LastEditors: SuperLy
 * @LastEditTime: 2022-01-23 20:28:12
 */
import Food from './Food'
import ScorePanel from './ScorePanel'
import Snake from './Snake'
class GameControl {

    // 游戏设置
    // 游戏设置按钮 DOM 元素
    configBtnEle: HTMLElement;
    // 重新开始游戏按钮 DOM 元素
    reopenBtnEle: HTMLElement;

    // 游戏容器的 DOM 元素
    main: HTMLElement;
    // 地图的 DOM 元素
    map: HTMLElement;
    // 地图宽度
    mapWidth: number;
    // 地图高度
    mapHeight: number;
    // 地图与游戏容器的边距
    margin: number;
    // 一格的大小
    size: number;
    // 食物
    food: Food;
    // 记分牌
    scorePanel: ScorePanel;
    // 蛇
    snake: Snake;
    // 蛇的运动方向
    direction: string = "";
    // 蛇的移动速度基数
    moveSpe: number
    // 蛇是否存活（是否继续游戏）
    isLive: Boolean = true;
    // 按键节流标识，键盘锁：防止键盘过快按下导致异常调头
    lock = false;
    constructor(margin: number = 120, mapWidth: number = 300, mapHeight: number = 300, size: number = 10, needScore: number = 10, maxLevel: number = 10, moveSpe: number = 300) {
        // 存放游戏设置按钮 DOM 元素
        this.configBtnEle = document.getElementById('config') as HTMLElement;
        // 存放重新开始游戏按钮 DOM 元素
        this.reopenBtnEle = document.getElementById('reopen') as HTMLElement;
        // 存放 游戏容器的 DOM 元素
        this.main = document.getElementById('main') as HTMLElement;
        // 存放 地图 DOM元素
        this.map = document.getElementById('map') as HTMLElement;
        // 存放地图长宽
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        // 存放地图与游戏容器的边距
        this.margin = margin;
        // 存放一格的大小
        this.size = size;
        // 存放移动速度基数
        this.moveSpe = moveSpe;
        // 初始化食物
        this.food = new Food(mapWidth, mapHeight, size)
        // 初始化记分牌
        this.scorePanel = new ScorePanel(mapWidth - margin, needScore, maxLevel)
        // 初始化蛇
        this.snake = new Snake(size);
        // 初始化游戏配置
        (document.getElementById('mapWidth') as HTMLInputElement).value = mapWidth + '';
        (document.getElementById('mapHeight') as HTMLInputElement).value = mapHeight + '';
        (document.getElementById('margin') as HTMLInputElement).value = margin + '';
        (document.getElementById('size') as HTMLInputElement).value = size + '';
        (document.getElementById('needScore') as HTMLInputElement).value = needScore + '';
        (document.getElementById('maxLevel') as HTMLInputElement).value = maxLevel + '';
        (document.getElementById('moveSpe') as HTMLInputElement).value = moveSpe + '';

        // 初始化游戏控制
        this.init();
    };
    // 游戏初始化
    init() {
        // 初始化游戏容器大小
        this.main.style.width = this.mapWidth + this.margin + "px";
        this.main.style.height = this.mapHeight + this.margin + "px";
        // 初始化地图大小
        this.map.style.width = this.mapWidth + "px";
        this.map.style.height = this.mapHeight + "px";
        // 监听键盘
        document.addEventListener("keydown", this.keydownHandler.bind(this));
        // 监听 修改设置 与 重开游戏按钮 的点击
        this.configBtnEle.addEventListener('click', this.config.bind(this));
        this.reopenBtnEle.addEventListener('click', this.reopen.bind(this));
        // 调用run方法，使蛇移动
        this.run();
    };
    // 修改设置回调
    config() {
        const mapWidth: number = parseInt((document.getElementById('mapWidth') as HTMLInputElement).value);
        const mapHeight: number = parseInt((document.getElementById('mapHeight') as HTMLInputElement).value);
        const margin: number = parseInt((document.getElementById('margin') as HTMLInputElement).value);
        const size: number = parseInt((document.getElementById('size') as HTMLInputElement).value);
        const needScore: number = parseInt((document.getElementById('needScore') as HTMLInputElement).value);
        const maxLevel: number = parseInt((document.getElementById('maxLevel') as HTMLInputElement).value);
        const moveSpe: number = parseInt((document.getElementById('moveSpe') as HTMLInputElement).value);

        const configObj = {
            mapWidth, mapHeight, margin, size, needScore, maxLevel, moveSpe
        }
        sessionStorage.setItem('configObj', JSON.stringify(configObj));
        this.reopen();
    }

    // 重开按钮回调
    reopen() {
        location.reload();
    }
    // 键盘事件回调
    keydownHandler(event: KeyboardEvent) {
        /*
            Chrome       IE
            ArrowUp      Up
            ArrowDown    Down
            ArrowLeft    Left
            ArrowRight   Right
            w            w
            s            s
            a            a
            d            d
        */
        if (event.key === this.direction) return;
        // 调头检测，不通过 不改变方向
        if (this.checkBack(event.key)) return;
        // 如过不是以上按键则不该变方向
        const keyArr = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Up', 'Down', 'Left', 'Right', 'w', 's', 'a', 'd', 'W', 'A', 'S', 'D'];
        if (keyArr.includes(event.key) && !this.lock) {
            this.direction = event.key;
            // 开启键盘锁，在下次移动前不可更改方向
            this.lock = true;
        }
    }
    // 蛇运动
    run() {
        let x = this.snake.X;
        let y = this.snake.Y;
        // 根据方向改变蛇的位置
        switch (this.direction) {
            case 'ArrowUp':
            case 'Up':
            case 'w':
            case 'W':
                y -= this.size;
                break;
            case 'ArrowDown':
            case 'Down':
            case 's':
            case 'S':
                y += this.size;
                break;
            case 'ArrowLeft':
            case 'Left':
            case 'a':
            case 'A':
                x -= this.size;
                break;
            case 'ArrowRight':
            case 'Right':
            case 'd':
            case 'D':
                x += this.size;
                break;
        }
        // 检测撞墙 和 检测碰撞身体
        if (this.checkHitWall(x, y) || this.checkHitBody(x, y)) {
            alert(`GAME OVER~  得分：${this.scorePanel.score}  等级：${this.scorePanel.level}`)
            this.isLive = false;
            return false;
        }
        // 移动身体
        this.snake.moveBody();
        // 移动蛇头
        this.snake.X = x;
        this.snake.Y = y;
        // 检测吃食
        this.checkEat();
        // 移动完毕，关闭键盘锁，此时可以改变方向
        this.lock = false;
        // 设置定时器，使蛇持续移动
        this.isLive && setTimeout(this.run.bind(this), this.moveSpe / this.scorePanel.level);
    }
    // 吃食物检测
    checkEat() {
        // 判断条件：蛇头与食物坐标重合
        if (this.food.X === this.snake.X && this.food.Y === this.snake.Y) {
            // 吃到食物
            // 加分
            this.scorePanel.addScore();
            // 将蛇加长
            this.snake.addBody();
            // 刷新食物位置
            this.food.flush(this.snake.element.children);

        }

    }
    // 调头检测
    checkBack(newDirection: string) {
        // 垂直方向数组
        const upDown = ['ArrowUp', 'Up', 'w', 'ArrowDown', 'Down', 's'];
        // 水平方向数组
        const leftRight = ['ArrowLeft', 'Left', 'a', 'ArrowRight', 'Right', 'd'];
        // 判断方法 新的方向不能与原来方向在同一类方向数组中，相同方向没必要，相反方向不允许
        if (
            (upDown.includes(this.direction) && upDown.includes(newDirection))
            ||
            (leftRight.includes(this.direction) && leftRight.includes(newDirection))

        ) {
            console.warn('不允许调头~')
            return true;
        }
        // 未发生调头
        return false;
    }
    // 撞墙检测
    checkHitWall(x: number, y: number) {
        if (
            x > this.mapWidth - this.size
            ||
            x < 0
            ||
            y > this.mapHeight - this.size
            ||
            y < 0) {
            console.error("撞到墙了，游戏结束~");
            return true;
        }
    }
    // 撞身体检测
    checkHitBody(x: number, y: number) {
        const bodies = this.snake.element.children;
        for (let i = 1; i < bodies.length; i++) {
            let bodyX = (bodies[i] as HTMLElement).offsetLeft;
            let bodyY = (bodies[i] as HTMLElement).offsetTop;
            // 头与身体重合
            if (x === bodyX && y === bodyY) {
                console.error("撞到身体了，游戏结束~")
                return true
            }
        }
    }


}
export default GameControl;