import { _decorator, Component, Node } from 'cc';
import { PieceData } from './PieceData';
const { ccclass, property } = _decorator;

@ccclass('LevelData')
export class LevelData{
    public LevelID:number;
    public allPieces:Array<PieceData> = new Array<PieceData>();
}


