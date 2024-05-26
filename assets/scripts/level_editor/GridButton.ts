import { _decorator, Button, CCInteger, Color, Component, Label, Node, Sprite, SpriteFrame, SpriteRenderer, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GridButton')
export class GridButton extends Component {
    private DEFAULT_TEXT:string = "Add Piece"

    private m_Button:Button;

    @property({type:CCInteger, group:"Attributes"})
    public currentPieceID:number = -1;
    @property({type:CCInteger, group:"Attributes"})
    public startRotation:number = 0;
    @property({type:CCInteger, group:"Attributes"})
    public targetRotation:number = 0;

    @property({type:Label, group: "Text"})
    public t_button:Label


    public onClick:(GridButton) => void;

    //#region Private

    onLoad(){
        this.m_Button = this.getComponent(Button);
        this.m_Button.node.on(Button.EventType.CLICK, this.onButtonClick, this);
    }

    private onButtonClick(){
        this.onClick(this);
    }

    private rotate(){
        this.m_Button.node.eulerAngles = new Vec3(0,0,this.m_Button.node.eulerAngles.z - 90);
    }
    //#endregion

    //#region Public

    public updateSprite(newSprite:SpriteFrame){
        this.m_Button.getComponent(Sprite).spriteFrame = newSprite;
        this.t_button.string = "";
    }

    public setEmpty(){
        this.currentPieceID = -1;
        this.m_Button.getComponent(Sprite).spriteFrame = null;
        this.t_button.string = this.DEFAULT_TEXT;
        this.startRotation = 0;
        this.targetRotation = 0;
        this.m_Button.node.eulerAngles = Vec3.ZERO;
    }

    public setVisible(isVisible:boolean){
        if(isVisible){
            this.m_Button.interactable = true;
            this.m_Button.getComponent(Sprite).color = Color.WHITE;
            this.t_button.string = this.DEFAULT_TEXT;
        }
        else{
            this.m_Button.interactable = false;
            this.m_Button.getComponent(Sprite).color = new Color(0,0,0,0);
            this.t_button.string = "";
        }
    }

    public setStartRotation(){
        this.rotate();
        this.startRotation = this.m_Button.node.eulerAngles.z;
    }

    public setTargetRotation(){
        this.rotate();
        this.targetRotation = this.m_Button.node.eulerAngles.z;
    }

    public switchToTargetRotation(){
        this.m_Button.node.eulerAngles = new Vec3(0,0, this.targetRotation);
    }

    public switchToStartRotation(){
        this.m_Button.node.eulerAngles = new Vec3(0,0, this.startRotation);
    }

    //#endregion

}


