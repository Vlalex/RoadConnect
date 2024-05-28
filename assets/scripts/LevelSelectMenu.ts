import { _decorator, Component, Node, animation, Prefab, Button, instantiate, Label, Sprite, Color } from 'cc';
import { SoundLibrary } from './others/SoundLibrary';
const { ccclass, property } = _decorator;

@ccclass('LevelSelectMenu')
export class LevelSelectMenu extends Component {

    @property(Prefab)
    public levelSelectButtonPrefab:Prefab = null;

    @property(Node)
    public buttonGrid:Node = null;

    @property([Button])
    public allButtons:Array<Button> = [];

    public addLevel(levelID: number, unlocked:boolean){
        var newLevel:Node = instantiate(this.levelSelectButtonPrefab)
        var newButton:Button = newLevel.getComponent(Button);
        newLevel.setParent(this.buttonGrid);
        newLevel.name = "Level" + levelID + 1;
        newLevel.getComponentInChildren(Label).string = (levelID + 1).toString();
        
        newLevel.on(Button.EventType.CLICK, () => {
            this.node.emit("onLevelPressed", levelID);
            SoundLibrary.instance.playSound(SoundLibrary.SFX.DefaultClick);
        }, true);

        if(this.allButtons === null)
            this.allButtons = new Array<Button>(0);
        this.allButtons.push(newButton);

        if(!unlocked){
            newButton.interactable = false;
            //newLevel.getComponent(Sprite).color = Color.GRAY;
        }
    }

    public ClearMenu(){
        if(this.allButtons == null)
            return;
        this.allButtons.forEach((v) => {v.node.destroy();});
        this.allButtons = [];
    }
}


