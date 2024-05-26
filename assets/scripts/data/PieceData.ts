import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PieceData')
export class PieceData{

    public pieceID:number;
    public startRotation:number;
    public targetRotation:number;

    constructor(pieceID:number, startRotation:number, targetRotation:number){
        this.pieceID = pieceID;
        this.startRotation = startRotation;
        this.targetRotation = targetRotation;
    }

}


