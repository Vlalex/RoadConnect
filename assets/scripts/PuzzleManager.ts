import { _decorator, Component, instantiate, Node, Prefab, Sprite, SpriteRenderer, Vec2, Vec3 } from 'cc';
import { PuzzlePiece } from './PuzzlePiece';
import { SoundLibrary } from './others/SoundLibrary';
import { LevelData } from './data/LevelData';
import { PieceData } from './data/PieceData';
const { ccclass, property } = _decorator;

@ccclass('PuzzleManager')
export class PuzzleManager extends Component {

    private readonly PUZZLE_SIZE = 4;

    private m_StartingPuzzleArea:Vec2 = new Vec2(-1.5,2.5);

    @property([PuzzlePiece])
    public allPieces:PuzzlePiece[] = [];
    
    @property(Prefab)
    public piecePrefab:Prefab;

    public onLevelComplete:() => void;

    //#region Private

    private checkForLevelComplete(){
        for (let i = 0; i < this.allPieces.length; i++) {
            if(!this.allPieces[i].isOnTargetPosition()){
                return;
            }
        }

        this.levelComplete()
    }

    private levelComplete(){
        SoundLibrary.instance.playSound(SoundLibrary.SFX.LevelComplete, 0.5);

        this.allPieces.forEach((piece:PuzzlePiece) => {
            piece.disappear();
        });

        if(this.onLevelComplete != null){
            this.onLevelComplete();
        }
    }

    onDisable() {
        this.allPieces.forEach((piece:PuzzlePiece) => {
            piece.onPieceMoved = null;
        });
    }

    //#endregion

    //#region Public
    public clearLevel(){
        this.allPieces.forEach(pieces => {
            pieces.node.destroy();
        });

        this.allPieces = [];
    }

    public populateLevel(level:LevelData, levelSprites:Sprite[]){
        var newPiece: PuzzlePiece;
        var hCount:number = 0;
        var vCount:number = 0;

        level.allPieces.forEach((piece:PieceData) => {
            if(piece.pieceID != -1){
                newPiece = instantiate(this.piecePrefab).getComponent(PuzzlePiece);
                newPiece.node.position = new Vec3(this.m_StartingPuzzleArea.x + hCount, this.m_StartingPuzzleArea.y - vCount, 0);
                newPiece.init(piece.startRotation, piece.targetRotation, levelSprites[piece.pieceID]);
                newPiece.onPieceMoved = this.checkForLevelComplete;
                newPiece.name = "Piece " + hCount + vCount;
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


