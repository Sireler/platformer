import {Drawable} from "./Draw/Drawable";
import {ObjectPosition} from "./Position";
import {Size} from "./Size";

export class Block extends Drawable
{
    position: ObjectPosition;
    size: Size;

    constructor(position: ObjectPosition)
    {
        super('sprites/block.png');
        this.position = position;
        this.size = new Size(32, 32);
    }
}