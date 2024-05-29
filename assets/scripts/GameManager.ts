import { _decorator, Button, Component, EventKeyboard, Input, input, JsonAsset, KeyCode, Node, tween, Vec3 } from 'cc';
import { LevelCreatorData } from './level_editor/LevelCreatorData';
import { PuzzleManager } from './PuzzleManager';
import { GameUI } from './ui/GameUI';
import { LevelSelectMenu } from './LevelSelectMenu';
import { TitleScreen } from './ui/TitleScreen';
import { SoundLibrary } from './others/SoundLibrary';
import { LevelData } from './data/LevelData';
import { LanguageManager } from './utils/LanguageManager';
import { GamePreferences } from './others/GamePreferences';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    private readonly LEVEL_KEY:string = "Level";

    private m_NumberOfLevels:number;
    private m_CurrentLevel:number;

    @property({type:LevelCreatorData})
    public levelCreatorData:LevelCreatorData = null;
    @property({type:PuzzleManager})
    public puzzleManager:PuzzleManager = null;
    @property({type:GameUI})
    public gameUI:GameUI = null;
    

    @property({type:LevelSelectMenu})
    public levelSelect:LevelSelectMenu = null;
    @property({type:TitleScreen})
    public titleScreen:TitleScreen = null;

    //#region Private

    onEnable() {
        console.log("SAVED LANGUAGE: ", GamePreferences.Language);
        this.gameUI.btn_menu.node.on(Button.EventType.CLICK,this.onMenuPressed, this);
        this.gameUI.btn_play.node.on(Button.EventType.CLICK,this.onPlayPressed, this);
        this.puzzleManager.node.on("onLevelComplete",this.handleLevelComplete, this);
        this.titleScreen.node.on("onAnimationComplete", this.handleTitleScreenAnimationComplete, this);
        this.levelSelect.node.on("onLevelPressed",this.loadLevel, this);
        input.on(Input.EventType.KEY_DOWN, (event:EventKeyboard) => {if(event.keyCode == KeyCode.ARROW_DOWN) console.log("STORAGE CLEAR");localStorage.clear();}, this);
    }

    start(){
        SoundLibrary.instance.playMusic();
    }

    onDisable(){
        this.puzzleManager.node.off("onLevelComplete",this.handleLevelComplete, this);
        this.titleScreen.node.off("onAnimationComplete", this.handleTitleScreenAnimationComplete, this);
        this.levelSelect.node.off("onLevelPressed",this.loadLevel, this);
    }

    private onMenuPressed(){
        this.levelSelect.node.active = true;
        this.puzzleManager.clearLevel();
        this.populateLevelSelect();

        SoundLibrary.instance.playSound(SoundLibrary.SFX.DefaultClick);
    }

    private onPlayPressed(){
        this.gameUI.hideEndGameText();
        
        //tween(this.gameUI.btn_play.node).to(0.5, {scale: new Vec3(1.1,1.1,1)}, {easing: "bounceIn"}).start();
        this.scheduleOnce(this.removeTitleScreen, 0.5);
        this.levelSelect.node.active = true;
        this.m_NumberOfLevels = this.levelCreatorData.levelData.length;
        this.populateLevelSelect();
        SoundLibrary.instance.playSound(SoundLibrary.SFX.DefaultClick);
    }

    private loadLevel(levelId:number){
        this.puzzleManager.clearLevel();
        this.m_CurrentLevel = levelId;
        this.levelSelect.node.active = false;
        this.puzzleManager.populateLevel(this.getLevelWithID(levelId), this.levelCreatorData.levelSprite);
        this.gameUI.setLevelName(LanguageManager.instance.getText("level") + " " + levelId.toString());
    }

    private getLevelWithID(levelID:number) : LevelData{
        var level:LevelData = new LevelData();

        this.levelCreatorData.levelData.forEach((levelData:LevelData) => {
            if(levelData.levelID == levelID){
                level = levelData;
            }
        });
        return level;
    }

    private populateLevelSelect(){
        this.gameUI.hideEndGameText();
        this.levelSelect.ClearMenu();
        this.levelCreatorData.levelData.forEach((level:LevelData) => {
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

    private handleTitleScreenAnimationComplete(){
        console.log(this.gameUI, this.puzzleManager,this.titleScreen,this.levelSelect);
        LanguageManager.instance.setupTexts(GamePreferences.Language);
        this.gameUI.buttonPlayAppear();
    }

    private handleLevelComplete(){
        this.gameUI.levelCompleteAnimation();
        this.saveProgress(this.m_CurrentLevel);

        if(!(this.m_CurrentLevel >= (this.m_NumberOfLevels -1))){
            this.scheduleOnce(this.levelTransition,1.5);
        }else{
            this.scheduleOnce(this.endGameAnimation,1.5);
        }
    }

    private saveProgress(levelID:number){
        //console.log("SAVE GAME");
        localStorage.setItem(this.LEVEL_KEY + levelID, "1");
        //console.log(localStorage.getItem(this.LEVEL_KEY + levelID));

    }
    //#endregion

    //#region Schedulers
    private endGameAnimation(){
        this.gameUI.allLevelsCompleteAnimation();
    }

    private levelTransition(){
        this.gameUI.newLevelAnimation();
        this.m_CurrentLevel++;
        this.loadLevel(this.m_CurrentLevel);
    }

    private removeTitleScreen(){
        this.titleScreen.node.active = false;
    }
    //#endregion
}


