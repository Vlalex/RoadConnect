import { _decorator, Component, director, Node, SceneAsset } from 'cc';
const { ccclass, property } = _decorator;

enum GameScene { Main = "main" }

@ccclass('SceneController')
export class SceneController extends Component {
    static GameScene = GameScene

    public static requestLoadScene(sceneToLoad:GameScene)
    {
        director.loadScene(sceneToLoad.toString());
    }

    public static requestLoadAdd(sceneToLoad:GameScene )
    {
        director.preloadScene(sceneToLoad.toString());
    }

    public static requestLoadScenebyName(sceneToLoad:string)
    {
        director.loadScene(sceneToLoad);
    }
}



