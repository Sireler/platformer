import {Drawable} from "./Drawable";
import {Size} from "./Size";
import {ObjectPosition} from "./Position";

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
    // blocks: Game.blocks
    update(phys, groundY, blocks)
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
                if(this.impulse.y > 0){
                    for(var i = 0; i < blocks.length; i++) {
                        var b = blocks[i];

                        if(!b) {
                            continue;
                        }
                        if(b.position.x > this.feetPosition.x){
                            continue;
                        }
                        if(b.position.x + b.size.width < this.feetPosition.x){
                            continue;
                        }
                        var maxY = this.feetPosition.y;
                        var minY = maxY - this.impulse.y;

                        if(b.position.y > maxY || b.position.y < minY){
                            continue;
                        }
                        this.position.y = this.impulse.y = this.impulse.y * this.bounce * -1;
                        if(Math.abs(this.impulse.y) < 2){
                            this.impulse.y = 0;
                        };
                        this.impulse.y = 0;
                    }
                }
            }
        }
    }

}