import { _decorator, animation, AnimationComponent, Button, Component, Label, Node, tween, Vec3 } from 'cc';
import { SoundLibrary } from '../others/SoundLibrary';
const { ccclass, property } = _decorator;

@ccclass('GameUI')
export class GameUI extends Component {

    @property(Label)
    public txt_level_name:Label= null;
    @property(Label)
    public txt_end_game:Label= null;

    @property(Button)
    public btn_menu:Button = null;
    @property(Button)
    public btn_play:Button= null;

    @property(animation.AnimationController)
    public level_header:animation.AnimationController = null;

    //#region Private
    start() {
        SoundLibrary.instance.playMusic();
        this.btn_play.node.on(Button.EventType.CLICK, (button:Button) => {SoundLibrary.instance.playSound(SoundLibrary.SFX.DefaultClick)}, this);
        this.txt_end_game.node.active = false;
    }

    //#endregion

    //#region Public

    public hideEndGameText(){
        this.txt_end_game.node.active = false;
    }

    public setLevelName(levelName:string){
        this.txt_level_name.string = levelName;
    }

    public levelCompleteAnimation(){
        this.level_header.setValue("LevelComplete", true);
    }

    public newLevelAnimation(){
        this.level_header.setValue("NewLevel", true);
    }

    public allLevelsCompleteAnimation(){
        this.txt_level_name.string = "";
        this.txt_end_game.node.active = true;
    }

    public buttonPlayAppear(){
        this.btn_play.node.setScale(0,0,0);
        this.btn_play.node.active = true;
        tween(this.btn_play.node).to(0.5, {scale: new Vec3(1,1,1)}, {easing: 'quadInOut'}).start()
    }


    //#endregion

}


