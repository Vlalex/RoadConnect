import { _decorator, Button, Component, JsonAsset, Node, tween, Vec3 } from 'cc';
import { LevelCreatorData } from './level_editor/LevelCreatorData';
import { PuzzleManager } from './PuzzleManager';
import { GameUI } from './ui/GameUI';
import { LevelSelectMenu } from './LevelSelectMenu';
import { TitleScreen } from './ui/TitleScreen';
import { SoundLibrary } from './others/SoundLibrary';
import { LevelData } from './data/LevelData';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    private readonly LEVEL_KEY:string = "Level";

    private m_NumberOfLevels:number;
    private m_CurrentLevel:number;

    @property({type:LevelCreatorData, group: "Controller"})
    public levelCreatorData:LevelCreatorData;
    @property({type:PuzzleManager, group: "Controller"})
    public puzzleManager:PuzzleManager;
    @property({type:GameUI, group: "Controller"})
    public gameUI:GameUI;
    

    @property({type:LevelSelectMenu, group: "Screens"})
    public levelSelect:LevelSelectMenu
    @property({type:TitleScreen, group: "Screens"})
    public titleScreen:TitleScreen

    //#region Private

    onLoad() {
        this.gameUI.btn_menu.node.on(Button.EventType.CLICK,this.onMenuPressed, this);
        this.gameUI.btn_play.node.on(Button.EventType.CLICK,this.onPlayPressed, this);
        this.puzzleManager.onLevelComplete = this.handleLevelComplete;
        this.titleScreen.onAnimationComplete = this.handleTItleScreenAnimationComplete;
    }

    start(){
        SoundLibrary.instance.playMusic();
    }

    onEnable(){
        this.levelSelect.onLevelPressed = this.loadLevel;
    }

    onDisable(){
        this.levelSelect.onLevelPressed = null;
        this.puzzleManager.onLevelComplete = null;
        this.titleScreen.onAnimationComplete = null;
    }

    private onMenuPressed(){
        this.levelSelect.node.active = false;
        this.puzzleManager.clearLevel();
        this.populateLevelSelect();

        SoundLibrary.instance.playSound(SoundLibrary.SFX.DefaultClick);
    }

    private onPlayPressed(){
        tween(this.gameUI.btn_play.node).to(0.5, {scale: new Vec3(1.1,1.1,1)}, {easing: "bounceIn"}).start();
        this.schedule(() => {});
        this.levelSelect.node.active = true;
        this.m_NumberOfLevels = this.levelCreatorData.getGameLevels().length;
        this.populateLevelSelect();
        SoundLibrary.instance.playSound(SoundLibrary.SFX.DefaultClick);
    }

    private loadLevel(levelId:number){
        this.m_CurrentLevel = levelId;
        this.levelSelect.node.active = true;
        this.puzzleManager.populateLevel(this.getLevelWithID(levelId), this.levelCreatorData.levelSprite);
        this.gameUI.setLevelName("Level" + levelId.toString());
    }

    private getLevelWithID(levelID:number) : LevelData{
        var level:LevelData = new LevelData();

        this.levelCreatorData.getGameLevels().forEach((levelData:LevelData) => {
            if(levelData.levelID == levelID){
                level = levelData;
            }
        });
        return level;
    }

    private populateLevelSelect(){
        this.levelSelect.ClearMenu();
        this.levelCreatorData.getGameLevels().forEach((level:LevelData) => {
            var unlocked:boolean = this.checkIfLevelIsUnlocked(level.levelID);
            this.levelSelect.addLevel(level.levelID, unlocked);
        });
    }

    private checkIfLevelIsUnlocked(levelID:number) :boolean{
        var isUnlocked:boolean = false;

        if(levelID == 0){
            isUnlocked = true;
        }else{
            if(localStorage.getItem(this.LEVEL_KEY + (levelID - 1).toString()) == "1"){
                isUnlocked = true;
            }
        }

        return isUnlocked;
    }

    private handleTItleScreenAnimationComplete(){

    }

    private handleLevelComplete(){

    }

    private saveProgress(levelID:number){

    }
    //#endregion

    //#region Schedulers
    private endGameAnimation(){

    }

    private levelTransition(){

    }

    private removeTitleScreen(){

    }
    //#endregion
}


