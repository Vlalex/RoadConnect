import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TitleScreen')
export class TitleScreen extends Component {

    public onAnimationComplete:() => void = null;

    public onTitleAnimationComplete(){
        if(this.onAnimationComplete != null){
            this.onAnimationComplete()
        }
    }
}


