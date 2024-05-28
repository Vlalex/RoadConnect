import { _decorator, animation, AnimationClip, Component, Node, Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TitleScreen')
export class TitleScreen extends Component {

    start(): void {
        let animation = this.node.getComponent(Animation);
        animation.on(Animation.EventType.FINISHED, this.onTitleAnimationComplete, this);
        animation.play();
    }

    public onTitleAnimationComplete(){
        this.getComponent(Animation).off(Animation.EventType.FINISHED, this.onTitleAnimationComplete, this);
        this.node.emit("onAnimationComplete");
    }
}


