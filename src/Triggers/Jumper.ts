import {Trigger} from "./Trigger";
import {Size} from "../Size";
import {Drawable} from "../Draw/Drawable";
import {ObjectPosition} from "../Position";

export class Jumper extends Trigger
{
    impulse: ObjectPosition;

    constructor(position: ObjectPosition, impulse: ObjectPosition)
    {
        super(position, new Size(32,32));
        this.drawable = new Drawable('sprites/jumper.png');
        this.impulse = impulse;
        this.drawable.position = this.position;
        this.drawable.size = this.size;
    }

    // Action in contact with trigger
    onTrigger(obj)
    {
        obj.impulse.set(this.impulse.x, this.impulse.y);
    }
}