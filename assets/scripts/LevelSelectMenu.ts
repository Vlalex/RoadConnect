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
    public allButtons:Button[] = [];

    public onLevelPressed:(int:number) => void = null;

    public addLevel(levelID: number, unlocked:boolean){
        var newLevel:Button = instantiate(this.levelSelectButtonPrefab).getComponent(Button);
        newLevel.node.setParent(this.buttonGrid);

        newLevel.name = "Level" + levelID + 1;
        newLevel.getComponentInChildren(Label).string = (levelID + 1).toString();
        newLevel.node.on(Button.EventType.CLICK, () => {
            this.onLevelPressed(levelID);
            SoundLibrary.instance.playSound(SoundLibrary.SFX.DefaultClick);
        }, true);

        this.allButtons.push(newLevel);
        if(!unlocked){
            newLevel.interactable = false;
            newLevel.getComponent(Sprite).color = Color.GRAY;
        }
    }

    public ClearMenu(){
        this.allButtons.forEach((v) => {v.destroy();});
        this.allButtons = [];
    }
}


