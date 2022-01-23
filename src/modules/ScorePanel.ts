/*
 * @Explain: 
 * @version: 
 * @Author: SuperLy
 * @Date: 2022-01-22 20:09:32
 * @LastEditors: SuperLy
 * @LastEditTime: 2022-01-23 10:53:16
 */
class Score {
    // 记录分数
    score: number = 0;
    // 记录等级
    level: number = 1;
    // 记分牌容器 DOM 元素
    scoreMainEle: HTMLElement;
    // 分数 展示 DOM元素
    scoreEle: HTMLElement;
    // 等级 展示 DOM元素
    levelEle: HTMLElement;
    // 每次升级所需分数
    needScore: number;
    // 最高等级（最快速度）
    maxLevel: number;
    constructor(width: number = 300, needScore: number = 10, maxLevel: number = 10) {
        // 存放记分牌容器 DOM 元素
        this.scoreMainEle = document.querySelector('#score') as HTMLElement;
        // 存放分数展示 DOM 元素
        this.scoreEle = this.scoreMainEle.querySelector('p:first-child>span') as HTMLElement;
        // 存放等级展示 DOM 元素
        this.levelEle = this.scoreMainEle.querySelector('p:last-child>span') as HTMLElement;
        // 存放 升级所需分数
        this.needScore = needScore;
        // 存放 最高等级（最快速度）
        this.maxLevel = maxLevel;
        // 初始化记分牌大小
        this.scoreMainEle.style.width = width + "px";
    };

    // 增加分数
    addScore() {
        this.scoreEle.innerText = String(++this.score);
        if (this.score % this.needScore === 0) this.upgrade()
    };
    // 升级
    upgrade() {
        if (this.level < this.maxLevel) this.levelEle.innerHTML = String(++this.level);
    }
}
export default Score;