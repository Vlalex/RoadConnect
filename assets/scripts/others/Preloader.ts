import { _decorator, Component, Node, Scene } from 'cc';
import { GamePreferences } from './GamePreferences';
import { SceneController } from '../utils/SceneController';
const { ccclass, property } = _decorator;


@ccclass('Preloader')
export class Preloader extends Component {

    private readonly GAME_KEY:string = "FIRST_BOOT";

    //#region Private Methods
    onEnable() {
        if(localStorage.getItem(this.GAME_KEY) === null || localStorage.getItem(this.GAME_KEY) === "0"){
            localStorage.setItem(this.GAME_KEY, "1");
            GamePreferences.saveInitialPreferences();
        }else
        {
            GamePreferences.loadPreferences();
        }
        
    }

    start() {
        SceneController.requestLoadScene(SceneController.GameScene.Main);
    }
    //#endregion
}


