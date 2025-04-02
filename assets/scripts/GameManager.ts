import { _decorator, Component, Node, input, Input, RigidBody2D, Vec2, Prefab, director, instantiate, Vec3, Collider2D, Contact2DType, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property({ type: Node, tooltip: "Player" })
    player: Node;
    @property({ type: Node, tooltip: "Fail Window" })
    failWindow: Node;

    @property({ type: Prefab, tooltip: "Top Pipe" })
    topPipe: Prefab;
    @property({ type: Prefab, tooltip: "Bottom Pipe" })
    bottomPipe: Prefab;
    @property({ type: Label, tooltip: "Score Label" })
    scoreLabel: Label;
    @property({ type: Prefab, tooltip: "Sensor" })
    sensor: Prefab;


    isGameStart = false;
    score = 0;

    start() {
        input.on(Input.EventType.TOUCH_START, this.jump, this);
        this.player.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        this.player.getComponent(Collider2D).on(Contact2DType.END_CONTACT, this.onEndContact, this);
    }
    private onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D): void {
        if (otherCollider.node.name !== "Sensor") {
            this.failWindow.active = true;
            this.unscheduleAllCallbacks();
            director.getScene().getChildByName("Canvas").children.forEach((item: Node) => {
                if (item.name === "TopPipe" || item.name === "BottomPipe" || item.name === "Sensor") {
                    item.getComponent(RigidBody2D).linearVelocity = new Vec2(0, 0);
                }
            })

        }

    }
    private onEndContact(selfCollider: Collider2D, otherCollider: Collider2D): void {

        if (otherCollider.node.name === "Sensor") {
            this.score += 1;
            this.scoreLabel.string = `Score: ${this.score}`;

        }

    }


    private jump(): void {
        let body = this.player.getComponent(RigidBody2D);
        body.linearVelocity = new Vec2(0, 0)
        body.applyLinearImpulseToCenter(new Vec2(0, 700), true);

        if (!this.isGameStart) {
            this.schedule(() => this.generedPipes(), 0.8);
            this.isGameStart = true;
        }



    }

    private generedPipes(): void {
        let canvas = director.getScene().getChildByName("Canvas");
        let speed = 25;

        let yRandom = (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 300);

        let topPipe = instantiate(this.topPipe);
        topPipe.setParent(canvas);
        topPipe.setPosition(550, 700 + yRandom);
        topPipe.setSiblingIndex(3);
        topPipe.getComponent(RigidBody2D).linearVelocity = new Vec2(-speed, 0);


        let bottomPipe = instantiate(this.bottomPipe);
        bottomPipe.setParent(canvas);
        bottomPipe.setPosition(550, -700 + yRandom);
        bottomPipe.setSiblingIndex(3);
        bottomPipe.getComponent(RigidBody2D).linearVelocity = new Vec2(-speed, 0);

        let sensor = instantiate(this.sensor);
        sensor.setParent(canvas);
        sensor.setPosition(550, yRandom);
        sensor.setSiblingIndex(3);
        sensor.getComponent(RigidBody2D).linearVelocity = new Vec2(-speed, 0);


        this.scheduleOnce(() => {
            topPipe.destroy();
            bottomPipe.destroy();
            sensor.destroy();


        }, 2)

    }



}


