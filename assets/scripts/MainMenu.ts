import { _decorator, Component, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MainMenu')
export class MainMenu extends Component {
    protected start(): void {

    }
    protected update(dt: number): void {

    }
    private startGame() {
        director.loadScene('MainScene')
    }
}


