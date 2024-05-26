import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GamePreferences')
export class GamePreferences extends Component {

    static readonly SoundKey = "Sound";

    static readonly MusicKey = "Music";

    private static soundOn:boolean = true;
    private static musicOn:boolean = true;


    //#region Propierties
    
    public static get SoundOn() : boolean {
        return this.soundOn;
    }

    public static set SoundOn(v : boolean) {
        this.soundOn = v;
    }
    
    public static get MusicOn() : boolean {
        return this.musicOn;
    }

    public static set MusicOn(v : boolean) {
        this.musicOn = v;
    }
    
    //#endregion

    //#region Public Methods

    public static savePreferences(){
        localStorage.setItem(this.SoundKey, this.SoundOn? "1": "0");
        localStorage.setItem(this.MusicKey, this.MusicOn? "1": "0");
    }

    public static loadPreferences(){
        this.SoundOn = localStorage.getItem(this.SoundKey) === "1"? true: false;
        this.MusicOn = localStorage.getItem(this.MusicKey) === "1"? true: false;
    }

    public static saveInitialPreferences(){
        localStorage.setItem(this.SoundKey, "1");
        localStorage.setItem(this.MusicKey, "1");
    }
    //#endregion

}


