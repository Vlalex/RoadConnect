import { _decorator, AudioSource, Component, Node } from 'cc';
import { MusicSmoothPlay } from './MusicSmoothPlay';
import { GamePreferences } from './GamePreferences';
const { ccclass, property } = _decorator;

enum SFX
{
    DefaultClick,
    ShapeRotate,
    ShapeAppear,
    LevelComplete
}

@ccclass('SoundLibrary')
export class SoundLibrary extends Component {

    //#region Singleton
    public static instance:SoundLibrary;
    //#endregion

    static SFX = SFX;

    @property(MusicSmoothPlay)
    gameMusic:MusicSmoothPlay =  null;

    //#region Audio Sources

    @property(AudioSource)
    m_DefaultClick:AudioSource=  null;

    @property(AudioSource)
    m_ShapeRotate:AudioSource=  null;

    @property(AudioSource)
    m_ShapeAppear:AudioSource=  null;

    @property(AudioSource)
    m_LevelComplete:AudioSource=  null;

    //#endregion

    onEnable() {
        if(SoundLibrary.instance === undefined || SoundLibrary.instance === null){
            SoundLibrary.instance = this;
        }
    }

    //#region Sound

    public playSound(soundId:SFX);
    public playSound(soundId:SFX, volume:number);
    public playSound(soundId:SFX, delay:number = 0, loops:boolean = false, volume:number = 1)
    {

        if (!GamePreferences.SoundOn) return;

        switch (soundId)
        {
            case SFX.DefaultClick:
                this.playRequestedSound(this.m_DefaultClick, delay, loops, volume);
                break;
            case SFX.ShapeRotate:
                this.playRequestedSound(this.m_ShapeRotate, delay, loops, volume);
                break;
            case SFX.ShapeAppear:
                this.playRequestedSound(this.m_ShapeAppear, delay, loops, volume);
                break;
            case SFX.LevelComplete:
                this.playRequestedSound(this.m_LevelComplete, delay, loops, volume);
                break;
        }

    }
    

    private playRequestedSound(audio:AudioSource, delay:number, loops:boolean, volume:number)
    {
        if (audio && !audio.playing)
        {
            audio.volume = volume;
            audio.loop = loops;
            this.schedule(() => {audio.play();},0,0,delay);
        }
    }
    //#endregion

    //#region Music
    private onToggleMusic(musicOn:boolean)
    {
        if (musicOn)
        {
            this.playMusic();
        }
        else
        {
            this.stopMusic();
        }
    }

    public playMusic()
    {
        if (!GamePreferences.MusicOn) return;

        this.gameMusic.setOperation(MusicSmoothPlay.MusicOperation.PlaySmooth);
    }

    public pauseMusic()
    {
        this.gameMusic.setOperation(MusicSmoothPlay.MusicOperation.Pause);
    }

    public resumeMusic()
    {
        if (!GamePreferences.MusicOn) return;

        this.gameMusic.setOperation(MusicSmoothPlay.MusicOperation.Resume);
    }

    public stopMusic()
    {
        this.gameMusic.setOperation(MusicSmoothPlay.MusicOperation.Stop);
    }

    public fadeOutMusic()
    {
        this.gameMusic.setOperation(MusicSmoothPlay.MusicOperation.FadeOut);
    }
    //#endregion
}


