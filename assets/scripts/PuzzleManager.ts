import { _decorator, Canvas, Component, instantiate, Node, Prefab, Sprite, SpriteFrame, SpriteRenderer, UITransform, Vec2, Vec3 } from 'cc';
import { PuzzlePiece } from './PuzzlePiece';
import { SoundLibrary } from './others/SoundLibrary';
import { LevelData } from './data/LevelData';
import { PieceData } from './data/PieceData';
const { ccclass, property } = _decorator;

@ccclass('PuzzleManager')
export class PuzzleManager extends Component {

    private readonly PUZZLE_SIZE = 4;

    private m_StartingPuzzleArea:Vec2 = new Vec2(-288,480);

    @property([PuzzlePiece])
    public allPieces:Array<PuzzlePiece> = [];
    
    @property(Prefab)
    public piecePrefab:Prefab;

    @property(Node)
    public canvas:Node = null;

    //#region Private

    private checkForLevelComplete(){
        console.log("CHECK FOR LEVEL COMPLETE");
        for (let i = 0; i < this.allPieces.length; i++) {
            if(!this.allPieces[i].isOnTargetPosition()){
                console.log("ONE IS MISSING: ", this.allPieces[i].name, " is ", this.allPieces[i].isOnTargetPosition());
                return;
            }
        }

        this.levelComplete()
    }

    private levelComplete(){
        console.log("LEVEL COMPLETED");
        SoundLibrary.instance.playSound(SoundLibrary.SFX.LevelComplete, 0.5);

        this.allPieces.forEach((piece:PuzzlePiece) => {
            piece.disappear();
        });

        this.node.emit("onLevelComplete");
    }

    onDisable() {
        this.allPieces.forEach((piece:PuzzlePiece) => {
            piece.node.off("onPieceMoved", this.checkForLevelComplete,this);
        });
    }

    //#endregion

    //#region Public
    public clearLevel(){
        this.allPieces.forEach(piece => {
            piece.node.destroy();
        });

        this.allPieces = [];
    }

    public populateLevel(level:LevelData, levelSprites:Array<SpriteFrame>){
        var hCount:number = 0;
        var vCount:number = 0;

        level.allPieces.forEach((piece:PieceData) => {
            if(piece.pieceID != -1){
                var newPiece:PuzzlePiece = instantiate(this.piecePrefab).getComponent(PuzzlePiece);
                var pieceContentSize = newPiece.getComponent(UITransform).contentSize;
                newPiece.node.setParent(this.canvas);
                newPiece.node.position = new Vec3(this.m_StartingPuzzleArea.x + (hCount * pieceContentSize.x), this.m_StartingPuzzleArea.y - (vCount * pieceContentSize.y), 0);
                newPiece.init(piece.startRotation, piece.targetRotation, levelSprites[piece.pieceID]);
                newPiece.node.on("onPieceMoved", this.checkForLevelComplete,this);
                newPiece.node.name = "Piece " + hCount.toString() + vCount.toString();
                newPiece.name = "Piece " + hCount.toString() + vCount.toString();
                this.allPieces.push(newPiece);
            }

            hCount++;
            if(hCount >= this.PUZZLE_SIZE){
                hCount = 0;
                vCount++;
            }
        });
    }


    //#endregion
}


