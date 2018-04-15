import {Screen} from "./screen";

export class ObjectPosition
{
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0)
    {
        this.set(x, y)
    }

    set(x: number, y: number): void
    {
        this.x = x;
        this.y = y;
    }

    move(x: number, y: number): void
    {
        this.x = this.x + x;
        this.y = this.y + y;
    }

    clone(): ObjectPosition
    {
        return new ObjectPosition(
            this.x,
            this.y
        );
    }

    normalize(screenSize: Screen): void
    {
        this.x = (this.x % screenSize.width) % screenSize.width;
        this.y = (this.y % screenSize.height) % screenSize.height;
    }
}