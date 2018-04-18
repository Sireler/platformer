import {Trigger} from "./Trigger";
import {Size} from "../size";
import {Drawable} from "../drawable";
import {ObjectPosition} from "../position";

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

    onTrigger(obj)
    {
        obj.impulse.set(this.impulse.x, this.impulse.y);
    }
}