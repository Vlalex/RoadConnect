import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LanguageData')
export class LanguageData{

    public languageId:string;
    public levelText:string;
    public levelSelectText:string;
    public endText:string;
    public playButtonText:string;
}


