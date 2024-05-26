import { _decorator, Component, Node, AudioSource, macro, AudioClip, CCFloat, assetManager} from 'cc';
const { ccclass, property } = _decorator;

enum MusicOperation { PlaySmooth, Stop, Pause, Resume, FadeOut, Play }

@ccclass('MusicSmoothPlay')
export class MusicSmoothPlay extends Component {

    readonly INCREMENT_DELAY:number = 0.5;
    static MusicOperation = MusicOperation;

    @property(CCFloat)
    public targetVolume:number = 0.4;
    @property(CCFloat)
    public initialVolume:number = 0;
    @property(CCFloat)
    public increaseStep:number = 0.05;

     @property(AudioSource)
    public music:AudioSource = null;

    //#region Private Methods
    private fadeOut(){
        if(this.music.playing)
            this.schedule(this.decreaseVolume,this.INCREMENT_DELAY,macro.REPEAT_FOREVER);
        
    }

    private decreaseVolume()
    {
        if(this.music.volume > 0)
        {
            this.music.volume -= this.increaseStep;
        }
        else{
            this.music.stop();
            this.unschedule(this.decreaseVolume);
        }
    }
    private increaseVolume()
    {
        if (this.music.volume < this.targetVolume)
        {

            this.music.volume += this.increaseStep;
        }
        else
        {
            this.unschedule(this.increaseVolume);
        }
    }

    private resumePlayback(){
        this.music.play();
    }

    private pausePlayback(){
        this.music.pause()
    }

    private stopPlayback(){
        this.unscheduleAllCallbacks()
        this.music.stop();
    }

    private playMusicFromInitialVolume(){
        if(this.music && !this.music.playing)
        {
            console.log(this.music)
            this.music.volume = this.initialVolume;
            this.music.play();
            this.schedule(this.increaseVolume,this.INCREMENT_DELAY,macro.REPEAT_FOREVER)
        }
    }
    //#endregion

    //#region Public Methods

    public setNewAudio(newAudio:AudioClip){
        this.music.clip = newAudio;
    }

    public setOperation(operation: MusicOperation){
        switch (operation) {
            case MusicOperation.PlaySmooth:
                this.playMusicFromInitialVolume();
                break;
            case MusicOperation.Stop:
                this.stopPlayback();
                break;
            case MusicOperation.FadeOut:
                this.fadeOut();
                break;
            case MusicOperation.Pause:
                this.pausePlayback();
                break;
            case MusicOperation.Resume:
                this.resumePlayback();
                break;
        }
    }

    //#endregion

}


