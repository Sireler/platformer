import {DrawableSet} from "./DrawableSet";
import {Size} from "./size";
import {ObjectPosition} from "./position";
import {KeyboardDriver} from "./KeyboardDriver";

export class Character extends DrawableSet
{
    speed: number;
    jumpPower: number;
    direction: string;
    stands: boolean;
    impulse: ObjectPosition;

    constructor(srcs: object)
    {
        super(srcs);

        this.size = new Size(32, 32);
        this.speed = 3;
        this.jumpPower = 10;
        this.direction = "right";
        this.stands = false;
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

    update(gravity: number, groundY: number)
    {
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
            //
        }

    }

    isMovedByUser(keyboard: KeyboardDriver)
    {
        // key: 65 - 'A'
        if(keyboard.isPressed(65)){
            this.moveLeft();
        }
        // key: 68 - 'D'
        if(keyboard.isPressed(68)){
            this.moveRight();
        }
        // key: 32 - 'SPACE'
        if(keyboard.isPressed(32)){
            this.jump();
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