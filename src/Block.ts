import {Drawable} from "./drawable";
import {ObjectPosition} from "./position";
import {Size} from "./size";

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