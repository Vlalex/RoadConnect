import { _decorator, AnimationComponent, Button, Component, Label, Node } from 'cc';
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

    @property(AnimationComponent)
    public level_header:AnimationComponent = new AnimationComponent();

    start() {
        SoundLibrary.instance.playMusic();
        this.btn_play.node.on(Button.EventType.CLICK, this.onButtonClick, this);
    }

    onButtonClick(button:Button)
    {
        SoundLibrary.instance.playSound(SoundLibrary.SFX.DefaultClick)
    }
}


