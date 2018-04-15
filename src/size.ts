export class Size
{
    width: number;
    height: number;

    constructor(width: number = 0, height: number = 0)
    {
        this.width = width;
        this.height = height;
    }

    set(width: number, height: number)
    {
        this.width = width;
        this.height = height;
    }

    isset()
    {
        return this.width != 0 ? true : false;
    }
}