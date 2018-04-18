import {Trigger} from "./Trigger";
import {Size} from "./size";
import {ObjectPosition} from "./position";
import {Drawable} from "./drawable";

export class Teleport extends Trigger
{
    moveTo: ObjectPosition;

    constructor(position, moveTo)
    {
        super(position, new Size(32, 32));
        this.moveTo = moveTo;
        this.drawable = new Drawable('sprites/portal.png');
        this.drawable.position = this.position;
        this.drawable.size = this.size;
    }

    onTrigger(obj)
    {
        obj.position.set(this.moveTo.x, this.moveTo.y);
    }
}