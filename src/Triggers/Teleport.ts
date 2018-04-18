import {Trigger} from "./Trigger";
import {Size} from "../Size";
import {ObjectPosition} from "../Position";
import {Drawable} from "../Draw/Drawable";

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

    // Action in contact with trigger
    onTrigger(obj)
    {
        obj.position.set(this.moveTo.x, this.moveTo.y);
    }
}