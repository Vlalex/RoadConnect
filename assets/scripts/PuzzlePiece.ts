import { _decorator, AudioSource, CCInteger, Component, easing, math, Node, Quat, random, randomRange, Sprite, SpriteRenderer, tween, Vec3 } from 'cc';
import { SoundLibrary } from './others/SoundLibrary';
const { ccclass, property } = _decorator;

@ccclass('PuzzlePiece')
export class PuzzlePiece extends Component {

    private readonly ROTATE_SPEED:number = 0.15;

    private m_Sprite:Sprite;
    private m_Audio:AudioSource;

    private m_Rotating:boolean = false;
    private m_Locked:boolean;
    private m_IsMirrored:boolean;
    private m_IsBonus:boolean;

    @property(CCInteger)
    public startingRotation:number;
    @property(CCInteger)
    public targetRotation:number;

    public onPieceMoved:() => void = null;

    //#region Private
    onLoad(){
        this.m_Sprite = this.getComponent(Sprite);
        this.m_Audio = this.getComponent(AudioSource);
    }

    onEnable(){
        this.node.scale = Vec3.ZERO;
        tween(this.node).delay(randomRange(0.25,0.75)).to(0.25, {scale: Vec3.ONE}, {easing: 'quadInOut'}).call(() => this.m_Audio.play()).start()
    }

    onMouseUp(){
        if(!this.m_Locked)
            {
                this.rotate();
            }
    }
    
    //#endregion

    //#region Public
    public disappear(){
        this.m_Locked = true;
        tween(this.node).delay(0.5).to(0.25,{scale: Vec3.ZERO}, {easing: "quadInOut"}).start();
    }

    public init(startingRotation:number, targetRotation:number, sprite:Sprite){
        this.m_Sprite = sprite;
        this.startingRotation = startingRotation;
        this.node.eulerAngles = new Vec3(0,0,this.startingRotation);
        this.targetRotation = targetRotation

        if(sprite.name.search("MR180")){
            this.m_IsMirrored = true;
        }
        else if(sprite.name.search("BN360")){
            this.m_IsBonus = true
        }
    }

    public isOnTargetPosition(){
        if(this.m_IsBonus)
            return true;

        if(this.m_IsMirrored){
            if(!math.approx(this.node.eulerAngles.z, this.targetRotation)){
                var newTarget:number = 0;
                switch (this.targetRotation) {
                    case 0:
                        newTarget = 180;
                        break;
                    case 90:
                        newTarget = 270;
                        break;
                    case 180:
                        newTarget = 0;
                        break;
                    case 270:
                        newTarget = 90;
                        break;
                }
                return math.approx(this.node.eulerAngles.z, newTarget);
            }
        }
        return math.approx(this.node.eulerAngles.z, this.targetRotation);
    }

    public rotate()
    {
        if(this.m_Rotating)
            return;

        this.m_Rotating = true;

        var rotation = tween(this.node).by(this.ROTATE_SPEED, {rotation: new Quat(0,0, this.node.eulerAngles.z - 90), });
        var onRotationComplete = tween(this.node).call(() => {
            this.m_Rotating = false;
            if(this.onPieceMoved != null){
                this.onPieceMoved();
            }
        })
        tween().sequence(rotation).then(onRotationComplete).start();
        SoundLibrary.instance.playSound(SoundLibrary.SFX.ShapeRotate);
    }

    //#endregion

}


