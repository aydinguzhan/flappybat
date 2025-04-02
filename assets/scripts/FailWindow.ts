import { _decorator, Component, Node, director, RigidBody2D } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('FailWindow')
export class FailWindow extends Component {
    start() {

    }

    private restartGame() {
        let gameManager = director.getScene().getChildByName("GameManager").getComponent(GameManager);
        gameManager.failWindow.active = false;
        gameManager.player.getComponent(RigidBody2D).sleep();
        gameManager.player.setPosition(-150, 0);
        gameManager.player.setRotationFromEuler(0, 0);

        gameManager.score = 0;
        gameManager.scoreLabel.string = "Score: 0";

        gameManager.isGameStart = false;

        director.getScene().getChildByName("Canvas").children.forEach(value => {
            if (value.name === "TopPipe" || value.name === "Sensor" || value.name === "BottomPipe") {
                value.destroy();
            }
        })

    }
    private mainMenu() {
        director.loadScene('MainMenu');
    }

    update(deltaTime: number) {

    }
}


