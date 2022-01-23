/*
 * @Explain: 
 * @version: 
 * @Author: SuperLy
 * @Date: 2022-01-16 20:50:57
 * @LastEditors: SuperLy
 * @LastEditTime: 2022-01-23 14:58:52
 */
// 引入样式
import './index.scss'
// 引入游戏控制类
import GameControl from './modules/GameControl';
// 配置对象
let configObj = JSON.parse(sessionStorage.getItem('configObj')!);
// 地图的长宽
const mapWidth: number = configObj?.mapWidth || 800;
const mapHeight: number = configObj?.mapHeight || 380;
// 地图与游戏容器的边距间隔
const margin: number = configObj?.margin || 80;
// 每个像素格的大小，默认20px，最大 100px
const size: number = (configObj?.size && configObj?.size <= 100) ? configObj?.size : 20;
// 升级所需分数
const needScore: number = configObj?.needScore || 10;
// 最大等级
const maxLevel: number = configObj?.maxLevel || 10;
// 移动速度基数
const moveSpe: number = configObj?.moveSpe || 300;
new GameControl(margin, mapWidth, mapHeight, size, needScore, maxLevel, moveSpe);
