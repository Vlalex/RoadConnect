import { _decorator, AudioSource, CCInteger, Component, easing, math, Node, Quat, random, randomRange, Sprite, SpriteFrame, SpriteRenderer, tween, Vec3 } from 'cc';
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
    @property([CCInteger])
    public targetRotations:number[] = [];

    //#region Private
    onEnable(){
        this.m_Sprite = this.getComponent(Sprite);
        this.m_Audio = this.getComponent(AudioSource);
        this.node.scale = Vec3.ZERO;
        tween(this.node).delay(randomRange(0.25,0.75)).to(0.25, {scale: Vec3.ONE}, {easing: 'quadInOut'}).call(() => this.m_Audio.play()).start();
        this.node.on(Node.EventType.TOUCH_END,this.onMouseUp,this);
    }

    start(){
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

    public init(startingRotation:number, targetRotation:number, sprite:SpriteFrame){
        this.m_Sprite.spriteFrame = sprite;
        this.startingRotation = startingRotation;
        this.node.angle = startingRotation;
        if(sprite.name.includes("MR180")){
            this.m_IsMirrored = true;
        }
        else if(sprite.name.includes("BN360")){
            this.m_IsBonus = true
        }
        this.setupRotations(targetRotation)
    }

    private setupRotations(targetRotation:number){

        if(this.m_IsMirrored){
            if(targetRotation === 0){
                this.targetRotations.push(180);
                this.targetRotations.push(-180);
            }else if(targetRotation === 90){
                this.targetRotations.push(-90);
                this.targetRotations.push(270);
            }
            else if(targetRotation === 180){

                this.targetRotations.push(0);
                this.targetRotations.push(360);
                this.targetRotations.push(-360);
            }
            else if(targetRotation === 270){
                this.targetRotations.push(90);
                this.targetRotations.push(-270);

            }
            return;
        }

        if(targetRotation === 0){
            this.targetRotations.push(0);
            this.targetRotations.push(360);
            this.targetRotations.push(-360);
        }else if(targetRotation === 90){
            this.targetRotations.push(90);
            this.targetRotations.push(-270);
        }
        else if(targetRotation === 180){
            this.targetRotations.push(180);
            this.targetRotations.push(-180);
        }
        else if(targetRotation === 270){
            this.targetRotations.push(-90);
            this.targetRotations.push(270);
        }
    }

    public isOnTargetPosition() : boolean{
        if(this.m_IsBonus)
            return true;

       /* if(this.m_IsMirrored){
            if(!math.approx(Math.abs(this.node.angle), this.targetRotation)){
                var newTarget:number = 0;
                switch (this.targetRotations) {
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
                return math.approx(Math.abs(this.node.angle), newTarget);
            }
        }*/
        //return math.approx(Math.abs(this.node.angle), this.targetRotation);
        return this.targetRotations.indexOf(this.node.angle) === -1? false:true;
    }

    public rotate()
    {
        if(this.m_Rotating)
            return;

        this.m_Rotating = true;
        
        tween(this.node).sequence(tween(this.node).to(this.ROTATE_SPEED, {angle: this.node.angle - 90, }).call(() => {
            this.m_Rotating = false;
            if(Math.abs(this.node.angle) === 360)
                this.node.angle = 0;
            this.node.emit("onPieceMoved");
        })).start();
        
        SoundLibrary.instance.playSound(SoundLibrary.SFX.ShapeRotate);


    }

    //#endregion

}


