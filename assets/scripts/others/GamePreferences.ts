import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GamePreferences')
export class GamePreferences extends Component {

    static readonly SoundKey = "Sound";

    static readonly MusicKey = "Music";

    static readonly LanguageKey = "Language";

    private static soundOn:boolean = true;
    private static musicOn:boolean = true;
    private static language:string = "en";


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

    public static get Language() : string {
        return this.language;
    }

    public static set Language(v : string) {
        this.language = v;
    }
    
    //#endregion

    protected onEnable(): void {
        director.addPersistRootNode(this.node);
    }

    //#region Public Methods

    public static savePreferences(){
        console.log("SAVE PREFENCES: ", this.Language);
        localStorage.setItem(this.SoundKey, this.SoundOn? "1": "0");
        localStorage.setItem(this.MusicKey, this.MusicOn? "1": "0");
        localStorage.setItem(this.LanguageKey, this.Language);
    }

    public static loadPreferences(){
        console.log("LOAD PREFENCES");
        this.SoundOn = localStorage.getItem(this.SoundKey) === "1"? true: false;
        this.MusicOn = localStorage.getItem(this.MusicKey) === "1"? true: false;
        this.Language = localStorage.getItem(this.LanguageKey);
    }

    public static saveInitialPreferences(){
        console.log("SAVE INITIAL PREFENCES");
        localStorage.setItem(this.SoundKey, "1");
        localStorage.setItem(this.MusicKey, "1");
        localStorage.setItem(this.LanguageKey, "en");
    }
    //#endregion

}


