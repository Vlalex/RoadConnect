import { _decorator, Component, JsonAsset, Node, Sprite, SpriteFrame } from 'cc';
import { LevelData } from '../data/LevelData';
import { PieceData } from '../data/PieceData';
const { ccclass, property, menu } = _decorator;

@ccclass('LevelCreatorData')
export class LevelCreatorData extends Component {

    @property([SpriteFrame])
    public levelSprite:Array<SpriteFrame> = [];

    @property(JsonAsset)
    public levelDataJSON:JsonAsset = null;

    public levelData:Array<LevelData> = [];

    onEnable(): void {
        this.levelData = new Array<LevelData>();
        
        var loadedLevelDataArray = (this.levelDataJSON.json as Array<LevelData>);
        loadedLevelDataArray.forEach((levelData:LevelData) =>{
            var newLevelData:LevelData = new LevelData();
            newLevelData.levelID = levelData.levelID;
            (levelData.allPieces as Array<PieceData>).forEach((pieceData:PieceData) => {
                var newPieceData:PieceData = new PieceData(pieceData.pieceID,pieceData.startRotation,pieceData.targetRotation);
                newLevelData.allPieces.push(newPieceData);
            });

            this.levelData.push(newLevelData);
        });


        console.log("Data Loaded, ", this.levelData);
    }
}


