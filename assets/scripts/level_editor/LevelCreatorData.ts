import { _decorator, Component, JsonAsset, Node, Sprite, SpriteFrame } from 'cc';
import { LevelData } from '../data/LevelData';
const { ccclass, property, menu } = _decorator;

@ccclass('LevelCreatorData')
export class LevelCreatorData extends Component {

    @property([Sprite])
    public levelSprite:Sprite[] = [];

    @property(JsonAsset)
    public levelData:JsonAsset = null;


    public getGameLevels(): LevelData[]{
        return null;
    }
}


