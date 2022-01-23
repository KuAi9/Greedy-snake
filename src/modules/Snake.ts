/*
 * @Explain: 
 * @version: 
 * @Author: SuperLy
 * @Date: 2022-01-22 20:34:49
 * @LastEditors: SuperLy
 * @LastEditTime: 2022-01-23 20:06:57
 */
class Snake {
    // 蛇容器的 DOM 元素
    element: HTMLElement;
    // 蛇头的 DOM 元素
    headEle: HTMLElement;
    // 单元格大小
    size: number
    constructor(size: number) {
        // 存储 蛇容器的 DOM 元素
        this.element = document.querySelector('#snake') as HTMLElement
        // 存储 蛇头的 DOM 元素
        this.headEle = this.element.querySelector('div') as HTMLElement;
        // 存储单元大小
        this.size = size;
        // 初始化蛇的大小
        this.headEle.style.width = size + 'px';
        this.headEle.style.height = size + 'px';
    }
    // 获取蛇头位置
    get X() {
        return this.headEle.offsetLeft;
    }
    get Y() {
        return this.headEle.offsetTop;
    }
    // 设置蛇头位置
    set X(value: number) {
        this.headEle.style.left = value + "px";
    }
    set Y(value: number) {
        this.headEle.style.top = value + "px";
    }
    // 增加身体
    addBody() {
        const body: HTMLElement = document.createElement('div');
        body.style.width = this.size + "px";
        body.style.height = this.size + "px";
        // 先隐藏，等蛇下一步行动时，添加到蛇身后并显示，视觉上更自然
        body.style.display = "none";
        this.element.appendChild(body);
    }
    // 移动身体
    moveBody() {
        const bodies = this.element.children;
        // 原理：蛇的后一格等于前一格的坐标
        for (let i = bodies.length - 1; i > 0; i--) {
            (bodies[i] as HTMLElement).style.left = (bodies[i - 1] as HTMLElement).offsetLeft + "px";
            (bodies[i] as HTMLElement).style.top = (bodies[i - 1] as HTMLElement).offsetTop + "px";
            (bodies[i] as HTMLElement).style.display = "block";
        }
    }
}
export default Snake;