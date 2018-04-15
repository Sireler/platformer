import {DrawableSet} from "./DrawableSet";
import {Size} from "./size";
import {ObjectPosition} from "./position";

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

    draw(ctx)
    {
        super.draw(ctx, this.direction);
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