import { _decorator, Button, Component, Label, Node, Prefab } from 'cc';
import { GridButton } from './GridButton';
import { LevelCreatorData } from './LevelCreatorData';
const { ccclass, property } = _decorator;

enum LevelEditorMode{Layout, Start, Solution}

@ccclass('LevelEditor')
export class LevelEditor extends Component {

    static LevelEditorMode = LevelEditorMode;

    private LEVEL_PREFIX:string = "Level"
    private m_Rows:number = 4;
    private m_Columns:number = 4;
    private m_LevelLoaded:boolean = false;
    private m_CurrentMode:LevelEditorMode = LevelEditorMode.Layout;
    private m_AllButtons:GridButton[] = [];

    @property({type:Prefab, group:"Nodes"})
    public gridButtonPrefab:Prefab;
    @property({type:Node, group:"Nodes"})
    public grid:Node;

    @property({type:LevelCreatorData, group:"Data"})
    public levelCreatorData:LevelCreatorData;

    @property({type:Button, group:"Buttons"})
    public btnLayout:Button;
    @property({type:Button, group:"Buttons"})
    public btnStartRotation:Button;
    @property({type:Button, group:"Buttons"})
    public btnSolution:Button;
    @property({type:Button, group:"Buttons"})
    public btnSave;
    @property({type:Button, group:"Buttons"})
    public btnClear;
    @property({type:Button, group:"Buttons"})
    public btnClose;

    @property({type:Label, group:"Others"})
    public t_status:Label;
    @property({type:Label, group:"Others"})
    public t_editor_mode;
    @property({type:Button, group:"Others"})
    public levelSelectorDropdown:Button;
    

}


