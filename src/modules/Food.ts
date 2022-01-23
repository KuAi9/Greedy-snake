/*
 * @Explain: 
 * @version: 
 * @Author: SuperLy
 * @Date: 2022-01-22 19:00:26
 * @LastEditors: SuperLy
 * @LastEditTime: 2022-01-23 15:31:02
 */
class Food {
    // 存放食物的 DOM元素
    element: HTMLElement;
    // 存放地图的大小
    mapWidth: number;
    mapHeight: number;
    // 存放一个格子的大小
    size: number;
    constructor(mapWidth: number = 300, mapHeight: number = 300, size: number = 10) {
        // 获取节点并存放
        this.element = document.getElementById('food') as HTMLElement;

        // 存放地图的长宽
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        // 存放食物的大小
        this.size = size;
        // 设置食物的大小
        this.element.style.width = size + "px";
        this.element.style.height = size + "px";
        //  刷新食物位置
        // 获取蛇，避免刷新到蛇头上
        const snake = (document.querySelector('#snake') as HTMLElement).children;
        this.flush(snake);

    }
    // 获取食物的X坐标
    get X() {
        return this.element.offsetLeft;
    }
    // 获取食物的Y坐标
    get Y() {
        return this.element.offsetTop;
    }
    // 刷新食物
    flush(bodies?: HTMLCollection) {
        let { x, y } = this.randomXY();
        if (bodies && bodies?.length > 0) {
            // 判断 生成的 X 和 Y 是否在蛇的体内
            for (let i = 0; i < bodies.length; i++) {
                let bodyX = (bodies[i] as HTMLElement).offsetLeft;
                let bodyY = (bodies[i] as HTMLElement).offsetTop;
                // 如果刷新的食物与身体位置一样，则重新生成
                while (bodyX === x && bodyY === y) {
                    x = this.randomXY().x;
                    x = this.randomXY().y;
                }
            }
        }

        // 有时 地图长宽除 方块大小为小数，会造成溢出几个像素，向下取整又会造成食物不紧贴地图，所以加上以下判断
        // 若大于地图-食物大小，则等于 地图-食物大小
        x = x > this.mapWidth - this.size ? this.mapWidth - this.size : x;
        y = y > this.mapHeight - this.size ? this.mapHeight - this.size : y;

        // 设置食物DOM元素位置
        this.element.style.left = x + 'px';
        this.element.style.top = y + 'px';
    }
    // 随机生 食物的 坐标
    randomXY() {
        // 食物可在的范围：一格大小的倍数
        // X: 0 ~ 地图宽度 - 食物宽度
        // Y: 0 ~ 地图高度 - 食物高度
        let x = Math.floor(Math.random() * (this.mapWidth / this.size)) * this.size;
        let y = Math.floor(Math.random() * (this.mapHeight / this.size)) * this.size;
        return { x, y }
    }
}
export default Food