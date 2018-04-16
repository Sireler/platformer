import {Drawable} from "./drawable";
import {Size} from "./size";
import {ObjectPosition} from "./position";

export class Ball extends Drawable
{
    size: Size;
    impulse: ObjectPosition;
    bounce: number;
    timeToLife: number;
    radius: number;
    team;

    constructor(src, fps: number = 30)
    {
        super(src);
        this.size = new Size(16, 16);
        this.impulse = new ObjectPosition();
        this.bounce = 0.7;
        this.timeToLife = fps * 5;
        this.radius = this.size.width / 2;
        this.team = null;
    }

    get feetPosition()
    {
        return new ObjectPosition(
            this.position.x + this.size.width / 2,
            this.position.y + this.size.height
        )
    }

    get center()
    {
        return new ObjectPosition(
            this.position.x + this.size.width / 2,
            this.position.y + this.size.height / 2
        )
    }

    checkHit(ch)
    {
        if (this.team == ch.team) {
            return false;
        }

        var distance = this.center.distance(ch.center);

        if ((this.radius + ch.radius) > distance) {
            return true;
        } else {
            return false;
        }
    }

    // groundY: Game.MAX_Y
    // phys: Game.PHYS
    update(phys, groundY)
    {
        this.timeToLife--;
        this.position.move(
            this.impulse.x,
            this.impulse.y
        );
        this.impulse.y += phys.gravity;
        this.impulse.x *= phys.windage;

        if (Math.abs(this.impulse.x) < 0.1) {
            this.impulse.x = 0;
        }

        if (this.feetPosition.y > groundY) {
            this.position.y = groundY - this.size.height;
            this.impulse.y = this.impulse.y * this.bounce * -1;

            if (Math.abs(this.impulse.y) < 2) {
                this.impulse.y = 0;
            }
        } else {
            if (this.impulse.y > 0) {
                // TODO:: BLOCKS
            }
        }
    }

}