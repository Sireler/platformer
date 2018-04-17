import {Enemy} from "./Enemy";
import {SimpleArtificialIntelligence} from "./SimpleArtificialIntelligence";
import {Size} from "./size";

export class EnemyRanger extends Enemy implements SimpleArtificialIntelligence
{
    blocks;
    balls;

    constructor(position, blocks, balls)
    {
        super({
            right: "sprites/enemy1.png",
            left: "sprites/enemy2.png"
        });
        this.size = new Size(32, 32);
        this.position = position;
        this.speed = 2;
        this.blocks = blocks;
        this.balls = balls;
    }

    move(blocks)
    {
        var y = this.feetPosition.y;
        if(this.direction == "right") {
            var x = this.feetPosition.x + this.speed
        } else {
            var x = this.feetPosition.x - this.speed
        }
        var flag = false;
        for(var i = 0; i < blocks.length; i++) {
            var b = blocks[i];
            if(!b) {
                continue;
            }
            if(x < b.position.x) {
                continue;
            }
            if (x > b.position.x + this.size.width) {
                continue;
            }
            var by = b.position.y;
            if (by > y -1 && by < y+1) {
                flag = true;
                break;
            }
        }
        if(!flag) {
            if(this.direction == "right") {
                this.direction = "left"
            } else {
                this.direction = "right"
            }
        }
        if (this.direction == "right") {
            this.moveRight();
        } else {
            this.moveLeft();
        }
        this.attackCooldown = 90;
        this.team = "enemy";
    }

    ai()
    {
        this.move(this.blocks);
        this.attack(this.balls);
    }

    update(gravity, groundY, blocks)
    {
        super.update(gravity, groundY, blocks);
        this.ai();
    }
}