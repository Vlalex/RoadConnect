import { _decorator, Component, director, JsonAsset, Node } from 'cc';
import { LanguageData } from './LanguageData';
import { GamePreferences } from '../others/GamePreferences';
import { LanguageChanger } from './LanguageChanger';
const { ccclass, property } = _decorator;

@ccclass('LanguageManager')
export class LanguageManager extends Component {

    public static instance:LanguageManager;

    @property(JsonAsset)
    public languages:JsonAsset = null;

    private texts:Map<string,string> = null

    onEnable() {
        if(LanguageManager.instance === undefined || LanguageManager.instance === null){
            LanguageManager.instance = this;
            //console.log("INSTANCE CREATED: ",LanguageManager.instance);
        }
    }

    public setupTexts(languageSelected:string){
        if(this.texts == null || this.texts == undefined)
            this.texts = new Map<string,string>();

        var languages:LanguageData[] = this.languages.json as LanguageData[];
        languages.forEach((languageData:LanguageData) => {
            if(languageData.languageId === languageSelected){
                this.texts.set("level", languageData.levelText);
                this.texts.set("levelSelect", languageData.levelSelectText);
                this.texts.set("play", languageData.playButtonText);
                this.texts.set("end", languageData.endText);
                return;
            }
        })
        this.node.emit("ChangeText");
    }


    public getText(textId:string):string{
        return this.texts.get(textId);
    }
}


