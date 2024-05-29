import { _decorator, Component, director, math, Node, Scene, screen, Vec2 } from 'cc';
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

        if(screen.supportsFullScreen)
            screen.fullScreen();

        if(screenX > screenY)
            screen.windowSize = math.size(1920,1080);
    }

    private startGame(){
        SceneController.requestLoadScene(SceneController.GameScene.Main);
    }

    public onLanguageButtonPressed(event:Event, language:string){
        //console.log(language)
        switch (language) {
            case "English":
                GamePreferences.Language = "en";
                break;
            case "Español":
                GamePreferences.Language = "es";
                break;
            case "Italiano":
                GamePreferences.Language = "it";
                break;
        }
        GamePreferences.savePreferences();
        this.startGame();
    }
    //#endregion
}


