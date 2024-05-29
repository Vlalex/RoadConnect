import { _decorator, CCBoolean, CCString, Component, Label, Node } from 'cc';
import { LanguageManager } from './LanguageManager';
const { ccclass, property } = _decorator;

@ccclass('LanguageChanger')
export class LanguageChanger extends Component {
    
    @property(CCString)
    public textId:string = "";

    @property(CCBoolean)
    public keepNodeActive:boolean = true;

    start() {
        LanguageManager.instance.node.on("ChangeText", this.changeText, this);
    }

    public changeText(){
        //console.log("CHANGE TEXT: ", this.textId);
        this.getComponent(Label).string = LanguageManager.instance.getText(this.textId);
        this.scheduleOnce(() => this.node.active = this.keepNodeActive,3);
    }
}


