import {DrawableSet} from "./DrawableSet";
import {Size} from "./size";
import {ObjectPosition} from "./position";
import {KeyboardDriver} from "./KeyboardDriver";
import {Ball} from "./Ball";
import {Camera} from "./Camera";

export class Character extends DrawableSet
{
    speed: number;
    jumpPower: number;
    direction: string;
    stands: boolean;
    impulse: ObjectPosition;
    attackCooldown: number;
    attackCooldownDelta: number;
    ballsprite: string;
    team: string;

    constructor(srcs: object)
    {
        super(srcs);

        this.size = new Size(32, 32);
        this.speed = 3;
        this.jumpPower = 10;
        this.direction = "right";
        this.stands = false;
        this.attackCooldown = 30;
        this.attackCooldownDelta = 0;
        this.team = "alliers";
        this.ballsprite = 'sprites/waterball.png';
        this.impulse = new ObjectPosition(0, 0);

        this.loadTextures();
    }

    get feetPosition()
    {
        return new ObjectPosition(
            this.position.x + this.size.width / 2,
            this.position.y + this.size.height
        );
    }

    draw(ctx, camera)
    {
        super.draw(ctx, this.direction, camera);
    }

    // balls: Game.balls[]
    attack(balls: Ball[])
    {
        if (this.attackCooldown > this.attackCooldownDelta) {
            return;
        } else {
            this.attackCooldownDelta = 0;
        }

        var b = new Ball(this.ballsprite);
        balls.push(b);
        b.position = this.position.clone();
        b.team = this.team;
        if (this.direction == "right") {
            b.impulse.move(10, -8);
            b.position.move(
                (this.size.width - b.size.width), 0
            );
        } else {
            b.impulse.move(-10, -8);
        }
    }

    update(gravity: number, groundY: number, blocks)
    {
        this.attackCooldownDelta++;
        this.position.move(
            this.impulse.x,
            this.impulse.y
        );

        this.impulse.y += gravity;

        this.stands = false;

        if (this.feetPosition.y > groundY) {
            this.position.y = groundY - this.size.height;
            this.impulse.y = 0;
            this.stands = true;
        } else {
            for (var i = 0; i < blocks.length; i++) {
                var b = blocks[i];

                if (!b) {
                    continue;
                }
                if (b.position.x > this.feetPosition.x) {
                    continue;
                }
                if (b.position.x + b.size.width < this.feetPosition.x) {
                    continue;
                }
                var maxY = this.feetPosition.y;
                var minY = maxY - this.impulse.y;

                if (b.position.y > maxY || b.position.y < minY) {
                    continue;
                }
                this.position.y = b.position.y - this.size.height;
                this.stands = true;
                this.impulse.y = 0;
            }
        }

    }

    isMovedByUser(keyboard: KeyboardDriver, balls)
    {
        // key: 65 - 'A'
        if(keyboard.isPressed(65)) {
            this.moveLeft();
        }
        // key: 68 - 'D'
        if(keyboard.isPressed(68)) {
            this.moveRight();
        }
        // key: 32 - 'SPACE'
        if(keyboard.isPressed(32)) {
            this.jump();
        }
        if (keyboard.isPressed(87)) {
            this.attack(balls);
        }
    }

    jump()
    {
        if (!this.stands) return;

        this.impulse.y = -this.jumpPower;
    }

    moveLeft()
    {
        this.direction = "left";
        this.position.x -= this.speed;
    }

    moveRight()
    {
        this.direction = "right";
        this.position.x += this.speed;
    }
}