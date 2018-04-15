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
}